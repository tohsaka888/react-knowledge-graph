/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:02:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 16:16:37
 * @Description: 节点
 */

import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ConfigContext,
  EdgesContext,
  HoveredNodeContext,
  NodesContext,
} from "../context";
import useNodePosition from "../hooks/Node/useNodePosition";
import useExtendRadius from "../hooks/Node/useExtendRadius";
import Loading from "./Loading";
import { defaultNodeConfig } from "../config/nodeConfig";
import useFormatEdges from "../hooks/Edge/useFormatEdges";
import { NodeFrontProps } from "KnowledgeGraph";

function UnmemoNode({ node }: { node: NodeFrontProps }) {
  const { config } = useContext(ConfigContext)!;
  const { explore, typeConfig, onExploreEnd } = config;
  const { name, type, position, parentNode } = node;
  const nodeConfig = typeConfig && typeConfig[type];
  const { calcNodePosition } = useNodePosition();
  const { nodes, setNodes } = useContext(NodesContext)!;
  const { setEdges } = useContext(EdgesContext)!;
  const { calcNewPosition } = useExtendRadius();
  const [loading, setLoading] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const { setHoveredNode } = useContext(HoveredNodeContext)!;
  const { formatEdges } = useFormatEdges();
  const [childNodeLength, setChildNodeLength] = useState<{
    insideLength: number;
    outsideLength: number;
  }>({ insideLength: 0, outsideLength: 0 });
  const fill = nodeConfig?.fill || defaultNodeConfig.fill;
  const hoverStyle = nodeConfig?.hoverStyle || defaultNodeConfig.hoverStyle;
  const nameColor = nodeConfig?.nameColor || defaultNodeConfig.nameColor;
  const nameSize = nodeConfig?.nameSize || defaultNodeConfig.nameSize;
  const typeColor = nodeConfig?.typeColor || defaultNodeConfig.typeColor;
  const typeSize = nodeConfig?.typeSize || defaultNodeConfig.typeSize;
  const radius = nodeConfig?.radius || defaultNodeConfig.radius;

  const exploreFunc = async () => {
    setLoading(true);

    // 判断当前节点是否已探索
    if (!node.isExplore) {
      const { inside, outside, edges } = await explore(node.id);
      setChildNodeLength({
        insideLength: inside.length,
        outsideLength: outside.length,
      });
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
          insideLength: inside.length,
          outsideLength: outside.length,
        });
        const frontOutside = calcNodePosition({
          direction: "outside",
          nodes: outside,
          parentNode: node,
          insideLength: inside.length,
          outsideLength: outside.length,
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
        formatEdges({ node, curNodes, edges });
      } else {
        onExploreEnd && onExploreEnd();
      }
    } else {
      // 探索-延长半径 取消探索-缩短半径
      calcNewPosition({
        node,
        ...childNodeLength,
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
            filteredNodes.find((node) => node.id === edge.fromId) &&
            filteredNodes.find((node) => node.id === edge.toId)
        );
      });
    }
    node.isExplore = !node.isExplore;
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
        // drag
        // dragPropagation={false}
        // dragSnapToOrigin={false}
        // dragMomentum={false}
        // onDragEnd={(e, info) => {
        //   // setHoveredNode({ ...node, position: { x: e.x, y: e.y } });
        // }}
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
        }}
        transition={{
          duration: 0.5,
        }}
        onDoubleClick={(e) => {
          exploreFunc();
        }}
      >
        <motion.circle
          id={node.id + "circle"}
          node-id={node.id}
          className={"node"}
          initial={{
            r: 0,
          }}
          animate={
            !isHover
              ? {
                  r: radius,
                  opacity: loading ? 0.3 : 1,
                  fill: fill,
                }
              : {
                  r: radius,
                  opacity: loading ? 0.3 : 1,
                  fill: fill,
                  ...(hoverStyle as any),
                }
          }
          transition={{
            duration: 0.5,
          }}
        />
        {loading && (
          <Loading x={-1.25 * radius} y={-1.25 * radius} size={radius / 40} />
        )}
        <motion.text
          className={"node"}
          node-id={node.id}
          fill={nameColor}
          fontSize={nameSize}
          textAnchor={"middle"}
          y={radius + nameSize}
        >
          {name}
        </motion.text>
        <motion.text
          className={"node"}
          node-id={node.id}
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

export default React.memo(UnmemoNode);
