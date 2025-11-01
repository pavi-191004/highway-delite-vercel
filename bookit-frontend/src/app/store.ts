import { configureStore } from "@reduxjs/toolkit";
import experienceReducer from "../features/experience/experienceSlice";
import bookingReducer from "../features/booking/bookingSlice";
import promoReducer from "../features/promo/promoSlice";

export const store = configureStore({
  reducer: {
    experience: experienceReducer,
    booking: bookingReducer,
    promo: promoReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
