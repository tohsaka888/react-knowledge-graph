/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:28:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 09:44:28
 * @Description: 全局配置
 */

import React, { useEffect } from "react";
import Canvas from "./Canvas";
import useCanvasDragOrScale from "./hooks/Canvas/useCanvasDragOrScale";

function KnowledgeGraph() {
  const { canvasDragEvent } = useCanvasDragOrScale();
  useEffect(() => {
    canvasDragEvent();
  }, [canvasDragEvent]);

  return (
    <>
      <Canvas />
    </>
  );
}

export default KnowledgeGraph;
