import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { applicantApi } from "../../services/applicant";
import { IDoctorate, IWorkplace } from "../../services/applicant/types";
import { classifierApi } from "../../services/classifier";
import { IAdmission } from "../../services/classifier/types";
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
  workplaceList: IWorkplace[];
  profile: Partial<IUser>;
  currentAdmission: IAdmission | null;
  currentDoctorate: IDoctorate | null;
}

const initialState: IProps = {
  token: getLocalStorage(localStorageNames.token) ?? "",
  role: getLocalStorage(localStorageNames.role) ?? "",
  photo: getLocalStorage(localStorageNames.photo) ?? "",
  workplaceList: [],
  profile: {},
  currentAdmission: null,
  currentDoctorate: null,
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
      })
      .addMatcher(
        applicantApi.endpoints.getWorkplaceList.matchFulfilled,
        (state, { payload }) => {
          state.workplaceList = payload;
        }
      )
      .addMatcher(
        classifierApi.endpoints.getAdmission.matchFulfilled,
        (state, { payload }) => {
          state.currentAdmission = payload
            ? payload?.find((el) => el?.is_visible) ?? null
            : null;
        }
      )
      .addMatcher(
        applicantApi.endpoints.getDoctorate.matchFulfilled,
        (state, { payload }) => {
          state.currentDoctorate = payload[0] || null;
        }
      );
  },
});

export const { login, logout, setPhoto } = userSlice.actions;

export default userSlice.reducer;
