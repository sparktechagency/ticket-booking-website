"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCreditCard,
  FaLock,
} from "react-icons/fa";
import { RiTimerLine, RiVisaLine } from "react-icons/ri";
import { SiMastercard, SiAmericanexpress } from "react-icons/si";
import { PiStarFourBold } from "react-icons/pi";

import { Button, TextField, InputAdornment } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountdownTimer from "@/components/utils/CountdownTimer";
import { poppins } from "@/components/utils/FontPoppins";

export default function Checkout() {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "demo@example.com",
    address: "",
    phone: "(555) 000-0000",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      if (formattedValue.length > 19) return;
    }

    // Format expiry as MM / YY
    if (name === "expiry") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1 / $2")
        .trim();
      if (formattedValue.length > 7) return;
    }

    // Limit CVC to 3 digits
    if (name === "cvc" && value.length > 3) return;

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = true;
    if (!formData.email || !formData.email.includes("@"))
      newErrors.email = true;
    if (!formData.address.trim()) newErrors.address = true;
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = true;
    if (
      !formData.cardNumber ||
      formData.cardNumber.replace(/\s/g, "").length < 16
    )
      newErrors.cardNumber = true;
    if (!formData.expiry || formData.expiry.length < 7) newErrors.expiry = true;
    if (!formData.cvc || formData.cvc.length < 3) newErrors.cvc = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Payment submitted:", formData);
      alert("Payment successful! (Demo)");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e27] via-[#16112e] to-[#0a0e27] text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
        >
          <FaArrowLeft />
          <span className="uppercase tracking-wider">Back</span>
        </Link>

        {/* Main Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* LEFT COLUMN - Forms */}
          <div className="lg:col-span-3 space-y-6">
            <h1 className="text-lg sm:text-2xl lg:text-4xl">Checkout</h1>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#2B024E] rounded-2xl p-4 sm:p-8 border border-purple-500/20"
            >
              <h2 className="text-lg sm:text-xl mb-6">Contact Information</h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block  text-xs sm:text-sm text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <TextField
                    fullWidth
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    error={errors.fullName}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        borderRadius: "12px",
                        color: "black",
                        "& fieldset": { border: "none" },
                        "&.Mui-error": {
                          boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.5)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        py: {
                          xs: 1,
                          sm: 1.5,
                        },
                        fontSize: "14px",
                      },
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block  text-xs sm:text-sm text-gray-400 mb-2">
                    Email *
                  </label>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="demo@example.com"
                    error={errors.email}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        borderRadius: "12px",
                        color: "black",
                        "& fieldset": { border: "none" },
                        "&.Mui-error": {
                          boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.5)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        py: {
                          xs: 1,
                          sm: 1.5,
                        },
                        fontSize: "14px",
                      },
                    }}
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block  text-xs sm:text-sm text-gray-400 mb-2">
                    Address *
                  </label>
                  <TextField
                    fullWidth
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    error={errors.address}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        borderRadius: "12px",
                        color: "black",
                        "& fieldset": { border: "none" },
                        "&.Mui-error": {
                          boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.5)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        py: {
                          xs: 1,
                          sm: 1.5,
                        },
                        fontSize: "14px",
                      },
                    }}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                    Phone Number *
                  </label>
                  <TextField
                    fullWidth
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    error={errors.phone}
                    InputProps={{
                      startAdornment: (
                        <span className="text-gray-500 mr-2 select-none">
                          +1
                        </span>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        borderRadius: "12px",
                        color: "black",
                        "& fieldset": { border: "none" },
                        "&.Mui-error": {
                          boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.5)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        py: {
                          xs: 1,
                          sm: 1.5,
                        },
                        fontSize: "14px",
                      },
                    }}
                  />
                </div>
              </div>
            </motion.div>

            <div>
              {/* Zero Service Fees Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-linear-to-r from-[#BD85F11A] to-[#6D1DB91A] rounded-2xl p-6 border border-purple-500/30"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#BD85F133] p-1 sm:p-3 rounded-xl">
                    <PiStarFourBold className="text-[#BD85F1]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-xl mb-1">
                      Zero Service Fees - All Year
                    </h3>
                    <p
                      className={`${poppins.className} text-xs text-[#99A1AF]`}
                    >
                      Save €270.00 on this order and on every future purchase
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Premium Membership */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#0f041e] rounded-2xl p-6 sm:p-8 border border-gray-700/50"
              >
                <h2 className="text-xs sm:text-xl mb-3">
                  Unlock Premium Membership
                </h2>
                <p
                  className={`${poppins.className} text-xs text-[#99A1AF] mb-6`}
                >
                  Join today and never pay service fees again
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm sm:text-base">
                    <span className="text-[#BD85F1]">•</span>
                    <span
                      className={`${poppins.className} text-[#E9D5FF] text-xs sm:text-sm`}
                    >
                      Priority access to exclusive events
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-sm sm:text-base">
                    <span className="text-[#BD85F1]">•</span>
                    <span
                      className={`${poppins.className} text-[#E9D5FF] text-xs sm:text-sm`}
                    >
                      Early bird ticket releases
                    </span>
                  </li>
                  <li className="flex items-center gap-3 ">
                    <span className="text-[#BD85F1]">•</span>
                    <span
                      className={`${poppins.className} text-[#E9D5FF] text-xs sm:text-sm`}
                    >
                      VIP customer support
                    </span>
                  </li>
                </ul>

                <div
                  className={`${poppins.className} space-y-3 mb-6 bg-[#030A1D] rounded-lg p-3 border border-[#FFFFFF1A]`}
                >
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className=" text-[#99A1AF]">Membership (Annual)</span>
                    <span className="sm:text-base text-[#E9D5FF]">€49.99</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-[#99A1AF]">Est. yearly savings</span>
                    <span className="sm:text-base text-[#E9D5FF]">
                      €1200.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                    <p className="text-white text-xs sm:text-sm">
                      <span className="text-[#05DF72]"> ✓</span> Net Benefit
                    </p>
                    <span className="text-sm sm:text-base sm:font-semibold text-white">
                      €1150.01
                    </span>
                  </div>
                </div>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "linear-gradient(to right, #8b5cf6, #7c3aed)",
                    color: "white",
                    py: {
                      xs: 0.5,
                      sm: 1.5,
                    },
                    borderRadius: "12px",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: {
                      xs: 500,
                      lg: 600,
                    },
                    "&:hover": {
                      background: "linear-gradient(to right, #7c3aed, #6d28d9)",
                    },
                  }}
                >
                  ✨ Upgrade to Premium
                </Button>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN - Order Summary & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timer */}
            <CountdownTimer />
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-linear-to-br from-purple-900/60 to-purple-950/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
            >
              <h2 className="text-xl mb-6">Order Summary</h2>

              <div className={`${poppins.className} space-y-4 mb-6 text-sm}`}>
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
                  <span className="sm:text-2xl font-semibold">€168.00</span>
                </div>
              </div>
            </motion.div>
            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#2B024E] rounded-2xl p-3 sm:p-6 border border-purple-500/30"
            >
              <h2 className="text-xl mb-6">Payment Method</h2>

              {/* Payment Option */}
              <div className="bg-[#BD85F11A] border border-[#BD85F1] rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <FaCreditCard className="text-xl text-[#BD85F1]" />
                  <div className={`${poppins.className}`}>
                    <p className="text-xs sm:text-sm font-medium">
                      Credit / Debit Card
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400">
                      Powered by Stripe
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Information */}
              <h3 className="text-lg mb-4">Card Information</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Card Number */}
                <div>
                  <TextField
                    fullWidth
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 1234 1234 1234"
                    error={errors.cardNumber}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <div className="flex gap-1">
                            <RiVisaLine className="text-2xl text-blue-600" />
                            <SiMastercard className="text-xl text-red-600" />
                            <SiAmericanexpress className="text-xl text-blue-500" />
                          </div>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        borderRadius: "12px",
                        color: "black",
                        "& fieldset": { border: "none" },
                        "&.Mui-error": {
                          boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.5)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        py: {
                          xs: 1,
                          sm: 1.5,
                        },
                        fontSize: "14px",
                      },
                    }}
                  />
                </div>

                {/* Expiry and CVC */}
                <div className="flex gap-4">
                  <TextField
                    fullWidth
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM / YY"
                    error={errors.expiry}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        borderRadius: "12px",
                        color: "black",
                        "& fieldset": { border: "none" },
                        "&.Mui-error": {
                          boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.5)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        py: {
                          xs: 1,
                          sm: 1.5,
                        },
                        fontSize: "14px",
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    placeholder="CVC"
                    error={errors.cvc}
                    type="password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <FaCreditCard className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        borderRadius: "12px",
                        color: "black",
                        "& fieldset": { border: "none" },
                        "&.Mui-error": {
                          boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.5)",
                        },
                      },
                      "& .MuiInputBase-input": {
                        py: {
                          xs: 1,
                          sm: 1.5,
                        },
                        fontSize: "14px",
                      },
                    }}
                  />
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FaLock className="text-sm" />
                  <span
                    className={`${poppins.className} text-xs sm:text-sm text-[#99A1AF]`}
                  >
                    Your payment information is secure and encrypted
                  </span>
                </div>

                {/* Pay Button */}
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    endIcon={<FaArrowRight />}
                    sx={{
                      background: "linear-gradient(to right, #8F18FB, #5B06A7)",
                      color: "white",
                      py: {
                        xs: 1,
                        sm: 1.5,
                      },
                      fontSize: "14px",
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #7c3aed, #6d28d9)",
                        boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
                      },
                    }}
                  >
                    Pay
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
