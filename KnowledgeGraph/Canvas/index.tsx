/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:04:35
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 16:25:30
 * @Description: Canvas
 */

import React, { startTransition, useContext } from "react";
import { motion } from "framer-motion";
import Node from "../Node";
import Edge from "../Edge";
import RightClickMenu from "../RightClickMenu";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setCanvasOffset,
  setCanvasSize,
} from "../Controller/canvasConfigSlice";
import useAutoExplore from "../hooks/Graph/useAutoExplore";
import { useRightMenuEventDispatch } from "../Controller/RightMenuController";

function CanvasContainer({ children }: { children: React.ReactNode }) {
  const setEvent = useRightMenuEventDispatch();
  const dispatch = useAppDispatch();
  const canvasConfig = useAppSelector((state) => state.canvasConfig);

  return (
    <>
      <motion.svg
        width={"100%"}
        height={"100%"}
        id={"knowledge-graph-canvas"}
        style={{ userSelect: "none" }}
        xmlns="http://www.w3.org/2000/svg"
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
          startTransition(() => {
            const dragElement = document.getElementById("graph-drag")!;
            dragElement.style.transform = `translateX(${
              canvasConfig.x + info.offset.x
            }px) translateY(${canvasConfig.y + info.offset.y}px)`;
          });
        }}
        onDragEnd={(e, info) => {
          dispatch(
            setCanvasOffset({
              dx: info.offset.x,
              dy: info.offset.y,
            })
          );
        }}
        onClick={() => {
          setEvent(null);
        }}
        onWheel={(e) => {
          startTransition(() => {
            if (e.deltaY < 0) {
              dispatch(setCanvasSize("zoom-in"));
            } else {
              dispatch(setCanvasSize("zoom-out"));
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
          transition={{
            duration: 0,
          }}
        >
          <motion.g
            animate={{ scale: canvasConfig.scale }}
            style={{ transformOrigin: "0, 0" }}
            transition={{
              duration: 0,
            }}
          >
            {children}
          </motion.g>
        </motion.g>
      </motion.svg>
      <RightClickMenu />
    </>
  );
}

function Canvas() {
  const graph = useAppSelector((state) => state.graph);
  useAutoExplore();
  return (
    <CanvasContainer>
      <>
        {graph.edges.map((edge) => {
          return <Edge {...edge} key={edge.id} />;
        })}
        {graph.nodes.map((node) => {
          return <Node node={node} key={node.id} />;
        })}
      </>
    </CanvasContainer>
  );
}

export default React.memo(Canvas);
