import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../../services/types";
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from "../../utils/storageUtils";

const initialState = {
  token: getLocalStorage(localStorageNames.token) ?? "",
  role: getLocalStorage(localStorageNames.role) ?? "",
  profile: {},
};

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; role: Role }>) => {
      state.token = action.payload.token;
      setLocalStorage(localStorageNames.token, action.payload.token);
      state.role = action.payload.role;
      setLocalStorage(localStorageNames.role, action.payload.role);
    },
    logout: (state) => {
      state.token = "";
      localStorage.removeItem(localStorageNames.token);
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
