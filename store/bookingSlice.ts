import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    currentBooking: null,
    bookings: [],
  },
  reducers: {
    setCurrentBooking(state, action) {
      state.currentBooking = action.payload;
    },
    setBookings(state, action) {
      state.bookings = action.payload;
    },
  },
});

export const {
  setCurrentBooking,
  setBookings,
} = bookingSlice.actions;

export default bookingSlice.reducer;