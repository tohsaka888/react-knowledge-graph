/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:56:15
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:59:32
 * @Description: 请填写简介
 */

import React, { createContext } from "react";
import {
  NodeFrontProps,
  RightMenuProps,
  ConfigProps,
} from "../KnowledgeGraph/index";

type ConfigContextProps = {
  config: ConfigProps;
};

export const ConfigContext = createContext<ConfigContextProps | null>(null);

type HoveredNodeContextProps = {
  hoveredNode: NodeFrontProps | null;
  setHoveredNode: React.Dispatch<React.SetStateAction<NodeFrontProps | null>>;
};

export const HoveredNodeContext = createContext<HoveredNodeContextProps | null>(
  null
);

export const RightMenuPropsContext = createContext<RightMenuProps | null>(null);

type MovedNodeContextProps = {
  movedNode: NodeFrontProps | null;
  setMovedNode: React.Dispatch<React.SetStateAction<NodeFrontProps | null>>;
};

export const MovedNodeContext = createContext<MovedNodeContextProps | null>(
  null
);
