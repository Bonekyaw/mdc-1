import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./query/apiSlice";
import * as SecureStore from "expo-secure-store";

type UserType = {
  id: string;
  name: string;
};

let token: any;
SecureStore.getItemAsync("token").then((value) => {
  token = value;
  console.log("RTK query ----------", token);
});

const usersAdapter = createEntityAdapter<UserType>({
  // sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = usersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users", // localhost:4000/users
      extraOptions: { maxRetries: 8 }, // Override
      transformResponse: (responseData: UserType[]) => {
        console.log("Fetching All users --------");
        // console.log("Response User --------", responseData);
        // const loadedUsers = responseData.map((user: UserType) => {
        //   return user;
        // });
        return usersAdapter.setAll(initialState, responseData);
      },
      // providesTags: ["User"],
      providesTags: (result: any, error, arg) => [
        { type: "User" as const, id: "LIST" },
        ...result.ids.map((id: any) => ({ type: "User", id } as const)),
      ],
    }),
    updateUser: builder.mutation<UserType, UserType>({
      query: (initialUser) => ({
        url: `users/${initialUser.id}`,
        method: "PUT",
        // header: {
        //   accept: "application/json",
        //   Authorization: "Bearer " + token,
        // },
        body: {
          ...initialUser,
        },
      }),
      // invalidatesTags: ["User"],
      //   invalidatesTags: (result: any, error, arg) => [
      //     { type: "User" as const, id: arg.id },
      //   ],
      async onQueryStarted({ id, name }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          // updateQueryData takes three arguments: the name of the endpoint to update, the same cache key value used to identify the specific cached data, and a callback that updates the cached data.
          extendedApiSlice.util.updateQueryData(
            "getUsers",
            "getUsers",
            (draft) => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              const user = draft.entities[id];
              if (user) user.name = name;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = extendedApiSlice;
