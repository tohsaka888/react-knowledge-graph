import useExtendRadius from "./useExtendRadius";
import useNodePosition from "./useNodePosition";
import { EdgeProps } from "../../typings/Edge";
import { NodeFrontProps, NodeProps } from "../../typings/Node";
import React, { useCallback, useState } from "react";
import { useAppDispatch } from "..";
import {
  graphExplore,
  changeExploreState,
  cancelGraphExplore,
  onMoving,
  onMoveEnd,
} from "../../Controller/graphSlice";

type Props = {
  explore: (id: string) => Promise<{
    inside: NodeProps[];
    outside: NodeProps[];
    edges: EdgeProps[];
  }>;
  node: NodeFrontProps;
  onExploreEnd?: Function;
};

function useExplore({ node, explore, onExploreEnd }: Props) {
  const { calcNodePosition } = useNodePosition();
  const dispatch = useAppDispatch();
  const { extendOffset } = useExtendRadius();
  const [loading, setLoading] = useState<boolean>(false);
  const [childNodeLength, setChildNodeLength] = useState<{
    insideLength: number;
    outsideLength: number;
  }>({ insideLength: 0, outsideLength: 0 });

  const exploreFunc = useCallback(async () => {
    setLoading(true);
    dispatch(onMoving(node));

    // 判断当前节点是否已探索
    if (!node.isExplore) {
      const { inside, outside, edges } = await explore(node.id);
      setChildNodeLength({
        insideLength: inside.length,
        outsideLength: outside.length,
      });
      // 探索-延长半径 取消探索-缩短半径
      const { dx, dy } = extendOffset({
        node,
        insideLength: inside.length,
        outsideLength: outside.length,
      });
      // 判断是否有子节点
      if (node.hasMore) {
        const frontInside = calcNodePosition({
          direction: "inside",
          nodes: inside,
          parentNode: {
            ...node,
            position: {
              x: node.position.x + dx,
              y: node.position.y + dy,
            },
          },
          insideLength: inside.length,
          outsideLength: outside.length,
        });
        const frontOutside = calcNodePosition({
          direction: "outside",
          nodes: outside,
          parentNode: {
            ...node,
            position: {
              x: node.position.x + dx,
              y: node.position.y + dy,
            },
          },
          insideLength: inside.length,
          outsideLength: outside.length,
        });
        dispatch(
          graphExplore({
            inside: frontInside,
            outside: frontOutside,
            node,
            edges,
          })
        );
      } else {
        onExploreEnd && onExploreEnd();
      }
    } else {
      // 探索-延长半径 取消探索-缩短半径
      extendOffset({
        node,
        ...childNodeLength,
      });
      dispatch(cancelGraphExplore(node));
    }
    dispatch(changeExploreState(node));
    window.setTimeout(() => {
      dispatch(onMoveEnd(undefined));
    }, 500);
    setLoading(false);
  }, [
    calcNodePosition,
    childNodeLength,
    dispatch,
    explore,
    extendOffset,
    node,
    onExploreEnd,
  ]);
  return { loading, exploreFunc };
}

export default useExplore;