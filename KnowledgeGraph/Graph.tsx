/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:28:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:32:01
 * @Description: 全局配置
 */

import React from "react";
import { Provider } from "react-redux";
import Canvas from "./Canvas";
import ConfigController from "./Controller/ConfigController";
import HoveredNodeController from "./Controller/HoveredNodeController";
import IsNodeDragController from "./Controller/IsNodeDragController";
import MovedNodeController from "./Controller/MovedNodeController";
import RightMenuController from "./Controller/RightMenuController";
import { store } from "./store";
import { ConfigProps } from "./typings/Config";

function Graph(graphConfig: ConfigProps) {
  return (
    <Provider store={store}>
      <ConfigController graphConfig={graphConfig}>
        <HoveredNodeController>
          <RightMenuController>
            <MovedNodeController>
              <IsNodeDragController>
                <Canvas {...graphConfig} />
              </IsNodeDragController>
            </MovedNodeController>
          </RightMenuController>
        </HoveredNodeController>
      </ConfigController>
    </Provider>
  );
}

export default Graph;
