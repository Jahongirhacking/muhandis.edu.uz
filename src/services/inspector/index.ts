import { baseApi } from "../api";
import { IApplication } from "../applicant/types";
import { IAdmission } from "../classifier/types";
import { ApplicationStatusChoice, ApplicationSubmitAsChoice } from "../types";
import { IUser } from "../user/types";
import { ITableProps } from "./types";

export const inspectorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getApplications: build.query<
      ITableProps<IApplication>,
      {
        admission_id: number;
        limit?: number;
        submit_as?: ApplicationSubmitAsChoice;
        status?: ApplicationStatusChoice;
        from_military?: boolean;
        q?: string;
        offset?: number;
        has_grade?: boolean;
      }
    >({
      query: (params) => ({
        url: "/inspector/application",
        params,
      }),
      providesTags: ["GlobalApplications"],
    }),

    getApplicationDetails: build.query<
      IApplication,
      {
        id: IApplication["id"];
        admission_id: number;
      }
    >({
      query: ({ id, admission_id }) => ({
        url: `/inspector/application/${id}`,
        params: {
          admission_id,
        },
      }),
      providesTags: ["ApplicationDetails"],
    }),

    putConclusion: build.mutation<
      Pick<IApplication, "id" | "status"> | { expert_conclusion: object },
      {
        id: IApplication["id"];
        expert_conclusion: object;
        admission_id: IAdmission["id"];
      }
    >({
      query: ({ id, expert_conclusion, admission_id }) => ({
        url: `/inspector/application/${id}/conclusion/`,
        params: {
          admission_id,
        },
        body: {
          expert_conclusion,
        },
        method: "PUT",
      }),
    }),

    rejectApplication: build.mutation<
      { detail: string },
      {
        id: IApplication["id"];
        rejected_reason: IApplication["rejected_reason"];
        admission_id: IAdmission["id"];
      }
    >({
      query: ({ id, rejected_reason, admission_id }) => ({
        url: `/inspector/application/${id}/reject/`,
        params: {
          admission_id,
        },
        body: {
          rejected_reason,
        },
        method: "PUT",
      }),
      invalidatesTags: ["GlobalApplications", "ApplicationDetails"],
    }),

    passApplication: build.mutation<
      { detail: string },
      {
        id: IApplication["id"];
        admission_id: IAdmission["id"];
      }
    >({
      query: ({ id, admission_id }) => ({
        url: `/inspector/application/${id}/pass/`,
        params: {
          admission_id,
        },
        method: "GET",
      }),
      invalidatesTags: ["GlobalApplications", "ApplicationDetails"],
    }),

    getUserInfo: build.query<
      IUser,
      { id: IUser["id"]; admission_id: IAdmission["id"] }
    >({
      query: ({ id, admission_id }) => ({
        url: `/inspector/user/${id}`,
        params: {
          admission_id,
        },
      }),
    }),

    evaluateApplication: build.mutation<
      void,
      {
        id: IApplication["id"];
        admission_id: IAdmission["id"];
        completeness_grade: number;
        conceptual_grade: number;
        relevance_grade: number;
        funds_calculated_grade: number;
        effectiveness_grade: number;
        competitiveness_grade: number;
      }
    >({
      query: ({ id, admission_id, ...body }) => ({
        url: `/inspector/application/${id}/evaluate/`,
        params: {
          admission_id,
        },
        body,
        method: "POST",
      }),
      invalidatesTags: ["GlobalApplications", "ApplicationDetails"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetApplicationsQuery,
  useGetApplicationDetailsQuery,
  usePutConclusionMutation,
  useRejectApplicationMutation,
  usePassApplicationMutation,
  useGetUserInfoQuery,
  useEvaluateApplicationMutation,
} = inspectorApi;
