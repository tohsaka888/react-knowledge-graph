/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 16:16:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 16:55:15
 * @Description: edge type
 */

declare namespace Edge {
  type EdgeProps = {
    id: React.Key; // 边id
    fromId: React.Key;
    toId: React.Key;
    description: string;
  };

  type EdgeFrontProps = EdgeProps & {
    type: "straight" | "curve";
    pId: React.Key[];
    fromNode?: Node.NodeFrontProps;
    toNode?: Node.NodeFrontProps;
  };
}
