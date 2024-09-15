import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchApi } from "@/api";
import { ProductType } from "@/types";

export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, { rejectWithValue }) => {
  const response = await fetchApi("products");
  if (!response) {
    return rejectWithValue("Network connection failed. Please try again!");
  }
  return response;
});

export const updateFavouriteApi = createAsyncThunk("products/updateOne", async ({id, data}:{id: string, data: any},  { rejectWithValue }) => {
  const response = await fetchApi(`products/${id}`,"PATCH", "_", data ); // PUT
  if (!response) {
    return rejectWithValue("Network connection failed. Please try again!");
  }
  return response;
});

export const productsAdapter = createEntityAdapter<ProductType>();

const initialState = productsAdapter.getInitialState({ loading: false, error: false });

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // removeProduct: productsAdapter.removeOne,
    updateProduct: productsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      productsAdapter.upsertMany(state, action.payload);
      state.error = false;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(updateFavouriteApi.fulfilled, (state, action) => {
      productsAdapter.updateOne(state, {id: action.payload.id, changes: { favourite: action.payload.favourite }});
    });
  },
});

const reducer = productSlice.reducer;
export default reducer;

export const { updateProduct } = productSlice.actions;

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state: any) => state.products);
