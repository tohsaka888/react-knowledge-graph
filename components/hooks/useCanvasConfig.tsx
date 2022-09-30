/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:23:17
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 09:27:07
 * @Description: 获取画布相关配置
 */

import React, { useRef } from "react";

function useCanvasConfig() {
  const canvasConfigRef = useRef<Canvas.ConfigProps>({
    scale: 1,
    dx: 0,
    dy: 0,
  });

  return { canvasConfig: canvasConfigRef.current };
}

export default useCanvasConfig;
