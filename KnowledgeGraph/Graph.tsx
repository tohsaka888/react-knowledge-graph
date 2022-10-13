/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:28:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:32:01
 * @Description: 全局配置
 */

import React from "react";
import Canvas from "./Canvas";
import CanvasConfigController from "./Controller/CanvasConfigController";
import ConfigController from "./Controller/ConfigController";
import EdgeController from "./Controller/EdgeController";
import HoveredNodeController from "./Controller/HoveredNodeController";
import IsNodeDragController from "./Controller/IsNodeDragController";
import MovedNodeController from "./Controller/MovedNodeController";
import NodesController from "./Controller/NodesController";
import RightMenuController from "./Controller/RightMenuController";
import { ConfigProps } from "./typings/Config";

function Graph(graphConfig: ConfigProps) {
  return (
    <CanvasConfigController>
      <ConfigController graphConfig={graphConfig}>
        <NodesController>
          <EdgeController>
            <HoveredNodeController>
              <RightMenuController>
                <MovedNodeController>
                  <IsNodeDragController>
                    <Canvas />
                  </IsNodeDragController>
                </MovedNodeController>
              </RightMenuController>
            </HoveredNodeController>
          </EdgeController>
        </NodesController>
      </ConfigController>
    </CanvasConfigController>
  );
}

export default Graph;
