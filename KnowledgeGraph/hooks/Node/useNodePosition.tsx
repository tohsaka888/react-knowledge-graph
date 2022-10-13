/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:18:38
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 15:03:23
 * @Description: 计算Node位置
 */

import React, { useCallback } from "react";
import { NodeFrontProps, NodeProps } from "../../../KnowledgeGraph";
import useCalcDistence from "./useCalcDistence";

type Props = {
  direction: "inside" | "outside";
  parentNode: NodeFrontProps;
  nodes: NodeProps[];
  insideLength: number;
  outsideLength: number;
};

function useNodePosition() {
  const { calcDistence } = useCalcDistence();

  const calcNodePosition = useCallback(
    (props: Props): NodeFrontProps[] => {
      let frontNodes: NodeFrontProps[] = [];
      const { nodes, parentNode, direction, insideLength, outsideLength } =
        props;
      // 过滤
      const unFilteredtypies = nodes.map((node) => node.type);
      const types = Array.from(new Set(unFilteredtypies));
      const typeNodes = types.map((type) => {
        return nodes.filter((node) => node.type === type);
      });
      const typeAngle = Math.PI / types.length;

      let rotation: number = 0;

      if (insideLength && outsideLength) {
        rotation = parentNode.angle;
      } else if (insideLength && !outsideLength) {
        rotation = parentNode.angle - Math.PI / 2;
      } else if (!insideLength && outsideLength) {
        rotation = parentNode.angle + Math.PI / 2;
      }

      typeNodes.forEach((nodes, i) => {
        return nodes.forEach((node, index) => {
          const distence = calcDistence({
            deg: typeAngle,
            length: nodes.length,
          });
          const angle =
            (index + 1) * (typeAngle / (nodes.length + 1)) +
            i * typeAngle +
            (direction === "inside" ? 0 : Math.PI) +
            rotation;
          const x = parentNode.position.x - distence * Math.sin(angle);
          const y = parentNode.position.y + distence * Math.cos(angle);

          const frontNode: NodeFrontProps = {
            ...node,
            position: { x, y },
            pId: [...parentNode.pId, parentNode.id],
            isExplore: false,
            parentNode,
            angle,
            distence,
            visible: true,
          };

          frontNodes.push(frontNode);
        });
      });

      return frontNodes;
    },
    [calcDistence]
  );

  return { calcNodePosition };
}

export default useNodePosition;
