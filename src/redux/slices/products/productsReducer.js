import { createSlice } from "@reduxjs/toolkit";
import { getProductDetails } from "./productsActions";

// Initial state
const initialState = {
    detailLoader:false,
    productDetails:{}
};

// Actual Slice
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductDetails: (state, { payload }) => {
      state.productDetails = payload
    },
    removeImage: (state, {payload}) => {
        state.productDetails.image = state.productDetails.image.filter(item => item !== payload);
    },
    addImage: (state, action) => {
        state.productDetails.image = [...state.productDetails.image, action.payload];
      },
  },
  extraReducers: (builder) => {
    //Get product details
    builder.addCase(getProductDetails.pending, (state) => {
      state.detailLoader = true;
      state.productDetails = {}
    });
    builder.addCase(getProductDetails.fulfilled, (state, { payload }) => {
      state.detailLoader = false;
      state.productDetails = payload.data
    });
    builder.addCase(getProductDetails.rejected, (state, { payload }) => {
      state.detailLoader = false;
      state.productDetails = {}
    });
  },
});

export const { setProductDetails, removeImage , addImage} = productsSlice.actions;
export default productsSlice.reducer;
