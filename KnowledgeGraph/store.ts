import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./Controller/graphSlice";
import configReducer from "./Controller/canvasConfigSlice";
import memoGraphReducer from "./Controller/memoGraphSlice";

export const store = configureStore({
  reducer: {
    graph: graphReducer,
    canvasConfig: configReducer,
    memoGraph: memoGraphReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
