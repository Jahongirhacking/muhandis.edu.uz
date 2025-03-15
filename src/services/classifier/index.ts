import { baseApi } from "../api";
import { IAdmission, IExampleFile } from "./types";
export const classifierApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdmission: build.query<IAdmission[], void>({
      query: () => "/classifier/admission/",
    }),
    getExampleFiles: build.query<IExampleFile[], void>({
      query: () => `/classifier/example-file/`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdmissionQuery,
  useLazyGetAdmissionQuery,
  useGetExampleFilesQuery,
} = classifierApi;
