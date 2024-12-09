import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
const url = "https://api.sovrenn.com";

const initialState = {
  paymentData: {
    key: 'QyT13U',
    txnid: '',
    amount: '',
    productinfo: '',
    firstname: '',
    email: '',
    phone: '',
    surl: 'http://localhost:3000/payment_confirmation',
    furl: 'http://localhost:3000/failure',
    udf1:'',
    udf2:'',
    hash:'',
  },
  
};

export const generateHashApi = createAsyncThunk(
  'generateHashApi',
  async (paymentDetails) => {
    const response = await fetch(`${url}/payment/payu/create-hash/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("token"),
       },
      body: JSON.stringify(paymentDetails),
    });
    if (!response.ok) {
      throw new Error('Failed to generate hash');
    }
    const data = await response.json();
    return data; 
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData: (state, action) => {
      state.paymentData = { ...state.paymentData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateHashApi.pending, (state) => {
       
        state.error = null;
      })
      .addCase(generateHashApi.fulfilled, (state, action) => {
       
        state.paymentData.hash = action.payload.data.hash;
      })
      .addCase(generateHashApi.rejected, (state, action) => {
       
        state.error = action.error.message;
      });
  },
});

export const { setPaymentData } = paymentSlice.actions;

export default paymentSlice.reducer;
