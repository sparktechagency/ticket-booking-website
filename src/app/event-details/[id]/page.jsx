"use client";
import { useEffect, useState } from "react";
import { Button, Chip, Divider, MenuItem, Select } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineChair } from "react-icons/md";
import { TicketPlan } from "../../../../public/Images/AllImages";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function EventDetailsPage() {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#060b2c] via-[#070a2a] to-[#050820] text-white px-4 py-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Back */}
          <Link
            href="/events"
            className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to events
          </Link>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-sm sm:text-lg lg:text-3xl font-bold">
              The Weeknd: After Hours Tour
            </h1>

            <div className="mt-3 flex flex-wrap gap-3">
              <Chip
                icon={<FaCalendarAlt size={14} />}
                label="Saturday, March 15 2025"
                sx={{ bgcolor: "#0f173f", color: "white" }}
              />
              <Chip
                icon={<FaClock size={14} />}
                label="20:00"
                sx={{ bgcolor: "#0f173f", color: "white" }}
              />
              <Chip
                icon={<FaMapMarkerAlt size={14} />}
                label="Madison Square Garden, New York"
                sx={{ bgcolor: "#0f173f", color: "white" }}
              />
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ticket Options */}
            <div className="space-y-4">
              <TicketCard
                title="General"
                price="€80"
                accent="from-purple-500 to-indigo-500"
              />
              <TicketCard
                title="VIP"
                price="€250"
                accent="from-yellow-400 to-orange-500"
              />
              <TicketCard
                title="Premium"
                price="€150"
                accent="from-pink-500 to-purple-600"
              />

              {/* Help Card */}
              <div className="rounded-xl bg-gradient-to-br from-[#0c123f] to-[#0a0f33] p-5 border border-white/10">
                <p className="mb-1">Need help deciding?</p>
                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  Our concierge team is online. Chat with us directly for seat
                  recommendations and safety guarantees.{" "}
                </p>

                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-1 underline"
                >
                  <FaWhatsapp color="#16a34a" /> Chat with us on WhatsApp
                </Link>
              </div>
            </div>

            {/* Seat Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center items-center rounded-xl
          bg-[#0c123f] border border-white/10 p-4 max-w-88 sm:max-w-95 md:max-w-105 lg:max-w-115"
            >
              <Image
                src={TicketPlan}
                alt="Seating Map"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>{" "}
      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <TicketQuantityModal onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Ticket Card ---------------- */

function TicketCard({ title, price, accent }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#0c123f] to-[#0a0f33] p-5"
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${accent}`}
      />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-base sm:text-lg">{title}</p>
          <p className="text-xs sm:text-sm text-[#05DF72] mt-1">Available</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold">{price}</p>
          <p className="text-xs text-[#99A1AF] capitalize">per person</p>
        </div>
      </div>
    </motion.div>
  );
}

function TicketQuantityModal({ onClose }) {
  const [tickets, setTickets] = useState(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-[#120033] via-[#1b004b] to-[#0b0020] p-6 shadow-2xl"
      >
        {/* Close */}
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 4,
            top: 4,
            color: "#FFFFFF",
          }}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          ✕
        </Button>
        <h2 className="sm:text-xl font-bold text-center mb-2 text-white">
          How many tickets?
        </h2>
        <p
          className={`${poppins.className} text-sm text-[#99A1AF] text-center mb-4`}
        >
          Select the number of tickets you would like to purchase.
        </p>

        <Select
          value={tickets}
          onChange={(e) => setTickets(Number(e.target.value))}
          fullWidth
          sx={{
            bgcolor: "#2a1a55",
            color: "white",
            borderRadius: "10px",
            fontSize: "14px",
            mb: 2,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.1)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.2)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#8b5cf6",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#1b1240",
                color: "white",
                borderRadius: "10px",
                mt: 1,
                "& .MuiMenuItem-root:hover": {
                  bgcolor: "#2a1a55",
                },
              },
            },
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <MenuItem key={n} value={n}>
              {n} Ticket{n > 1 ? "s" : ""}
            </MenuItem>
          ))}
        </Select>
        <div
          className={`${poppins.className} flex items-center gap-2 text-xs text-gray-300 mb-5`}
        >
          <MdOutlineChair color="#BD85F1" fontSize={16} />{" "}
          <p>Relax! You’ll be seated together guaranteed.</p>
        </div>
        <Button
          fullWidth
          sx={{
            borderRadius: "12px",
            background: "linear-gradient(135deg, #8F18FB 0%, #5B06A7 100%)",
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            py: 1.5,
            "&:hover": {
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
            },
          }}
        >
          <FaTicketAlt className="mr-2 text-lg" /> Continue to Select Tickets
        </Button>
      </motion.div>
    </div>
  );
}
