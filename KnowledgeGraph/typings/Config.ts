/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:57:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:35:42
 * @Description: config type
 */

import { EdgeProps } from "./Edge";
import { NodeConfig, NodeProps } from "./Node";

type EdgeConfig = {
  stroke?: string;
  strokeWidth?: number;
  descriptionColor?: string;
  descriptionSize?: number;
  hoveredColor?: string;
};

type ConfigProps = {
  radius: number;
  basicDistence: number; // 基础半径
  explore: (id: React.Key) => Promise<{
    inside: NodeProps[];
    outside: NodeProps[];
    edges: EdgeProps[];
  }>;
  node: NodeProps;
  position: { x: number; y: number };
  nodeConfig?: NodeConfig;
  edgeConfig?: EdgeConfig;
};

export type { EdgeConfig, ConfigProps };
