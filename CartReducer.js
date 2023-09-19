import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload.id;
      state.cart = state.cart.filter((item) => item.id !== itemIdToRemove);
    },

    incrementQuantity: (state, action) => {
        const itemIdToIncrement = action.payload.id;
        state.cart = state.cart.map((item) => {
          if (item.id === itemIdToIncrement) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      },

    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.quantity == 1) {
        itemPresent.quantity = 0;
        const itemIdToRemove = action.payload.id;
        state.cart = state.cart.filter((item) => item.id !== itemIdToRemove);
      } else {
        itemPresent.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = CartSlice.actions;

export default CartSlice.reducer;