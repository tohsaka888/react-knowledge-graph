/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:04:35
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-08 11:47:15
 * @Description: 请填写简介
 */

import React, { useContext } from "react";
import { motion } from "framer-motion";
import Node from "components/Node";
import {
  // EdgeMenuContext,
  EdgesContext,
  NodesContext,
} from "components/context";
import Edge from "components/Edge";
import EdgeMenu from "components/Edge/EdgeMenu";

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
  return (
    <motion.svg
      width={"100%"}
      height={"100%"}
      id={"knowledge-graph-canvas"}
      style={{ userSelect: "none" }}
    >
      <motion.g id={"graph-drag"}>
        <motion.g id={"graph-scale"}>
          {/* <EdgeController> */}
            {edges.map((edge) => {
              return <Edge {...edge} key={edge.id} />;
            })}
            {nodes.map((node) => {
              return <Node node={node} key={node.id} />;
            })}
            {edges.map((edge) => {
              return <EdgeMenu edge={edge} key={edge.id} />;
            })}
          {/* </EdgeController> */}
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}

export default Canvas;
