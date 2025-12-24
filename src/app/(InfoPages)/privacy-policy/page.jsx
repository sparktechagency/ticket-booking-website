"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaCookieBite,
  FaUserShield,
  FaShare,
  FaInfoCircle,
} from "react-icons/fa";
import { Poppins } from "next/font/google";

const sections = [
  {
    icon: FaInfoCircle,
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly to us, such as your name, email address, phone number, and payment information when you make a purchase or create an account.",
  },
  {
    icon: FaShieldAlt,
    title: "2. How We Use Your Information",
    content:
      "We use your information to process transactions, send you tickets and order updates, provide customer support, and communicate with you about our services.",
  },
  {
    icon: FaShare,
    title: "3. Information Sharing",
    content:
      "We do not sell your personal information. We may share your information with third-party service providers who help us operate our business, such as payment processors and email providers.",
  },
  {
    icon: FaLock,
    title: "4. Data Security",
    content:
      "We use industry-standard security measures to protect your personal information. However, no method of transmission over the internet or 100% secure.",
  },
  {
    icon: FaUserShield,
    title: "5. Your Rights",
    content:
      "You have the right to access, correct, or delete your personal information. You can manage your communication preferences in your account settings.",
  },
  {
    icon: FaCookieBite,
    title: "6. Cookies",
    content:
      "We use cookies to improve your experience on our website. You can control cookie settings through your browser.",
  },
];

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
