import React, { useCallback, useContext } from "react";
import { NodeFrontProps } from "KnowledgeGraph";
import { EdgesContext } from "KnowledgeGraph/context";

type Props = {
  node: NodeFrontProps;
  insideLength: number;
  outsideLength: number;
};

function useExtendRadius() {
  const { setEdges } = useContext(EdgesContext)!;

  const calcNewPosition = useCallback(
    ({ node, insideLength, outsideLength }: Props) => {
      const { position, distence, angle } = node;
      let extendLength = 0;
      if (insideLength && outsideLength) {
        extendLength = 1.1 * distence;
      } else if (!insideLength && !outsideLength) {
        extendLength = 0;
      } else {
        extendLength = 0.5 * distence;
      }

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
              fromNode: node,
            };
          } else if (edge.toId === node.id) {
            return {
              ...edge,
              toNode: node,
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
