import React, {
  startTransition,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ConfigContext } from "../Controller/ConfigController";
import Loading from "./Loading";
import { defaultNodeConfig } from "../config/nodeConfig";
import { EdgeFrontProps, NodeFrontProps } from "../../KnowledgeGraph";
import useExplore from "../hooks/Node/useExplore";
import { useDispatch } from "react-redux";
import {
  filterHighlightEdges,
  moveNodeAndEdge,
  notHighlight,
  onMoveEnd,
  onMoving,
} from "../Controller/graphSlice";
import { useAppSelector } from "../hooks";
import useCalcEdge from "../hooks/Edge/useCalcEdge";
import { FcInfo, FcPlus } from "react-icons/fc";
import useIsShowText from "../hooks/Graph/useIsShowText";
import { useGraphBounds } from "../Controller/GraphBoundsController";

function UnmemoNode({ node }: { node: NodeFrontProps }) {
  const { config } = useContext(ConfigContext)!;
  const { typeConfig, showNodeMenu, onClickAddon, onClickInfo, edgeConfig } =
    config;
  const { name, type, position } = node;
  const nodeConfig = typeConfig && typeConfig[type];
  const edges = useAppSelector((state) => state.graph.edges);

  const [isHover, setIsHover] = useState<boolean>(false);
  const fill = nodeConfig?.fill || defaultNodeConfig.fill;
  const hoverStyle = nodeConfig?.hoverStyle || defaultNodeConfig.hoverStyle;
  const nameColor = nodeConfig?.nameColor || defaultNodeConfig.nameColor;
  const nameSize = nodeConfig?.nameSize || defaultNodeConfig.nameSize;
  const typeColor = nodeConfig?.typeColor || defaultNodeConfig.typeColor;
  const typeSize = nodeConfig?.typeSize || defaultNodeConfig.typeSize;
  const radius = nodeConfig?.radius || defaultNodeConfig.radius;

  const { exploreFunc, loading } = useExplore();
  const dispatch = useDispatch();
  const { calcD } = useCalcEdge();
  const { x1, x2, y1, y2 } = useGraphBounds();

  const isShowText = useIsShowText();

  const isInScreen = useMemo(() => {
    if (
      position.x + radius >= x1 &&
      position.x <= x2 &&
      position.y >= y1 &&
      position.y <= y2
    ) {
      return true;
    } else {
      return false;
    }
  }, [position.x, position.y, radius, x1, x2, y1, y2]);

  const modifyEdges = useCallback(
    (info: PanInfo) => {
      if (edgesElementRef.current) {
        edgesElementRef.current.forEach(({ element, direction, edge }) => {
          const fromNode = edge.fromNode!;
          const toNode = edge.toNode!;
          const d = calcD(
            direction === "from"
              ? {
                  ...edge,
                  fromNode: {
                    ...fromNode,
                    position: {
                      x: fromNode.position.x + info.offset.x,
                      y: fromNode.position.y + info.offset.y,
                    },
                  } as NodeFrontProps,
                }
              : {
                  ...edge,
                  toNode: {
                    ...toNode,
                    position: {
                      x: toNode.position.x + info.offset.x,
                      y: toNode.position.y + info.offset.y,
                    },
                  } as NodeFrontProps,
                }
          );
          if (d) {
            element.setAttribute("d", d);
            const iconOpen = document.getElementById(edge.id + "icon-open");
            const iconClose = document.getElementById(edge.id + "icon-close");
            const arrow = document.getElementById(edge.id + "arrow");
            if (iconOpen) {
              iconOpen.style.offsetPath = `path("${d}")`;
            }
            if (iconClose) {
              iconClose.style.offsetPath = `path("${d}")`;
            }
            if (arrow) {
              arrow.style.offsetPath = `path("${d}")`;
            }
          }
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const needCalcEdges = useMemo(
    () =>
      edges.filter((edge) => edge.fromId === node.id || edge.toId === node.id),
    [edges, node.id]
  );

  const edgesElementRef = useRef<
    {
      element: SVGPathElement;
      direction: "from" | "to";
      edge: EdgeFrontProps;
    }[]
  >(null!);

  return (
    <>
      {node.id && (
        <AnimatePresence>
          <motion.g
            key={node.id}
            cursor={"pointer"}
            className={"nodes"}
            id={node.id}
            onHoverStart={() => {
              dispatch(filterHighlightEdges(node));
              setIsHover(true);
            }}
            onHoverEnd={() => {
              dispatch(notHighlight(null));
              setIsHover(false);
            }}
            drag
            dragPropagation={false}
            dragSnapToOrigin={false}
            dragMomentum={false}
            whileDrag={{
              scale: 1.2,
            }}
            style={{
              willChange: "transform",
            }}
            onDragStart={(e) => {
              edgesElementRef.current = needCalcEdges.map((edge) => {
                let direction: "from" | "to" = "from";
                if (edge.fromId === node.id) {
                  direction = "from";
                } else {
                  direction = "to";
                }
                return {
                  direction,
                  element: document.getElementById(
                    edge.id
                  )! as unknown as SVGPathElement,
                  edge,
                };
              });
            }}
            onDrag={(e, info) => {
              requestAnimationFrame(() => {
                modifyEdges(info);
              });
            }}
            onDragEnd={(e, info) => {
              dispatch(
                moveNodeAndEdge({ node, dx: info.offset.x, dy: info.offset.y })
              );
              dispatch(onMoveEnd(undefined));
              dispatch(notHighlight(null));
              setIsHover(false);
            }}
            initial={{
              x: position.x,
              y: position.y,
              opacity: 0,
            }}
            animate={{
              x: position.x,
              y: position.y,
              opacity: isInScreen ? 1 : 0,
              visibility: node.visible && isInScreen ? "visible" : "hidden",
            }}
            transition={{
              duration: 0.3,
              visibility: {
                duration: 0,
              },
              opacity: {
                duration: 0.6,
              },
            }}
            onDoubleClick={(e) => {
              if (!loading) {
                exploreFunc({ node });
              }
            }}
          >
            {(isHover || node.isHovered) && (
              <motion.circle
                r={radius + 2}
                fill={"transparent"}
                strokeWidth={8}
                stroke={"#f6793bb7"}
                initial={{
                  strokeOpacity: 0,
                }}
                animate={{
                  strokeOpacity: 1,
                }}
              />
            )}

            <motion.circle
              id={node.id + "circle"}
              node-id={node.id}
              className={"node"}
              initial={{
                r: radius,
              }}
              animate={
                !isHover
                  ? {
                      r: radius,
                      opacity: loading ? 0.3 : 1,
                      fill: fill,
                    }
                  : {
                      r: radius,
                      opacity: loading ? 0.3 : 1,
                      fill: fill,
                      ...(hoverStyle as any),
                    }
              }
              transition={{
                duration: 0.5,
              }}
            />
            {loading && (
              <Loading
                x={-1.25 * radius}
                y={-1.25 * radius}
                size={radius / 40}
              />
            )}
            {isShowText && (
              <>
                <motion.text
                  className={"node"}
                  node-id={node.id}
                  fill={nameColor}
                  initial={{
                    fontSize: 0,
                  }}
                  animate={{
                    fontSize: nameSize,
                    y: isHover ? radius + nameSize + 12 : radius + nameSize + 3,
                  }}
                  textAnchor={"middle"}
                >
                  {name}
                </motion.text>
                <motion.text
                  className={"node"}
                  node-id={node.id}
                  fill={typeColor}
                  initial={{
                    fontSize: 0,
                  }}
                  animate={{ fontSize: typeSize }}
                  textAnchor={"middle"}
                  dominantBaseline={"central"}
                >
                  {type}
                </motion.text>
              </>
            )}

            {showNodeMenu && (isHover || node.isHovered) && (
              <motion.g
                initial={{
                  x: -6,
                  y: radius,
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                onClick={() => {
                  onClickInfo && onClickInfo(node);
                }}
              >
                <FcInfo size={12} />
              </motion.g>
            )}

            {showNodeMenu && (isHover || node.isHovered) && (
              <motion.g
                initial={{
                  x: -6,
                  y: -radius - 11.5,
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                onClick={() => {
                  onClickAddon && onClickAddon(node);
                }}
              >
                <FcPlus size={12} />
              </motion.g>
            )}
          </motion.g>
        </AnimatePresence>
      )}
    </>
  );
}

export default React.memo(UnmemoNode);
