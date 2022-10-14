import React, { useCallback } from "react";
import { useAppDispatch } from "..";
import { NodeFrontProps } from "../../../KnowledgeGraph";
import { moveNodeAndEdge } from "../../Controller/graphSlice";

type Props = {
  node: NodeFrontProps;
  insideLength: number;
  outsideLength: number;
};

function useExtendRadius() {
  const dispatch = useAppDispatch();

  const extendOffset = useCallback(
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

      const dx = (!node.isExplore ? 1 : -1) * -extendLength * Math.sin(angle);
      const dy = (!node.isExplore ? 1 : -1) * extendLength * Math.cos(angle);

      dispatch(moveNodeAndEdge({ node, dx, dy }));
      return { dx, dy };
    },
    [dispatch]
  );

  return { extendOffset };
}

export default useExtendRadius;
