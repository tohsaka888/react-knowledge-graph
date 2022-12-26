import React, { useCallback } from "react";
import {
  EdgeFrontProps,
  CalcFlagFunc,
  CalcQuadrantFunc,
  NodeFrontProps,
} from "../../../KnowledgeGraph";

function useCalcEdge() {
  function twoPointDistance(fromNode: NodeFrontProps, toNode: NodeFrontProps) {
    let dep = Math.sqrt(
      Math.pow(fromNode.position.x - toNode.position.x, 2) +
        Math.pow(fromNode.position.y - toNode.position.y, 2)
    );
    return dep;
  }

  const calcQuadrant: CalcQuadrantFunc = ({ node, parentNode }) => {
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

  const calcFlag: CalcFlagFunc = useCallback(
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
        if (toNodePosition === "第一象限") return 1;
        else if (toNodePosition === "第二象限") return -1;
        else if (toNodePosition === "第三象限") return -1;
        else return 1;
      }
    },
    []
  );

  const calcD = useCallback(
    ({ fromNode, toNode, type = "straight" }: EdgeFrontProps) => {
      if (!fromNode || !toNode) {
        return;
      }
      const fromX = fromNode?.position.x || 0;
      const fromY = fromNode?.position.y || 0;
      const toX = toNode?.position.x || 0;
      const toY = toNode?.position.y || 0;

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
        const angle = Math.atan2(toY - fromY, toX - fromX);
        const dx =
          flag * Math.sin(angle) * twoPointDistance(fromNode!, toNode!) * 0.6;
        const dy =
          flag * Math.cos(angle) * twoPointDistance(fromNode!, toNode!) * 0.6;
        const middlePoint = {
          x: (fromX + toX) / 2 - dx,
          y: (fromY + toY) / 2 + dy,
        };
        return `M ${fromX} ${fromY}, Q ${middlePoint.x} ${middlePoint.y}, ${toX} ${toY}`;
      }
    },
    [calcFlag]
  );
  return { calcQuadrant, calcFlag, calcD };
}

export default useCalcEdge;
