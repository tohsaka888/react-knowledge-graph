import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NodeFrontProps, NodeProps } from "../typings/Node";
import { EdgeProps } from "../typings/Edge";

type ExploredProps = {
  node: NodeFrontProps;
  inside: NodeProps[];
  outside: NodeProps[];
  edges: EdgeProps[];
};

const initialState: ExploredProps[] = [];

const memoGraphSlice = createSlice({
  name: "memoGraph",
  initialState,
  reducers: {
    addExploredPath(state, action: PayloadAction<ExploredProps>) {
      const { node, inside, outside, edges } = action.payload;
      const isDuplicate = state.some((path) => path.node.id === node.id);
      if (!isDuplicate) {
        state.push({
          node,
          inside,
          outside,
          edges,
        });
      }
    },
    removeExploredPath(state, action: PayloadAction<string>) {
      const currentId = action.payload;
      return state.filter(
        (path) =>
          !path.node.pId.find((pId) => pId === currentId) &&
          path.node.id !== currentId
      );
    },
    clearMemo(state, action: PayloadAction<boolean>) {
      const shouldAutoExplore = action.payload;
      if (!shouldAutoExplore) {
        state.length = 0;
      }
    },
  },
});

export const { addExploredPath, removeExploredPath, clearMemo } =
  memoGraphSlice.actions;
export default memoGraphSlice.reducer;
