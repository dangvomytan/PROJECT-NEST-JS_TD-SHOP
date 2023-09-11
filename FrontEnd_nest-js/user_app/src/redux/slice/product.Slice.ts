import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        status: true,
        data: "",
      },
    reducers: {
      setProducts: (state, action) => {
        state.data = action.payload;
      },
    },
  });

const { actions, reducer } = productSlice;
export const { setProducts } = actions;
export default reducer;