/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 15:01:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 15:03:15
 * @Description: node-drag
 */

import React, { useCallback } from "react";
import * as d3 from "d3";
import { NodeFrontProps } from "KnowledgeGraph";

type Props = {
  node: NodeFrontProps;
};

function useNodeDrag({ node }: Props) {
  const nodeDrag = useCallback(() => {
    const nodeContainer = d3.select(`#${node.id}`);
  }, [node]);

  return <div>useNodeDrag</div>;
}

export default useNodeDrag;
