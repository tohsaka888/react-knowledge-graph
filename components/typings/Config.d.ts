/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:57:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 16:31:45
 * @Description: config type
 */

declare namespace Config {
  type NodeConfig = {
    fill?: string; // 节点颜色
    nameColor?: string; // 节点name颜色
    typeColor?: string; // 节点类型颜色
    nameSize?: number; // 节点名称文字大小
    typeSize?: number; // 节点类型文字大小
    hoveredColor?: string;
  };

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
      inside: Node.NodeProps[];
      outside: Node.NodeProps[];
      edges: Edge.EdgeProps[];
    }>;
    node: Node.NodeProps;
    position: { x: number; y: number };
    nodeConfig?: NodeConfig;
    edgeConfig?: EdgeConfig;
  };
}
