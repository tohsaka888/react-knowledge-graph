/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:04:35
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 09:44:09
 * @Description: 请填写简介
 */

import React from "react";
import { motion } from "framer-motion";
import Node from "components/Node";

function Canvas() {
  return (
    <motion.svg width={"100%"} height={"100%"} id={"knowledge-graph-canvas"}>
      <motion.g id={"graph-drag"}>
        <motion.g id={"graph-scale"}>
          <Node />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}

export default Canvas;
