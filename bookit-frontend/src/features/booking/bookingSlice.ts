import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookingRequest, BookingResponse } from "../../types";
import * as api from "../../api/bookingApi";

interface State {
  loading: boolean;
  success?: BookingResponse | null;
  error?: string | null;
}

const initialState: State = {
  loading: false,
  success: null,
  error: null,
};

export const postBooking = createAsyncThunk("booking/post", async (payload: BookingRequest) => {
  const data = await api.createBooking(payload);
  return data;
});

const slice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBooking(state) {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBooking.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(postBooking.fulfilled, (s, a) => { s.loading = false; s.success = a.payload; })
      .addCase(postBooking.rejected, (s, a) => { s.loading = false; s.error = a.error.message || "Booking failed"; });
  },
});

export const { resetBooking } = slice.actions;
export default slice.reducer;
