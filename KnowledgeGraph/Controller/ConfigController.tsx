import { ConfigProps } from "../typings/Config";
import React, { createContext } from "react";

type Props = {
  graphConfig: ConfigProps;
  children: React.ReactNode;
};

type ConfigContextProps = {
  config: ConfigProps;
};

export const ConfigContext = createContext<ConfigContextProps | null>(null);

function ConfigController({ graphConfig, children }: Props) {
  return (
    <ConfigContext.Provider
      value={{
        config: {
          showHelper: true,
          helperConfig: {
            color: "#cecece",
            size: 24,
          },
          showFilter: true,
          filterConfig: {
            color: "#cecece",
            size: 24,
          },
          showNodeMenu: true,
          enableAutoExplore: true,
          dragRenderOptimization: "react",
          ...graphConfig,
        },
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigController;
