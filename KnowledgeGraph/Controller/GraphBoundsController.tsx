import React, {
  createContext,
  Dispatch,
  SetStateAction,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppSelector } from "../hooks";
import { GraphBounds } from "../typings/Graph";

const GraphBoundsContext = createContext<GraphBounds | null>(null);
const DispatchBoundsContext = createContext<Dispatch<
  SetStateAction<GraphBounds>
> | null>(null);

function GraphBoundsController({ children }: { children: React.ReactNode }) {
  const [bounds, setBounds] = useState<GraphBounds>({
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  });
  const { scale, x, y } = useAppSelector((state) => state.canvasConfig);

  useEffect(() => {
    startTransition(() => {
      const canvas = document.getElementById("knowledge-graph-canvas")!;
      const canvasBounds = canvas.getBoundingClientRect();
      setBounds({
        x1: -x / scale,
        x2: (canvasBounds.width - x) / scale,
        y1: -y / scale,
        y2: (canvasBounds.height - y) / scale,
      });
    });
  }, [scale, x, y]);

  return (
    <GraphBoundsContext.Provider value={bounds}>
      <DispatchBoundsContext.Provider value={setBounds}>
        {children}
      </DispatchBoundsContext.Provider>
    </GraphBoundsContext.Provider>
  );
}

export const useGraphBounds = () => {
  const bounds = useContext(GraphBoundsContext)!;
  return bounds;
};

export const useDispatchGraphBounds = () => {
  const dispatchBounds = useContext(DispatchBoundsContext)!;
  return dispatchBounds;
};

export default GraphBoundsController;
