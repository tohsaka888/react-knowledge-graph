/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:02:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 17:03:47
 * @Description: 请填写简介
 */

import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ConfigContext,
  EdgesContext,
  HoveredNodeContext,
  NodesContext,
} from "components/context";
import useNodePosition from "components/hooks/Node/useNodePosition";
import useExtendRadius from "components/hooks/Node/useExtendRadius";
import Loading from "./Loading";

function Node({
  fill = "#1890ff",
  nameColor = "#666666",
  typeColor = "#ffffff",
  nameSize = 10,
  typeSize = 11,
  node,
}: Node.NodeConfig) {
  const { config } = useContext(ConfigContext)!;
  const { radius, explore, exploreEdge } = config;
  const { name, type, position, parentNode } = node;
  const { calcNodePosition } = useNodePosition();
  const { nodes, setNodes } = useContext(NodesContext)!;
  const { setEdges } = useContext(EdgesContext)!;
  const { calcNewPosition } = useExtendRadius();
  const [loading, setLoading] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const { setHoveredNode } = useContext(HoveredNodeContext)!;

  const exploreFunc = async () => {
    setLoading(true);
    // 判断当前节点是否已探索
    if (!node.isExplore) {
      const inside = await explore(node.id, "inside");
      const outside = await explore(node.id, "outside");
      const edges = await exploreEdge(node.id);

      // 探索-延长半径 取消探索-缩短半径
      calcNewPosition({
        node,
        insideLength: inside.length,
        outsideLength: outside.length,
      });
      // 判断是否有子节点
      if (node.hasMore) {
        const frontInside = calcNodePosition({
          direction: "inside",
          nodes: inside,
          parentNode: node,
        });
        const frontOutside = calcNodePosition({
          direction: "outside",
          nodes: outside,
          parentNode: node,
        });
        const curNodes = [
          ...nodes.map((current) => {
            if (current.id === node.id) {
              return {
                ...current,
                isExplore: true,
              };
            } else {
              return current;
            }
          }),
          ...frontInside,
          ...frontOutside,
        ];
        setNodes(curNodes);
        // 设置边
        setEdges((preEdges) => [
          ...preEdges,
          ...edges.map((edge) => {
            const fromNode = curNodes.find((node) => node.id === edge.fromId);
            const toNode = curNodes.find((node) => node.id === edge.toId);
            return {
              ...edge,
              type: "straight" as "straight",
              pId: [...(fromNode?.pId || []), ...(toNode?.pId || [])],
              fromNode,
              toNode,
            };
          }),
        ]);
      } else {
        alert("已经到尾节点了");
      }
    } else {
      // 探索-延长半径 取消探索-缩短半径
      calcNewPosition({
        node,
        insideLength: 0,
        outsideLength: 0,
      });
      // 过滤掉子节点
      const filteredNodes = nodes.filter(
        (current) => !current.pId.find((id) => id === node.id)
      );
      setNodes(
        filteredNodes.map((filteredNode) => {
          if (filteredNode.id === node.id) {
            return {
              ...filteredNode,
              isExplore: false,
            };
          } else {
            return filteredNode;
          }
        })
      );
      // 过滤边
      setEdges((edges) => {
        return edges.filter(
          (edge) =>
            ((edge.fromId !== node.id && edge.toId !== node.id) ||
              edge.fromId === parentNode?.id ||
              edge.toId === parentNode?.id) &&
            edge.pId.findIndex((id) => id === node.id) === -1
        );
      });
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.g
        key={node.id}
        id={node.id as string}
        onHoverStart={() => {
          setIsHover(true);
          setHoveredNode(node);
        }}
        onHoverEnd={() => {
          setIsHover(false);
          setHoveredNode(null);
        }}
        initial={{
          cursor: "pointer",
          x: parentNode ? parentNode.position.x : position.x,
          y: parentNode ? parentNode.position.y : position.y,
          opacity: 0,
        }}
        exit={{
          x: parentNode ? parentNode.position.x : position.x,
          y: parentNode ? parentNode.position.y : position.y,
          opacity: 0,
        }}
        animate={{
          x: position.x,
          y: position.y,
          opacity: 1,
          scale: isHover ? 1.1 : 1,
        }}
        transition={{
          duration: 0.5,
          scale: {
            duration: 0.2,
          },
        }}
        onClick={(e) => {
          exploreFunc();
        }}
      >
        <motion.circle
          initial={{
            r: 0,
          }}
          animate={{
            r: radius,
            opacity: loading ? 0.3 : 1,
            fill: isHover ? "tomato" : fill,
          }}
          transition={{
            duration: 0.5,
          }}
        />
        {loading && <Loading x={-radius - 5} y={-radius - 5} />}
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
    </AnimatePresence>
  );
}

export default Node;
