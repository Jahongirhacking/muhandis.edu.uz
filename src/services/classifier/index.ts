import { baseApi } from "../api";
import { IAdmission } from "./types";
export const classifierApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdmission: build.query<IAdmission[], void>({
      query: () => "/classifier/admission/",
    }),
  }),
  overrideExisting: false,
});

export const { useGetAdmissionQuery, useLazyGetAdmissionQuery } = classifierApi;
