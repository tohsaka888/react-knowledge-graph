/*
 * @Author: tohsaka888
 * @Date: 2022-10-08 11:25:58
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-08 16:53:11
 * @Description: 计算Basel弯曲方向
 */

import React, { useCallback, useMemo } from "react";

function useCalcEdge() {
  const calcQuadrant: Utils.CalcQuadrantFunc = ({ node, parentNode }) => {
    // 为入边-二三象限
    if (node.position.x - parentNode.position.x < 0) {
      // 第二象限
      if (node.position.y - parentNode.position.y < 0) {
        return "第二象限";
      }
      // 第三象限
      else {
        return "第三象限";
      }
    }
    // 为出边-一四象限
    else {
      if (node.position.y - parentNode.position.y < 0) {
        return "第一象限";
      } else {
        return "第四象限";
      }
    }
  };

  const calcFlag: Utils.CalcFlagFunc = useCallback(
    ({ fromNode, toNode, parentNode }) => {
      const fromNodePosition = calcQuadrant({ node: fromNode, parentNode });
      const toNodePosition = calcQuadrant({ node: toNode, parentNode });

      if (fromNodePosition === "第一象限") {
        if (toNodePosition === "第一象限") return 1;
        else if (toNodePosition === "第二象限") return 1;
        else if (toNodePosition === "第三象限") return 1;
        else return -1;
      } else if (fromNodePosition === "第二象限") {
        if (toNodePosition === "第一象限") return -1;
        else if (toNodePosition === "第二象限") return -1;
        else if (toNodePosition === "第三象限") return -1;
        else return -1;
      } else if (fromNodePosition === "第三象限") {
        if (toNodePosition === "第一象限") return 1;
        else if (toNodePosition === "第二象限") return -1;
        else if (toNodePosition === "第三象限") return 1;
        else return 1;
      } else {
        if (toNodePosition === "第一象限") return -1;
        else if (toNodePosition === "第二象限") return -1;
        else if (toNodePosition === "第三象限") return 1;
        else return 1;
      }
    },
    []
  );

  const calcD = useCallback(
    ({ fromNode, toNode, type }: Edge.EdgeFrontProps) => {
      const fromX = fromNode?.position.x as number;
      const fromY = fromNode?.position.y as number;
      const toX = toNode?.position.x as number;
      const toY = toNode?.position.y as number;

      if (type === "straight") {
        return `M ${fromX} ${fromY}, L ${toX} ${toY}`;
      } else {
        const flag =
          fromNode && toNode && fromNode.parentNode
            ? calcFlag({
                fromNode: fromNode!,
                toNode: toNode!,
                parentNode: fromNode?.parentNode!,
              })
            : 1;
        // 中间点
        const angle = Math.PI / 2 - Math.atan2(fromY - toY, toX - fromX);
        const dx = flag * Math.cos(angle) * ((toX - fromX) / 2);
        const dy = flag * Math.sin(angle) * ((toX - fromX) / 2 + 10);
        const middlePoint = {
          x: (fromX + toX + dx) / 2 + dx,
          y: (fromY + toY) / 2 + dy,
        };
        return `M ${fromX} ${fromY}, Q ${middlePoint.x} ${middlePoint.y}, ${toX} ${toY}`;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [calcFlag]
  );
  return { calcQuadrant, calcFlag, calcD };
}

export default useCalcEdge;
