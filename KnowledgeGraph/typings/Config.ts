/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:57:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 16:23:46
 * @Description: config type
 */

import { CSSProperties, HTMLAttributes } from "react";
import { EdgeProps } from "./Edge";
import { NodeFrontProps, NodeProps } from "./Node";

type EdgeConfig = {
  stroke?: string;
  strokeWidth?: number;
  descriptionColor?: string;
  descriptionSize?: number;
  hoveredColor?: string;
};

type NodeConfig = {
  fill?: string;
  radius?: number;
  nameSize?: number;
  typeSize?: number;
  nameColor?: string;
  typeColor?: string;
  hoverStyle?: CSSProperties;
};

type TypeConfig = {
  [type: string]: NodeConfig;
};

type ExploreFunc = (
  id: string,
  node: NodeProps
) => Promise<{
  inside: NodeProps[];
  outside: NodeProps[];
  edges: EdgeProps[];
}>;

type ConfigProps = {
  basicDistence: number; // 基础半径
  explore: ExploreFunc;
  onExploreEnd?: () => void;
  node: NodeProps;
  position: { x: number; y: number };
  typeConfig?: TypeConfig;
  edgeConfig?: EdgeConfig;
  width: number | string;
  height: number | string;
  showHelper?: boolean;
  helperConfig?: {
    color?: string;
    size?: number;
  };
  showNodeMenu?: boolean;
  onClickInfo?: (node: NodeFrontProps) => void;
  onClickAddon?: (node: NodeFrontProps) => void;
  showFilter?: boolean;
  enableAutoExplore?: boolean;
  filterConfig?: {
    color?: string;
    size?: number;
  };
  onClickFilterType?: (
    typeNodes: NodeFrontProps[],
    unShowNodesAndEdges: (node: NodeFrontProps, visible: boolean) => void
  ) => void;
} & HTMLAttributes<HTMLDivElement>;

type CanvasConfig = {
  x: number;
  y: number;
  scale: number;
};

export type {
  EdgeConfig,
  ConfigProps,
  NodeConfig,
  TypeConfig,
  CanvasConfig,
  ExploreFunc,
};
