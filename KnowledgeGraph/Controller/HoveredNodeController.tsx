import { HoveredNodeContext } from "../context";
import { NodeFrontProps } from "KnowledgeGraph";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

function HoveredNodeController({ children }: Props) {
  const [hoveredNode, setHoveredNode] = useState<NodeFrontProps | null>(null);
  return (
    <HoveredNodeContext.Provider value={{ hoveredNode, setHoveredNode }}>
      {children}
    </HoveredNodeContext.Provider>
  );
}

export default HoveredNodeController;
