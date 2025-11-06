import axios from "axios";

// 👇 Automatically switches between local and production backend URLs
const baseURL =
  process.env.REACT_APP_API_URL ||"https://highway-delite-3-3xs9.onrender.com";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Optional: helpful console log to confirm which backend it's using
if (process.env.NODE_ENV === "development") {
  console.log("🧩 Using local backend:", baseURL);
} else {
  console.log("🌍 Using production backend:", baseURL);
}
