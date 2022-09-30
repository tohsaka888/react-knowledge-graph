/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:04:35
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 16:57:13
 * @Description: 请填写简介
 */

import React, { useContext } from "react";
import { motion } from "framer-motion";
import Node from "components/Node";
import { ConfigContext, EdgesContext, NodesContext } from "components/context";
import Edge from "components/Edge";

function Canvas() {
  const { nodes } = useContext(NodesContext)!;
  const { edges } = useContext(EdgesContext)!;
  return (
    <motion.svg
      width={"100%"}
      height={"100%"}
      id={"knowledge-graph-canvas"}
      style={{ userSelect: "none" }}
    >
      <motion.g id={"graph-drag"}>
        <motion.g id={"graph-scale"}>
          {edges.map((edge) => {
            return <Edge {...edge} key={edge.id} />;
          })}
          {nodes.map((node) => {
            return <Node node={node} key={node.id} />;
          })}
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}

export default Canvas;
