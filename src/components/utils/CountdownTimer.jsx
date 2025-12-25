import React, { useEffect, useState } from "react";
import { RiTimerLine } from "react-icons/ri";
import { poppins } from "./FontPoppins";

const TIMER_DURATION = 10 * 60; // 10 minutes in seconds
const STORAGE_KEY = "checkout_timer_end";

export default function CountdownTimer() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let endTime = localStorage.getItem(STORAGE_KEY);

    // If no timer exists, create one
    if (!endTime) {
      endTime = Date.now() + TIMER_DURATION * 1000;
      localStorage.setItem(STORAGE_KEY, endTime);
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));

      setTimer(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem(STORAGE_KEY);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (timer <= 0) return null;

  return (
    <div
      className={`${poppins.className} flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center px-6 py-4 bg-linear-to-b from-[#6D1DB9] to-[#090014] rounded-xl text-[#E9D5FF]`}
    >
      <RiTimerLine />
      <p className="text-sm sm:text-base">Tickets reserved for 10 minutes:</p>
      <span className="font-semibold text-lg">{formatTime(timer)}</span>
    </div>
  );
}
