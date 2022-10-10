/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:28:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:32:01
 * @Description: 全局配置
 */

import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import {
  ConfigContext,
  EdgesContext,
  HoveredNodeContext,
  NodesContext,
  RightMenuPropsContext,
} from "./context";
import useCanvasDragOrScale from "./hooks/Canvas/useCanvasDragOrScale";
import { ConfigProps } from "./typings/Config";
import { EdgeFrontProps } from "./typings/Edge";
import { NodeFrontProps } from "./typings/Node";

function Graph(graphConfig: ConfigProps) {
  const { canvasDragEvent } = useCanvasDragOrScale();
  const [config, setConfig] = useState<ConfigProps>(graphConfig);
  const [hoveredNode, setHoveredNode] = useState<NodeFrontProps | null>(null);
  const [edges, setEdges] = useState<EdgeFrontProps[]>([]);
  const [event, setEvent] = useState<React.MouseEvent<
    SVGSVGElement,
    MouseEvent
  > | null>(null);
  const [nodes, setNodes] = useState<NodeFrontProps[]>([
    {
      ...config.node,
      pId: [],
      position: config.position,
      isExplore: false,
      angle: 0,
      distence: 0,
    },
  ]);
  useEffect(() => {
    canvasDragEvent(() => {
      setEvent(null);
    });
  }, [canvasDragEvent]);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <NodesContext.Provider value={{ nodes, setNodes }}>
        <EdgesContext.Provider value={{ edges, setEdges }}>
          <HoveredNodeContext.Provider value={{ hoveredNode, setHoveredNode }}>
            <RightMenuPropsContext.Provider value={{ event, setEvent }}>
              <Canvas />
            </RightMenuPropsContext.Provider>
          </HoveredNodeContext.Provider>
        </EdgesContext.Provider>
      </NodesContext.Provider>
    </ConfigContext.Provider>
  );
}

export default Graph;
