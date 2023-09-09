import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    currentLocation: {
      city: 'Bengaluru',
      lat: 12.9662976,
      long: 77.6142848,
    },
    locationList: [],
  },
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload.location;
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

export const setCurrentLocation = locationSlice.actions.setCurrentLocation;
export const addLocation = locationSlice.actions.addLocation;
export const removeLocation = locationSlice.actions.removeLocation;

export default locationSlice.reducer;
