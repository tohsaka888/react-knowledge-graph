/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:28:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:32:01
 * @Description: 全局配置
 */

import React, { useContext, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import Canvas from "./Canvas";
import { ConfigContext } from "./Controller/ConfigController";
import ConfigController from "./Controller/ConfigController";
import FullScreenController, {
  useFullScreen,
} from "./Controller/FullScreenController";
import RightMenuController from "./Controller/RightMenuController";
import Helper from "./Helper";
import { store } from "./store";
import { ConfigProps } from "./typings/Config";
import GraphBoundsController from "./Controller/GraphBoundsController";
import FilterBar from "./FilterBar";

function GraphContainer({ children }: { children: React.ReactNode }) {
  const { config } = useContext(ConfigContext)!;
  const isFullScreen = useFullScreen();
  const screenRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    screenRef.current.width = window.screen.width;
    screenRef.current.height = window.screen.height;
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: !isFullScreen ? config.width : screenRef.current.width,
        height: !isFullScreen ? config.height : screenRef.current.height,
        overflow: "hidden",
      }}
      id={"knowledge-graph-container"}
    >
      {children}
    </div>
  );
}

function Graph(graphConfig: ConfigProps) {
  return (
    <ConfigController graphConfig={graphConfig}>
      <Provider store={store}>
        <RightMenuController>
          <FullScreenController>
            <GraphBoundsController>
              <GraphContainer>
                <Helper />
                <FilterBar />
                <Canvas />
              </GraphContainer>
            </GraphBoundsController>
          </FullScreenController>
        </RightMenuController>
      </Provider>
    </ConfigController>
  );
}

export default Graph;
