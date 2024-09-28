import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import productReducer from "./productSlice";
import requiredInfoReducer from "./requiredInfoSlice";
import cartReducer from "./cartSlice";
import { apiSlice } from "./query/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    products: productReducer,
    requiredInfo: requiredInfoReducer,
    carts: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// const rootReducer = combineReducers({
//   [api.reducerPath]: api.reducer,        // for RTK query
//   users: userReducer,                    // for redux store
// });

// export const store = configureStore({
//   // reducer: rootReducer,
//   reducer: {
//     // Add the generated reducer as a specific top-level slice
//     [api.reducerPath]: api.reducer,
//     users: userReducer,
//     // Other reducers go here
//   },
//   // Adding the api middleware enables caching, invalidation, polling,
//   // and other useful features of `rtk-query`.
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
