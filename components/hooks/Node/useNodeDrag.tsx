/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 15:01:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 15:03:24
 * @Description: node-drag
 */

import React, { useCallback } from "react";
import * as d3 from "d3";

type Props = {
  node: Node.NodeFrontProps;
};

function useNodeDrag({ node }: Props) {
  const nodeDrag = useCallback(() => {
    const nodeContainer = d3.select(`#${node.id}`);
  }, [node]);

  return <div>useNodeDrag</div>;
}

export default useNodeDrag;
