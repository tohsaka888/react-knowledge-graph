import { EdgesContext, NodesContext } from "components/context";
import React, { useCallback, useContext } from "react";

type Props = {
  curNodes: Node.NodeFrontProps[];
  edges: Edge.EdgeProps[];
  node: Node.NodeFrontProps;
};

function useFormatEdges() {
  const { setEdges } = useContext(EdgesContext)!;
  const { nodes } = useContext(NodesContext)!;
  const formatEdges = useCallback(
    ({ curNodes, edges, node }: Props) => {
      setEdges((preEdges) => [
        ...preEdges,
        ...edges
          .map((edge) => {
            const fromNode = curNodes.find((node) => node.id === edge.fromId);
            const toNode = curNodes.find((node) => node.id === edge.toId);
            return {
              ...edge,
              type:
                (node.id === edge.fromId &&
                  !nodes.find((n) => n.id === edge.toId && n.id !== node.id)) ||
                (node.id === edge.toId &&
                  !nodes.find((n) => n.id === edge.fromId && n.id !== node.id))
                  ? ("straight" as "straight")
                  : ("curve" as "curve"),
              pId: [...(fromNode?.pId || []), ...(toNode?.pId || [])],
              fromNode,
              toNode,
            };
          })
          .filter(
            (edge) =>
              !(edge.fromId === node.id && edge.toId === node.parentNode?.id) &&
              !(edge.toId === node.id && edge.fromId === node.parentNode?.id)
          ),
      ]);
    },
    [nodes, setEdges]
  );

  return { formatEdges };
}

export default useFormatEdges;
