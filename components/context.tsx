/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:56:15
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 16:41:33
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
