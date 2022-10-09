/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:04:35
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:12:44
 * @Description: 请填写简介
 */

import React, { useContext } from "react";
import { motion } from "framer-motion";
import Node from "../Node";
import {
  // EdgeMenuContext,
  EdgesContext,
  NodesContext,
  RightMenuPropsContext,
} from "../context";
import Edge from "../Edge";
import EdgeMenu from "../Edge/EdgeMenu";
import RightClickMenu from "../RightClickMenu";

// function EdgeController({ children }: { children: React.ReactNode }) {
//   const [isHovered, setIsHovered] = useState<boolean>(false);
//   const [isShow, setIsShow] = useState<boolean>(true);
//   return (
//     <EdgeMenuContext.Provider
//       value={{ isHovered, isShow, setIsHovered, setIsShow }}
//     >
//       {children}
//     </EdgeMenuContext.Provider>
//   );
// }

function Canvas() {
  const { nodes } = useContext(NodesContext)!;
  const { edges } = useContext(EdgesContext)!;
  const { setEvent } = useContext(RightMenuPropsContext)!;
  return (
    <>
      <motion.svg
        width={"100%"}
        height={"100%"}
        id={"knowledge-graph-canvas"}
        style={{ userSelect: "none" }}
        onContextMenu={(e) => {
          e.preventDefault();
          setEvent(e);
        }}
        className={"canvas"}
        onClick={() => {
          setEvent(null);
        }}
      >
        <motion.g id={"graph-drag"}>
          <motion.g id={"graph-scale"}>
            {edges.map((edge) => {
              return <Edge {...edge} key={edge.id} />;
            })}
            {edges.map((edge) => {
              return <EdgeMenu edge={edge} key={edge.id} />;
            })}
            {nodes.map((node) => {
              return <Node node={node} key={node.id} />;
            })}
          </motion.g>
        </motion.g>
      </motion.svg>
      <RightClickMenu />
    </>
  );
}

export default Canvas;
