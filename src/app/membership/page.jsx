"use client";

import React from "react";
import { motion } from "framer-motion";

import { FaCheck, FaTag, FaRegStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { AiOutlineThunderbolt } from "react-icons/ai";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function Membership() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80 },
    },
  };

  return (
    <div className="min-h-screen bg-[#04092C] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-[36px] mb-4">
            Say no to extra fees
          </h1>
          <p
            className={`${poppins.className} text-lg sm:text-xl text-[#99A1AF]`}
          >
            Become a member for just €30/year and enjoy zero platform fees plus
            exclusive perks
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          {/* Regular Member Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-[#080014] rounded-xl border border-[#FFFFFF1A] shadow-lg p-8 lg:p-5"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-2xl mb-2">Regular Member</h2>
              <p className={`${poppins.className} text-[#99A1AF]`}>
                Pay as you go
              </p>
            </div>

            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-4">
                <div className="bg-[#FFFFFF0D] p-2 rounded-full">
                  <FaCheck className="text-[#99A1AF]" />
                </div>
                <div>
                  <p className="text-gray-200">Access to all events</p>
                  <p className={`${poppins.className} text-[#99A1AF]`}>
                    Access to all events
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-[#FFFFFF0D] p-2 rounded-full">
                  <FaCheck className="text-[#99A1AF]" />
                </div>
                <div>
                  <p className="text-gray-200"> Dynamic pricing</p>
                  <p className={`${poppins.className} text-[#99A1AF]`}>
                    Save when buying in bulk
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-[#FB2C361A] border border-[#FB2C3633] p-2 rounded-full">
                  <IoMdClose className="text-[#FF6467]" />
                </div>
                <div>
                  <p className="text-gray-200">5% platform fee applies</p>
                  <p className={`${poppins.className} text-[#99A1AF]`}>
                    Added to every purchase
                  </p>
                </div>
              </li>
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-5 border border-purple-500/50 rounded-xl text-lg font-medium hover:bg-purple-900/30 transition-all duration-300"
            >
              Join Now
            </motion.button>
          </motion.div>

          {/* Premium Member Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="relative bg-[#1B103C] rounded-3xl border border-[#BD85F14D] shadow-xl shadow-[#59168B33] p-8 lg:p-10 overflow-hidden"
          >
            {/* Glow effect */}
            {/* <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 pointer-events-none" /> */}

            <div className="relative z-10">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-2xl mb-2">Premium Member</h2>
                <div className="flex items-end gap-1 justify-center">
                  <p className="text-4xl sm:text-5xl font-semibold text-[#FFFFFF]">
                    €30
                  </p>
                  <span
                    className={`${poppins.className} text-base text-[#99A1AF]`}
                  >
                    /year
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-4">
                  <div className="bg-[#BD85F1] border border-[#AD46FF4D] p-2 rounded-full">
                    <FaCheck className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-200">Access to all events</p>
                    <p className={`${poppins.className} text-[#99A1AF]`}>
                      Browse and purchase tickets
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-[#BD85F1] border border-[#AD46FF4D] p-2 rounded-full">
                    <FaTag className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-200">Zero platform fees</p>
                    <p className={`${poppins.className} text-[#99A1AF]`}>
                      Waived on every purchase
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-[#BD85F1] border border-[#AD46FF4D] p-2 rounded-full">
                    <FaRegStar className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-200">Exclusive community access</p>
                    <p className={`${poppins.className} text-[#99A1AF]`}>
                      Member-only Discord channels
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-[#BD85F1] border border-[#AD46FF4D] p-2 rounded-full">
                    <AiOutlineThunderbolt className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-200">Priority support</p>
                    <p className={`${poppins.className} text-[#99A1AF]`}>
                      Get help faster via WhatsApp
                    </p>
                  </div>
                </li>
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-5 bg-linear-to-r from-[#8F18FB] to-[#5B06A7] rounded-xl text-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Become a Premium Member
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
