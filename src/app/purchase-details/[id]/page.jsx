/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegCalendar,
  FaRegClock,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoInfo } from "react-icons/go";

import Image from "next/image";
import { TicketPlan } from "../../../../public/Images/AllImages";
import { Poppins } from "next/font/google";
import { alpha, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import CountdownTimer from "@/components/utils/CountdownTimer";
import { PurchaseLockModal } from "@/components/Modals/PurchaseLockModal";
import { PriceLockModal } from "@/components/Modals/PriceLockModal";
import BuyerGuarantee from "@/components/utils/BuyerGuarantee";
import { useParams, useRouter } from "next/navigation";
import { useGetSingleEventQuery } from "@/Redux/slices/eventsApi";
import dayjs from "dayjs";
import { getImageUrl } from "@/utils/baseUrl";
import { colorToHex } from "@/components/utils/ColorConverter";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function PurchaseDetails() {
  const [ticketType, setTicketType] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [ticketColor, setTicketColor] = useState("#fff");
  const [ticketPrice, setTicketPrice] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const params = useParams();
  const eventId = params.id;
  console.log(eventId);

  const router = useRouter();

  const {
    data: singleEventData,
    isLoading,
    isError,
  } = useGetSingleEventQuery(eventId);
  const eventData = singleEventData?.data;
  console.log("singleEventData", eventData);

  const imageUrl = getImageUrl();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPurchaseModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!eventData?.ticketCategories) return;

    const storedTicketType = sessionStorage.getItem("ticketType");
    const storedQuantity =
      Number(sessionStorage.getItem("selectedTickets")) || 0;

    if (!storedTicketType) return;

    const selectedCategory = eventData.ticketCategories.find(
      (category) => category.ticketName === storedTicketType
    );

    if (!selectedCategory) return;

    setTicketType(storedTicketType);
    setTicketQuantity(storedQuantity);
    setTicketPrice(selectedCategory.pricePerTicket);
    setTicketColor(selectedCategory.sectionColor);
  }, [eventData]);

  useEffect(() => {
    if (localStorage.getItem("checkout_timer_end")) {
      setTimerStarted(true);
    }
  }, []);

  const handleStartPurchase = () => {
    localStorage.removeItem("checkout_timer_end");
    setTimerStarted(true);
    setShowPurchaseModal(false);
    setShowLockedModal(true);
  };

  const handleRemoveTicket = () => {
    setIsRemoving(true);
    sessionStorage.removeItem("ticketType");

    setTimeout(() => {
      router.back(); // go back after 2 seconds
    }, 2000);
  };

  if (isLoading || !eventData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="success" size={80} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0d27] text-white px-4 sm:px-6 lg:px-8 py-5">
      <main className="max-w-7xl mx-auto pb-12">
        {/* Back Button */}
        <Link
          href="/events"
          className={`${poppins.className} flex items-center gap-2 mb-3 text-[#99A1AF] text-sm uppercase`}
        >
          <FaArrowLeft />
          Back to events
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-8">
            <h1 className="text-lg sm:text-2xl lg:text-4xl">Checkout</h1>

            {/* Event Info */}
            <div className="space-y-4">
              <h2 className="text-sm sm:text-xl">{eventData?.title}</h2>

              <div className="flex flex-wrap gap-3">
                <InfoChip
                  icon={<FaRegCalendar />}
                  text={`${dayjs(eventData?.eventDate).format(
                    "MMM DD, YYYY"
                  )} `}
                />
                <InfoChip
                  icon={<FaRegClock />}
                  text={`${dayjs(eventData?.eventDate).format("h:mm A")} `}
                />
                <InfoChip
                  icon={<FiMapPin />}
                  text={`${eventData?.venueName}, ${eventData?.city}`}
                />
              </div>
            </div>

            {/* Ticket Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl p-3 sm:p-6 w-full max-w-2xl overflow-hidden"
              style={{
                backgroundColor: alpha(colorToHex(ticketColor), 0.25),
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                {/* Left section - Ticket info */}
                <div className=" flex flex-row sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1">
                  {/* Quantity badge */}
                  <div className="bg-[#FFFFFF0D] p-2 sm:p-4 rounded-lg shrink-0">
                    <p className={`${poppins.className} sm:text-2xl`}>
                      {ticketQuantity}x
                    </p>
                  </div>

                  {/* Event details */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-[10px] sm:text-base xl:text-xl truncate">
                      {eventData?.title}
                    </p>
                    <p
                      className={`${poppins.className} text-[10px] sm:text-sm`}
                      style={{ color: ticketColor }}
                    >
                      {ticketType}
                    </p>
                    <p className="text-xs sm:text-base">€{ticketPrice} each</p>
                  </div>
                </div>

                {/* Right section - Price and actions */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1 shrink-0">
                  <p className="xl:text-2xl">€{ticketQuantity * ticketPrice}</p>
                  <Button
                    onClick={handleRemoveTicket}
                    disabled={isRemoving}
                    sx={{
                      textTransform: "none",
                      color: "#fff",
                      fontSize: { xs: "12px", sm: "14px" },
                      bgcolor: ticketColor,
                      borderRadius: "10px",
                    }}
                  >
                    <RiDeleteBinLine className="mr-1 sm:mr-2 text-base sm:text-lg" />
                    <span>{isRemoving ? "Removing..." : "Remove"}</span>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Stadium Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-full sm:max-w-lg lg:max-w-3xl mx-auto"
            >
              <img
                src={`${imageUrl}${eventData?.seatingView}`}
                alt="Seating Map"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                // priority
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 mt-8 lg:mt-0 space-y-6">
            {/* Timer */}
            <CountdownTimer started={timerStarted} />
            {/* Order Summary */}
            <div className="bg-linear-to-b from-[#6D1DB9] to-[#090014] rounded-2xl p-6 shadow-xl lg:sticky lg:top-6">
              <h2 className="sm:text-xl mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 text-xs sm:text-sm">
                <div
                  className={`${poppins.className} space-y-3 text-[#D1D5DC]`}
                >
                  <div className="flex justify-between">
                    <span>Tickets</span>
                    <span>
                      {ticketQuantity} × €{ticketPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      €{(ticketPrice * ticketQuantity).toFixed(2)}
                    </span>{" "}
                  </div>
                  {/* <div className="flex justify-between opacity-80">
                    <span>Service Fee (5%)</span>
                    <span>€8.00</span>
                  </div> */}
                </div>

                {/* <div className="border-t border-white/20 pt-4 flex justify-between">
                  <span>Total</span>
                  <span className="sm:text-2xl font-semibold">
                    €
                    {(
                      ticketPrice * ticketQuantity +
                      ticketPrice * ticketQuantity * 0.05
                    ).toFixed(2)}
                  </span>
                </div> */}
                <div className="flex items-start gap-2 text-[#E9D5FF] border border-[#BD85F133] bg-[#BD85F10D] p-2 sm:p-3 rounded-lg">
                  <GoInfo className="text-xl" />
                  <p className={`${poppins.className} text-xs sm:text-sm `}>
                    Not including fees and taxes. Final price will be shown in
                    Checkout page.
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-3">
                {/* <Select
                  defaultValue={2}
                  sx={{
                    bgcolor: "#6b46c1",
                    color: "white",
                    borderRadius: "12px",
                    height: "40px",
                    fontWeight: 600,
                    "& fieldset": { border: "none" },
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <MenuItem key={n} value={n}>
                      {n}
                    </MenuItem>
                  ))}
                </Select> */}

                <Link
                  href={`/checkout/${eventId}?ticketType=${ticketType}&ticketQuantity=${ticketQuantity}`}
                  className={`${poppins.className} flex items-center justify-center gap-2 bg-linear-to-r from-[#8F18FB] to-[#5B06A7] text-white rounded-lg w-full text-sm sm:text-base font-medium py-2 sm:py-3`}
                >
                  Continue <FaArrowRight />
                </Link>
              </div>
            </div>{" "}
            {/* Buyer Guarantee */}
            <BuyerGuarantee />
          </div>
        </div>
      </main>{" "}
      <AnimatePresence>
        {showPurchaseModal && (
          <PurchaseLockModal
            onClose={() => setShowPurchaseModal(false)}
            onStart={handleStartPurchase}
          />
        )}
        {showLockedModal && (
          <PriceLockModal onClose={() => setShowLockedModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* Helper Component */
function InfoChip({ icon, text }) {
  return (
    <div
      className={`${poppins.className} flex items-center gap-2 bg-[#FFFFFF0D] px-3 py-2 rounded-full border border-[#FFFFFF1A] text-xs sm:text-sm`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
