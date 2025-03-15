import { baseApi } from "../api";
import { IMessage, IStudent, IWorkplace } from "./types";

export const applicantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudentList: build.query<IStudent[], void>({
      query: () => "/applicant/student",
    }),
    getStudentReload: build.query<IMessage, void>({
      query: () => `/applicant/student/reload`,
    }),
    getWorkplaceList: build.query<IWorkplace[], void>({
      query: () => "/applicant/workplace",
    }),
    getWorkplaceReload: build.query<IMessage, void>({
      query: () => `/applicant/workplace/reload`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStudentListQuery,
  useLazyGetStudentReloadQuery,
  useLazyGetWorkplaceReloadQuery,
  useLazyGetWorkplaceListQuery,
} = applicantApi;
