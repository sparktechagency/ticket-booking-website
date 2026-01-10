/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import { GoDotFill, GoInfo } from "react-icons/go";
import InfoForm from "@/components/CheckoutPageForms/InfoForm";
import AddressForm from "@/components/CheckoutPageForms/AddressForm";
import PaymentMethodForm from "@/components/CheckoutPageForms/PaymentMethodForm";
import CountdownTimer from "@/components/utils/CountdownTimer";
import { poppins } from "@/components/utils/FontPoppins";
import { toast } from "sonner";

import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import BuyerGuarantee from "@/components/utils/BuyerGuarantee";
import SecurePaymentNotice from "@/components/utils/SecurePaymentNotice";
import Link from "next/link";
import { PiStarFourBold } from "react-icons/pi";
import { useGetSingleEventQuery } from "@/Redux/slices/eventsApi";
import dayjs from "dayjs";
import { getImageUrl } from "@/utils/baseUrl";
import { useParams, useSearchParams } from "next/navigation";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [timerStarted, setTimerStarted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvc: "",
  });
  const imageUrl = getImageUrl();

  const params = useParams();
  const searchParams = useSearchParams();

  const eventId = params.id;
  const ticketType = searchParams.get("ticketType");
  const ticketQuantity = Number(searchParams.get("ticketQuantity"));
  console.log(eventId);
  console.log(ticketType);
  console.log(ticketQuantity);

  const {
    data: singleEventData,
    isLoading,
    isError,
  } = useGetSingleEventQuery(eventId);
  const eventData = singleEventData?.data;
  console.log("singleEventData", eventData);

  useEffect(() => {
    const started = localStorage.getItem("checkout_timer_end");
    if (started) {
      setTimeout(() => {
        setTimerStarted(true);
      }, 0);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      if (formattedValue.length > 19) return;
    }

    // if (name === "expiry") {
    //   formattedValue = value
    //     .replace(/\s/g, "")
    //     .replace(/(\d{2})(\d{0,2})/, "$1/$2")
    //     .trim();
    //   if (formattedValue.length > 5) return;
    // }

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

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = true;
      if (!formData.email || !formData.email.includes("@"))
        newErrors.email = true;
      if (!formData.phone || formData.phone.length < 10) newErrors.phone = true;
    } else if (step === 2) {
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = true;
      if (!formData.city.trim()) newErrors.city = true;
      if (!formData.zipCode.trim()) newErrors.zipCode = true;
      if (!formData.country.trim()) newErrors.country = true;
    } else if (step === 3) {
      if (
        !formData.cardNumber ||
        formData.cardNumber.replace(/\s/g, "").length < 16
      )
        newErrors.cardNumber = true;
      if (!formData.cardHolder.trim()) newErrors.cardHolder = true;

      // Enhanced expiry validation
      if (!formData.expiry || !formData.expiry.includes("/")) {
        newErrors.expiry = true;
      } else {
        const [month, year] = formData.expiry.split("/");
        // Check if we have valid month and year (either YY or YYYY)
        if (!month || !year || (year.length !== 2 && year.length !== 4)) {
          newErrors.expiry = true;
        } else {
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1;

          let fullYear;
          if (year.length === 2) {
            fullYear = 2000 + parseInt(year);
          } else {
            fullYear = parseInt(year);
          }

          // Check if expired
          if (
            fullYear < currentYear ||
            (fullYear === currentYear && parseInt(month) < currentMonth)
          ) {
            newErrors.expiry = true;
          }
        }
      }

      if (!formData.cvc || formData.cvc.length < 3) newErrors.cvc = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        console.log("Payment submitted:", formData);
        toast.success("Payment successful! (Demo)");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const inputStyles = {
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
      py: 1.5,
      fontSize: "14px",
    },
  };

  if (isLoading || !eventData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="success" size={80} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e27] via-[#16112e] to-[#0a0e27] text-white px-4 py-10">
      <div className="flex flex-col gap-5 justify-center max-w-5xl mx-auto">
        {/* Header Section - Back Button, Title, and Timer */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="">
            <div>
              {currentStep > 1 && currentStep <= 3 && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={handleBack}
                  className="flex items-center gap-2  text-xs sm:text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <FaArrowLeft />
                  <span className="uppercase tracking-wider">Back</span>
                </motion.button>
              )}
              <div>
                <h1 className="text-sm sm:text-lg lg:text-xl font-semibold mb-2">
                  {currentStep === 1
                    ? "Your Information"
                    : currentStep === 2
                    ? "Address"
                    : currentStep === 3
                    ? "Payment Confirmation"
                    : ""}
                </h1>
                {currentStep < 3 && (
                  <p
                    className={`${poppins.className} text-xs sm:text-sm text-gray-400`}
                  >
                    We&apos;ll use this information to send your tickets and
                    keep you updated.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="">
            <CountdownTimer started={timerStarted} />
          </div>
        </div>
        {/* form section */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <InfoForm
                  key="info-form"
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  inputStyles={inputStyles}
                />
              )}

              {currentStep === 2 && (
                <AddressForm
                  key="address-form"
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  inputStyles={inputStyles}
                />
              )}

              {currentStep === 3 && (
                <PaymentMethodForm
                  key="payment-form"
                  formData={formData}
                  errors={errors}
                  setErrors={setErrors}
                  handleChange={handleChange}
                  handleNext={handleNext}
                  inputStyles={inputStyles}
                />
              )}
            </AnimatePresence>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  initial={{ width: 8 }}
                  animate={{
                    width: step === currentStep ? 32 : 8,
                    backgroundColor:
                      step <= currentStep
                        ? "rgb(168, 85, 247)"
                        : "rgb(75, 85, 99)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
          </div>
          {/* Order Summary */}
          <div className="max-w-lg lg:min-w-md mx-auto space-y-3">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-linear-to-br from-[#6D1DB9] to-[#090014] backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/30 w-full "
              >
                <h2 className="text-sm sm:text-lg lg:text-xl mb-4 sm:mb-6 font-semibold">
                  Order Summary
                </h2>

                {/* Event Details */}
                <div
                  className={`${poppins.className} flex items-start sm:items-center justify-between gap-5 mb-4`}
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-[#e7fbff] font-semibold text-sm sm:text-base wrap-break-word">
                      {eventData?.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-[#e2e2e2]">
                      <p className="whitespace-nowrap">{`${dayjs(
                        eventData?.eventDate
                      ).format("MMM DD, YYYY")} `}</p>
                      <GoDotFill className="" />
                      <p className="whitespace-nowrap">{`${dayjs(
                        eventData?.eventDate
                      ).format("h:mm A")} `}</p>
                    </div>
                    <p className="text-xs sm:text-sm text-[#e2e2e2] wrap-break-word">
                      {`${eventData?.venueName}, ${eventData?.city}`}
                    </p>
                  </div>
                  <img
                    src={`${imageUrl}${eventData?.thumbnail}`}
                    alt="Event"
                    width={50}
                    height={50}
                    className="rounded-lg shrink-0 size-16 sm:size-18"
                  />
                </div>

                <Divider
                  sx={{
                    bgcolor: "rgba(255,255,255,0.5)",
                    my: { xs: 1.5, sm: 2 },
                  }}
                />

                {/* Ticket Info */}
                <div
                  className={`${poppins.className} flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#e2e2e2] mb-3`}
                >
                  <p>{ticketQuantity} Tickets</p>
                  <GoDotFill className="shrink-0" />
                  <p>{ticketType}</p>
                </div>

                <Divider
                  sx={{
                    bgcolor: "rgba(255,255,255,0.5)",
                    my: { xs: 1.5, sm: 2 },
                  }}
                />

                {/* Price Breakdown */}
                <div className={`${poppins.className} mb- text-xs sm:text-sm`}>
                  <div className="flex justify-between text-gray-300 text-sm sm:text-base lg:text-lg">
                    <span>Price</span>
                    <span className="font-medium">
                      {ticketQuantity} × €
                      {eventData?.ticketCategories.find(
                        (category) => category.ticketName === ticketType
                      )?.pricePerTicket ?? 0}
                    </span>
                  </div>

                  {currentStep === 3 && (
                    <div className="flex items-center justify-between text-gray-300">
                      <div>
                        <span>Fees</span>
                        <Tooltip title="Fulfillment and service fees help us bring you a safe, global marketplace where you can get tickets to your favourite event.">
                          <IconButton>
                            <GoInfo className="text-lg text-white" />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <span className="font-medium">
                        {/* €{serviceFee.toFixed(2)} */}
                      </span>
                    </div>
                  )}

                  {currentStep !== 3 && (
                    <p
                      className={`${poppins.className} text-[10px] sm:text-xs text-[#cccccc]`}
                    >
                      Tax, fulfillment fee, and service fee not included.
                    </p>
                  )}

                  {currentStep === 3 && (
                    <div className="flex justify-between text-gray-400">
                      <span className="text-xs sm:text-sm">Tax</span>
                      {/* <span className="font-medium">€{orderDetails.tax}</span> */}
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="border-t border-white/20 pt-2 sm:pt-3 mt-2 sm:mt-3 flex justify-between text-base sm:text-lg lg:text-xl font-semibold text-white">
                      <span>Total</span>
                      {/* <span>€{total.toFixed(2)}</span> */}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Pay Button */}
              {currentStep == 3 && (
                <Button
                  fullWidth
                  onClick={handleNext}
                  variant="contained"
                  startIcon={<FaLock />}
                  sx={{
                    background: "linear-gradient(to right, #8F18FB, #5B06A7)",
                    color: "white",
                    py: 1,
                    fontSize: "14px",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      background: "linear-gradient(to right, #7c3aed, #6d28d9)",
                      boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
                    },
                  }}
                >
                  {/* Pay Now €{total.toFixed(2)} */}
                  Pay Now
                </Button>
              )}
            </div>
            {/* Secure Payment Notice */}
            {currentStep === 3 && <SecurePaymentNotice />}
            {/* Buyer Guarantee */}
            {currentStep === 3 && <BuyerGuarantee />}
          </div>
        </div>{" "}
        {currentStep === 3 && (
          <div className="lg:min-w-3xl">
            {/* Zero Service Fees Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#2B024E] rounded-t-2xl p-3 sm:p-6 border border-purple-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="bg-[#BD85F133] p-3 rounded-xl">
                  <PiStarFourBold className="text-[#BD85F1] sm:text-xl" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-lg font-medium mb-1">
                    Zero Service Fees - All Year
                  </h3>
                  <p className={`${poppins.className} text-xs text-gray-400`}>
                    {/* Save €{serviceFee.toFixed(2)} on this order and on every
                    future purchase */}
                    Save money on this order and on every future purchase
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Unlock Premium Membership */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-[#0f041e] rounded-b-2xl p-6 border-b border-r border-l border-gray-700/50"
            >
              <h2 className="text-xs sm:text-lg font-medium mb-2">
                Unlock Premium Membership
              </h2>
              <p className={`${poppins.className} text-xs text-gray-400 mb-4`}>
                Join today and never pay service fees again
              </p>

              <ul
                className={`${poppins.className} space-y-2 mb-4 text-xs sm:text-sm`}
              >
                <li className="flex items-center gap-2">
                  <span className="text-[#BD85F1]">•</span>
                  <span className="text-gray-300">
                    Priority access to exclusive events
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#BD85F1]">•</span>
                  <span className="text-gray-300">
                    Early bird ticket releases
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#BD85F1]">•</span>
                  <span className="text-gray-300">VIP customer support</span>
                </li>
              </ul>

              <div
                className={`${poppins.className} bg-[#030A1D] rounded-lg p-4 border border-white/10 mb-4 space-y-2 text-xs sm:text-sm`}
              >
                <div className="flex justify-between">
                  <span className="text-[#99A1AF]">Membership (Annual)</span>
                  <span className="text-[#E9D5FF]">€49.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#99A1AF]">Est. yearly savings</span>
                  <span className="text-[#E9D5FF]">€1200.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-700 sm:text-base">
                  <span className="text-green-400">✓ Net Benefit</span>
                  <span className="text-white font-semibold">€1150.01</span>
                </div>
              </div>

              <Link
                href="/membership"
                className="bg-linear-to-r from-[#8b5cf6] to-[#7c3aed] p-1.5 sm:p-3 w-full rounded-lg text-xs sm:text-sm font-medium hover:from-[#7c3aed] hover:to-[#6d28d9] hover:shadow-lg transition-all duration-300 text-center block"
              >
                ✨ Upgrade to Premium
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
