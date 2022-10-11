/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:04:35
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 16:25:30
 * @Description: 请填写简介
 */

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Node from "../Node";
import { EdgesContext, NodesContext, RightMenuPropsContext } from "../context";
import Edge from "../Edge";
import EdgeMenu from "../Edge/EdgeMenu";
import RightClickMenu from "../RightClickMenu";

function Canvas() {
  const { nodes } = useContext(NodesContext)!;
  const { edges } = useContext(EdgesContext)!;
  const { setEvent } = useContext(RightMenuPropsContext)!;
  const [canvasPosition, setCanvasPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
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
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        dragMomentum={false}
        dragSnapToOrigin={false}
        dragElastic={0}
        dragTransition={{
          bounceStiffness: 0,
          bounceDamping: 0,
        }}
        className={"canvas"}
        onDrag={(e, info) => {
          requestAnimationFrame(() => {
            setCanvasPosition(({ x, y }) => ({
              x: x + info.delta.x,
              y: y + info.delta.y,
            }));
          });
        }}
        onClick={() => {
          setEvent(null);
        }}
      >
        <motion.g
          id={"graph-drag"}
          animate={{
            x: canvasPosition.x,
            y: canvasPosition.y,
          }}
        >
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

export default React.memo(Canvas);
