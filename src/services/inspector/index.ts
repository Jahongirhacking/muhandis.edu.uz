import { baseApi } from "../api";
import { IApplication } from "../applicant/types";
import { ITableProps } from "./types";

export const inspectorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getApplications: build.query<
      ITableProps<IApplication>,
      { admission_id: number }
    >({
      query: ({ admission_id }) => ({
        url: "/inspector/application",
        params: {
          admission_id,
        },
      }),
      providesTags: ["GlobalApplications"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetApplicationsQuery } = inspectorApi;
