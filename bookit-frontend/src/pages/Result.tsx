import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export const Result: React.FC = () => {
  const location = useLocation();
  const nav = useNavigate();
  const { state } = location as any;
  const success = state?.success;
  const resp = state?.resp;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 md:px-12 py-20">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow text-center">
          {success ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Booking Confirmed 🎉</h2>
              <p className="mb-4">Booking ID: <span className="font-mono">{resp?.bookingId}</span></p>
              <p className="mb-6">{resp?.message || "We've emailed your confirmation."}</p>
              <button onClick={() => nav("/")} className="px-4 py-2 bg-yellow-400 rounded">Back to home</button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">Booking Failed</h2>
              <p className="mb-6">{typeof resp === "string" ? resp : resp?.message || "Something went wrong."}</p>
              <button onClick={() => nav(-1)} className="px-4 py-2 bg-gray-200 rounded mr-3">Try again</button>
              <button onClick={() => nav("/")} className="px-4 py-2 bg-yellow-400 rounded">Back to home</button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
