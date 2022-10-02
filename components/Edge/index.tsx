/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 16:14:10
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 17:20:55
 * @Description: 边
 */

import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { ConfigContext, HoveredNodeContext } from "components/context";
import { defaultEdgeConfig } from "components/config/edgeConfig";

function Edge({
  id,
  fromNode,
  toNode,
  type,
  description,
  fromId,
  toId,
}: Edge.EdgeFrontProps) {
  const { hoveredNode } = useContext(HoveredNodeContext)!;
  const { config } = useContext(ConfigContext)!;
  const { edgeConfig } = config;
  const needHighlight = useMemo(() => {
    return hoveredNode
      ? hoveredNode.id === fromId || hoveredNode.id === toId
      : false;
  }, [fromId, hoveredNode, toId]);

  const d = useMemo(() => {
    const fromX = fromNode?.position.x as number;
    const fromY = fromNode?.position.y as number;
    const toX = toNode?.position.x as number;
    const toY = toNode?.position.y as number;
    // 中间点
    const angle = Math.PI / 2 - Math.atan2(fromY - toY, toX - fromX);
    const dx = Math.cos(angle) * ((toX - fromX) / 2);
    const dy = Math.sin(angle) * ((toX - fromX) / 2) - 10;
    const middlePoint = {
      x: (fromX + toX + dx) / 2 + dx,
      y: (fromY + toY) / 2 + dy,
    };
    return type === "straight"
      ? `M ${fromX} ${fromY}, L ${toX} ${toY}`
      : `M ${fromX} ${fromY}, Q ${middlePoint.x} ${middlePoint.y}, ${toX} ${toY}`;
  }, [
    fromNode?.position.x,
    fromNode?.position.y,
    toNode?.position.x,
    toNode?.position.y,
    type,
  ]);

  const {
    descriptionColor,
    descriptionSize,
    hoveredColor,
    stroke,
    strokeWidth,
  } = defaultEdgeConfig;

  return (
    <>
      {fromNode && toNode && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
          }}
        >
          <motion.path
            id={id as string}
            initial={{
              d: `M ${fromNode.position.x} ${fromNode.position.y}, L ${fromNode.position.x} ${fromNode.position.y}`,
            }}
            fill={"transparent"}
            animate={{
              d,
              stroke: needHighlight
                ? edgeConfig?.hoveredColor || hoveredColor
                : edgeConfig?.stroke || stroke,
              opacity: needHighlight ? [0.5, 1] : 1,
              strokeWidth: edgeConfig?.strokeWidth || strokeWidth,
            }}
            transition={{
              duration: 0.5,
            }}
          />

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
        </motion.g>
      )}
    </>
  );
}

export default Edge;
