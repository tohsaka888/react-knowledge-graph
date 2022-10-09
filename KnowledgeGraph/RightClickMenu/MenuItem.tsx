/*
 * @Author: tohsaka888
 * @Date: 2022-10-08 14:45:05
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-08 14:48:20
 * @Description: MenuItem
 */

import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: string;
  index: number;
  length: number;
  onClick?: (item: string) => void;
};

function MenuItem({ children, onClick: clickEvent, index, length }: Props) {
  return (
    <motion.div
      initial={{
        width: "150px",
        height: "38px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        color: "#666666",
        padding: "0px 16px",
        cursor: "pointer",
        borderBottom: index !== length - 1 ? "1px solid #dfdfdf" : "none",
      }}
      whileHover={{
        background: "#3fa2ff",
        color: "#fff",
      }}
      onClick={() => {
        clickEvent && clickEvent(children);
      }}
    >
      {children}
    </motion.div>
  );
}

export default MenuItem;
