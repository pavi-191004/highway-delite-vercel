export interface Experience {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  price: number;
  image: string;
  // slots structure: dates => times => seatsLeft
  slots?: {
    date: string; // ISO date "YYYY-MM-DD"
    times: {
      time: string; // "09:00"
      seatsLeft: number;
    }[];
  }[];
}

export interface BookingRequest {
  experienceId: string;
  date: string;
  time: string;
  quantity: number;
  name: string;
  email: string;
  promoCode?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message?: string;
}
