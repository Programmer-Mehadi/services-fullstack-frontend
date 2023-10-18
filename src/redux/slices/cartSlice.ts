// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    items: [],
    total: -1,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state: any, action) => {
      state.cart.items = [...state.cart.items, action.payload];
      if (state.cart.total === -1) {
        state.cart.total = 0 + action.payload.price;
      } else {
        state.cart.total += action.payload.price;
      }
    },
    clearCart: (state) => {
      state.cart.items = [];
      state.cart.total = 0;
    },
    deleteCartItem: (state, action) => {
      state.cart.items = state.cart.items.filter(
        (item: any) => item.id !== action.payload?.id
      );
      // use reduce to sum all cart items price
      let total = state.cart.items.reduce(
        (acc: any, item: any) => acc + item.price,
        0
      );
      if (total === 0) {
        state.cart.total = -1;
      } else {
        state.cart.total = total;
      }
    },
    cartSetLocalStorage: (state) => {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    cartGetLocalStorage: (state) => {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart")!);
      }
    },
  },
});

export const {
  setCart,
  clearCart,
  deleteCartItem,
  cartSetLocalStorage,
  cartGetLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
