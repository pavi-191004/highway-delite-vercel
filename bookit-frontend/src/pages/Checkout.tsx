import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { postBooking, resetBooking } from "../features/booking/bookingSlice";
import { calcTotal } from "../utils/priceHelper";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const bookingState = useAppSelector((s) => s.booking);
  // data passed from Details via navigate state
  const state = (location.state || {}) as any;
  const { experienceId, date, time, qty } = state;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");

  // For price we need experience price: ideally fetch from store or make an API call.
  // For simplicity attempt to read current experience from store
  const experience = useAppSelector((s) => s.experience.current);
  const price = experience?.price ?? 0;
  const quantities = qty ?? 1;
  const { subtotal, taxes, total } = calcTotal(price, quantities);

  const handlePay = async () => {
    if (!name || !email) {
      alert("Please provide name and email");
      return;
    }
    const payload = {
      experienceId,
      date,
      time,
      quantity: quantities,
      name,
      email,
      promoCode: promo || undefined,
    };

    const resultAction = await dispatch(postBooking(payload));
    if (postBooking.fulfilled.match(resultAction)) {
      // success: redirect to result with booking id
      navigate("/result", { state: { success: true, resp: resultAction.payload } });
      dispatch(resetBooking());
    } else {
      navigate("/result", { state: { success: false, resp: resultAction.error?.message || "Failed" } });
      dispatch(resetBooking());
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Checkout</h3>
            <div className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full border rounded p-3" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded p-3" />
              <div className="flex gap-2">
                <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code" className="flex-1 border rounded p-3" />
                <button className="px-4 py-2 bg-black text-white rounded">Apply</button>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-sm text-gray-600">I agree to the terms and safety policy</span>
              </label>
            </div>
          </section>

          <aside className="bg-white p-6 rounded-xl shadow">
            <div className="text-sm text-gray-500">Experience</div>
            <div className="font-medium">{experience?.title || "Selected experience"}</div>
            <div className="mt-4 text-sm text-gray-500">Date</div>
            <div>{date}</div>
            <div className="mt-2 text-sm text-gray-500">Time</div>
            <div>{time}</div>
            <div className="mt-4 flex justify-between">
              <div>Subtotal</div>
              <div>₹{subtotal}</div>
            </div>
            <div className="flex justify-between">
              <div>Taxes</div>
              <div>₹{taxes}</div>
            </div>
            <div className="mt-4 flex justify-between font-semibold">
              <div>Total</div>
              <div>₹{total}</div>
            </div>

            <button onClick={handlePay} className="mt-6 w-full bg-yellow-400 py-2 rounded font-medium">
              {bookingState.loading ? "Processing..." : "Pay and Confirm"}
            </button>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};
