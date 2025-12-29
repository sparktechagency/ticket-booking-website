import React from "react";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { PiStarFourBold } from "react-icons/pi";
import { CiLock } from "react-icons/ci";

import { Button } from "@mui/material";
import { poppins } from "../utils/FontPoppins";
import Link from "next/link";

export default function ReviewAndConfirm({
  formData,
  orderDetails,
  subtotal,
  serviceFee,
  total,
  handleNext,
}) {
  return (
    <motion.div
      key="review-form"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-5 gap-5"
    >
      <div className="space-y-6 sm:col-span-3">
        {/* Contact Info Display */}
        <div className="bg-[#FFFFFF0D] rounded-2xl p-6 border border-[#FFFFFF1A]">
          <p className="text-xl mb-3">Your Information</p>
          <div className="flex items-center gap-2 mb-4">
            <FaEnvelope className="text-[#BD85F1]" />
            <h2 className={`${poppins.className} text-sm text-[#99A1AF]`}>
              Contact
            </h2>
          </div>
          <div className={`${poppins.className} space-y-1 text-sm`}>
            <p className="text-gray-300">{formData.fullName}</p>
            <p className="text-gray-400">{formData.email}</p>
            <p className="text-gray-400">+1 {formData.phone}</p>
          </div>
          {/* Address Display */}
          <div className="bg-transparent mt-5 pt-5 border-t border-[#FFFFFF1A]">
            <div className="flex items-center gap-2 mb-2">
              <FaMapMarkerAlt className="text-[#BD85F1]" />
              <h2 className={`${poppins.className} text-sm text-[#99A1AF]`}>
                Delivery Address
              </h2>
            </div>
            <div
              className={`${poppins.className} flex flex-wrap items-center text-sm text-white`}
            >
              <p>{formData.addressLine1},</p>
              {formData.addressLine2 && <p>{formData.addressLine2},</p>}
              <p>
                {formData.city}, {formData.zipCode},
              </p>
              <p>{formData.country}</p>
            </div>
          </div>
        </div>

        {/* Payment Method Display */}
        <div className="bg-[#FFFFFF0D] rounded-2xl p-6 border border-[#FFFFFF1A]">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-medium">Payment Method</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#BD85F11A] p-3 rounded-full">
              <FaCreditCard className="text-[#BD85F1] text-2xl" />
            </div>
            <div className={`${poppins.className} flex-1`}>
              <p className="font-medium">Credit Card</p>
              <p className="text-xs text-gray-400">Powered by Stripe</p>
            </div>
          </div>
        </div>

        {/* Secure Payment Notice */}
        <div className="bg-[#FFFFFF0D] rounded-xl p-6 border border-green-500/20">
          <div className={`${poppins.className} flex items-start gap-3`}>
            <div className="bg-[#00C9501A] p-3 rounded-full">
              <CiLock className="text-[#05DF72] text-xl" />
            </div>
            <div>
              <h3 className=" font-semibold mb-1">Secure Payment</h3>
              <p className="text-xs sm:text-sm text-[#99A1AF]">
                Your payment information is encrypted and secure. We never store
                your card details.
              </p>
            </div>
          </div>
        </div>

        <div>
          {/* Zero Service Fees Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#2B024E] rounded-t-2xl p-6 border border-purple-500/30"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#BD85F133] p-3 rounded-xl">
                <PiStarFourBold className="text-[#BD85F1] sm:text-xl" />
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-medium mb-1">
                  Zero Service Fees - All Year
                </h3>
                <p className={`${poppins.className} text-xs text-gray-400`}>
                  Save €{serviceFee.toFixed(2)} on this order and on every
                  future purchase
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
            <h2 className="text-sm sm:text-lg font-medium mb-2">
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
      </div>
      <div className="space-y-4 sm:col-span-2">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-linear-to-br from-[#6D1DB9] to-[#090014] backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
        >
          <h2 className="text-xl mb-6">Order Summary</h2>

          <div className={`${poppins.className} space-y-3 mb-4 text-sm`}>
            <div className="flex justify-between text-gray-300">
              <span>Tickets</span>
              <span>
                {orderDetails.tickets.quantity} × €
                {orderDetails.tickets.price.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Service Fee ({orderDetails.serviceFeePercent}%)</span>
              <span>€{serviceFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-white/20 pt-3 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Pay Button */}
        <Button
          fullWidth
          onClick={handleNext}
          variant="contained"
          startIcon={<FaLock />}
          sx={{
            background: "linear-gradient(to right, #8F18FB, #5B06A7)",
            color: "white",
            py: 1.5,
            fontSize: "16px",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              background: "linear-gradient(to right, #7c3aed, #6d28d9)",
              boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
            },
          }}
        >
          Pay Now €{total.toFixed(2)}
        </Button>
      </div>
    </motion.div>
  );
}
