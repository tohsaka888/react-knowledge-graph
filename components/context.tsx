/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:56:15
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-08 11:45:36
 * @Description: 请填写简介
 */

import React, { createContext } from "react";

type ConfigContextProps = {
  config: Config.ConfigProps;
  setConfig: React.Dispatch<React.SetStateAction<Config.ConfigProps>>;
};

export const ConfigContext = createContext<ConfigContextProps | null>(null);

type NodesContextProps = {
  nodes: Node.NodeFrontProps[];
  setNodes: React.Dispatch<React.SetStateAction<Node.NodeFrontProps[]>>;
};

export const NodesContext = createContext<NodesContextProps | null>(null);

type EdgesContextProps = {
  edges: Edge.EdgeFrontProps[];
  setEdges: React.Dispatch<React.SetStateAction<Edge.EdgeFrontProps[]>>;
};

export const EdgesContext = createContext<EdgesContextProps | null>(null);

type HoveredNodeContextProps = {
  hoveredNode: Node.NodeFrontProps | null;
  setHoveredNode: React.Dispatch<
    React.SetStateAction<Node.NodeFrontProps | null>
  >;
};

export const HoveredNodeContext = createContext<HoveredNodeContextProps | null>(
  null
);

// type EdgeMenuContextProps = {
//   isShow: boolean;
//   setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
//   isHovered: boolean;
//   setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export const EdgeMenuContext = createContext<EdgeMenuContextProps | null>(null);
