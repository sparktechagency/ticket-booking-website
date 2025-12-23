"use client";

import React from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendar,
  FaMapMarkerAlt,
  FaTicketAlt,
} from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { motion } from "framer-motion";
import Slider from "react-slick";
import Image from "next/image";
import { Button, Divider } from "@mui/material";
import SportsData from "../../../public/Data/SportsData";
import EventCard from "../utils/EventCard";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function FeaturedSports() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 20,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#04092C] py-6 sm:py-8 md:py-10 xl:py-20 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-56">
      <style jsx global>{`
        .slick-track {
          display: flex !important;
        }
        .slick-slide {
          height: inherit !important;
        }
        .slick-slide > div {
          height: 100%;
        }

        .slick-dots li button:before {
          color: #fff !important;
          opacity: 0.5 !important;
          font-size: 8px !important;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1 !important;
          font-size: 10px !important;
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8">
        <div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl text-white mb-1">
            Featured Sports
          </p>
          <p
            className={`${poppins.className} text-xs sm:text-sm md:text-base lg:text-lg text-[#99A1AF]`}
          >
            Top-tier games you don’t want to miss.
          </p>
        </div>
        <Link
          href="/artists"
          className="text-[#A1E8FD] text-xs sm:text-sm flex items-center gap-1 sm:gap-2 hover:underline"
        >
          View All <FaArrowRight className="text-xs sm:text-sm" />
        </Link>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {SportsData.map((sport) => (
          <div key={sport.id} className="px-2 sm:px-3">
            <EventCard event={sport} variant={itemVariants} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
