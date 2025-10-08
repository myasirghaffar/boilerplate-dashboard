import { API_END_POINTS } from "./ApiEndpoints";
import { SplitApiSettings } from "./SplitApiSetting";

export const api = SplitApiSettings.injectEndpoints({
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    /////////////////////////////<===MUTATIONS===>//////////////////////////////
    forgetPassword: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.forgetPassword,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data }) => ({
        url: API_END_POINTS.resetPassword,
        method: "POST",
        body: data,
      }),
    }),

    updateUserProfile: builder.mutation({
      query: ({ data }) => ({
        url: `${API_END_POINTS.updateUserProfile}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'UpdateUserList', id: 'user' }],
    }),


    /////////////////////////////<===QUERIES===>////////////////////////////////

    getUserProfile: builder.query({
      query: () => {
        return {
          url: `${API_END_POINTS.getUserProfile}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "UpdateUserList", id: "user" }],
    }),

  }),

  overrideExisting: true,
});

export const {
  /////////////////////////////<===MUTATIONS===>//////////////////////////////
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserProfileMutation,

  /////////////////////////////<===QUERIES===>////////////////////////////////
  useGetUserProfileQuery,
} = api;

