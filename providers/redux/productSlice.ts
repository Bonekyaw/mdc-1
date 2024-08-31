import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
  user: { id: number; name: string; email: string; company: { name: string } };
}

const initialState: ProductState = {
  user: { id: 1, name: "", email: "", company: { name: "" } },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Other reducers go here
  },
});

export const { setUser } = productSlice.actions;

export default productSlice.reducer;