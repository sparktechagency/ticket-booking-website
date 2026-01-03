/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChevronDown,
  FaClock,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { LuTicket } from "react-icons/lu";

import { TicketPlan } from "../../../../public/Images/AllImages";
import { TicketQuantityModal } from "@/components/Modals/TicketQuantityModal";
import { TicketCard } from "@/components/utils/TicketCard";
import { PurchaseLockModal } from "@/components/Modals/PurchaseLockModal";
import { PriceLockModal } from "@/components/Modals/PriceLockModal";

export default function EventDetailsPage() {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(true);
  const [tickets, setTickets] = useState(0);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowQuantityModal(false);
  //   }, 5000); // 10 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTickets = sessionStorage.getItem("selectedTickets");
      const storedTicketType = sessionStorage.getItem("ticketType");

      if (storedTickets) setTickets(Number(storedTickets));
      if (storedTicketType) setSelectedTicket(storedTicketType);
    }
  }, []);

  const handleChange = (event) => {
    const value = Number(event.target.value);
    setTickets(value);
    sessionStorage.setItem("selectedTickets", value);
  };

  const handleTicketClick = (ticketType) => {
    setSelectedTicket(ticketType);
    sessionStorage.setItem("ticketType", ticketType);
    setShowPurchaseModal(true);
  };

  const handleStartPurchase = () => {
    setShowPurchaseModal(false);
    setShowLockedModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-[#060b2c] via-[#070a2a] to-[#050820] text-white px-4 py-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Back */}
          <Link
            href="/events"
            className="mb-6 inline-flex items-center text-[10px] sm:text-sm text-gray-400 hover:text-white transition"
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
                icon={<FaCalendarAlt size={14} color="#22D3EE" />}
                label="Saturday, March 15 2025"
                sx={{ bgcolor: "#0f173f", color: "white", px: "5px" }}
              />
              <Chip
                icon={<FaClock size={14} color="#22D3EE" />}
                label="20:00"
                sx={{ bgcolor: "#0f173f", color: "white", px: "5px" }}
              />
              <Chip
                icon={<FaMapMarkerAlt size={14} color="#22D3EE" />}
                label="Madison Square Garden, New York"
                sx={{ bgcolor: "#0f173f", color: "white", px: "5px" }}
              />
              <FormControl sx={{ minWidth: 140 }}>
                <Select
                  value={tickets}
                  onChange={handleChange}
                  displayEmpty
                  IconComponent={(props) => (
                    <FaChevronDown {...props} size={14} color="#22D3EE" />
                  )}
                  input={
                    <OutlinedInput
                      sx={{
                        bgcolor: "#0f173f",
                        color: "white",
                        borderRadius: "16px",
                        height: 32,
                        fontSize: "14px",
                        px: 1.5,
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <FaTicketAlt color="#22D3EE" size={14} />
                          {/* {tickets} */}
                        </InputAdornment>
                      }
                    />
                  }
                  MenuProps={{
                    PaperProps: {
                      sx: { bgcolor: "#0f173f", color: "white" },
                    },
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num} Ticket{num > 1 ? "s" : ""}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ticket Options */}
            <div className="flex flex-col  space-y-4">
              <div className="flex items-center gap-2 text-xl">
                <LuTicket className="text-[#22D3EE]" />
                <p className="">Select Tickets</p>
              </div>
              <TicketCard
                title="General"
                price="€80"
                color="#56BDE7"
                selectTicket={() => handleTicketClick("General")}
              />
              <TicketCard
                title="VIP"
                price="€250"
                color="#FFD700"
                selectTicket={() => handleTicketClick("VIP")}
              />
              <TicketCard
                title="Premium"
                price="€150"
                color="#C084FC"
                selectTicket={() => handleTicketClick("Premium")}
              />

              {/* Help Card */}
              <div className="rounded-xl bg-linear-to-br from-[#0c123f] to-[#0a0f33] p-5 border border-white/10">
                <p className="mb-1">Need help deciding?</p>
                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  Our concierge team is online. Chat with us directly for seat
                  recommendations and safety guarantees.{" "}
                </p>

                <Link
                  href="/"
                  className="flex items-center gap-2 text-[10px] sm:text-sm sm:px-3 py-1 underline"
                >
                  <FaWhatsapp
                    color="#16a34a"
                    className="text-sm sm:text-base"
                  />{" "}
                  Chat with us on WhatsApp
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
      {/* Modals */}
      <AnimatePresence>
        {showPurchaseModal && (
          <PurchaseLockModal
            onClose={() => setShowPurchaseModal(false)}
            onStart={handleStartPurchase}
          />
        )}

        {showQuantityModal && (
          <TicketQuantityModal
            ticketType={selectedTicket}
            onClose={() => setShowQuantityModal(false)}
          />
        )}
        {showLockedModal && (
          <PriceLockModal onClose={() => setShowLockedModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
