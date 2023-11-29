import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemsQuantity: 0
}

const mainSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existsingItem = state.items.find(item => item.id === newItem.id)
      if (!existsingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title
        })
      } else {
        existsingItem.quantity++;
        existsingItem.totalPrice = existsingItem.price * existsingItem.quantity;
      }
    },
    removeItem(state) {
    }
  }
});

export const mainActions = mainSlice.actions;

export default mainSlice;