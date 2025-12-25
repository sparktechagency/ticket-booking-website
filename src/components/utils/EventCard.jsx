import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCalendar, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Button, Divider } from "@mui/material";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { IoLocationOutline } from "react-icons/io5";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function EventCard({ event, variants }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#1e1545] to-[#2a1a5e] rounded-2xl overflow-hidden border border-purple-800/30 cursor-pointer group min-h-112"
      variants={variants}
      whileHover={{
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)",
        transition: { duration: 0.3 },
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={event.image.src || event.image}
          alt={event.title}
          className="w-full h-full object-fit"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute top-3 right-3">
          <span
            className={`${poppins.className} bg-[#9333EA] text-white text-[10px] sm:text-xs px-3 py-1 rounded-full`}
          >
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white text-sm sm:text-lg font-semibold mb-3 group-hover:text-purple-400 transition-colors">
          {event.title}
        </h3>

        <p
          className={`${poppins.className} text-[#99A1AF] text-xs sm:text-sm mb-4`}
        >
          {event.matchup
            ? event.matchup
            : event.artist
            ? event.artist
            : event.teams
            ? `${event.teams[0]} vs ${event.teams[1]}`
            : "N/A"}
        </p>

        <div className="flex items-start gap-2 mb-2">
          <FaCalendar className="text-[#22D3EE] text-base mt-0.5 shrink-0" />
          <div
            className={`${poppins.className} text-[#99A1AF] text-xs sm:text-sm flex items-center gap-2`}
          >
            <span>{event.date}</span>
            <GoDotFill />
            <span>{event.time}</span>
          </div>
        </div>
        <div className="flex items-start gap-2 mb-4">
          <IoLocationOutline className="text-[#22D3EE] text-base mt-0.5 shrink-0" />
          <div
            className={`${poppins.className} text-[#99A1AF] text-xs sm:text-sm`}
          >
            <span>{event.venue.name},</span>
            <span>{event.venue.city},</span>
            <span>{event.venue.country}</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-gray-400 text-[10px] sm:text-xs mb-1">From</p>
            <p className="text-white sm:text-2xl font-bold">
              ${event.pricing.from}
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`event-details/${event.id}`}
              className="flex items-center px-3 lg:px-6 py-2 text-[10px] lg:text-sm rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 text-white
              transition-all duration-300 hover:from-violet-600 hover:to-indigo-600 hover:shadow-[0_10px_20px_-10px_rgba(139,92,246,0.5)]"
            >
              <FaTicketAlt className="mr-2" />
              Get Tickets
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
