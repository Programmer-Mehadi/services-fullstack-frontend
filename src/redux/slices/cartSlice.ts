// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  cart: {
    items: null | any;
    total: number;
  };
} = {
  cart: {
    items: null,
    total: -1,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state: any, action) => {
      state.cart.items = [
        ...state.cart.items,
        {
          ...action.payload,
          dat: "",
          time: "",
        },
      ];
      if (state.cart.total === -1) {
        state.cart.total = 0 + action.payload.price;
      } else {
        state.cart.total += action.payload.price;
      }
    },
    clearCart: (state) => {
      state.cart.items = [];
      state.cart.total = -1;
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
      } else {
        state.cart = {
          items: [],
          total: -1,
        };
      }
    },
    setServiceDate: (state, action) => {
      state.cart.items = state.cart.items.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            date: action.payload.date,
          };
        }
        return item;
      });
    },
    setServiceTime: (state, action) => {
      state.cart.items = state.cart.items.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            time: action.payload.time,
          };
        }
        return item;
      });
    },
  },
});

export const {
  setCart,
  clearCart,
  deleteCartItem,
  cartSetLocalStorage,
  cartGetLocalStorage,
  setServiceDate,
  setServiceTime,
} = cartSlice.actions;
export default cartSlice.reducer;
