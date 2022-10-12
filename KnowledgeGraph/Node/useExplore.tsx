import { NodesContext, EdgesContext } from "KnowledgeGraph/context";
import useFormatEdges from "KnowledgeGraph/hooks/Edge/useFormatEdges";
import useExtendRadius from "KnowledgeGraph/hooks/Node/useExtendRadius";
import useNodePosition from "KnowledgeGraph/hooks/Node/useNodePosition";
import { EdgeProps } from "KnowledgeGraph/typings/Edge";
import { NodeFrontProps, NodeProps } from "KnowledgeGraph/typings/Node";
import React, { useCallback, useContext, useState } from "react";

type Props = {
  explore: (id: React.Key) => Promise<{
    inside: NodeProps[];
    outside: NodeProps[];
    edges: EdgeProps[];
  }>;
  node: NodeFrontProps;
  onExploreEnd?: Function;
};

function useExplore({ node, explore, onExploreEnd }: Props) {
  const { calcNodePosition } = useNodePosition();
  const { nodes, setNodes } = useContext(NodesContext)!;
  const { setEdges } = useContext(EdgesContext)!;
  const { calcNewPosition } = useExtendRadius();
  const [loading, setLoading] = useState<boolean>(false);
  const { formatEdges } = useFormatEdges();
  const [childNodeLength, setChildNodeLength] = useState<{
    insideLength: number;
    outsideLength: number;
  }>({ insideLength: 0, outsideLength: 0 });

  const exploreFunc = useCallback(async () => {
    setLoading(true);

    // 判断当前节点是否已探索
    if (!node.isExplore) {
      const { inside, outside, edges } = await explore(node.id);
      setChildNodeLength({
        insideLength: inside.length,
        outsideLength: outside.length,
      });
      // 探索-延长半径 取消探索-缩短半径
      calcNewPosition({
        node,
        insideLength: inside.length,
        outsideLength: outside.length,
      });
      // 判断是否有子节点
      if (node.hasMore) {
        const frontInside = calcNodePosition({
          direction: "inside",
          nodes: inside,
          parentNode: node,
          insideLength: inside.length,
          outsideLength: outside.length,
        });
        const frontOutside = calcNodePosition({
          direction: "outside",
          nodes: outside,
          parentNode: node,
          insideLength: inside.length,
          outsideLength: outside.length,
        });
        const curNodes = [
          ...nodes.map((current) => {
            if (current.id === node.id) {
              return {
                ...current,
                isExplore: true,
              };
            } else {
              return current;
            }
          }),
          ...frontInside,
          ...frontOutside,
        ];
        setNodes(curNodes);
        // 设置边
        formatEdges({ node, curNodes, edges });
      } else {
        onExploreEnd && onExploreEnd();
      }
    } else {
      // 探索-延长半径 取消探索-缩短半径
      calcNewPosition({
        node,
        ...childNodeLength,
      });
      // 过滤掉子节点
      const filteredNodes = nodes.filter(
        (current) => !current.pId.find((id) => id === node.id)
      );
      setNodes(
        filteredNodes.map((filteredNode) => {
          if (filteredNode.id === node.id) {
            return {
              ...filteredNode,
              isExplore: false,
            };
          } else {
            return filteredNode;
          }
        })
      );
      // 过滤边
      setEdges((edges) => {
        return edges.filter(
          (edge) =>
            filteredNodes.find((node) => node.id === edge.fromId) &&
            filteredNodes.find((node) => node.id === edge.toId)
        );
      });
    }
    node.isExplore = !node.isExplore;
    setLoading(false);
  }, [
    calcNewPosition,
    calcNodePosition,
    childNodeLength,
    explore,
    formatEdges,
    node,
    nodes,
    onExploreEnd,
    setEdges,
    setNodes,
  ]);
  return { loading, exploreFunc };
}

export default useExplore;
