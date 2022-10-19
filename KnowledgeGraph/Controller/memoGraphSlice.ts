import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NodeFrontProps, NodeProps } from "../typings/Node";
import { ConfigProps } from "../typings/Config";
import { EdgeFrontProps, EdgeProps } from "../typings/Edge";

type GraphProps = {
  [id: string]: {
    node: NodeProps;
    inside: NodeProps[];
    outside: NodeProps[];
    edges: EdgeProps[];
  };
};

const initialState: GraphProps[] = [];

const memoGraphSlice = createSlice({
  name: "memoGraph",
  initialState,
  reducers: {
    addExploredPath(state, action: PayloadAction<GraphProps>) {
      state.push(action.payload);
    },
  },
});

export const { addExploredPath } = memoGraphSlice.actions;
export default memoGraphSlice.reducer;
