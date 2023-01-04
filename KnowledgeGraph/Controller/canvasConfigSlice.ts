import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CanvasConfig } from "../typings/Config";

const initialState: CanvasConfig = {
  scale: 1,
  x: 0,
  y: 0,
};

const canvasSlice = createSlice({
  name: "canvasConfig",
  initialState,
  reducers: {
    setCanvasSize(state, action: PayloadAction<"zoom-in" | "zoom-out">) {
      if (action.payload === "zoom-in") {
        state.scale *= 1.1;
      } else {
        state.scale /= 1.1;
      }
    },
    setCanvasOffset(state, action: PayloadAction<{ dx: number; dy: number }>) {
      state.x += action.payload.dx;
      state.y += action.payload.dy;
    },
    resetCanvas(state) {
      state.x = 0;
      state.y = 0;
      state.scale = 1;
    },
    moveCanvasToPosition(
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
  },
});

export const {
  setCanvasSize,
  setCanvasOffset,
  resetCanvas,
  moveCanvasToPosition,
} = canvasSlice.actions;
export default canvasSlice.reducer;
