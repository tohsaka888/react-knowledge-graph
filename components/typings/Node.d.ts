/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 10:14:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 15:55:03
 * @Description: Node Type
 */

declare namespace Node {
  type NodeConfig = {
    fill?: string;
    type?: string;
    nameSize?: number;
    typeSize?: number;
    nameColor?: string;
    typeColor?: string;
    node: Node.NodeFrontProps;
  };

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
    parentNode?: Node.NodeFrontProps;
  };
}
