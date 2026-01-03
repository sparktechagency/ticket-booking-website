"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Membership() {
  return (
    <section className="bg-[#04092C] py-12 sm:py-16 lg:py-20 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ y: -4 }}
        className="bg-linear-to-r from-[#0e1236] to-[#6D1DB9]
                   max-w-4xl mx-auto
                   flex flex-col items-center text-center
                   gap-4 sm:gap-5
                   px-3 sm:px-8 lg:px-12
                   py-8 sm:py-10 lg:py-12
                   rounded-2xl
                   shadow-xl"
      >
        <motion.h2
          variants={itemVariants}
          className="text-white
                     text-lg sm:text-3xl md:text-4xl lg:text-[40px]
                     font-semibold"
        >
          Become a Member
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className={`${poppins.className}
                      text-white/90
                      text-xs sm:text-base lg:text-lg
                      max-w-2xl`}
        >
          Join for $30/year and enjoy zero platform fees on all purchases
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link href="/membership">
            <motion.span
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(82,74,212,0.6)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-flex items-center justify-center gap-1 sm:gap-2
                         text-white font-medium
                         text-[10px] sm:text-base
                         bg-linear-to-r from-[#130a3a] to-[#1f0c40]
                         px-4 sm:px-6 py-2.5 sm:py-3
                         rounded-full
                         border border-[#FFFFFF3D]
                         shadow-lg shadow-[#524AD4]/40
                         cursor-pointer"
            >
              Learn More About Membership
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaArrowRight className="text-xs sm:text-sm" />
              </motion.span>
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
