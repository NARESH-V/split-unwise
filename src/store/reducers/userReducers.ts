import { createReducer } from '@reduxjs/toolkit';
import { User } from '../../common/models';
import { SetCurrentUserAction, setCurrentUser } from '../actions/userActions.ts';

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentUser, (state, action: SetCurrentUserAction) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    })
});

export default userReducer;
