/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:02:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 16:16:37
 * @Description: 节点
 */

import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ConfigContext, HoveredNodeContext } from "../context";
import Loading from "./Loading";
import { defaultNodeConfig } from "../config/nodeConfig";
import { NodeFrontProps } from "KnowledgeGraph";
import useExplore from "./useExplore";

function UnmemoNode({ node }: { node: NodeFrontProps }) {
  const { config } = useContext(ConfigContext)!;
  const { explore, typeConfig, onExploreEnd } = config;
  const { name, type, position, parentNode } = node;
  const nodeConfig = typeConfig && typeConfig[type];

  const [isHover, setIsHover] = useState<boolean>(false);
  const { setHoveredNode } = useContext(HoveredNodeContext)!;
  const fill = nodeConfig?.fill || defaultNodeConfig.fill;
  const hoverStyle = nodeConfig?.hoverStyle || defaultNodeConfig.hoverStyle;
  const nameColor = nodeConfig?.nameColor || defaultNodeConfig.nameColor;
  const nameSize = nodeConfig?.nameSize || defaultNodeConfig.nameSize;
  const typeColor = nodeConfig?.typeColor || defaultNodeConfig.typeColor;
  const typeSize = nodeConfig?.typeSize || defaultNodeConfig.typeSize;
  const radius = nodeConfig?.radius || defaultNodeConfig.radius;

  const { exploreFunc, loading } = useExplore({ explore, node, onExploreEnd });

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
          duration: 0.3,
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
          initial={{
            fontSize: 0,
          }}
          animate={{ fontSize: nameSize }}
          textAnchor={"middle"}
          y={radius + nameSize}
        >
          {name}
        </motion.text>
        <motion.text
          className={"node"}
          node-id={node.id}
          fill={typeColor}
          initial={{
            fontSize: 0,
          }}
          animate={{ fontSize: typeSize }}
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
