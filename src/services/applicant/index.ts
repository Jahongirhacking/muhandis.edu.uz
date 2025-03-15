import { baseApi } from "../api";
import { IUser } from "../user/types";
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
    getWorkplaceSelect: build.query<
      { detail: string },
      { id: IWorkplace["id"] }
    >({
      query: (body) => `/applicant/workplace/${body?.id}/select/`,
    }),
    updateContact: build.mutation<
      Pick<IUser, "phone_number" | "email">,
      Pick<IUser, "phone_number" | "email" | "id">
    >({
      query: (body) => ({
        url: `/applicant/contact/${body?.id}/`,
        body: {
          phone_number: body?.phone_number,
          email: body?.email,
        },
        method: "PUT",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStudentListQuery,
  useLazyGetStudentReloadQuery,
  useLazyGetWorkplaceReloadQuery,
  useLazyGetWorkplaceListQuery,
  useUpdateContactMutation,
  useLazyGetWorkplaceSelectQuery,
} = applicantApi;
