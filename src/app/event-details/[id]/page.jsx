/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Chip,
  CircularProgress,
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

import { TicketQuantityModal } from "@/components/Modals/TicketQuantityModal";
import { TicketCard } from "@/components/utils/TicketCard";
import { useParams, useRouter } from "next/navigation";
import { useGetSingleEventQuery } from "@/Redux/slices/eventsApi";
import dayjs from "dayjs";
import { getImageUrl } from "@/utils/baseUrl";

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params.id;
  console.log(eventId);
  const [showQuantityModal, setShowQuantityModal] = useState(true);
  const [tickets, setTickets] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const imageUrl = getImageUrl();

  const {
    data: singleEventData,
    isLoading,
    isError,
  } = useGetSingleEventQuery(eventId);
  const eventData = singleEventData?.data;
  console.log("singleEventData", eventData);

  const router = useRouter();

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

  const handleQuantityConfirm = (selectedTickets) => {
    setTickets(selectedTickets);
    sessionStorage.setItem("selectedTickets", selectedTickets);
    setShowQuantityModal(false);
  };

  const handleTicketClick = ({ ticketType, eventId }) => {
    setSelectedTicket(ticketType);
    sessionStorage.setItem("ticketType", ticketType);
    sessionStorage.setItem("eventId", eventId);
    router.push(`/purchase-details/${eventId}`);
    // setShowPurchaseModal(true);
  };

  if (isLoading || !eventData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="success" size={80} />
      </div>
    );
  }

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
              {eventData.title}
            </h1>

            <div className="mt-3 flex flex-wrap gap-3">
              <Chip
                icon={<FaCalendarAlt size={14} color="#22D3EE" />}
                label={`${dayjs(eventData.eventDate).format("MMM DD, YYYY")} `}
                sx={{ bgcolor: "#0f173f", color: "white", px: "5px" }}
              />
              <Chip
                icon={<FaClock size={14} color="#22D3EE" />}
                label={`${dayjs(eventData.eventDate).format("h:mm A")} `}
                sx={{ bgcolor: "#0f173f", color: "white", px: "5px" }}
              />
              <Chip
                icon={<FaMapMarkerAlt size={14} color="#22D3EE" />}
                label={`${eventData?.venueName}, ${eventData?.city}`}
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
              {eventData.ticketCategories.map((category, index) => (
                <TicketCard
                  key={category._id || index}
                  title={category.ticketName}
                  price={`€${category.pricePerTicket}`}
                  color={category.sectionColor}
                  totalQuantity={category.totalQuantity}
                  tickets={tickets}
                  selectTicket={() =>
                    handleTicketClick({
                      ticketType: category.ticketName,
                      eventId: eventData._id,
                    })
                  }
                />
              ))}

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
              <img
                src={`${imageUrl}${eventData?.seatingView}`}
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
        {showQuantityModal && (
          <TicketQuantityModal
            initialTickets={tickets || 1}
            onConfirm={handleQuantityConfirm}
            onClose={() => setShowQuantityModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
