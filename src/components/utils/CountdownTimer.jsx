import React, { useEffect, useState } from "react";
import { RiTimerLine } from "react-icons/ri";
import { poppins } from "./FontPoppins";

const TIMER_DURATION = 10 * 60;
const END_KEY = "checkout_timer_end";

export default function CountdownTimer({ started }) {
  const [timer, setTimer] = useState(0);

  // Start countdown ONLY after started
  useEffect(() => {
    if (!started) return;

    let endTime = localStorage.getItem(END_KEY);

    if (!endTime) {
      endTime = Date.now() + TIMER_DURATION * 1000;
      localStorage.setItem(END_KEY, endTime);
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));

      setTimer(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        localStorage.removeItem(END_KEY);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [started]);

  if (!started || timer <= 0) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div
      className={`${poppins.className} flex items-center justify-between gap-4 px-6 py-4 bg-linear-to-b from-[#6D1DB9] to-[#090014] rounded-xl text-[#E9D5FF]`}
    >
      <RiTimerLine />
      <p>Tickets reserved for 10 minutes:</p>
      <span className="font-semibold text-lg">{formatTime(timer)}</span>
    </div>
  );
}
