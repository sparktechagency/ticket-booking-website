"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaRegCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { ConcertImages } from "../../../../public/Images/AllImages";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function ArtistDetails() {
  const tourDates = [
    {
      month: "MAR",
      date: 15,
      venue: "Madison Square Garden",
      location: "New York",
      time: "20:00",
      price: "€80",
    },
    {
      month: "SEP",
      date: 19,
      venue: "Madison Square Garden",
      location: "New York",
      time: "20:00",
      price: "€80",
    },
    {
      month: "DEC",
      date: 31,
      venue: "Madison Square Garden",
      location: "New York",
      time: "20:00",
      price: "€80",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#04092C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-start gap-8 mb-16"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-500"
              >
                <Image
                  src={ConcertImages.JustinBeiber2}
                  alt="Justin Bieber"
                  width={350}
                  height={350}
                  className="w-full h-full object-fit"
                />
              </motion.div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-600 via-transparent to-transparent opacity-40" />
            </div>
            <div>
              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl sm:text-5xl md:text-[40px] mb-2"
                >
                  Justin Bieber
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`${poppins.className} text-lg sm:text-base text-[#D1D5DC] mb-6`}
                >
                  3 Upcoming Shows
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="mb-4"
                >
                  <h2 className="sm:text-2xl mb-3 flex items-center gap-3">
                    About
                  </h2>
                  <p
                    className={`${poppins.className} text-[#99A1AF] leading-relaxed max-w-3xl`}
                  >
                    Abel Makkonen Tesfaye, known professionally as The Weeknd,
                    is a Canadian singer, songwriter, and record producer. Known
                    for his sonic versatility and dark lyricism, his music
                    explores escapism, romance, and melancholia.
                  </p>
                </motion.div>
              </div>

              {/* Upcoming Tour Dates Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-3xl sm:text-2xl mb-4 flex items-center gap-2">
                  <FaRegCalendar className="text-[#BD85F1]" size={28} />
                  Upcoming Tour Dates
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                  {tourDates.map((show, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index, duration: 0.6 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="bg-[#20033b] backdrop-blur-lg rounded-2xl border border-purple-500/30 overflow-hidden shadow-xl"
                    >
                      <div className="flex items-center justify-between p-6">
                        <div className="bg-[#2b1045] text-white px-5 py-3 rounded-lg text-lg text-center">
                          <p
                            className={`${poppins.className} text-[#BD85F1] text-sm`}
                          >
                            {" "}
                            {show.month}
                          </p>
                          <p
                            className={`${poppins.className} text-white text-2xl`}
                          >
                            {" "}
                            {show.date}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-lg mb-2">{show.venue}</h3>

                          <div className="flex items-center gap-2 text-gray-300 mb-6">
                            <FaMapMarkerAlt
                              size={16}
                              className="text-[#99A1AF]"
                            />
                            <span
                              className={`${poppins.className} text-sm text-[#99A1AF]`}
                            >
                              {show.location} • {show.time}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-end flex-col gap-2">
                          <p className="text-xs text-[#99A1AF]">From</p>
                          <div className="text-xl text-white">{show.price}</div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-linear-to-r from-[#8F18FB] to-[#5B06A7] hover:bg-purple-700 text-white text-sm py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                          >
                            <FaTicket size={14} />
                            Buy Tickets
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
