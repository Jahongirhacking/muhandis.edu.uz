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
  photo: string;
  profile: Partial<IUser>;
}

const initialState: IProps = {
  token: getLocalStorage(localStorageNames.token) ?? "",
  role: getLocalStorage(localStorageNames.role) ?? "",
  photo: getLocalStorage(localStorageNames.photo) ?? "",
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
      localStorage.removeItem(localStorageNames.photo);
    },
    setPhoto: (state, action: PayloadAction<string>) => {
      state.photo = action.payload;
      setLocalStorage(localStorageNames.photo, action.payload);
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

export const { login, logout, setPhoto } = userSlice.actions;

export default userSlice.reducer;
