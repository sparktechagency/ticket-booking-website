"use client";

import { useEffect, useRef, useState } from "react";
import { RiTimerLine } from "react-icons/ri";
import { poppins } from "./FontPoppins";

const TIMER_DURATION = 10 * 60; // 10 minutes
const END_KEY = "checkout_timer_end";

export default function CountdownTimer({ started }) {
  const [timer, setTimer] = useState(null);
  const intervalRef = useRef(null);
  const endTimeRef = useRef(null);

  useEffect(() => {
    if (!started || intervalRef.current) return;

    let storedEnd = localStorage.getItem(END_KEY);

    if (!storedEnd) {
      storedEnd = Date.now() + TIMER_DURATION * 1000;
      localStorage.setItem(END_KEY, storedEnd);
    }

    endTimeRef.current = Number(storedEnd);

    // Set initial value immediately (no flicker)
    setTimer(Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000)));

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((endTimeRef.current - Date.now()) / 1000)
      );

      setTimer(remaining);

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        localStorage.removeItem(END_KEY);
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [started]);

  if (!started || timer === null || timer <= 0) return null;

  const mins = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  const secs = (timer % 60).toString().padStart(2, "0");

  return (
    <div
      className={`${poppins.className} flex items-center justify-between gap-4 px-2 sm:px-6 py-4 text-xs sm:text-sm bg-linear-to-b from-[#6D1DB9] to-[#090014] rounded-xl text-[#E9D5FF]`}
    >
      <RiTimerLine />
      <p>Tickets reserved for 10 minutes:</p>
      <span className="font-semibold sm:text-lg">
        {mins}:{secs}
      </span>
    </div>
  );
}
