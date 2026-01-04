"use client";

import React, { useState, useMemo } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import { IoSearch, IoLocationOutline } from "react-icons/io5";
import { FaMusic, FaSortAmountDown } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";

import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import EventCard from "@/components/utils/EventCard";
import eventsData from "../../../public/Data/EventsData";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function Concerts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [sortBy, setSortBy] = useState("date-asc");

  // Extract unique cities from events data
  const cities = useMemo(() => {
    const sportsEvents = eventsData.filter(
      (event) => event.category === "Concert"
    );
    const uniqueCities = [
      ...new Set(
        sportsEvents.map((event) => event.location || event.venue.city)
      ),
    ].filter(Boolean);
    return ["All", ...uniqueCities.sort()];
  }, []);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = eventsData.filter((event) => {
      const isConcert = event.category === "Concert";

      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCity =
        selectedCity === "All" ||
        event.location === selectedCity ||
        event.venue.city === selectedCity;

      return isConcert && matchesSearch && matchesCity;
    });

    // Sort events
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortBy === "date-asc") {
        return dateA - dateB; // Earliest first
      } else if (sortBy === "date-desc") {
        return dateB - dateA; // Latest first
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, selectedCity, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e27] via-[#1a1338] to-[#0a0e27] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-lg sm:text-4xl lg:text-[40px] font-bold text-white mb-2">
            Sports
          </h1>
          <p
            className={`${poppins.className} text-[#99A1AF] text-xs sm:text-base`}
          >
            Find your next unforgettable experience
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-transparent mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search */}
          <div className="w-full md:w-full lg:w-130">
            <TextField
              fullWidth
              placeholder="Search events, artists, or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearch className="text-gray-400 text-lg" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 42,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "9999px",
                },
              }}
            />
          </div>

          <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
            {/* Category Pills */}

            {/* City */}
            <div className="w-full sm:w-35">
              <Select
                fullWidth
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <IoLocationOutline className="text-gray-400" />
                  </InputAdornment>
                }
                sx={{
                  height: 42,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "9999px",
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </div>

            {/* Sort */}
            <div className="w-full sm:w-37.5">
              <Select
                fullWidth
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FaSortAmountDown className="text-gray-400" />
                  </InputAdornment>
                }
                sx={{
                  height: 42,
                  backgroundColor: "#FFFFFF",
                  borderRadius: "9999px",
                }}
              >
                <MenuItem value="date-asc">Earliest</MenuItem>
                <MenuItem value="date-desc">Latest</MenuItem>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Active Filters Display */}
        {(selectedCity !== "All" || searchQuery) && (
          <motion.div
            className="flex flex-wrap gap-2 items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gray-400 text-sm">Active filters:</span>
            {selectedCity !== "All" && (
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                {selectedCity}
              </span>
            )}
            {searchQuery && (
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                &quot;{searchQuery}&quot;
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCity("All");
              }}
              className="text-purple-400 hover:text-purple-300 text-sm underline"
            >
              Clear all
            </button>
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-400 text-sm">
            Showing {filteredEvents.length} event
            {filteredEvents.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={searchQuery + selectedCity + sortBy}
        >
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} variants={itemVariants} />
          ))}
        </motion.div>

        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400 text-lg mb-2">
              No events found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedCity("All");
              }}
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Clear filters to see all events
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
