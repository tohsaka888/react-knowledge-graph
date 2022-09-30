/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:02:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 10:02:16
 * @Description: 请填写简介
 */

import React from "react";
import { motion } from "framer-motion";

type Props = {
  radius?: number;
  fill?: string;
};

function Node({ radius = 20, fill = "#1890ff" }: Props) {
  return (
    <motion.g>
      <motion.circle r={radius}>Node</motion.circle>
    </motion.g>
  );
}

export default Node;
