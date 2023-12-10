import { createSlice } from "@reduxjs/toolkit";
import { mainActions } from './main-slice';

const initialState = {
  items: [],
  itemsQuantity: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.itemsQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title
        })
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.itemsQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    // updateCart(state, action) {
    //   state.items = action.payload.items;
    //   state.itemsQuantity = action.payload.itemsQuantity;
    // }
  }
});

export const sendCartData = (cartData) => {
  return async (dispatchAction) => {
    dispatchAction(mainActions.showStatusMessage({
        status: 'pending',
        title: 'Sending',
        message: 'Cart data sending...'
      })
    );

    const sendHttpRequest = async () => {
      const response = await fetch(
        'https://react-course-http-a4f50-default-rtdb.firebaseio.com/cart.json',
          {
            method: 'PUT',
            body: JSON.stringify(cartData),
          }
      );
  
      if (!response.ok) {
        throw new Error('Sending cart error!')
      }
    };

    

    try {
      await sendHttpRequest();

      dispatchAction(
        mainActions.showStatusMessage({
          status: 'succuss',
          title: 'Completed',
          message: 'Cart data sended succussful!'
        })
      );
    } catch (error) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: 'error',
          title: 'Error',
          message: 'Cart data sending error!'
        })
      );
    }
  }
}

export const cartActions = cartSlice.actions;

export default cartSlice;