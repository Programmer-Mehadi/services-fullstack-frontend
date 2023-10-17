import { baseApi } from "./api/baseApi";
import userReducer from "./slices/userSlice";
export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer,
};
