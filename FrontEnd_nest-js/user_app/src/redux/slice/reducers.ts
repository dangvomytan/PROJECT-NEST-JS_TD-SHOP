import { combineReducers } from "redux";
import userSlice from "./user.Slice";
import productSlice from "./product.slice";

const rootReducer = combineReducers({
  user: userSlice,
  product: productSlice,
});

export default rootReducer;
