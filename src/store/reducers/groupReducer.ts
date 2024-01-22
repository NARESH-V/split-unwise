import { createReducer } from '@reduxjs/toolkit';
import { setGroupList, addGroup, removeGroup, SetGroupListAction, AddGroupAction, RemoveGroupAction, setCurrentGroup, SetCurrentGroup } from '../actions/groupActions.ts';
import { Group } from '../../common/models';

interface GroupState {
  groups: Group[];
  currentGroup: Group | null;
}

const initialState: GroupState = {
  groups: [],
  currentGroup: null
};

const groupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGroupList, (state, action: SetGroupListAction) => {
      return {
        ...state,
        groups: action.payload,
      };
    })
    .addCase(addGroup, (state, action: AddGroupAction) => {
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    })
    .addCase(removeGroup, (state, action: RemoveGroupAction) => {
      return {
        ...state,
        groups: state.groups.filter((group) => group.groupId !== action.payload),
      };
    })
    .addCase(setCurrentGroup, (state, action: SetCurrentGroup) => {
      return {
        ...state,
        currentGroup: action.payload,
      };
    });
});

export default groupReducer;
