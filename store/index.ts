import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import chatReducer from "./chatSlice";
import technicianReducer from "./technicianSlice";
import walletReducer from "./walletSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    technician: technicianReducer,
    chat: chatReducer,
    wallet: walletReducer,
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;