import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchExperienceById } from "../features/experience/experienceSlice";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { formatDateReadable } from "../utils/formatDate";
import { Experience } from "../types"; // ✅ fixed import path

// Define slot types to match Experience
interface SlotTime {
  time: string;
  seatsLeft: number;
}
interface Slot {
  date: string;
  times: SlotTime[];
}

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { current: experience, loading } = useAppSelector((s) => s.experience);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    if (id) dispatch(fetchExperienceById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (experience && experience.slots && experience.slots.length > 0) {
      setSelectedDate(experience.slots[0].date);
      if (experience.slots[0].times.length)
        setSelectedTime(experience.slots[0].times[0].time);
    }
  }, [experience]);

  const handleProceed = () => {
    if (!experience) return;
    navigate("/checkout", {
      state: {
        experienceId: experience._id,
        date: selectedDate,
        time: selectedTime,
        qty,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 md:px-12 py-8">
        {loading || !experience ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <img
                className="w-full h-72 object-cover rounded-xl"
                src={experience.image}
                alt={experience.title}
              />
              <h2 className="text-2xl font-semibold">{experience.title}</h2>
              <p className="text-gray-600">{experience.description}</p>

              <div>
                <h4 className="font-medium mb-2">Choose date</h4>
                <div className="flex gap-3 flex-wrap">
                  {/* ✅ Explicit type: (s: Slot) */}
                  {experience.slots?.map((s: Slot) => (
                    <button
                      key={s.date}
                      onClick={() => {
                        setSelectedDate(s.date);
                        const firstTime = s.times[0]?.time;
                        if (firstTime) setSelectedTime(firstTime);
                      }}
                      className={`px-3 py-2 rounded-md border ${
                        selectedDate === s.date ? "bg-yellow-300" : "bg-white"
                      }`}
                    >
                      {formatDateReadable(s.date)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Choose time</h4>
                <div className="flex gap-3 flex-wrap">
                  {/* ✅ Explicit type for both s and t */}
                  {experience.slots
                    ?.find((s: Slot) => s.date === selectedDate)
                    ?.times.map((t: SlotTime) => (
                      <button
                        key={t.time}
                        onClick={() => setSelectedTime(t.time)}
                        disabled={t.seatsLeft <= 0}
                        className={`px-3 py-2 rounded-md border ${
                          selectedTime === t.time
                            ? "bg-yellow-300"
                            : "bg-white"
                        } ${
                          t.seatsLeft <= 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {t.time}{" "}
                        {t.seatsLeft <= 0
                          ? " (Sold out)"
                          : t.seatsLeft + " left"}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <aside className="bg-white p-4 rounded-xl shadow">
              <div className="mb-4">
                <div className="text-sm text-gray-500">Starts at</div>
                <div className="text-lg font-semibold">₹{experience.price}</div>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div>Quantity</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <div>{qty}</div>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleProceed}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-yellow-400 text-black py-2 rounded-md font-medium disabled:opacity-60"
              >
                Book
              </button>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
