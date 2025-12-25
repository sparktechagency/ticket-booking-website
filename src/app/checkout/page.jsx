"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RiTimerLine } from "react-icons/ri";

import { Poppins } from "next/font/google";
import { Button, TextField } from "@mui/material";
import Link from "next/link";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function Checkout() {
  const [timer, setTimer] = useState(600);
  const [formFormData, setFormData] = useState({
    email: "demo@example.com",
    fullName: "John Doe",
    phone: "(555) 000-0000",
  });

  const [errors, setErrors] = useState({
    email: false,
    fullName: false,
    phone: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: !FormData.email || !FormData.email.includes("@"),
      fullName: !FormData.fullName.trim(),
      phone: !FormData.phone || FormData.phone.length < 10,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // All fields are valid — proceed to checkout/payment
      console.log("Form submitted successfully:", FormData);
      alert("Checkout successful! (Demo)");
      // In real app: redirect to payment or next step
    } else {
      console.log("Validation failed");
    }
  };

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
        <Link
          href="/events"
          className={`${poppins.className} flex items-center gap-2 mb-3 text-[#99A1AF] text-sm uppercase`}
        >
          <FaArrowLeft />
          Back to events
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-8">
            <h1 className="text-lg sm:text-3xl md:text-4xl">Checkout</h1>

            <div className="bg-[#2B024E] p-4 sm:p-8 rounded-lg">
              <p>Contact Information</p>
              <form onSubmit={handleSubmit} className="mt-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full"
                >
                  {/* Card Container */}

                  {/* Form Fields */}
                  <div className=" space-y-2 sm:space-y-4">
                    {/* Email */}
                    <div>
                      <label
                        className={`${poppins.className} text-sm text-[#99A1AF] mb-2`}
                      >
                        Email *
                      </label>
                      <TextField
                        fullWidth
                        name="email"
                        value={FormData.email}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="your@email.com"
                        type="email"
                        error={errors.email}
                        helperText={
                          errors.email ? "Please enter a valid email" : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "white",
                            borderRadius: "12px",
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": {
                              border: "none",
                              boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.3)",
                            },
                            "&.Mui-error fieldset": {
                              boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.3)",
                            },
                          },
                          "& .MuiInputBase-input": {
                            py: {
                              xs: 1,
                              sm: 1.5,
                            },
                            fontSize: "1rem",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#fca5a5",
                            ml: 1,
                          },
                        }}
                      />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label
                        className={`${poppins.className} text-sm text-[#99A1AF] mb-2`}
                      >
                        Full Name *
                      </label>
                      <TextField
                        fullWidth
                        name="fullName"
                        value={FormData.fullName}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Enter your full name"
                        error={errors.fullName}
                        helperText={
                          errors.fullName ? "Full name is required" : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "white",
                            borderRadius: "12px",
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": {
                              border: "none",
                              boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.3)",
                            },
                            "&.Mui-error fieldset": {
                              boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.3)",
                            },
                          },
                          "& .MuiInputBase-input": {
                            py: {
                              xs: 1,
                              sm: 1.5,
                            },
                            fontSize: "1rem",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#fca5a5",
                            ml: 1,
                          },
                        }}
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        className={`${poppins.className} text-sm text-[#99A1AF]`}
                      >
                        Phone Number *
                      </label>
                      <TextField
                        fullWidth
                        name="phone"
                        value={FormData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="(555) 000-0000"
                        type="tel"
                        error={errors.phone}
                        helperText={
                          errors.phone
                            ? "Please enter a valid phone number"
                            : ""
                        }
                        InputProps={{
                          startAdornment: (
                            <span className="text-gray-500 mr-3 pl-4 select-none">
                              +1
                            </span>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            bgcolor: "white",
                            borderRadius: "12px",
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": {
                              border: "none",
                              boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.3)",
                            },
                            "&.Mui-error fieldset": {
                              boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.3)",
                            },
                          },
                          "& .MuiInputBase-input": {
                            py: {
                              xs: 1,
                              sm: 1.5,
                            },
                            fontSize: "1rem",
                            paddingLeft: "8px",
                          },
                          "& .MuiFormHelperText-root": {
                            color: "#fca5a5",
                            ml: 1,
                          },
                        }}
                      />
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 sm:mt-8"
                  >
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<FaArrowRight />}
                      sx={{
                        background:
                          "linear-gradient(to right,  #8F18FB, #5B06A7)",
                        color: "white",
                        fontWeight: 600,
                        textTransform: "none",
                        py: {
                          xs: 1,
                          sm: 1.5,
                        },
                        borderRadius: "14px",

                        "&:hover": {
                          background:
                            "linear-gradient(to right, #c084fc, #a78bfa)",
                          boxShadow: "0 12px 30px rgba(139, 92, 246, 0.5)",
                        },
                        "&:disabled": {
                          opacity: 0.7,
                          cursor: "not-allowed",
                        },
                      }}
                    >
                      Checkout
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 mt-4 lg:mt-0 space-y-6">
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
              <h2 className="sm:text-xl mb-6">Order Summary</h2>

              <div
                className={`${poppins.className} space-y-4 mb-6 text-xs sm:text-sm}`}
              >
                <div className="space-y-3">
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
                  <span className="text-lg sm:text-2xl font-semibold">
                    €168.00
                  </span>
                </div>
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
