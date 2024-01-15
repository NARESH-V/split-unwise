import { createAction } from "@reduxjs/toolkit";
import { User } from "../../common/models.ts";

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = createAction(SET_CURRENT_USER, (user: User | null) => ({
  payload: user,
}));


export type SetCurrentUserAction = ReturnType<typeof setCurrentUser>;

export type UserAction = SetCurrentUserAction;