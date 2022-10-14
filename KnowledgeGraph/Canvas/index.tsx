/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:04:35
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 16:25:30
 * @Description: 请填写简介
 */

import React, { useContext } from "react";
import { motion } from "framer-motion";
import Node from "../Node";
import { RightMenuPropsContext } from "../context";
import Edge from "../Edge";
import RightClickMenu from "../RightClickMenu";
import { useAppDispatch, useAppSelector } from "../hooks";
import { initialize } from "../Controller/graphSlice";
import { ConfigProps } from "../typings/Config";
import { useEffect } from "react";
import {
  setCanvasOffset,
  setCanvasSize,
} from "../Controller/canvasConfigSlice";

function CanvasContainer({ children }: { children: React.ReactNode }) {
  const { setEvent } = useContext(RightMenuPropsContext)!;
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
          requestAnimationFrame(() => {
            dispatch(
              setCanvasOffset({
                dx: info.delta.x,
                dy: info.delta.y,
              })
            );
          });
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
            duration: 0.05,
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

function Canvas(graphConfig: ConfigProps) {
  const graph = useAppSelector((state) => state.graph);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      initialize({
        node: graphConfig.node,
        position: graphConfig.position,
      })
    );
  }, [dispatch, graphConfig.node, graphConfig.position]);

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
