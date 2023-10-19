// import { baseApi } from "./api/baseApi";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";

export const reducer = {
  // [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer,
  cart: cartReducer,
};
