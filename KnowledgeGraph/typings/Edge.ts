/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 16:16:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:06:33
 * @Description: edge type
 */

import { NodeFrontProps } from "./Node";

type EdgeProps = {
  id: string; // 边id
  fromId: string;
  toId: string;
  description: string;
};

type EdgeFrontProps = EdgeProps & {
  type: "straight" | "curve";
  pId: string[];
  fromNode?: NodeFrontProps;
  toNode?: NodeFrontProps;
  visible: boolean;
  needHighlight: boolean;
  isMoving: boolean;
};

export type { EdgeProps, EdgeFrontProps };
