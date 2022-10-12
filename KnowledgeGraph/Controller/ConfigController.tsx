import { ConfigContext } from "../context";
import { ConfigProps } from "../typings/Config";
import React, { useState } from "react";

type Props = {
  graphConfig: ConfigProps;
  children: React.ReactNode;
};

function ConfigController({ graphConfig, children }: Props) {
  const [config, setConfig] = useState<ConfigProps>(graphConfig);
  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigController;
