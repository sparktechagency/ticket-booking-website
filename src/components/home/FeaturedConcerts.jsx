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
import { concertData } from "../../../public/Data/ConcertData";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function FeaturedConcerts() {
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
            Featured Concerts
          </p>
          <p
            className={`${poppins.className} text-xs sm:text-sm md:text-base lg:text-lg text-[#99A1AF]`}
          >
            Feel the music live, book tickets to top shows and tours.
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
        {concertData.map((concert) => (
          <div key={concert.id} className="px-2 sm:px-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="bg-linear-to-b from-[#581C8700] via-[#581C8733] to-[#080014] rounded-xl sm:rounded-2xl overflow-hidden h-full flex flex-col"
            >
              {/* concert Image with Category Badge */}
              <div className="relative">
                <Image
                  src={concert.image}
                  alt={concert.title}
                  width={800}
                  height={450}
                  className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                />

                <span
                  className={`${poppins.className} absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#9333EA] text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full`}
                >
                  {concert.category || "N/A"}
                </span>
              </div>

              {/* concert Details */}
              <div className="flex flex-col p-3 sm:p-4 md:p-5 flex-1">
                <h3 className="text-white text-xs sm:text-base xl:text-lg font-semibold mb-1">
                  {concert.title || "N/A"}
                </h3>
                <p
                  className={`${poppins.className} text-[#99A1AF] text-xs sm:text-sm mb-2 sm:mb-3`}
                >
                  {concert.matchup || concert.artist || "N/A"}
                </p>

                {/* Date & Location */}
                <div className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <FaCalendar className="text-[#22D3EE] text-xs sm:text-sm shrink-0" />
                    <div
                      className={`${poppins.className} flex items-center gap-1 sm:gap-2 text-[#99A1AF] text-xs sm:text-sm`}
                    >
                      <span>{concert.date || "N/A"}</span>
                      <GoDotFill className="text-[8px] sm:text-[10px]" />
                      <span>{concert.time || "N/A"}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <FaMapMarkerAlt className="text-[#22D3EE] text-xs sm:text-sm shrink-0 mt-0.5" />
                    <div
                      className={`${poppins.className} flex flex-wrap items-center gap-1 text-[#99A1AF] text-xs lg:text-sm`}
                    >
                      <p>{concert.venue.name || "N/A"},</p>
                      <p>{concert.venue.city || "N/A"},</p>
                      <p>{concert.venue.country || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <Divider
                  sx={{
                    bgcolor: "#FFFFFF1A",
                    my: { xs: "8px", sm: "10px" },
                  }}
                />

                {/* Price & Button */}
                <div className="flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <p
                      className={`${poppins.className} text-[#99A1AF] text-[10px] sm:text-xs`}
                    >
                      From:
                    </p>
                    <p className="text-white text-lg xl:text-2xl font-bold">
                      ${concert.pricing.from || "N/A"}
                    </p>
                  </div>
                  <Link
                    href={`/concerts/${concert.id}`}
                    className="flex items-center gap-1 sm:gap-2 text-white text-[10px]
                     sm:text-xs lg:text-sm px-1.5 sm:px-2 xl:px-3 py-0.5 sm:py-1
                     min-h-7 sm:min-h-8 md:min-h-9 
                     rounded-lg bg-linear-to-b from-[#8F18FB] to-[#5B06A7]
                    hover:bg-linear-to-b hover:from-[#5B06A7] hover:to-[#7A2AD1]"
                  >
                    <FaTicketAlt className="text-xs sm:text-sm" />
                    <span className="hidden sm:block">Get Tickets</span>
                    <span className="sm:hidden">Tickets</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
