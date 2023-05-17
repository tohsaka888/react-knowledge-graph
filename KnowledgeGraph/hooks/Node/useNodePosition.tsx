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

      const parentAngle = parentNode.parentNode
        ? Math.atan2(
            parentNode.position.y - parentNode.parentNode.position.y,
            parentNode.position.x - parentNode.parentNode.position.x
          )
        : 0;

      if (insideLength && outsideLength) {
        console.log(parentAngle);
        rotation =
          Math.abs(parentAngle) > Math.PI / 2
            ? parentAngle - Math.PI
            : parentAngle;
      } else if (insideLength && !outsideLength) {
        rotation = parentAngle + Math.PI;
      } else if (!insideLength && outsideLength) {
        rotation = parentAngle;
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
            isHovered: false,
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
