import React, { useCallback, useContext } from "react";
import { NodeFrontProps } from "KnowledgeGraph";
import { EdgesContext } from "../../context";

type Props = {
  node: NodeFrontProps;
  insideLength: number;
  outsideLength: number;
};

function useExtendRadius() {
  const { setEdges } = useContext(EdgesContext)!;

  const calcNewPosition = useCallback(
    ({ node, insideLength, outsideLength }: Props) => {
      const { position, distence, parentNode, angle: defaultAngle } = node;
      let extendLength = 0;
      if (insideLength && outsideLength) {
        extendLength = 1.1 * distence;
      } else if (!insideLength && !outsideLength) {
        extendLength = 0;
      } else {
        extendLength = 0.5 * distence;
      }

      const angle = parentNode
        ? Math.PI * 1.5 +
          Math.atan2(
            position.y - parentNode.position.y,
            position.x - parentNode.position.x
          )
        : defaultAngle;

      const x =
        position.x +
        (!node.isExplore ? 1 : -1) * -extendLength * Math.sin(angle);
      const y =
        position.y +
        (!node.isExplore ? 1 : -1) * extendLength * Math.cos(angle);

      node.position.x = x;
      node.position.y = y;

      setEdges((edges) =>
        edges.map((edge) => {
          if (edge.fromId === node.id) {
            return {
              ...edge,
              fromNode: {
                ...node,
                position: { x, y },
              },
            };
          } else if (edge.toId === node.id) {
            return {
              ...edge,
              toNode: {
                ...node,
                position: { x, y },
              },
            };
          } else {
            return edge;
          }
        })
      );
    },
    [setEdges]
  );

  return { calcNewPosition };
}

export default useExtendRadius;
