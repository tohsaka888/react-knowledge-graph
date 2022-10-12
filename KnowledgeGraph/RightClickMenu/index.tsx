/*
 * @Author: tohsaka888
 * @Date: 2022-10-08 13:20:39
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:07:23
 * @Description: 右键菜单
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import {
  CanvasConfigContext,
  NodesContext,
  RightMenuPropsContext,
} from "../context";
import MenuItem from "./MenuItem";

const canvasItems = ["复位画布", "下载当前图谱", "全屏"];
const nodeItems = ["当前实体居中"];

function RightMenuContent() {
  const { nodes } = useContext(NodesContext)!;
  const { canvasConfig, setCanvasConfig } = useContext(CanvasConfigContext)!;
  const { event, setEvent } = useContext(RightMenuPropsContext)!;
  const type = useMemo(() => {
    if (event?.target) {
      const target = event.target as any;
      if (target.className.baseVal.includes("canvas")) {
        return "canvas";
      } else if (target.className.baseVal.includes("node")) {
        return "node";
      } else {
        return "canvas";
      }
    }
  }, [event]);

  const resetCanvas = useCallback(() => {
    setCanvasConfig({
      scale: 1,
      x: 0,
      y: 0,
    });
  }, [setCanvasConfig]);

  const moveNodeToCenter = useCallback(() => {
    const nodeId = (event!.target as HTMLElement).getAttribute("node-id");
    const node = nodes.find((n) => n.id === nodeId)!;
    const canvas = document.getElementById("knowledge-graph-canvas")!;

    setCanvasConfig({
      scale: 1,
      x: canvas.clientWidth / 2 - node.position.x,
      y: canvas.clientHeight / 2 - node.position.y,
    });
  }, [event, nodes, setCanvasConfig]);

  const downloadSVG = useCallback(() => {
    const gElement = document.getElementById("graph-drag")!;
    const width = gElement.getBoundingClientRect().width + 50;
    const height = gElement.getBoundingClientRect().height + 50;
    const left = gElement.getBoundingClientRect().left;
    const top = gElement.getBoundingClientRect().top;

    const graph = document.getElementById("knowledge-graph-canvas")!;
    const clonedGraph = graph.cloneNode(true) as SVGSVGElement;
    clonedGraph.setAttribute("transform", `translate(${-left} ${-top})`);

    let serializer = new XMLSerializer();

    let source =
      '<?xml version="1.0" standalone="no"?>\r\n' +
      serializer.serializeToString(clonedGraph);

    const image = new Image();
    image.src =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

    image.width = width;
    image.height = height;

    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext("2d")!;
    context.fillStyle = "#fff";
    context.fillRect(0, 0, 10000, 10000);

    image.onload = function () {
      context.drawImage(image, 0, 0);
      let a = document.createElement("a");
      a.download = `图谱.png`;
      a.href = canvas.toDataURL(`image/png`);
      a.click();
    };
  }, []);

  return (
    <>
      <motion.div
        id={"right-menu"}
        initial={{
          position: "fixed",
          willChange: "transform",
          top: "0px",
          left: "0px",
          opacity: 0,
          transform: `translate3d(${event!.clientX}px, ${event!.clientY}px, 0)`,
        }}
        animate={{
          opacity: 1,
          transform: `translate3d(${event!.clientX}px, ${event!.clientY}px, 0)`,
        }}
      >
        {type === "canvas" ? (
          <motion.div initial={{ border: "1px solid #dfdfdf" }}>
            {canvasItems.map((item, index) => {
              return (
                <MenuItem
                  index={index}
                  length={canvasItems.length}
                  key={item}
                  onClick={(value) => {
                    if (value === "复位画布") {
                      resetCanvas();
                    }
                    if (value === "全屏" || value === "退出全屏") {
                      if (document.fullscreenElement) {
                        document.exitFullscreen();
                      } else {
                        document.documentElement.requestFullscreen();
                      }
                    }
                    if (value === "下载当前图谱") {
                      downloadSVG();
                    }
                    setEvent(null);
                  }}
                >
                  {item === "全屏"
                    ? !document.fullscreenElement
                      ? "全屏"
                      : "退出全屏"
                    : item}
                </MenuItem>
              );
            })}
          </motion.div>
        ) : (
          <motion.div initial={{ border: "1px solid #dfdfdf" }}>
            {nodeItems.map((item, index) => {
              return (
                <MenuItem
                  key={item}
                  index={index}
                  length={nodeItems.length}
                  onClick={() => {
                    if (item === "当前实体居中") {
                      moveNodeToCenter();
                    }
                    setEvent(null);
                  }}
                >
                  {item}
                </MenuItem>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

function RightClickMenu() {
  const bodyRef = useRef<HTMLElement>(null!);
  const { event, setEvent } = useContext(RightMenuPropsContext)!;

  useEffect(() => {
    bodyRef.current = document.body;

    return () => {
      setEvent(null);
    };
  }, [setEvent]);

  return (
    bodyRef.current &&
    ReactDOM.createPortal(<>{event && <RightMenuContent />}</>, bodyRef.current)
  );
}

export default React.memo(RightClickMenu);
