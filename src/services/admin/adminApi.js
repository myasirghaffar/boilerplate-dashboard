import { API_END_POINTS } from "../ApiEndpoints";
import { SplitApiSettings } from "../SplitApiSetting";

export const adminApi = SplitApiSettings.injectEndpoints({
  reducerPath: "adminApi",
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getAdminDashboardStats: builder.query({
      query: (params) => ({
        url: API_END_POINTS.getAdminDashboardStats,
        method: "GET",
        params: params && Object.keys(params).length > 0 ? params : undefined,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetAdminDashboardStatsQuery } = adminApi;
