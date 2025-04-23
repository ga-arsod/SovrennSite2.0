import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer from './Slices/authSlice';
import homeReducer from './Slices/homeSlice';
import discoveryReducer from './Slices/discoverySlice';
import educationReducer from './Slices/educationSlice';
import snackbarReducer from "./Slices/snackbarSlice";
import sortingReducer from "./Slices/sortingSlice";
import timesReducer from "./Slices/timesSlice";
import primeReducer from "./Slices/primeSlice";
import ipoReducer from "./Slices/ipoSlice";
import commentsReducer from "./Slices/commentsSlice";
import selfHelpReducer from "./Slices/selfHelpSlice";
import watchlistReducer from "./Slices/watchlistSlice";
import pulseReducer from "./Slices/pulseSlice";
import knowledgeReducer from "./Slices/knowledgeSlice";
import paymentReducer from "./Slices/paymentSlice";
import planReducer from "./Slices/PlanSlice";
import examReducer from "./Slices/examSlice";
import filingReducer from "./Slices/filingSlice";
import searchReducer from "./Slices/searchSlice";
import loadingReducer from "./Slices/loadingSlice";
import investingReducer from "./Slices/investingSlice"

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['payment','exam','investing'],
};


const appReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  discovery: discoveryReducer,
  education: educationReducer,
  snackbar: snackbarReducer,
  sorting: sortingReducer,
  times: timesReducer,
  prime: primeReducer,
  ipo: ipoReducer,
  comments: commentsReducer,
  selfHelp: selfHelpReducer,
  watchlist: watchlistReducer,
  pulse: pulseReducer,
  knowledge: knowledgeReducer,
  payment: paymentReducer,
  plan: planReducer,
  exam:examReducer,
  filing:filingReducer,
  search:searchReducer,
  loading:loadingReducer,
  investing:investingReducer
});


const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {

    storage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store);
