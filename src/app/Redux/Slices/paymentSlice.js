import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
const url = process.env.NEXT_PUBLIC_API_URL;

const initialState = {
  paymentData: {
    key: process.env.NEXT_PUBLIC_PAYMENT_KEY || '',
    txnid: '',
    amount: '',
    productinfo: '',
    firstname: '',
    email: '',
    phone: '',
    surl: `${url}/payment/payu/verify`,
    furl: `${url}/payment/payu/failure`,
    udf1:'',
    udf2:'',
    hash:'',
  },
  mentorshipPaymentData: {
    key: process.env.NEXT_PUBLIC_PAYMENT_KEY || '',
    txnid: '',
    amount: '',
    productinfo: '',
    firstname: '',
    email: '',
    phone: '',
    surl: `${url}/mentor-batches/enroll`,
    furl: `${url}/mentor-batches/enroll`,
    udf1:'',
    udf2:'',
    udf3:'website',
    hash:'',
   
  }
  
};

export const generateHashApi = createAsyncThunk(
  'generateHashApi',
  async (paymentDetails) => {
    const response = await fetch(`${url}/payment/payu/create-hash?platform=website`, {
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
    setMentorshipPaymentData: (state, action) => {
      state.mentorshipPaymentData = { ...state.mentorshipPaymentData, ...action.payload };
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

export const { setPaymentData, setMentorshipPaymentData } = paymentSlice.actions;

export default paymentSlice.reducer;
