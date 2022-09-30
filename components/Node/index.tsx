/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:02:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 11:08:19
 * @Description: 请填写简介
 */

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";

function Node({
  radius = 20,
  fill = "#1890ff",
  name = "测试节点",
  type = "节点",
  nameColor = "#666666",
  typeColor = "#ffffff",
  nameSize = 10,
  typeSize = 12,
  position = { x: 100, y: 100 },
}: Node.NodeConfig) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [canDrag, setCanDrag] = useState<boolean>(false);

  return (
    <motion.g
      drag={canDrag}
      initial={{ cursor: "pointer", x: position.x, y: position.y }}
      dragMomentum={false}
      onClick={(e) => {
        e.stopPropagation();
        setCanDrag(true);
      }}
      whileHover={{
        scale: 1.1,
      }}
      onDragEnd={() => {
        setCanDrag(false);
      }}
      onHoverStart={(e) => {
        setIsHover(true);
      }}
      onHoverEnd={(e) => {
        setIsHover(false);
      }}
    >
      <motion.circle
        animate={{
          fill: isHover ? "#2890ff" : fill,
          r: radius,
        }}
        transition={{
          type: "spring",
          bounce: 1,
          duration: 2,
        }}
      >
        Node
      </motion.circle>
      <motion.text
        fill={nameColor}
        fontSize={nameSize}
        textAnchor={"middle"}
        y={radius + nameSize}
      >
        {name}
      </motion.text>
      <motion.text
        fill={typeColor}
        fontSize={typeSize}
        textAnchor={"middle"}
        dominantBaseline={"central"}
      >
        {type}
      </motion.text>
    </motion.g>
  );
}

export default Node;
