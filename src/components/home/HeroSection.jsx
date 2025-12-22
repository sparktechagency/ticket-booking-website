"use client";

import Image from "next/image";
import heroBg from "../../../public/Images/heroBg.png";
import { GoDotFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { Poppins } from "next/font/google";
import { Button, InputAdornment, InputBase } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative h-screen sm:min-h-175 lg:min-h-200">
      <Image
        src={heroBg}
        alt="Hero Background"
        fill
        priority
        // className="object-cover"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 h-full text-white">
        {/* Badge */}
        <div
          className={`${poppins.className} flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase bg-[#FFFFFF0D] border border-[#FFFFFF1A]`}
        >
          <GoDotFill className="text-[#BD85F1] text-xs sm:text-sm" />
          <p className="text-[#D1D5DC]">Live Events are Back</p>
        </div>

        {/* Heading */}
        <p className="text-lg sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl leading-tight">
          Book Your Favourite
        </p>

        <p className="flex flex-col gap-1 sm:gap-2 font-bold bg-linear-to-b from-[#BD85F1] via-white to-[#6D1DB9] bg-clip-text text-transparent text-lg sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl leading-tight">
          <span>Concerts & Sports</span>
          <span>Tickets</span>
        </p>

        <p
          className={`${poppins.className} text-[#99A1AF] text-xs sm:text-sm md:text-base lg:text-lg sm:max-w-md md:max-w-lg lg:max-w-2xl px-4`}
        >
          Experience the thrill of live events. Get your tickets now
        </p>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl bg-[#F5F5F5] p-2 sm:p-3 rounded-lg sm:rounded-xl mt-2 sm:mt-4">
          <InputBase
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search Events"
            sx={{
              flex: 1,
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              height: { xs: "50px", sm: "50px", md: "48px" },
              px: { xs: 1, sm: 1.5 },
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              width: "100%",
            }}
            startAdornment={
              <InputAdornment position="start">
                <FaSearch className="text-[#99A1AF] text-sm sm:text-base" />
              </InputAdornment>
            }
          />

          <Button
            onClick={handleSearch}
            sx={{
              px: { xs: 2, sm: 2.5, md: 3 },
              height: { xs: "32px", sm: "45px", md: "48px" },
              textTransform: "none",
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              width: { xs: "100%", sm: "auto" },
              minWidth: { sm: "140px", md: "160px", lg: "180px" },
              background: "linear-gradient(180deg, #8F18FB 0%, #5B06A7 100%)",
              borderRadius: "8px",
              "&:hover": {
                background: "linear-gradient(180deg, #5B06A7 0%, #7A2AD1 100%)",
              },
            }}
          >
            Find Tickets
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-16 mt-4 sm:mt-6 lg:mt-8 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
          <div className="flex flex-col items-center">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">500+</p>
            <p
              className={`${poppins.className} text-[#99A1AF] text-[10px] sm:text-xs md:text-sm lg:text-base mt-1`}
            >
              Events Listed
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">50K+</p>
            <p
              className={`${poppins.className} text-[#99A1AF] text-[10px] sm:text-xs md:text-sm lg:text-base mt-1`}
            >
              Tickets Sold
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">98%</p>
            <p
              className={`${poppins.className} text-[#99A1AF] text-[10px] sm:text-xs md:text-sm lg:text-base mt-1`}
            >
              Satisfaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
