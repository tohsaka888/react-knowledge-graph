import { ConfigContext } from "../context";
import { ConfigProps } from "../typings/Config";
import React from "react";

type Props = {
  graphConfig: ConfigProps;
  children: React.ReactNode;
};

function ConfigController({ graphConfig, children }: Props) {
  return (
    <ConfigContext.Provider value={{ config: graphConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigController;
