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
import {
  CanvasConfigContext,
  EdgesContext,
  NodesContext,
  RightMenuPropsContext,
} from "../context";
import Edge from "../Edge";
import EdgeMenu from "../Edge/EdgeMenu";
import RightClickMenu from "../RightClickMenu";

function CanvasContainer({ children }: { children: React.ReactNode }) {
  const { setEvent } = useContext(RightMenuPropsContext)!;
  const { canvasConfig, setCanvasConfig } = useContext(CanvasConfigContext)!;
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
            setCanvasConfig(({ x, y, scale }) => ({
              x: x + info.delta.x,
              y: y + info.delta.y,
              scale,
            }));
          });
        }}
        onClick={() => {
          setEvent(null);
        }}
        onWheel={(e) => {
          requestAnimationFrame(() => {
            if (e.deltaY < 0) {
              setCanvasConfig((config) => ({
                ...config,
                scale: config.scale * 1.1,
              }));
            } else {
              setCanvasConfig((config) => ({
                ...config,
                scale: config.scale * 0.9,
              }));
            }
          });
        }}
      >
        <motion.g
          id={"graph-drag"}
          animate={{
            x: canvasConfig.x,
            y: canvasConfig.y,
          }}
        >
          <motion.g id={"graph-scale"} animate={{ scale: canvasConfig.scale }}>
            {children}
          </motion.g>
        </motion.g>
      </motion.svg>
      <RightClickMenu />
    </>
  );
}

function Canvas() {
  const { nodes } = useContext(NodesContext)!;
  const { edges } = useContext(EdgesContext)!;
  return (
    <CanvasContainer>
      <>
        {edges.map((edge) => {
          return <Edge {...edge} key={edge.id} />;
        })}
        {edges.map((edge) => {
          return <EdgeMenu edge={edge} key={edge.id} />;
        })}
        {nodes.map((node) => {
          return <Node node={node} key={node.id} />;
        })}
      </>
    </CanvasContainer>
  );
}

export default React.memo(Canvas);
