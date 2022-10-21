import { ConfigContext } from "../context";
import { ConfigProps } from "../typings/Config";
import React from "react";

type Props = {
  graphConfig: ConfigProps;
  children: React.ReactNode;
};

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
          ...graphConfig,
        },
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigController;
