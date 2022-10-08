/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:28:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-08 14:28:24
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

function KnowledgeGraph(graphConfig: Config.ConfigProps) {
  const { canvasDragEvent } = useCanvasDragOrScale();
  const [config, setConfig] = useState<Config.ConfigProps>(graphConfig);
  const [hoveredNode, setHoveredNode] = useState<Node.NodeFrontProps | null>(
    null
  );
  const [edges, setEdges] = useState<Edge.EdgeFrontProps[]>([]);
  const [event, setEvent] = useState<React.MouseEvent<
    SVGSVGElement,
    MouseEvent
  > | null>(null);
  const [nodes, setNodes] = useState<Node.NodeFrontProps[]>([
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

export default KnowledgeGraph;
