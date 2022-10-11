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
  const { setCanvasConfig } = useContext(CanvasConfigContext)!;
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
                      const nodeId = (
                        event!.target as HTMLElement
                      ).getAttribute("node-id");
                      const node = nodes.find((n) => n.id === nodeId)!;
                      // moveNodeToCenter(node);
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
