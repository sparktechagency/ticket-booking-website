"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegCalendar,
  FaRegClock,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { RiDeleteBinLine, RiTimerLine } from "react-icons/ri";
import { MdOutlineShield } from "react-icons/md";

import Image from "next/image";
import { TicketPlan } from "../../../public/Images/AllImages";
import { Poppins } from "next/font/google";
import { Button, MenuItem, Select } from "@mui/material";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function CheckoutPage() {
  const [timer, setTimer] = useState(600);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0d27] text-white px-4 sm:px-6 lg:px-8 py-5">
      <main className="max-w-7xl mx-auto pb-12">
        {/* Back Button */}
        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#99A1AF",
            fontSize: "14px",
            mb: 2,
          }}
        >
          <FaArrowLeft />
          Back to events
        </Button>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-8">
            <h1 className="text-lg sm:text-3xl md:text-4xl">Checkout</h1>

            {/* Stadium Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto"
            >
              <Image
                src={TicketPlan}
                alt="Seating Map"
                width={800}
                height={400}
                className="w-full h-auto object-contain rounded-xl"
                priority
              />
            </motion.div>

            {/* Event Info */}
            <div className="space-y-4">
              <h2 className="text-sm sm:text-lg">
                The Weeknd: After Hours Tour
              </h2>

              <div className="flex flex-wrap gap-3">
                <InfoChip
                  icon={<FaRegCalendar />}
                  text="Saturday, March 8, 2025"
                />
                <InfoChip icon={<FaRegClock />} text="20:00" />
                <InfoChip
                  icon={<FiMapPin />}
                  text="Madison Square Garden, New York"
                />
              </div>
            </div>

            {/* Ticket Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-linear-to-b from-[#6D1DB9] to-[#1a0238] rounded-2xl p-4 sm:p-6 w-full max-w-2xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                {/* Left section - Ticket info */}
                <div className="flex flex-row sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1">
                  {/* Quantity badge */}
                  <div className="bg-[#FFFFFF0D] p-3 sm:p-4 rounded-lg shrink-0">
                    <p className={`${poppins.className} text-xl sm:text-2xl`}>
                      2x
                    </p>
                  </div>

                  {/* Event details */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-sm sm:text-base xl:text-xl truncate">
                      The Weeknd: After Hours Tour
                    </p>
                    <p
                      className={`${poppins.className} text-xs sm:text-sm text-[#99A1AF]`}
                    >
                      General | Colour Pink
                    </p>
                    <p className="text-sm sm:text-base">€80 each</p>
                  </div>
                </div>

                {/* Right section - Price and actions */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1 shrink-0">
                  <p className="text-xl xl:text-2xl">€160</p>
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "#99A1AF",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                  >
                    <RiDeleteBinLine className="mr-1 sm:mr-2 text-base sm:text-lg" />
                    <span className="hidden sm:block">Remove</span>
                    <span className="block sm:hidden">Del</span>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Buyer Guarantee */}
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-2xl p-3 sm:p-6 flex gap-2 sm:gap-4 max-w-2xl">
              <MdOutlineShield className="sm:text-2xl text-[#22D3EE]" />
              <div>
                <h3 className="text-xs sm:text-lg mb-1">
                  Buyer Guarantee Protected
                </h3>
                <p
                  className={`${poppins.className} text-[10px] sm:text-sm text-[#99A1AF]`}
                >
                  If your event gets cancelled, we&apos;re committed to making
                  it right. Full refunds are processed within 5-7 business days
                  for any cancelled events.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 mt-8 lg:mt-0 space-y-6">
            {/* Timer */}
            <div
              className={`${poppins.className} flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center  px-6 py-4 bg-linear-to-b from-[#6D1DB9] to-[#090014] rounded-xl text-[#E9D5FF]`}
            >
              <RiTimerLine />
              <p className="text-sm sm:text-base">
                Tickets reserved for 10 minutes:
              </p>
              <span className="font-semibold text-lg">{formatTime(timer)}</span>
            </div>

            {/* Order Summary */}
            <div className="bg-linear-to-b from-[#6D1DB9] to-[#090014] rounded-2xl p-6 shadow-xl lg:sticky lg:top-6">
              <h2 className="text-xl mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 text-sm">
                <div className={`${poppins.className} space-y-3`}>
                  <div className="flex justify-between">
                    <span>Tickets</span>
                    <span>2 × €80.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>€160.00</span>
                  </div>
                  <div className="flex justify-between opacity-80">
                    <span>Service Fee (5%)</span>
                    <span>€8.00</span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4 flex justify-between">
                  <span>Total</span>
                  <span className="sm:text-2xl font-semibold">€168.00</span>
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <Select
                  defaultValue={2}
                  sx={{
                    bgcolor: "#6b46c1",
                    color: "white",
                    borderRadius: "12px",
                    fontWeight: 600,
                    "& fieldset": { border: "none" },
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <MenuItem key={n} value={n}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>

                <Button
                  fullWidth
                  sx={{
                    bgcolor: "white",
                    color: "#1f2937",
                    fontWeight: 600,
                    textTransform: "none",
                    py: 1.5,
                    borderRadius: "12px",
                  }}
                >
                  Confirm Quantity <FaArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Helper Component */
function InfoChip({ icon, text }) {
  return (
    <div
      className={`${poppins.className} flex items-center gap-2 bg-[#FFFFFF0D] px-3 py-2 rounded-full border border-[#FFFFFF1A] text-xs sm:text-sm`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
