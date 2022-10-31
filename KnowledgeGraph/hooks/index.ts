import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { default as useCalcDistence } from "./Node/useCalcDistence";
export { default as useExplore } from "./Node/useExplore";
export { default as useExtendRadius } from "./Node/useExtendRadius";
export { default as useNodePosition } from "./Node/useNodePosition";

export { default as useCalcEdge } from "./Edge/useCalcEdge";
export { default as useAutoExplore } from "./Graph/useAutoExplore";
export { default as useIsShowText } from "./Graph/useIsShowText";
