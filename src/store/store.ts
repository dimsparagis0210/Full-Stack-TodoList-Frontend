/**
 * Store
 *
 * This file is the store for the Redux state management.
 */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Type for the root state
export type AppDispatch = typeof store.dispatch; // Type for the dispatch function
