/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 10:14:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 10:18:13
 * @Description: Node Type
 */

declare namespace Node {
  type NodeConfig = {
    radius?: number;
    fill?: string;
    name?: string;
    type?: string;
    nameSize?: number;
    typeSize?: number;
    nameColor?: string;
    typeColor?: string;
    position?: {
      x: number;
      y: number;
    };
  };
}
