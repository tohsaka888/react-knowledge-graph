import React from "react";
import { useAppSelector } from "../index";

function useNodes() {
  const nodes = useAppSelector((state) => state.graph.nodes);
  return { nodes };
}

export default useNodes;
