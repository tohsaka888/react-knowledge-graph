/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 16:16:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:06:33
 * @Description: edge type
 */

import { NodeFrontProps } from "./Node";

type EdgeProps = {
  id: React.Key; // 边id
  fromId: React.Key;
  toId: React.Key;
  description: string;
};

type EdgeFrontProps = EdgeProps & {
  type: "straight" | "curve";
  pId: React.Key[];
  fromNode?: NodeFrontProps;
  toNode?: NodeFrontProps;
  visible: boolean;
};

export type { EdgeProps, EdgeFrontProps };
