import { createSlice } from "@reduxjs/toolkit";

type Product = {
  id: number,
  brand: string,
  title: string,
  star: number,
  quantity: number,
  price: number,
  discount: number,
  image: any,
  favourite: boolean,
}
interface ProductState {
  product: Product;
}

const initialState: ProductState = {
  product: {
    id: 1,
    brand: "",
    title: "",
    star: 0,
    quantity: 0,
    price: 0,
    discount: 0,
    image: "",
    favourite: false,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    // Other reducers go here
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;