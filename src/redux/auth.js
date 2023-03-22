import { createSlice } from '@reduxjs/toolkit'

export const mainAuthData = createSlice({
  name: 'auth',
  initialState: {
    token: "",
    login: false,
    user_data: {}
  },
  reducers: {
    Login: (init, action) => {
        init.token = action.payload.token;
        init.login = true;
        init.user_data = action.payload.user;
    },
    Logout: (init) => {
      init.token = "";
      init.login = false
    },
    SetUserData: (init, action) => {
      init.user_data = action.payload;
    }
  }
})

export const { Login, Logout, SetUserData } = mainAuthData.actions

export default mainAuthData.reducer