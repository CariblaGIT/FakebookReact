import { createSlice } from '@reduxjs/toolkit';

export const userModule = createSlice({
    name: 'user',
    initialState: {
      credentials: {}
    },
    reducers: {
      login: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logout: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }

});

export const { login, logout } = userModule.actions;

export const userData = (state) => state.user;

export default userModule.reducer;