import { baseApi } from "../api";
import { IUser } from "../user/types";
import {
  IApplication,
  IBasicApplication,
  IDoctorate,
  IMessage,
  IMilitary,
  IMilitaryInfo,
  IStudent,
  IWorkplace,
} from "./types";

export const applicantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudentList: build.query<IStudent[], void>({
      query: () => "/applicant/student",
      providesTags: ["Education"],
    }),

    getStudentReload: build.mutation<IMessage, void>({
      query: () => `/applicant/student/reload`,
      invalidatesTags: ["Education"],
    }),

    getWorkplaceList: build.query<IWorkplace[], void>({
      query: () => "/applicant/workplace",
      providesTags: ["Workplace"],
    }),

    getWorkplaceReload: build.mutation<IMessage, void>({
      query: () => `/applicant/workplace/reload`,
      invalidatesTags: ["Workplace"],
    }),

    getWorkplaceExistsInHemis: build.mutation<
      IMessage,
      { id: IWorkplace["id"] }
    >({
      query: ({ id }) => `/applicant/workplace/${id}/exists-in-hemis/`,
      invalidatesTags: ["Workplace"],
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

    editApplicationWithFormData: build.mutation<
      IApplication,
      { id: IApplication["id"]; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/applicant/application/${id}/`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Applications"],
    }),

    sendApplication: build.mutation<
      { detail: string },
      { id: IApplication["id"] }
    >({
      query: (body) => `/applicant/application/${body.id}/sent/`,
      invalidatesTags: ["Applications"],
    }),

    getMilitary: build.query<IMilitaryInfo[], void>({
      query: () => "/applicant/military",
      providesTags: ["Applications"],
    }),

    postMilitary: build.mutation<IMilitary, FormData>({
      query: (body) => ({
        url: "/applicant/military/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Applications"],
    }),

    patchMilitary: build.mutation<
      IMilitary,
      { id: IMilitary["id"]; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/applicant/military/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Applications"],
    }),

    getDoctorate: build.query<IDoctorate[], void>({
      query: () => "/applicant/doctorate",
      providesTags: ["Doctorate"],
    }),

    reloadDoctorate: build.mutation<IMessage, void>({
      query: () => "/applicant/doctorate/reload",
      invalidatesTags: ["Doctorate"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStudentListQuery,
  useGetStudentReloadMutation,
  useGetWorkplaceReloadMutation,
  useLazyGetWorkplaceListQuery,
  useGetWorkplaceListQuery,
  useUpdateContactMutation,
  useLazyGetWorkplaceSelectQuery,
  useGetWorkplaceExistsInHemisMutation,
  useGetApplicationListQuery,
  useCreateApplicationMutation,
  useEditApplicationMutation,
  useEditApplicationWithFormDataMutation,
  useSendApplicationMutation,
  usePostMilitaryMutation,
  usePatchMilitaryMutation,
  useGetMilitaryQuery,
  useLazyGetDoctorateQuery,
  useReloadDoctorateMutation,
} = applicantApi;
