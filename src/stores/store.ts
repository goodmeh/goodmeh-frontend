import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import placesReducer from "./places";

export const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: placesReducer,
    preloadedState,
  });
};
export const store = setupStore();

export type AppStore = typeof store;
export type RootState = ReturnType<typeof placesReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
