import { ConfigContext } from "KnowledgeGraph/context";
import { ConfigProps } from "KnowledgeGraph/typings/Config";
import React, { useState } from "react";

type Props = {
  graphConfig: ConfigProps;
  children: React.ReactNode;
};

function ConfigContextController({ graphConfig, children }: Props) {
  const [config, setConfig] = useState<ConfigProps>(graphConfig);
  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export default ConfigContextController;
