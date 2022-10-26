/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 16:14:10
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:11:24
 * @Description: 边
 */

import React, { useContext, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ConfigContext } from "../Controller/ConfigController";
import { defaultEdgeConfig } from "../config/edgeConfig";
import useCalcEdge from "../hooks/Edge/useCalcEdge";
import { EdgeFrontProps } from "../typings/Edge";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

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
  } = defaultEdgeConfig;

  return (
    <MotionConfig reducedMotion="never">
      {fromNode && toNode && visible && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          fill={"none"}
          transition={{
            duration: 1,
          }}
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
            animate={{
              stroke: edgeConfig?.stroke || stroke,
              strokeWidth: edgeConfig?.strokeWidth || strokeWidth,
              opacity,
              d,
              cursor: "pointer",
              pathLength: [0, 1],
            }}
            transition={{
              d: {
                duration: isMoving ? 0.3 : 0,
              },
              pathLength: {
                duration: 0.5,
              },
            }}
          />

          {isActive && (
            <motion.path
              id={(id + "active") as string}
              fill={"none"}
              animate={{
                d,
                stroke: "#2890ff",
                // opacity: needHighlight ? [0.5, 1] : 1,
                strokeWidth: 3,
                pathSpacing: 1,
                pathLength: [0, 0.5],
                pathOffset: [0, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
                delay: 0,
                d: {
                  duration: 0,
                },
              }}
            />
          )}

          {!isHovered && opacity === 1 && (
            <>
              <motion.text
                textAnchor={"middle"}
                dominantBaseline={"central"}
                dy={-1.5}
              >
                <motion.textPath
                  href={`#${id}`}
                  fontSize={24}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    fill: isActive
                      ? edgeConfig?.hoveredColor || hoveredColor
                      : edgeConfig?.stroke || stroke,
                    opacity: false ? [0.5, 1] : 1,
                  }}
                  startOffset={"50%"}
                  id={id + "direction"}
                >
                  ▸
                </motion.textPath>
              </motion.text>
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
                    opacity: false ? [0.5, 1] : 1,
                  }}
                  startOffset={"50%"}
                >
                  {description}
                </motion.textPath>
              </motion.text>
            </>
          )}

          {isHovered && opacity === 1 && (
            <motion.g
              style={{ offsetPath: `path("${d}")`, offsetDistance: "50%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              id={id + "icon-open"}
              transform={`translate(-10, -8)`}
            >
              <BsFillEyeFill color="#cecece" style={{ opacity }} />
            </motion.g>
          )}

          {opacity !== 1 && (
            <motion.g
              style={{ offsetPath: `path("${d}")`, offsetDistance: "50%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              id={id + "icon-close"}
              transform={`translate(-10, -8)`}
            >
              <BsFillEyeSlashFill color="#cecece" style={{ opacity: 0.5 }} />
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
