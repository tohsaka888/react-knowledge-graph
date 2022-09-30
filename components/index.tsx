/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:28:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 16:42:08
 * @Description: 全局配置
 */

import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { ConfigContext, EdgesContext, NodesContext } from "./context";
import useCanvasDragOrScale from "./hooks/Canvas/useCanvasDragOrScale";

function KnowledgeGraph(graphConfig: Config.ConfigProps) {
  const { canvasDragEvent } = useCanvasDragOrScale();
  const [config, setConfig] = useState<Config.ConfigProps>(graphConfig);
  const [edges, setEdges] = useState<Edge.EdgeFrontProps[]>([]);
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
    canvasDragEvent();
  }, [canvasDragEvent]);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <NodesContext.Provider value={{ nodes, setNodes }}>
        <EdgesContext.Provider value={{ edges, setEdges }}>
          <Canvas />
        </EdgesContext.Provider>
      </NodesContext.Provider>
    </ConfigContext.Provider>
  );
}

export default KnowledgeGraph;
