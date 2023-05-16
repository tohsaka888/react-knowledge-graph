import React, { useContext, useMemo, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ConfigContext } from "../Controller/ConfigController";
import { defaultEdgeConfig } from "../config/edgeConfig";
import useCalcEdge from "../hooks/Edge/useCalcEdge";
import { EdgeFrontProps } from "../typings/Edge";
import {
  BsCursorFill,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs";
import useIsShowText from "../hooks/Graph/useIsShowText";
import { useGraphBounds } from "../Controller/GraphBoundsController";

function Edge(props: EdgeFrontProps) {
  const {
    id,
    fromNode,
    toNode,
    description,
    fromId,
    toId,
    visible,
    needHighlight,
    isMoving,
  } = props;
  const { config } = useContext(ConfigContext)!;
  const { edgeConfig } = config;
  const [opacity, setOpacity] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { calcD } = useCalcEdge();
  const d = calcD(props);
  const isActive = needHighlight && !isMoving;

  const {
    descriptionColor,
    descriptionSize,
    hoveredColor,
    stroke,
    strokeWidth,
    flyLineEffect,
  } = defaultEdgeConfig;

  const isShowText = useIsShowText();

  const { x1, x2, y1, y2 } = useGraphBounds();

  const isInScreen = useMemo(() => {
    const fromX = fromNode?.position.x || 0;
    const fromY = fromNode?.position.y || 0;
    const toX = toNode?.position.x || 0;
    const toY = toNode?.position.y || 0;
    if (
      (fromX >= x1 && fromX <= x2 && fromY >= y1 && fromY <= y2) ||
      (toX >= x1 && toX <= x2 && toY >= y1 && toY <= y2)
    ) {
      return true;
    } else {
      return false;
    }
  }, [fromNode, toNode, x1, x2, y1, y2]);

  return (
    <MotionConfig reducedMotion="never">
      {fromNode && toNode && visible && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            visibility: isInScreen ? "visible" : "hidden",
          }}
          fill={"none"}
          transition={{
            duration: 1,
          }}
          className={"edges"}
          onClick={() => {
            setOpacity((value) => (value !== 1 ? 1 : 0.2));
          }}
        >
          <motion.path
            id={id as string}
            from-id={fromId}
            to-id={toId}
            fill={"none"}
            width={20}
            initial={{ opacity: 0, pathLength: 0 }}
            d={d}
            animate={{
              stroke: isActive
                ? edgeConfig?.hoveredColor || "#1890ff"
                : edgeConfig?.stroke || stroke,
              strokeWidth: edgeConfig?.strokeWidth || strokeWidth!,
              opacity,
              // d,
              cursor: "pointer",
              pathLength: [0, 1],
            }}
            transition={{
              pathLength: {
                duration: 1,
              },
            }}
          />

          {(edgeConfig?.flyLineEffect || flyLineEffect) === "line" &&
            isActive && (
              <motion.path
                id={(id + "active") as string}
                fill={"none"}
                animate={{
                  d,
                  stroke: isActive
                    ? edgeConfig?.hoveredColor || "#1890ff"
                    : edgeConfig?.stroke || "#cecece",
                  // opacity: needHighlight ? [0.5, 1] : 1,
                  strokeWidth: 2,
                  // pathSpacing: 1,
                  pathLength: [0, 0.3],
                  pathOffset: [0, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  d: {
                    duration: 0,
                  },
                }}
              />
            )}

          {isShowText && !isHovered && !isMoving && opacity === 1 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }}>
              <g
                style={{
                  offsetPath: `path("${d}")`,
                  offsetDistance: "50%",
                }}
                id={id + "arrow"}
                className={
                  (edgeConfig?.flyLineEffect || flyLineEffect) === "arrow" &&
                  isActive
                    ? "arrow-active"
                    : undefined
                }
              >
                {edgeConfig?.arrowIcon ? (
                  edgeConfig.arrowIcon
                ) : (
                  <motion.g
                    initial={{
                      transform: "rotate(45deg) translate(-8px, 0px)",
                    }}
                  >
                    <BsCursorFill
                      color={
                        isActive
                          ? edgeConfig?.hoveredColor || "#1890ff"
                          : edgeConfig?.stroke || "#cecece"
                      }
                      style={{ opacity }}
                      size={10}
                    />
                  </motion.g>
                )}
              </g>
              <motion.text
                textAnchor={"middle"}
                dominantBaseline={"central"}
                dy={-10}
              >
                <motion.textPath
                  href={`#${id}`}
                  id={id + "description"}
                  animate={{
                    fill: isActive
                      ? edgeConfig?.descriptionColor || hoveredColor
                      : edgeConfig?.descriptionColor || descriptionColor,
                    fontSize: edgeConfig?.descriptionSize || descriptionSize,
                    opacity: 1,
                  }}
                  startOffset={"50%"}
                >
                  {description}
                </motion.textPath>
              </motion.text>
            </motion.g>
          )}

          {isShowText && isHovered && !isMoving && opacity === 1 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <g
                style={{ offsetPath: `path("${d}")`, offsetDistance: "50%" }}
                id={id + "icon-open"}
                transform={`translate(-10, -8)`}
              >
                <BsFillEyeFill color="#cecece" style={{ opacity }} />
              </g>
            </motion.g>
          )}

          {isShowText && opacity !== 1 && !isMoving && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <g
                style={{ offsetPath: `path("${d}")`, offsetDistance: "50%" }}
                id={id + "icon-close"}
                transform={`translate(-10, -8)`}
              >
                <BsFillEyeSlashFill color="#cecece" style={{ opacity: 0.5 }} />
              </g>
            </motion.g>
          )}

          <motion.path
            d={d}
            fill={"none"}
            animate={{
              cursor: "pointer",
            }}
            stroke={"transparent"}
            strokeWidth={10}
            onHoverStart={() => {
              setIsHovered(true);
            }}
            onHoverEnd={() => {
              setIsHovered(false);
            }}
          />
        </motion.g>
      )}
    </MotionConfig>
  );
}

export default React.memo(Edge);
