import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: {},
    hourlyData: [],
    aiqData: {},
    uvData: 0.0,
    astroData: {},
    rainData: {
      currentPrecip: 0.0,
      totalPrecip: 0.0,
    },
    windData: {},
    temperatureData: {},
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload.weatherData;
    },
    setHourlyData: (state, action) => {
      state.hourlyData = action.payload.hourlyData;
    },
    setAiqData: (state, action) => {
      state.aiqData = action.payload.aiqData;
    },
    setUvData: (state, action) => {
      state.uvData = action.payload.uvData;
    },
    setAstroData: (state, action) => {
      state.astroData = action.payload.astroData;
    },
    setRainData: (state, action) => {
      state.rainData = action.payload.rainData;
    },
    setWindData: (state, action) => {
      state.windData = action.payload.windData;
    },
    setTemperatureData: (state, action) => {
      state.temperatureData = action.payload.temperatureData;
    },
  },
});

export const setWeatherData = weatherSlice.actions.setWeatherData;
export const setHourlyData = weatherSlice.actions.setHourlyData;
export const setAiqData = weatherSlice.actions.setAiqData;
export const setUvData = weatherSlice.actions.setUvData;
export const setAstroData = weatherSlice.actions.setAstroData;
export const setRainData = weatherSlice.actions.setRainData;
export const setWindData = weatherSlice.actions.setWindData;
export const setTemperatureData = weatherSlice.actions.setTemperatureData;

export default weatherSlice.reducer;
