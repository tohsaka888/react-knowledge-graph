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
import RightMenuController from "./Controller/RightMenuController";
import { store } from "./store";
import { ConfigProps } from "./typings/Config";

function Graph(graphConfig: ConfigProps) {
  return (
    <Provider store={store}>
      <ConfigController graphConfig={graphConfig}>
        <RightMenuController>
          <Canvas {...graphConfig} />
        </RightMenuController>
      </ConfigController>
    </Provider>
  );
}

export default Graph;
