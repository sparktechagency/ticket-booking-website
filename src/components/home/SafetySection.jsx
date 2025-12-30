"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SafetyImage } from "../../../public/Images/AllImages";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BsPatchCheck } from "react-icons/bs";
import { MdOutlineChair } from "react-icons/md";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function SafetySection() {
  return (
    <section className="bg-[#04092C] py-12 sm:py-16 lg:py-24">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {/* Text Content */}
        <motion.div className="text-center md:text-left" variants={fadeInLeft}>
          <span
            className={`${poppins.className} inline-flex items-center gap-2 text-xs font-semibold text-[#BD85F1] mb-6 bg-[#BD85F11A] px-4 py-1.5 rounded-full`}
          >
            <IoShieldCheckmarkOutline /> Safety First
          </span>

          <h2 className="text-base sm:text-2xl xl:text-4xl font-semibold text-white mb-3 sm:mb-6 leading-tight">
            The Safest Way to Buy Live Event Tickets
          </h2>

          <p
            className={`${poppins.className} text-xs sm:text-base lg:text-lg text-[#99A1AF] mb-10`}
          >
            We&apos;re not just a marketplace. We&apos;re fans too. That&apos;s
            why we&apos;ve built the most secure platform in the industry,
            backed by our 100% money-back guarantee.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-6">
            {[
              {
                icon: <BsPatchCheck />,
                title: "100% Verified Authentic",
                text: "Every ticket is digitally verified before it reaches your account.",
              },
              {
                icon: <MdOutlineChair />,
                title: "Seated Together Guarantee",
                text: "Buying 2+ tickets? We guarantee your seats will be side-by-side.",
              },
              {
                icon: <AiOutlineThunderbolt />,
                title: "Instant Digital Delivery",
                text: "Get your tickets sent directly to your phone within minutes.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 text-left">
                <div className="bg-[#BD85F11A] rounded-full p-3 shrink-0">
                  {React.cloneElement(item.icon, {
                    color: "#BD85F1",
                    size: 20,
                  })}
                </div>
                <div>
                  <p className="text-white text-sm sm:text-base xl:text-lg font-medium">
                    {item.title}
                  </p>
                  <p
                    className={`${poppins.className} text-[#99A1AF] text-xs sm:text-sm`}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div className="overflow-hidden">
          <motion.div
            className="relative aspect-3/2 lg:aspect-5/4 rounded-xl overflow-hidden shadow-xl"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={SafetyImage}
              alt="Ticket Safety Guarantee"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 90vw,
                     (max-width: 1024px) 50vw,
                     40vw"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
