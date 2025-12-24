"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { FaChevronDown, FaWhatsapp } from "react-icons/fa";
import { Poppins } from "next/font/google";

const faqs = [
  {
    question: "Is my purchase guaranteed?",
    answer:
      "Yes, every purchase is backed by our Adrien 100% Buyer Guarantee. This means your tickets will be authentic, delivered on time for the event, and provide valid entry. If any of these conditions aren’t met, we’ll provide comparable or better tickets, or a full refund.",
  },
  {
    question: "When will I receive my tickets?",
    answer:
      "Tickets are typically delivered closer to the event date. You’ll receive an email notification as soon as they’re available in your account.",
  },
  {
    question: "Can I get a refund if I can’t attend?",
    answer:
      "Refunds are available only if the event is cancelled or rescheduled. For all other cases, you can resell your tickets securely on our platform.",
  },
  {
    question: "Are the seats guaranteed to be together?",
    answer:
      "Yes! When you purchase multiple tickets, we guarantee they will be seated together unless explicitly stated otherwise in the listing.",
  },
  {
    question: "How do I access my mobile tickets?",
    answer:
      'Your tickets will be available in your account. Simply log in on your mobile device, go to "My Tickets," and present the QR code at the venue entrance.',
  },
];

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function FAQSection() {
  const [expanded, setExpanded] = useState("panel0");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="min-h-screen bg-[#0a0d27] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-[36px]  text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className={`${poppins.className} text-[#99A1AF]`}>
            Everything you need to know about buying and selling tickets.
          </p>
        </motion.div>

        {/* Material UI Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-[#080014] backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-purple-800/10"
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                backgroundColor: "transparent",
                borderBottom: "1px solid #FFFFFF33",

                "&:last-child": {
                  borderBottom: "none",
                },
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <FaChevronDown
                    className={`text-[#99A1AF] transition-transform duration-300 ${
                      expanded === `panel${index}` ? "rotate-180" : ""
                    }`}
                  />
                }
                sx={{
                  px: { xs: 4, sm: 4 },
                  py: { xs: 4, sm: 1 },
                  "&:hover": {
                    bgcolor: "#080014",
                  },
                  transition: "background-color 0.3s",
                }}
              >
                <h3 className=" text-white">{faq.question}</h3>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: { xs: 4, sm: 4 },
                  pb: 3,
                }}
              >
                <p className={`${poppins.className} text-sm text-[#99A1AF]`}>
                  {faq.answer}
                </p>
              </AccordionDetails>
            </Accordion>
          ))}
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 bg-linear-to-b from-[#6D1DB9] to-[#04092C] rounded-3xl p-8 shadow-2xl text-center"
        >
          <h3 className="text-xl text-white mb-3">Still have questions?</h3>
          <p className={`${poppins.className} text-[#FFFFFFCC] mb-6`}>
            Our support team is available 24/7 to help you.
          </p>
          <Button
            variant="contained"
            startIcon={<FaWhatsapp className="text-2xl" />}
            sx={{
              bgcolor: "#39AE41",
              color: "white",
              fontWeight: 600,
              fontSize: "1.1rem",
              textTransform: "none",
              py: 2,
              px: 6,
              borderRadius: "20px",

              "&:hover": {
                bgcolor: "#39AE45",
                boxShadow: "0 10px 30px rgba(37, 211, 102, 0.5)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Contact with us on WhatsApp
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
