import { baseApi } from "../api";
import { IApplication } from "../applicant/types";
import { IAdmission } from "../classifier/types";
import { ApplicationStatusChoice, ApplicationSubmitAsChoice } from "../types";
import { IUser } from "../user/types";
import { IExpert, ITableProps } from "./types";

export const ministryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMinistryApplications: build.query<
      ITableProps<IApplication>,
      {
        admission_id: number;
        limit?: number;
        submit_as?: ApplicationSubmitAsChoice;
        status?: ApplicationStatusChoice;
        from_military?: boolean;
        q?: string;
        offset?: number;
        mip_region_id?: number;
        application_type?: IApplication["application_type"];
        expert_id?: IExpert["id"];
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
        mip_region_id,
        application_type,
        expert_id,
      }) => ({
        url: "/ministry/application",
        params: {
          admission_id,
          limit,
          submit_as,
          status,
          from_military,
          q,
          offset,
          mip_region_id,
          application_type,
          expert_id,
        },
      }),
    }),

    getMinistryApplicationDetails: build.query<
      IApplication,
      {
        id: IApplication["id"];
        admission_id: number;
      }
    >({
      query: ({ id, admission_id }) => ({
        url: `/ministry/application/${id}`,
        params: {
          admission_id,
        },
      }),
    }),

    getMinistryUserInfo: build.query<
      IUser,
      { id: IUser["id"]; admission_id: IAdmission["id"] }
    >({
      query: ({ id, admission_id }) => ({
        url: `/ministry/user/${id}`,
        params: {
          admission_id,
        },
      }),
    }),

    getExpert: build.query<IExpert[], void>({
      query: () => "/ministry/expert",
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMinistryApplicationsQuery,
  useGetMinistryApplicationDetailsQuery,
  useGetMinistryUserInfoQuery,
  useGetExpertQuery,
} = ministryApi;
