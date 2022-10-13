import { NodeFrontProps } from "../../typings/Node";
import React, { useCallback, useContext, useState } from "react";
import { EdgesContext, NodesContext } from "../../context";

type OnlyShowCurrentNodeProps = {
  node: NodeFrontProps;
};

function useOnlyShowCurrentNode() {
  const { nodes, setNodes } = useContext(NodesContext)!;
  const { setEdges } = useContext(EdgesContext)!;

  const onlyShowCurrentNode = useCallback(
    ({ node }: OnlyShowCurrentNodeProps) => {
      const filteredNodes = nodes.map((n) => {
        if (node.id === n.id || n.pId.find((pId) => pId === node.id)) {
          return {
            ...n,
            visible: true,
          };
        } else {
          return {
            ...n,
            visible: false,
          };
        }
      });
      setNodes(filteredNodes);
      setEdges((edges) =>
        edges.map((edge) => {
          if (
            filteredNodes.find(
              (n) => n.visible === true && n.id === edge.fromId
            ) &&
            filteredNodes.find((n) => n.visible === true && n.id === edge.toId)
          ) {
            return {
              ...edge,
              visible: true,
            };
          } else {
            return {
              ...edge,
              visible: false,
            };
          }
        })
      );
    },
    [nodes, setEdges, setNodes]
  );

  const resetAll = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        visible: true,
      }))
    );

    setEdges((edges) =>
      edges.map((edge) => ({
        ...edge,
        visible: true,
      }))
    );
  }, [setEdges, setNodes]);

  return { onlyShowCurrentNode, resetAll };
}

export default useOnlyShowCurrentNode;
