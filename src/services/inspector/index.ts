import { baseApi } from "../api";
import { IApplication } from "../applicant/types";
import { IAdmission } from "../classifier/types";
import { ApplicationStatusChoice, ApplicationSubmitAsChoice } from "../types";
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
      }
    >({
      query: ({
        admission_id,
        limit,
        submit_as,
        status,
        from_military,
        q,
        offset,
      }) => ({
        url: "/inspector/application",
        params: {
          admission_id,
          limit,
          submit_as,
          status,
          from_military,
          q,
          offset,
        },
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
  }),
  overrideExisting: false,
});

export const {
  useGetApplicationsQuery,
  useGetApplicationDetailsQuery,
  usePutConclusionMutation,
} = inspectorApi;
