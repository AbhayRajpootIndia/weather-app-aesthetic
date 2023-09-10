import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    latlong: {
      lat: 0.0,
      long: 0.0,
    },
    city: '-',
    locationList: [],
  },
  reducers: {
    setLatlong: (state, action) => {
      state.latlong = action.payload.latlong;
    },
    setCity: (state, action) => {
      state.city = action.payload.city;
    },
    addLocation: (state, action) => {
      state.locationList.push(action.payload.location);
    },
    removeLocation: (state, action) => {
      const locationToRemove = action.payload.location;

      const index = state.locationList.findIndex(
        (location) =>
          JSON.stringify(location) === JSON.stringify(locationToRemove)
      );

      if (index > -1) {
        state.locationList.splice(index, 1);
      }
    },
  },
});

export const setLatlong = locationSlice.actions.setLatlong;
export const setCity = locationSlice.actions.setCity;
export const setCurrentLocation = locationSlice.actions.setCurrentLocation;
export const addLocation = locationSlice.actions.addLocation;
export const removeLocation = locationSlice.actions.removeLocation;

export default locationSlice.reducer;
