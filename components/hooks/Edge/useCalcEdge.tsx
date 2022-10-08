/*
 * @Author: tohsaka888
 * @Date: 2022-10-08 11:25:58
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-08 13:19:07
 * @Description: 计算Basel弯曲方向
 */

import React, { useCallback } from "react";

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
  return { calcQuadrant, calcFlag };
}

export default useCalcEdge;
