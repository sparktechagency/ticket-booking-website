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
      className="grid grid-cols-1 lg:grid-cols-2 gap-5"
    >
      <div className="space-y-6 sm:col-span-3">
        {/* Contact Info Display */}
        

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

      

  
      </div>
    </motion.div>
  );
}
