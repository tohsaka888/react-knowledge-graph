import { CanvasConfigContext } from "../context";
import { CanvasConfig } from "../../KnowledgeGraph/index";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

function CanvasConfigController({ children }: Props) {
  const [canvasConfig, setCanvasConfig] = useState<CanvasConfig>({
    scale: 1,
    x: 0,
    y: 0,
  });
  return (
    <CanvasConfigContext.Provider value={{ canvasConfig, setCanvasConfig }}>
      {children}
    </CanvasConfigContext.Provider>
  );
}

export default CanvasConfigController;
