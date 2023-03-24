import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartData:[],
  cartDataIDs:[],
  totalPrice :0
};
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
    setCartDataIds: (state, action) => {
        state.cartDataIDs = action.payload;
      },
      setTotalPrice: (state, action) => {
        state.totalPrice = action.payload;
      },
  },
});
export const {setCartData,setCartDataIds,setTotalPrice} =
  appSlice.actions;

export default appSlice.reducer;
