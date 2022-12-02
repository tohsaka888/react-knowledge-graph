/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:02:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 16:16:37
 * @Description: 节点
 */

import React, { useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ConfigContext } from "../Controller/ConfigController";
import Loading from "./Loading";
import { defaultNodeConfig } from "../config/nodeConfig";
import { NodeFrontProps } from "../../KnowledgeGraph";
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
// import { useGraphBounds } from "../Controller/GraphBoundsController";
import useIsShowText from "../hooks/Graph/useIsShowText";

function UnmemoNode({ node }: { node: NodeFrontProps }) {
  const { config } = useContext(ConfigContext)!;
  const { typeConfig, showNodeMenu, onClickAddon, onClickInfo } = config;
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
  // const { x1, x2, y1, y2 } = useGraphBounds();

  const isShowText = useIsShowText();

  // const isInScreen = useMemo(() => {
  //   // if (
  //   //   position.x + radius >= x1 &&
  //   //   position.x <= x2 &&
  //   //   position.y >= y1 &&
  //   //   position.y <= y2
  //   // ) {
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  //   return true
  // }, [position.x, position.y, radius, x1, x2, y1, y2]);

  return (
    <>
      {node.visible && node.id && (
        <AnimatePresence>
          <motion.g
            key={node.id}
            cursor={"pointer"}
            id={node.id}
            onHoverStart={() => {
              setIsHover(true);
              dispatch(filterHighlightEdges(node));
            }}
            onHoverEnd={() => {
              setIsHover(false);
              dispatch(notHighlight(null));
            }}
            drag
            dragPropagation={false}
            dragSnapToOrigin={false}
            dragMomentum={false}
            whileDrag={{
              scale: 1.2,
            }}
            style={{ willChange: "transform" }}
            onDragStart={(e) => {
              setIsHover(true);
              dispatch(onMoving(node));
            }}
            onDrag={(e, info) => {
              const fromEdges = edges.filter((edge) => edge.fromId === node.id);
              const toEdges = edges.filter((edge) => edge.toId === node.id);
              fromEdges.forEach((edge) => {
                const fromNode = edge.fromNode;
                if (fromNode) {
                  const d = calcD({
                    ...edge,
                    fromNode: {
                      ...fromNode,
                      position: {
                        x: fromNode.position.x + info.offset.x,
                        y: fromNode.position.y + info.offset.y,
                      },
                    },
                  });
                  const edgeElement = document.getElementById(edge.id)!;
                  const iconOpen = document.getElementById(
                    edge.id + "icon-open"
                  );
                  const iconClose = document.getElementById(
                    edge.id + "icon-close"
                  );
                  if (d) {
                    edgeElement.setAttribute("d", d);
                    if (iconOpen) {
                      iconOpen.style.offsetPath = `path("${d}")`;
                    }
                    if (iconClose) {
                      iconClose.style.offsetPath = `path("${d}")`;
                    }
                  }
                }
              });
              toEdges.forEach((edge) => {
                const toNode = edge.toNode;
                if (toNode) {
                  const d = calcD({
                    ...edge,
                    toNode: {
                      ...toNode,
                      position: {
                        x: toNode.position.x + info.offset.x,
                        y: toNode.position.y + info.offset.y,
                      },
                    },
                  });
                  const edgeElement = document.getElementById(edge.id)!;
                  const iconOpen = document.getElementById(
                    edge.id + "icon-open"
                  );
                  const iconClose = document.getElementById(
                    edge.id + "icon-close"
                  );
                  if (d) {
                    edgeElement.setAttribute("d", d);
                    if (iconOpen) {
                      iconOpen.style.offsetPath = `path("${d}")`;
                    }
                    if (iconClose) {
                      iconClose.style.offsetPath = `path("${d}")`;
                    }
                  }
                }
              });
            }}
            onDragEnd={(e, info) => {
              setIsHover(false);
              dispatch(
                moveNodeAndEdge({ node, dx: info.offset.x, dy: info.offset.y })
              );
              dispatch(onMoveEnd(undefined));
              dispatch(notHighlight(undefined));
            }}
            initial={{
              x: position.x,
              y: position.y,
              opacity: 0,
            }}
            animate={{
              x: position.x,
              y: position.y,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
            }}
            onDoubleClick={(e) => {
              if (!loading) {
                exploreFunc({ node });
              }
            }}
          >
            {isHover && (
              <motion.circle
                r={radius + 4}
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

            {showNodeMenu && isHover && (
              <motion.g
                initial={{
                  x: -7,
                  y: radius - 1,
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                onClick={() => {
                  onClickInfo && onClickInfo(node);
                }}
              >
                <FcInfo />
              </motion.g>
            )}

            {showNodeMenu && isHover && (
              <motion.g
                initial={{
                  x: -7,
                  y: -radius - 13,
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                onClick={() => {
                  onClickAddon && onClickAddon(node);
                }}
              >
                <FcPlus />
              </motion.g>
            )}
          </motion.g>
        </AnimatePresence>
      )}
    </>
  );
}

export default React.memo(UnmemoNode);
