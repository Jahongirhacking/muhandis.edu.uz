import { baseApi } from "../api";
import { IMessage, IStudent } from "./types";

export const applicantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudentList: build.query<IStudent[], void>({
      query: () => "/applicant/student",
    }),
    getStudentReload: build.query<IMessage, void>({
      query: () => `/applicant/student/reload`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetStudentListQuery, useGetStudentReloadQuery } =
  applicantApi;
