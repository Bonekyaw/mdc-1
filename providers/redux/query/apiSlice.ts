import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

// maxRetries: 5 is the default, and can be omitted. Shown for documentation purposes.
const staggeredBaseQuery = retry(
  fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  {
    maxRetries: 5,
  }
);

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: staggeredBaseQuery,
  tagTypes: ["User"],  // ["User", "Products", "Other"]
  endpoints: (builder) => ({}),
});
