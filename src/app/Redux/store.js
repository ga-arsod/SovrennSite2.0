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

// Configuration for redux-persist
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
  times:timesReducer
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
