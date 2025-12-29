"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import InfoForm from "@/components/CheckoutPageForms/InfoForm";
import AddressForm from "@/components/CheckoutPageForms/AddressForm";
import PaymentMethodForm from "@/components/CheckoutPageForms/PaymentMethodForm";
import ReviewAndConfirm from "@/components/CheckoutPageForms/ReviewAndConfirm";
import CountdownTimer from "@/components/utils/CountdownTimer";
import { poppins } from "@/components/utils/FontPoppins";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
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

  const [errors, setErrors] = useState({});

  // Order details
  const orderDetails = {
    tickets: { quantity: 2, price: 80.0 },
    serviceFeePercent: 5,
  };

  const subtotal = orderDetails.tickets.quantity * orderDetails.tickets.price;
  const serviceFee = (subtotal * orderDetails.serviceFeePercent) / 100;
  const total = subtotal + serviceFee;

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

    if (name === "expiry") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .trim();
      if (formattedValue.length > 5) return;
    }

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
      if (!formData.expiry || formData.expiry.length < 5)
        newErrors.expiry = true;
      if (!formData.cvc || formData.cvc.length < 3) newErrors.cvc = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        console.log("Payment submitted:", formData);
        alert("Payment successful! (Demo)");
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

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e27] via-[#16112e] to-[#0a0e27] text-white px-4 py-10">
      <div className="flex flex-col gap-5 items-center justify-center">
        <CountdownTimer />
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep > 1 && currentStep < 4 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={handleBack}
                className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors"
              >
                <FaArrowLeft />
                <span className="text-sm uppercase tracking-wider">Back</span>
              </motion.button>
            )}
            <div className="mb-8">
              <h1 className="sm:text-lg  lg:text-2xl font-semibold mb-2">
                {currentStep === 1
                  ? "Your Information"
                  : currentStep === 2
                  ? "Address"
                  : currentStep === 3
                  ? "Payment Method"
                  : ""}
              </h1>
              {currentStep < 4 && (
                <p
                  className={`${poppins.className} text-xs sm:text-sm text-gray-400`}
                >
                  We&apos;ll use this information to send your tickets and keep
                  you updated.
                </p>
              )}
            </div>
          </AnimatePresence>

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
                handleChange={handleChange}
                handleNext={handleNext}
                inputStyles={inputStyles}
              />
            )}

            {currentStep === 4 && (
              <ReviewAndConfirm
                key="review-form"
                formData={formData}
                orderDetails={orderDetails}
                subtotal={subtotal}
                serviceFee={serviceFee}
                total={total}
                handleNext={handleNext}
              />
            )}
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3, 4].map((step) => (
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
      </div>
    </div>
  );
}
