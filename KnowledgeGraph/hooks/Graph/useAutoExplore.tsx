import React, { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "..";
import { ConfigContext } from "../../Controller/ConfigController";
import { initialize, clearAllGraph } from "../../Controller/graphSlice";
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

    exploredPath.forEach((path) => {
      const { node, inside, outside, edges } = path;
      graphConfig.enableAutoExplore &&
        exploreFunc({
          node,
          syncExplore: () => ({
            inside,
            outside,
            edges,
          }),
        });
    });

    return () => {
      dispatch(clearAllGraph(undefined));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphConfig]);
}

export default useAutoExplore;
