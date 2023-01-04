import React, { useContext } from "react";
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
import { ConfigContext } from "../Controller/ConfigController";

function CanvasContainer({ children }: { children: React.ReactNode }) {
  const setEvent = useRightMenuEventDispatch();
  const dispatch = useAppDispatch();
  const canvasConfig = useAppSelector((state) => state.canvasConfig);

  const { config } = useContext(ConfigContext)!;

  const { dragRenderOptimization } = config;

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
          requestAnimationFrame(() => {
            // s2 更改state
            if (dragRenderOptimization === "react") {
              dispatch(setCanvasOffset({ dx: info.delta.x, dy: info.delta.y }));
            } else {
              // s1 直接修改dom
              const dragElement = document.getElementById("graph-drag")!;
              dragElement.style.transform = `translateX(${
                canvasConfig.x + info.offset.x
              }px) translateY(${canvasConfig.y + info.offset.y}px)`;
            }
          });
        }}
        onDragEnd={(e, info) => {
          if (dragRenderOptimization === "react") {
            // s2 更改state
            dispatch(setCanvasOffset({ dx: info.delta.x, dy: info.delta.y }));
          } else {
            // s1
            dispatch(
              setCanvasOffset({
                dx: info.offset.x,
                dy: info.offset.y,
              })
            );
          }
        }}
        onClick={() => {
          setEvent(null);
        }}
        onWheel={(e) => {
          requestAnimationFrame(() => {
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
            id={"graph-scale"}
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
