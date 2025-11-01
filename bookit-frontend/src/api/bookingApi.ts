import { axiosInstance } from "./axiosInstance";
import { BookingRequest, BookingResponse } from "../types";

export const createBooking = async (payload: BookingRequest): Promise<BookingResponse> => {
  const { data } = await axiosInstance.post("/bookings", payload);
  return data;
};
