"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaTimes,
  FaArrowRight,
  FaCrown,
  FaWhatsapp,
  FaTicketAlt,
  FaBolt,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";
import { poppins } from "@/components/utils/FontPoppins";

export default function HowItWorks() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const steps = [
    {
      title: "Browse Events",
      text: "Navigate through our Concerts or Sports sections to find the event you're looking for. We manually curate every ticket.",
      icon: <FaTicketAlt />,
    },
    {
      title: "Check Availability or Request Tickets",
      text: "If tickets aren't listed, contact us on WhatsApp and we'll search our trusted network for you.",
      icon: <FaWhatsapp />,
    },
    {
      title: "Understand Pricing & Market Fluctuations",
      text: "Prices reflect real-time demand, artist hype, and event timing—not arbitrary markups.",
      icon: <FaBolt />,
    },
    {
      title: "Complete Your Purchase",
      text: "Checkout securely using major payment methods.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Ticket Delivery & Support",
      text: "We explain exactly how and when you'll receive your tickets via WhatsApp and email.",
      icon: <FaUsers />,
    },
    {
      title: "Enjoy The Show",
      text: "We're available even on event day to make sure you get in without issues.",
      icon: <FaCrown />,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e27] via-[#1a1338] to-[#0a0e27] py-8 sm:py-12 md:py-16 px-3 xs:px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10 lg:space-y-15">
        {/* HERO SECTION */}
        <motion.section
          className="text-center space-y-3 sm:space-y-4 md:space-y-6 pt-4 sm:pt-6 md:pt-8"
          {...fadeInUp}
        >
          <h1 className="text-lg sm:text-4xl font-semibold text-white leading-tight px-2">
            Getting Your Tickets Is
            <br />
            <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Simple & Safe
            </span>
          </h1>
          <p
            className={`${poppins.className} text-sm sm:text-lg text-gray-300 max-w-3xl mx-auto px-4`}
          >
            We&apos;ve built the easiest way to secure verified tickets for
            sold-out shows. Here&apos;s exactly how it works.
          </p>
          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-purple-300 hover:text-purple-100 transition-colors group px-4"
          >
            <span className="text-center">
              Want to know more about our story and mission?
            </span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </motion.section>

        {/* WHY ADRIEN TICKET */}
        <motion.section className="relative px-2" {...fadeInUp}>
          <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl"></div>
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 space-y-4 sm:space-y-5 md:space-y-6">
            <h2 className="text-sm sm:text-xl text-center sm:text-start text-white">
              Built Around Trust, Not Corporate BS
            </h2>
            <div
              className={`${poppins.className} space-y-3 sm:space-y-4 text-xs xs:text-sm sm:text-base text-gray-300 leading-relaxed`}
            >
              <p>
                You might notice this site is called{" "}
                <strong className="text-white">
                  &quot;Adrien Ticket&quot;
                </strong>
                —not some generic corporate name. That&apos;s intentional.
              </p>
              <p>
                This isn&apos;t a faceless company. It&apos;s me, my team, and
                our trusted network.
              </p>
              <p>
                I show my face every day on YouTube, Instagram, and TikTok. I
                share industry news, concert tips, and behind-the-scenes
                insights. Why? Because I want you to see who you&apos;re buying
                from.
              </p>
              <p>
                My primary goal has always been helping fans get tickets at face
                value. But when official sales fail, this platform exists as
                your reliable backup.
              </p>
            </div>
            {/* <Link
              href="/socials"
              className={`${poppins.className} inline-flex items-center gap-2 bg-linear-to-r from-purple-500 to-purple-700 hover:from-purple-500 hover:to-purple-800 text-white px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-lg sm:rounded-xl text-xs xs:text-sm sm:text-base font-semibold transition-all transform hover:scale-105`}
            >
              Follow Me on Social Media
              <FaArrowRight className="shrink-0" />
            </Link> */}
          </div>
        </motion.section>

        {/* COMPARISON */}
        <motion.section className="space-y-6 sm:space-y-8 px-2" {...fadeInUp}>
          <h2 className="text-sm sm:text-xl font-semibold text-white text-center px-4 leading-relaxed">
            Why We&apos;re Different From StubHub,
            <br className="hidden sm:block" />
            Viagogo & Other Marketplaces
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Wrong Way */}
            <div className="bg-linear-to-br from-red-500/10 to-red-600/10 backdrop-blur-sm border border-red-500/20 rounded-xl sm:rounded-2xl p-4 xs:p-6 sm:p-8 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="size-7 sm:size-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                  <FaTimes className="text-red-400 text-base sm:text-lg" />
                </div>
                <h3 className="text-sm sm:text-lg  text-white">
                  What&apos;s Wrong With Big Platforms
                </h3>
              </div>
              <ul
                className={`${poppins.className} space-y-2 sm:space-y-3 text-xs xs:text-sm sm:text-base text-gray-300`}
              >
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="text-red-400 shrink-0">•</span>
                  <span>They don&apos;t understand their own inventory</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="text-red-400 shrink-0">•</span>
                  <span>They approve incorrect ticket formats</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="text-red-400 shrink-0">•</span>
                  <span>Offshore scripted customer support</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="text-red-400 shrink-0">•</span>
                  <span>Refunds instead of real solutions</span>
                </li>
              </ul>
            </div>

            {/* Right Way */}
            <div className="bg-linear-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-sm border border-green-500/20 rounded-xl sm:rounded-2xl p-4 xs:p-6 sm:p-8 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="size-7 sm:size-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <FaCheck className="text-green-400 text-base sm:text-lg" />
                </div>
                <h3 className="text-sm xs:text-base sm:text-lg text-white">
                  How We&apos;re Different
                </h3>
              </div>
              <ul
                className={`${poppins.className} space-y-2 sm:space-y-3 text-xs xs:text-sm sm:text-base text-gray-300`}
              >
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="text-green-40 shrink-0">•</span>
                  <span>We understand every venue and ticket format</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="text-green-400 shrink-0">•</span>
                  <span>Tickets are handled by our own team</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="text-green-400 shrink-0">•</span>
                  <span>Venue-specific entry knowledge</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <span className="text-green-400 shrink-0">•</span>
                  <span>WhatsApp support with real humans</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* STEPS */}
        <motion.section
          className="space-y-4 sm:space-y-8 md:space-y-10 px-2"
          {...fadeInUp}
        >
          <h2 className="text-sm sm:text-xl font-semibold text-white text-center px-4">
            How To Get Your Tickets
          </h2>

          <div className="grid gap-3 xs:gap-4 sm:gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 rounded-xl sm:rounded-2xl p-4 xs:p-5 transition-all"
              >
                <div
                  className={`${poppins.className} flex items-center gap-3 sm:gap-4`}
                >
                  <div className="shrink-0">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-base xs:text-lg sm:text-xl">
                      {step.icon}
                    </div>
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <h3 className="text-sm xs:text-base sm:text-lg font-medium text-white">
                      Step {i + 1}: {step.title}
                    </h3>
                    <p className="text-xs xs:text-sm sm:text-base text-gray-300 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FEES */}
        <motion.section
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 space-y-4 sm:space-y-5 md:space-y-6 mx-2"
          {...fadeInUp}
        >
          <h2 className="text-sm sm:text-xl font-semibold text-white">
            Understanding Our Service Fee
          </h2>
          <p
            className={`${poppins.className} text-xs xs:text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed`}
          >
            We charge a transparent 7% service fee to cover platform, support,
            and operational costs.
          </p>
          <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 pt-2 sm:pt-4">
            <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 xs:p-4 text-center">
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">
                7%
              </p>
              <p
                className={`${poppins.className} text-[10px] xs:text-xs sm:text-sm text-gray-400 mt-1`}
              >
                Service Fee
              </p>
            </div>
            <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 xs:p-4 text-center">
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-green-400">
                0%
              </p>
              <p
                className={`${poppins.className} text-[10px] xs:text-xs sm:text-sm text-gray-400 mt-1`}
              >
                For Members
              </p>
            </div>
            <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 xs:p-4 text-center">
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">
                100%
              </p>
              <p
                className={`${poppins.className} text-[10px] xs:text-xs sm:text-sm text-gray-400 mt-1`}
              >
                Transparent
              </p>
            </div>
          </div>
        </motion.section>

        {/* MEMBERSHIP */}
        <motion.section
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl mx-2"
          {...fadeInUp}
        >
          <div className="absolute inset-0 bg-white/5"></div>

          <div className="relative p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8 text-white">
            <div className="flex items-center gap-2 sm:gap-3">
              <FaCrown className="text-2xl xs:text-3xl sm:text-4xl text-yellow-300 shrink-0" />
              <h2 className="text-sm sm:text-xl font-semibold">
                Become a VIP Member
              </h2>
            </div>
            <p className="text-sm sm:text-lg opacity-90">Only €99/year</p>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
              {[
                { icon: "💳", text: "Zero service fees" },
                { icon: "🎟️", text: "Priority access to tickets" },
                { icon: "⚡", text: "Priority WhatsApp support" },
                { icon: "👑", text: "VIP Discord access" },
                { icon: "🎁", text: "Monthly giveaways" },
                { icon: "🔥", text: "Exclusive pre-sales" },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className={`${poppins.className} flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 xs:p-3 sm:p-4`}
                >
                  <span className="text-lg xs:text-xl sm:text-2xl shrink-0">
                    {benefit.icon}
                  </span>
                  <span className="text-xs xs:text-sm sm:text-base font-medium">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="/membership"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-4 xs:px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs xs:text-sm sm:text-base hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Become a Member
              <FaArrowRight className="shrink-0" />
            </a>
          </div>
        </motion.section>

        {/* GOOD TO KNOW */}
        <motion.section
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-8 mx-2"
          {...fadeInUp}
        >
          <h2 className="text-sm sm:text-xl font-semibold text-white">
            Good To Know
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
            {[
              { icon: "🎫", text: "Stock varies by event" },
              { icon: "📱", text: "WhatsApp is the fastest support" },
              { icon: "💰", text: "Ticket price + 7% fee (0% for members)" },
              {
                icon: "🔒",
                text: "We take full responsibility if issues occur",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 xs:gap-4 bg-white/5 rounded-lg sm:rounded-xl p-3 xs:p-4"
              >
                <span className="text-2xl xs:text-3xl shrink-0">
                  {item.icon}
                </span>
                <p
                  className={`${poppins.className} text-xs xs:text-sm sm:text-base text-gray-300 pt-1`}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FINAL CTA */}
        <motion.section
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl mx-2"
          {...fadeInUp}
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10"></div>
          <div className="relative text-center p-6 xs:p-8 sm:p-10 md:p-12 lg:p-16 space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-5 text-white">
            <h2 className="text-sm sm:text-xl font-semibold text-white px-2">
              Ready To Secure Your Spot?
            </h2>
            <p
              className={`${poppins.className} text-sm xs:text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4`}
            >
              Browse our available events and get tickets you can trust.
            </p>
            <div className="flex flex-col xs:flex-row justify-center gap-3 xs:gap-4 px-4">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-lg sm:rounded-xl text-xs xs:text-sm sm:text-base font-medium hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Browse Events
                <FaArrowRight className="shrink-0" />
              </Link>
              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 border-2 border-white px-2 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-lg sm:rounded-xl text-xs xs:text-sm sm:text-base font-medium hover:bg-white/10 transition-all"
              >
                Become a Member
                <FaCrown className="shrink-0" />
              </Link>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-xs xs:text-sm sm:text-base text-white/80 hover:text-white transition-colors"
            >
              Contact us on WhatsApp
              <FaWhatsapp className="shrink-0" />
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
