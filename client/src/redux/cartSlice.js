import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).cartItems
      : [],
    total: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).total
      : 0,
    tax: 8,
  },
  reducers: {
    addProduct: (state, action) => {
      const findcartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (findcartItem) {
        findcartItem.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
      state.total += action.payload.price;
    },
    deleteProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    increase: (state, action) => {
      const findcartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      findcartItem.quantity += 1;
      state.total += action.payload.price;
    },
    decrease: (state, action) => {
      const findcartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      findcartItem.quantity -= 1;
      if (findcartItem.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total -= action.payload.price;
    },
    reset: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const { addProduct, deleteProduct, increase, decrease, reset } =
  cartSlice.actions;
export default cartSlice.reducer;
