"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaFileContract,
  FaTicketAlt,
  FaDollarSign,
  FaUserCheck,
  FaBan,
  FaShieldAlt,
} from "react-icons/fa";
import { Poppins } from "next/font/google";

const sections = [
  {
    icon: FaFileContract,
    title: "1. Introduction",
    content:
      "Welcome to Adrien's Ticket Hub. By accessing our website and using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.",
  },
  {
    icon: FaTicketAlt,
    title: "2. Ticket Marketplace",
    content:
      "Adrien's Ticket Hub acts as an intermediary between buyers and sellers. We do not own the tickets sold on our site. We guarantee the authenticity of every ticket sold through our platform.",
  },
  {
    icon: FaDollarSign,
    title: "3. Pricing and Availability",
    content:
      "Ticket prices are set by sellers and may be above or below face value. Prices may fluctuate based on demand. All sales are final once confirmed.",
  },
  {
    icon: FaUserCheck,
    title: "4. User Responsibilities",
    content:
      "Users must provide accurate information when creating an account or making a purchase. You are responsible for maintaining the confidentiality of your account credentials.",
  },
  {
    icon: FaBan,
    title: "5. Cancellations and Refunds",
    content:
      "Please refer to our Refund Policy for detailed information on cancellations and refunds. Generally, all sales are final unless an event is cancelled.",
  },
  {
    icon: FaShieldAlt,
    title: "6. Limitation of Liability",
    content:
      "Adrien's Ticket Hub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.",
  },
];

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#0a0d27] flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-[36px] text-white mb-4">
            Terms And Conditions
          </h1>
          <p className={`${poppins.className} text-[#99A1AF]`}>
            Last updated: December 14, 2025
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className="">
                    <h2 className="text-2xl sm:text-2xl text-white mb-2">
                      {section.title}
                    </h2>
                    <p className={`${poppins.className} text-[#99A1AF]`}>
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
