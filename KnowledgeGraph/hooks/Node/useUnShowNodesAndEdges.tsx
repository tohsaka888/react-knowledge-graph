import React, { useCallback } from "react";
import { useAppDispatch } from "..";
import { cancelGraphExplore } from "../../Controller/graphSlice";
import { NodeFrontProps } from "../../typings/Node";

function useUnShowNodesAndEdges() {
  const dispatch = useAppDispatch();
  const unShowNodesAndEdges = useCallback(
    ({ node }: { node: NodeFrontProps }) => {
      dispatch(cancelGraphExplore(node));
    },
    [dispatch]
  );

  return { unShowNodesAndEdges };
}

export default useUnShowNodesAndEdges;
