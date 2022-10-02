/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:57:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 16:31:45
 * @Description: config type
 */

declare namespace Config {
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
  };
}
