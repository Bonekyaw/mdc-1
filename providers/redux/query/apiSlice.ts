import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type { FetchArgs } from "@reduxjs/toolkit/query";
import { API_URL } from "@/config";

// import { RootState } from "@/providers/redux/store";
// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query";
// import { tokenReceived, loggedOut } from "./authSlice";

// const baseQuery = fetchBaseQuery({ baseUrl: API_URL });
// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     // try to get a new token
//     const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
//     if (refreshResult.data) {
//       // store the new token
//       api.dispatch(tokenReceived(refreshResult.data));
//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(loggedOut());
//     }
//   }
//   return result;
// };

// maxRetries: 5 is the default, and can be omitted. Shown for documentation purposes.

const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: API_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;
    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  {
    maxRetries: 5,
  }
);

// const staggeredBaseQueryWithBailOut = retry(
//   async (args: string | FetchArgs, api, extraOptions) => {
//     const result = await fetchBaseQuery({
//       baseUrl: API_URL,
//     })(args, api, extraOptions);

//     // bail out of re-tries immediately if unauthorized,
//     // because we know successive re-retries would be redundant
//     if (result.error?.status === 401) {
//       retry.fail(result.error);
//     }

//     console.log("Retrying.... in RTK ");

//     return result;
//   },
//   {
//     maxRetries: 5,
//   }
// );

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: staggeredBaseQuery,
  tagTypes: ["User"], // ["User", "Products", "Other"]
  endpoints: (builder) => ({}),
});
