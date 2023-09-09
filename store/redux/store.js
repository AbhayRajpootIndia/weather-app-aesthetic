import { configureStore } from '@reduxjs/toolkit';

import keyboardReducer from './keyboardSlice';
import locationReducer from './locationSlice';
import weatherReducer from './weatherSlice';

export const store = configureStore({
  reducer: {
    keyboard: keyboardReducer,
    location: locationReducer,
    weather: weatherReducer,
  },
});
