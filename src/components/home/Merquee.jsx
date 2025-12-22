"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import marqueeImage from "../../../public/Images/marquee.png";

export default function Marquee() {
  const items = [
    "Festivals",
    "Best Price",
    "Premium Seats",
    "Early Access",
    "Verified Tickets",
    "Concerts",
  ];

  return (
    <div className="overflow-hidden bg-[#5e1aa4] py-1 sm:py-2 lg:py-4">
      <motion.div
        className="flex w-max gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-white text-lg font-medium"
          >
            <Image
              src={marqueeImage}
              alt="marquee icon"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-xs lg:text-base">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
