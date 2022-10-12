import { ConfigContext, NodesContext } from "../context";
import { NodeFrontProps } from "../../KnowledgeGraph";
import React, { useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

function NodesController({ children }: Props) {
  const { config } = useContext(ConfigContext)!;
  const [nodes, setNodes] = useState<NodeFrontProps[]>([
    {
      ...config.node,
      pId: [],
      position: config.position,
      isExplore: false,
      angle: 0,
      distence: 0,
    },
  ]);
  return (
    <NodesContext.Provider value={{ nodes, setNodes }}>
      {children}
    </NodesContext.Provider>
  );
}

export default NodesController;
