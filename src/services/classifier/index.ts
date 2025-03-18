import { baseApi } from "../api";
import { IAdmission, IExampleFile, IMipRegion, IStat } from "./types";
export const classifierApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdmission: build.query<IAdmission[], void>({
      query: () => "/classifier/admission/",
    }),

    getExampleFiles: build.query<IExampleFile[], void>({
      query: () => `/classifier/example-file/`,
    }),

    getMipRegions: build.query<IMipRegion[], void>({
      query: () => "/classifier/mip-region/",
    }),

    getRegionStat: build.query<IStat[], { id?: string }>({
      query: ({ id = "" }) => ({
        url: "/home/stat",
        params: id
          ? {
              mip_region_id: id,
            }
          : {},
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdmissionQuery,
  useLazyGetAdmissionQuery,
  useGetExampleFilesQuery,
  useGetMipRegionsQuery,
  useLazyGetRegionStatQuery,
} = classifierApi;
