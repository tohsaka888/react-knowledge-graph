import { EdgesContext } from "../context";
import { EdgeFrontProps } from "../../KnowledgeGraph/index";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

function EdgeController({ children }: Props) {
  const [edges, setEdges] = useState<EdgeFrontProps[]>([]);
  return (
    <EdgesContext.Provider value={{ edges, setEdges }}>
      {children}
    </EdgesContext.Provider>
  );
}

export default EdgeController;
