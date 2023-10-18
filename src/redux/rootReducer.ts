import { baseApi } from "./api/baseApi";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer,
  cart: cartReducer,
};
