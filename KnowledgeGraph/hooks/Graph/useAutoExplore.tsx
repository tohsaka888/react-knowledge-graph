import React, { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { resetCanvas } from "../../Controller/canvasConfigSlice";
import { ConfigContext } from "../../Controller/ConfigController";
import { initialize, clearAllGraph } from "../../Controller/graphSlice";
import { clearMemo } from "../../Controller/memoGraphSlice";
import useExplore from "../Node/useExplore";

function useAutoExplore() {
  const exploredPath = useAppSelector((state) => state.memoGraph);
  const { config: graphConfig } = useContext(ConfigContext)!;
  const dispatch = useAppDispatch();
  const { exploreFunc } = useExplore();
  useEffect(() => {
    dispatch(
      initialize({
        node: graphConfig.node,
        position: graphConfig.position,
      })
    );

    const shouldAutoExplore = exploredPath.length
      ? exploredPath[0].node.id === graphConfig.node.id
      : false;

    dispatch(clearMemo(shouldAutoExplore));

    if (!shouldAutoExplore) {
      dispatch(resetCanvas());
    }

    shouldAutoExplore &&
      graphConfig.enableAutoExplore &&
      exploredPath.forEach((path) => {
        const { node, inside, outside, edges } = path;
        if (node.hasMore) {
          exploreFunc({
            node,
            syncExplore: () => ({
              inside,
              outside,
              edges,
            }),
          });
        }
      });

    return () => {
      dispatch(clearAllGraph(undefined));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphConfig]);
}

export default useAutoExplore;
