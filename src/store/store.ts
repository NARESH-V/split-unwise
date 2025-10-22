import { combineReducers, configureStore } from '@reduxjs/toolkit'
import groupReducer from "./reducers/groupReducer.ts";
import userReducer from './reducers/userReducers.ts';
import expenseReducer from './reducers/expenseReducer.ts';

const rootReducer = combineReducers({
    groups: groupReducer,
    user: userReducer,
    expenses: expenseReducer
  });

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
