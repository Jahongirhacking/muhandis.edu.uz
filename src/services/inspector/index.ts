import { baseApi } from "../api";
import { IApplication } from "../applicant/types";
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
  }),
  overrideExisting: false,
});

export const { useGetApplicationsQuery, useGetApplicationDetailsQuery } =
  inspectorApi;
