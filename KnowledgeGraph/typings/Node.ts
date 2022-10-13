/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 10:14:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 16:14:41
 * @Description: Node Type
 */

import { Key } from "react";

type NodeProps = {
  id: React.Key;
  name: string; // 节点名称
  type: string; // 节点类型
  hasMore: boolean; // 是否有子节点
  direction: "root" | "inside" | "outside";
};

type NodeFrontProps = NodeProps & {
  pId: Key[];
  position: { x: number; y: number };
  isExplore: boolean;
  angle: number;
  distence: number;
  parentNode?: NodeFrontProps;
  visible: boolean;
};

export type { NodeFrontProps, NodeProps };
