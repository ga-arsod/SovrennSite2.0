import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'; 
import authReducer from './Slices/authSlice';
import homeReducer from './Slices/homeSlice';
import discoveryReducer from './Slices/discoverySlice';
import educationReducer from './Slices/educationSlice';
import snackbarReducer from "./Slices/snackbarSlice"
import sortingReducer from "./Slices/sortingSlice"
import timesReducer from "./Slices/timesSlice"
import primeReducer from "./Slices/primeSlice"
import ipoReducer from "./Slices/ipoSlice"
import commentsReducer from "./Slices/commentsSlice"
import selfHelpReducer from "./Slices/selfHelpSlice"
import watchlistReducer from "./Slices/watchlistSlice"
import pulseReducer from "./Slices/pulseSlice"
import knowledgeReducer from "./Slices/knowledgeSlice"
import paymentReducer from "./Slices/paymentSlice"
import planReducer from "./Slices/PlanSlice"

const persistConfig = {
  key: 'root', 
  storage,     
};


const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  discovery: discoveryReducer,
  education: educationReducer,
  snackbar:snackbarReducer,
  sorting: sortingReducer,
  times:timesReducer,
  prime:primeReducer,
  ipo:ipoReducer,
  comments:commentsReducer,
  selfHelp:selfHelpReducer,
  watchlist:watchlistReducer,
  pulse:pulseReducer,
  knowledge:knowledgeReducer,
  payment:paymentReducer,
  plan:planReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

