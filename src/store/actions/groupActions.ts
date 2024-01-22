import { Group } from "../../common/models";
import { createAction } from '@reduxjs/toolkit';

export const SET_GROUP_LIST = 'SET_GROUP_LIST';
export const ADD_GROUP = 'ADD_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';
export const SET_CURRENT_GROUP = 'SET_CURRENT_GROUP';

export const setGroupList = createAction(SET_GROUP_LIST, (groups: Group[]) => ({
  payload: groups,
}));

export const addGroup = createAction(ADD_GROUP, (group: Group) => ({
  payload: group,
}));

export const removeGroup = createAction(REMOVE_GROUP, (groupId: number) => ({
  payload: groupId,
}));

export const setCurrentGroup = createAction(SET_CURRENT_GROUP, (group: Group | null) => ({
  payload: group,
}));

export type SetGroupListAction = ReturnType<typeof setGroupList>;
export type AddGroupAction = ReturnType<typeof addGroup>;
export type RemoveGroupAction = ReturnType<typeof removeGroup>;
export type SetCurrentGroup = ReturnType<typeof setCurrentGroup>;

export type GroupAction = SetGroupListAction | AddGroupAction | RemoveGroupAction | SetCurrentGroup;
