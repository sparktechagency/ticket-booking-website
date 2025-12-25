"use client";

import React from "react";
import { motion } from "framer-motion";
import { MdConfirmationNumber } from "react-icons/md";
import { Poppins } from "next/font/google";
import { Button } from "@mui/material";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function MyTickets() {
  const orders = [
    {
      id: "3342421",
      date: "12/1/2026",
      time: "6:30pm",
      tickets: "2x Premium",
      price: "€315",
    },
    {
      id: "3342421",
      date: "12/1/2026",
      time: "6:30pm",
      tickets: "2x Premium",
      price: "€315",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <div className="min-h-screen  text-white px-2 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-3 lg:mb-10">
            <h1 className="text-lg sm:text-xl lg:text-[30px] text-white">
              Order History
            </h1>
          </div>

          {/* Orders List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2 lg:space-y-6"
          >
            {orders.map((order, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#20033B] flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-[#FFFFFF1A] overflow-hidden shadow-lg p-3 sm:p-8"
              >
                <div className="">
                  {/* Title */}
                  <h2 className="text-lg lg:text-2xl mb-3">
                    The Weeknd: After Hours Tour
                  </h2>

                  {/* Order Details */}
                  <div
                    className={`${poppins.className} space-y-2 mb-2 text-[#99A1AF] text-sm`}
                  >
                    <p>
                      #Order ID-{order.id} • {order.date} {order.time}
                    </p>
                    <p>{order.tickets}</p>{" "}
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 rounded-full bg-green-900/50 text-green-300 text-xs sm:text-sm border border-green-700/50">
                        CONFIRMED
                      </span>
                    </div>
                  </div>
                </div>
                {/* Bottom Row */}

                <div className="flex flex-col sm:items-center justify-between gap-2 sm:gap-4 sm:justify-end">
                  <span className="text-lg lg:text-3xl">{order.price}</span>
                  <Button
                    sx={{
                      px: 2,
                      py: 1,
                      background:
                        "linear-gradient(90deg, #8F18FB 0%, #5B06A7 100%)",
                      borderRadius: "14px",
                      color: "white",
                      textTransform: "none",
                    }}
                    className="hover:from-[#5B06A7] hover:to-[#8F18FB]  shadow-lg hover:shadow-purple-500/25"
                  >
                    View Ticket
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
