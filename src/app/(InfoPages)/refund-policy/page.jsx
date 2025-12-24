"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiWarning } from "react-icons/ci";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0d27] flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-[36px] text-white mb-4">
            Refund Policy
          </h1>
          <p className={`${poppins.className} text-[#99A1AF]`}>
            Our promise to you: The 100% Buyer Guarantee.
          </p>
        </motion.div>

        {/* Adrien Guarantee Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-linear-to-r from-[#04092C] to-[#6D1DB9] rounded-3xl p-8 sm:p-10 shadow-2xl mb-12"
        >
          <div className="flex items-start gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-2xl text-white mb-4">
                The Adrien Guarantee
              </h2>
              <p className={`${poppins.className} text-[#FFFFFFCC]`}>
                We promise that you will receive valid tickets in time for the
                event. If a problem arises, we will step in to provide
                comparable or better tickets, or a full refund.
              </p>
            </div>
          </div>

          {/* Tabs-like Buttons */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-[#FFFFFF1A] hover:bg-purple-800 px-6 py-3 rounded-full text-white transition-all">
              <IoMdCheckmarkCircleOutline className="text-[#05DF72]" />
              <p className={`${poppins.className} text-sm`}>
                Full Refund for Cancelled Events
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#FFFFFF1A] hover:bg-purple-800 px-6 py-3 rounded-full text-white transition-all">
              <IoMdCheckmarkCircleOutline className="text-[#05DF72]" />
              <p className={`${poppins.className} text-sm`}>
                Valid Entry Guarantee
              </p>
            </div>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {/* Event Cancellations */}
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl sm:text-2xl text-white mb-4">
              Event Cancellations
            </h2>
            <p className={`${poppins.className} text-[#99A1AF]`}>
              If an event is cancelled and not rescheduled, you will receive a
              full refund of the purchase price, including all service fees. No
              action is required on your part; we will automatically process the
              refund to the original payment method.
            </p>
          </motion.section>

          {/* Rescheduled Events */}
          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl sm:text-2xl text-white mb-4">
              Rescheduled Events
            </h2>
            <p className={`${poppins.className} text-[#99A1AF]`}>
              If an event is postponed or rescheduled, your tickets will
              automatically be valid for the new date. Refunds are typically not
              available for rescheduled events unless the organizer offers them.
              If you cannot attend the new date, you can list your tickets for
              sale on our marketplace.
            </p>
          </motion.section>

          {/* Replacement Tickets */}
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl sm:text-2xl text-white mb-4">
              Replacement Tickets
            </h2>
            <p className={`${poppins.className} text-[#99A1AF]`}>
              In the rare event that there is an issue with your tickets (e.g.,
              the seller fails to deliver), we will work to find you comparable
              or better tickets at no additional cost. If replacements cannot be
              found, you will receive a 100% refund.
            </p>
          </motion.section>
        </div>

        {/* Warning Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 bg-[#F0B1001A] border border-[#F0B10033] rounded-2xl p-6 flex items-start gap-4"
        >
          <CiWarning className="text-[#F0B100] text-2xl shrink-0 mt-1" />
          <p className={`${poppins.className} text-[#FFF085] text-sm`}>
            Please note that except for the specific circumstances listed above,
            all sales are final. We cannot offer refunds for personal reasons,
            such as scheduling conflicts or illness.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
