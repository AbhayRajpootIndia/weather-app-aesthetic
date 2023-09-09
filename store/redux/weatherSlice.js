import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: {},
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload.weatherData;
    },
  },
});

export const setWeatherData = weatherSlice.actions.setWeatherData;

export default weatherSlice.reducer;
