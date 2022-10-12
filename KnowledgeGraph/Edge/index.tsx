/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 16:14:10
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:11:24
 * @Description: 边
 */

import React, { useContext, useMemo, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ConfigContext, HoveredNodeContext } from "../context";
import { defaultEdgeConfig } from "../config/edgeConfig";
import useCalcEdge from "../hooks/Edge/useCalcEdge";
import { EdgeFrontProps } from "../typings/Edge";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

function Edge(props: EdgeFrontProps) {
  const { id, fromNode, toNode, description, fromId, toId, visible } = props;
  const { hoveredNode } = useContext(HoveredNodeContext)!;
  const { config } = useContext(ConfigContext)!;
  const { edgeConfig } = config;
  const [opacity, setOpacity] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const needHighlight = useMemo(() => {
    return hoveredNode
      ? hoveredNode.id === fromId || hoveredNode.id === toId
      : false;
  }, [fromId, hoveredNode, toId]);
  const { calcD } = useCalcEdge();
  const d = calcD(props);

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
            fill={"none"}
            width={20}
            initial={{ opacity: 0, cursor: "pointer" }}
            animate={{
              stroke: edgeConfig?.stroke || stroke,
              strokeWidth: edgeConfig?.strokeWidth || strokeWidth,
              opacity,
              d,
            }}
            transition={{
              duration: 0.3,
            }}
          />

          {needHighlight && (
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
                dy={-2}
              >
                <motion.textPath
                  href={`#${id}`}
                  fontSize={24}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    fill: needHighlight
                      ? edgeConfig?.hoveredColor || hoveredColor
                      : edgeConfig?.stroke || stroke,
                    opacity: needHighlight ? [0.5, 1] : 1,
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
                    fill: needHighlight
                      ? edgeConfig?.descriptionColor || hoveredColor
                      : edgeConfig?.descriptionColor || descriptionColor,
                    fontSize: edgeConfig?.descriptionSize || descriptionSize,
                    opacity: needHighlight ? [0.5, 1] : 1,
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
              transform={`translate(-10, -8)`}
            >
              <BsFillEyeSlashFill color="#cecece" style={{ opacity: 0.5 }} />
            </motion.g>
          )}

          <motion.path
            d={d}
            fill={"none"}
            cursor={"pointer"}
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
