/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:56:15
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:59:32
 * @Description: 请填写简介
 */

import React, { createContext } from "react";
import { NodeFrontProps, EdgeFrontProps, RightMenuProps, ConfigProps } from "KnowledgeGraph";

type ConfigContextProps = {
  config: ConfigProps;
  setConfig: React.Dispatch<React.SetStateAction<ConfigProps>>;
};

export const ConfigContext = createContext<ConfigContextProps | null>(null);

type NodesContextProps = {
  nodes: NodeFrontProps[];
  setNodes: React.Dispatch<React.SetStateAction<NodeFrontProps[]>>;
};

export const NodesContext = createContext<NodesContextProps | null>(null);

type EdgesContextProps = {
  edges: EdgeFrontProps[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeFrontProps[]>>;
};

export const EdgesContext = createContext<EdgesContextProps | null>(null);

type HoveredNodeContextProps = {
  hoveredNode: NodeFrontProps | null;
  setHoveredNode: React.Dispatch<
    React.SetStateAction<NodeFrontProps | null>
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

export const RightMenuPropsContext =
  createContext<RightMenuProps | null>(null);