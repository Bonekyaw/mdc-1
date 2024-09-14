import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchApi } from "@/api";
import { ProductType } from "@/types";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await fetchApi("products");
  return response;
});

export const updateFavourite = createAsyncThunk(
  "products/updateOne",
  async ({ id, data }: { id: string; data: any }) => {
    const response = await fetchApi(`products/${id}`, "PATCH", "_", data);
    return response;
  }
);

export const productsAdapter = createEntityAdapter<ProductType>();

const initialState = productsAdapter.getInitialState({ loading: false });

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
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      productsAdapter.upsertMany(state, action.payload);

      state.loading = false;
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
