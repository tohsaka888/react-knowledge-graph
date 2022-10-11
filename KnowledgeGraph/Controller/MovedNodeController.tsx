import { MovedNodeContext } from "KnowledgeGraph/context";
import { NodeFrontProps } from "KnowledgeGraph/typings/Node";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

function MovedNodeController({ children }: Props) {
  const [movedNode, setMovedNode] = useState<NodeFrontProps | null>(null);
  return (
    <MovedNodeContext.Provider value={{ movedNode, setMovedNode }}>
      {children}
    </MovedNodeContext.Provider>
  );
}

export default MovedNodeController;
