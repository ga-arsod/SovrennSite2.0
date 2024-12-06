import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    key: 'QyT13U',
    txnid: '',
    amount: '',
    productinfo: '',
    firstname: '',
    email: '',
    phone: '',
    surl: 'http://localhost:3000/success',
    furl: 'http://localhost:3000/failure',
  },
  hash: '',
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setHash: (state, action) => {
      state.hash = action.payload;
    },
  },
});

export const { setHash } = paymentSlice.actions;

export default paymentSlice.reducer;
