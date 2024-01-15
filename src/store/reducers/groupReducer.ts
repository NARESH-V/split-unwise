import { createReducer } from '@reduxjs/toolkit';
import { setGroupList, addGroup, removeGroup, SetGroupListAction, AddGroupAction, RemoveGroupAction } from '../actions/groupActions.ts';
import { Group } from '../../common/models';

interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
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
    });
});

export default groupReducer;
