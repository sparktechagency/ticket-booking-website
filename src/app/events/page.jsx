"use client";

import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { IoSearch, IoLocationOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import EventCard from "@/components/utils/EventCard";
import eventsData from "../../../public/Data/EventsData";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function BrowseEvents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Sports", "Concert"];

  const filteredEvents = eventsData.filter((event) => {
    console.log(event);
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1338] to-[#0a0e27] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-lg sm:text-4xl lg:text-[40px] font-bold text-white mb-2">
            Browse Events
          </h1>
          <p
            className={`${poppins.className} text-[#99A1AF] text-xs sm:text-base`}
          >
            Find your next unforgettable experience
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="w-full lg:w-96">
            <TextField
              fullWidth
              placeholder="Search events, artist or team..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearch className="text-gray-400 text-xl" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  color: "black",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(139, 92, 246, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8b5cf6",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "black",
                  "&::placeholder": {
                    color: "#99A1AF",
                    opacity: 1,
                  },
                },
              }}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
            {categories.map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    px: { xs: 1, md: 3 },
                    py: 1,
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "14px",
                    textTransform: "none",
                    ...(selectedCategory === category
                      ? {
                          background:
                            "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                          color: "white",
                          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                            boxShadow: "0 6px 16px rgba(139, 92, 246, 0.4)",
                          },
                        }
                      : {
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          color: "#d1d5db",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                        }),
                  }}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory + searchQuery}
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
            <p className="text-gray-400 text-lg">
              No events found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
