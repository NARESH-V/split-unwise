import { combineReducers, configureStore } from '@reduxjs/toolkit'
import groupReducer from "./reducers/groupReducer.ts";
import userReducer from './reducers/userReducers.ts';

const rootReducer = combineReducers({
    groups: groupReducer,
    user: userReducer
  });

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
