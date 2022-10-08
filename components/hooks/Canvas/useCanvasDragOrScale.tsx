/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:13:29
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-08 15:01:13
 * @Description: 拖动画布
 */

import useCanvasConfig from "components/hooks/useCanvasConfig";
import * as d3 from "d3";
import { useCallback } from "react";

const canvasConfig = {
  scale: 1,
  dx: 0,
  dy: 0,
};

export const useCanvasDragOrScale = () => {
  const canvasDragEvent = useCallback((onDragStart?: Function) => {
    const container = d3.select<SVGSVGElement, unknown>(
      "#knowledge-graph-canvas"
    );
    const dragElement = container.select("#graph-drag");
    const scaleElement = container.select("#graph-scale");
    container.call(
      d3
        .drag<SVGSVGElement, unknown>()
        .on("start", () => {
          onDragStart && onDragStart();
        })
        .on(
          "drag",
          function (event: d3.D3DragEvent<SVGSVGElement, unknown, unknown>) {
            requestAnimationFrame(() => {
              canvasConfig.dx += event.dx;
              canvasConfig.dy += event.dy;
              dragElement.attr(
                "transform",
                `translate(${canvasConfig.dx}, ${canvasConfig.dy})`
              );
            });
          }
        )
    );

    container.on("wheel", function (event: WheelEvent) {
      if (event.deltaY < 0) {
        scaleElement.attr(
          "transform",
          `scale(${(canvasConfig.scale *= 1.05)})`
        );
        scaleElement.style(
          "transform-origin",
          `${event.clientX} ${event.clientY}`
        );
      } else {
        scaleElement.attr(
          "transform",
          `scale(${(canvasConfig.scale *= 0.95)})`
        );
        scaleElement.style(
          "transform-origin",
          `${event.clientX} ${event.clientY}`
        );
      }
    });
  }, []);

  const resetCanvas = useCallback(() => {
    canvasConfig.dx = 0;
    canvasConfig.dy = 0;
    canvasConfig.scale = 1;
    d3.select("#graph-drag").attr(
      "transform",
      `translate(${canvasConfig.dx}, ${canvasConfig.dy})`
    );
    d3.select("#graph-scale").attr("transform", `scale(${canvasConfig.scale})`);
  }, []);

  return { canvasDragEvent, resetCanvas };
};

export default useCanvasDragOrScale;
