/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:13:29
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 15:01:26
 * @Description: 拖动画布
 */

import * as d3 from "d3";
import { useCallback } from "react";
import { NodeFrontProps } from "KnowledgeGraph";

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
    d3.select("#graph-drag")
      .transition()
      .duration(500)
      .attr("transform", `translate(${canvasConfig.dx}, ${canvasConfig.dy})`);
    d3.select("#graph-scale")
      .transition()
      .duration(500)
      .attr("transform", `scale(${canvasConfig.scale})`);
  }, []);

  const moveNodeToCenter = useCallback((node: NodeFrontProps) => {
    // 恢复缩放
    canvasConfig.scale = 1;
    d3.select("#graph-scale")
      .transition()
      .duration(500)
      .attr("transform", `scale(${canvasConfig.scale})`);

    // 移动
    const canvas = d3.select("#knowledge-graph-canvas").node() as SVGSVGElement;
    canvasConfig.dx = canvas.clientWidth / 2 - node.position.x;
    canvasConfig.dy = canvas.clientHeight / 2 - node.position.y;
    canvasConfig.scale = 1;
    d3.select("#graph-drag")
      .transition()
      .duration(500)
      .attr("transform", `translate(${canvasConfig.dx}, ${canvasConfig.dy})`);
  }, []);

  return { canvasDragEvent, resetCanvas, moveNodeToCenter };
};

export default useCanvasDragOrScale;
