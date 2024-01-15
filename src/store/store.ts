import { combineReducers, configureStore } from '@reduxjs/toolkit'
import groupReducer from "./reducers/groupReducer.ts";

const rootReducer = combineReducers({
    groups: groupReducer
  });

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
