import { createSlice } from "@reduxjs/toolkit";

const technicianSlice = createSlice({
  name: "technician",
  initialState: {
    technician: null,
    location: null,
  },
  reducers: {
    setTechnician(state, action) {
      state.technician = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
  },
});

export const {
  setTechnician,
  setLocation,
} = technicianSlice.actions;

export default technicianSlice.reducer;