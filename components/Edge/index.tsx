/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 16:14:10
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 17:20:55
 * @Description: 边
 */

import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { HoveredNodeContext } from "components/context";

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

  const needHighlight = useMemo(() => {
    return hoveredNode
      ? hoveredNode.id === fromId || hoveredNode.id === toId
      : false;
  }, [fromId, hoveredNode, toId]);

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
            stroke={needHighlight ? "#CCCCFF" : "#cecece"}
            strokeWidth={1}
            initial={{
              d: `M ${fromNode.position.x} ${fromNode.position.y}, L ${fromNode.position.x} ${fromNode.position.y}`,
            }}
            animate={{
              d: `M ${fromNode.position.x} ${fromNode.position.y}, L ${toNode.position.x} ${toNode.position.y}`,
              fill: needHighlight ? "#CCCCFF" : "#cecece",
              opacity: needHighlight ? [0.5, 1] : 1,
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
                fill: needHighlight ? "#CCCCFF" : "#cecece",
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
              fontSize={8}
              animate={{
                fill: needHighlight ? "#CCCCFF" : "#cecece",
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
