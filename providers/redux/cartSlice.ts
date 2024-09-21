import { createSlice } from "@reduxjs/toolkit";

type Cart = {
  id: number;
  title: string;
  price: number;
  image: any;
  items: [
    {
      id: number;
      selectedColor: string;
      selectedSize: string;
      quantity: number;
    }
  ];
};

interface CartState {
  cartList: Cart[];
}

const initialState: CartState = {
  cartList: [],
}; //satisfies CounterState as CounterState;

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const cartItem = action.payload;
      if (state.cartList.length > 0) {
        const isExistIndex = state.cartList.findIndex(
          (item) => item.id === cartItem.id
        );
        if (isExistIndex > -1) {
          state.cartList[isExistIndex] = cartItem;
        } else state.cartList.push(cartItem);
      } else state.cartList.push(cartItem);
    },
    updateCart: (state, action) => {
      const { id, itemId, quantity } = action.payload;
      const cartIndex = state.cartList.findIndex((item) => item.id === id);
      const itemIndex = state.cartList[cartIndex].items.findIndex(
        (item) => item.id === itemId
      );
      state.cartList[cartIndex].items[itemIndex].quantity = quantity;
    },
    deleteCart: (state, action) => {
      const { id, itemId } = action.payload;
      const cartIndex = state.cartList.findIndex((item) => item.id === id);
      if (state.cartList[cartIndex].items.length == 1) {
        state.cartList.splice(cartIndex, 1);
      } else {
        const itemIndex = state.cartList[cartIndex].items.findIndex(
          (item) => item.id === itemId
        );
        state.cartList[cartIndex].items.splice(itemIndex, 1);
      }
    },
    // Other reducers go here
  },
  selectors: {
    selectCount: (carts) => {
      let totalQuantity = 0;
      if (carts.cartList.length > 0) {
        carts.cartList.forEach((cart: any) => {
          const total = cart.items.reduce(
            (total: any, item: any) => total + item.quantity,
            0
          );
          totalQuantity += total;
        });
      }

      return totalQuantity;
    },
  },
});

export const { addCart, updateCart, deleteCart } = cartSlice.actions;
// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCount } = cartSlice.selectors;

export default cartSlice.reducer;

// Selector functions allows us to select a value from the Redux root state.
// Selectors can also be defined inline in the `useSelector` call
// in a component, or inside the `createSlice.selectors` field.
// export const selectCount = (state: RootState) => state.carts.cartList;
