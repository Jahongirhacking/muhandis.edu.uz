import { baseApi } from "../api";
import { IUser } from "../user/types";
import {
  IApplication,
  IBasicApplication,
  IMessage,
  IStudent,
  IWorkplace,
} from "./types";

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

    getApplicationList: build.query<IApplication[], void>({
      query: () => `/applicant/application/`,
      providesTags: ["Applications"],
    }),

    createApplication: build.mutation<
      Omit<IBasicApplication, "id">,
      IBasicApplication
    >({
      query: (body) => ({
        url: `/applicant/application/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Applications"],
    }),

    editApplication: build.mutation<IApplication, Partial<IApplication>>({
      query: ({ id, ...body }) => ({
        url: `/applicant/application/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Applications"],
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
  useGetApplicationListQuery,
  useCreateApplicationMutation,
  useEditApplicationMutation,
} = applicantApi;
