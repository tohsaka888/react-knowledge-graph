/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:18:38
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 16:05:45
 * @Description: 计算Node位置
 */

import React, { useCallback } from "react";
import useCalcDistence from "./useCalcDistence";

type Props = {
  direction: "inside" | "outside";
  parentNode: Node.NodeFrontProps;
  nodes: Node.NodeProps[];
};

function useNodePosition() {
  const { calcDistence } = useCalcDistence();

  const calcNodePosition = useCallback(
    (props: Props): Node.NodeFrontProps[] => {
      let frontNodes: Node.NodeFrontProps[] = [];
      const { nodes, parentNode, direction } = props;
      // 过滤
      const unFilteredtypies = nodes.map((node) => node.type);
      const types = Array.from(new Set(unFilteredtypies));
      const typeNodes = types.map((type) => {
        return nodes.filter((node) => node.type === type);
      });
      const typeAngle = Math.PI / types.length;

      typeNodes.forEach((nodes, i) => {
        return nodes.forEach((node, index) => {
          const distence = calcDistence({
            deg: typeAngle,
            length: nodes.length,
          });
          const angle =
            (index + 1) * (typeAngle / (nodes.length + 1)) + i * typeAngle;
          const x =
            parentNode.position.x +
            (direction === "inside" ? 1 : -1) * distence * Math.sin(angle);
          const y = parentNode.position.y + distence * Math.cos(angle);

          const frontNode: Node.NodeFrontProps = {
            ...node,
            position: { x, y },
            pId: [...parentNode.pId, parentNode.id],
            isExplore: false,
            parentNode,
            angle,
            distence,
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
