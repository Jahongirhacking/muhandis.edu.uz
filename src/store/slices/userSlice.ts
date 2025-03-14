import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../../services/types";
import { userApi } from "../../services/user";
import { IUser } from "../../services/user/types";
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from "../../utils/storageUtils";

interface IProps {
  token: string;
  role: Role;
  profile: Partial<IUser>;
}

const initialState: IProps = {
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
      localStorage.removeItem(localStorageNames.role);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.getMe.matchFulfilled,
        (state, { payload }) => {
          state.profile = payload;
        }
      )
      .addMatcher(userApi.endpoints.getMe.matchRejected, (state) => {
        userSlice.caseReducers.logout(state);
      });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
