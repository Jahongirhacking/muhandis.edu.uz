import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, localStorageNames } from "../../utils/storageUtils";

const initialState = {
  token: getLocalStorage(localStorageNames.token) ?? "",
};

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    login: () => {},
    logout: () => {},
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
