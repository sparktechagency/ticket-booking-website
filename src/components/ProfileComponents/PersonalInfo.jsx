"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBack, MdEdit, MdStar } from "react-icons/md";
import { Button } from "@mui/material";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    phone: "+1 (555) 012-3456",
    email: "customer@example.com",
  });

  const handleSave = () => {
    // In real app: save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form if needed
    setFormData({
      fullName: "John Doe",
      phone: "+1 (555) 012-3456",
      email: "customer@example.com",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen  text-white">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {isEditing ? (
            /* ==================== EDIT MODE ==================== */
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header with Back & Cancel */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 lg:gap-3 text-purple-300 hover:text-white transition-colors"
                >
                  <MdArrowBack className="sm:text-2xl" />
                  <span className="lg:text-lg font-medium">Back</span>
                </button>

                <button
                  onClick={handleCancel}
                  className="text-purple-300 hover:text-white lg:text-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>

              {/* Edit Form Card */}
              <div className="bg-[#20033B] rounded-xl border border-[#FFFFFF1A] shadow-2xl overflow-hidden p-3 sm:p-5 lg:p-10">
                <h1 className="text-lg sm:text-2xl font-bold mb-8 bg-linear-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Personal Information
                </h1>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-5 py-2 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-5 py-2 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-5 py-2 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-5 sm:mt-10">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="w-full py-2 sm:py-3 bg-linear-to-r from-[#8F18FB] to-[#5B06A7] rounded-xl shadow-lg hover:shadow-purple-500/40 transition-all duration-300 cursor-pointer"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ==================== VIEW MODE ==================== */
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Personal Information Section (View) */}
              <section>
                <div className="bg-[#20033B] rounded-2xl border border-[#FFFFFF1A] shadow-2xl overflow-hidden">
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                      <h1 className="text-base sm:text-lg lg:text-2xl text-white">
                        Personal Information
                      </h1>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 sm:mt-0 flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors"
                      >
                        <MdEdit className="lg:text-xl" />
                        <span className="text-xs sm:text-base">Edit Info</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={formData.fullName}
                          className="w-full px-5 py-2 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          readOnly
                          value={formData.phone}
                          className="w-full px-5 py-2 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          readOnly
                          value={formData.email}
                          className="w-full px-5 py-2 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Membership Status Section */}
              <section>
                <h2 className="sm:text-lg lg:text-[30px] text-white mb-4">
                  Membership Status
                </h2>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#BD85F11A] rounded-2xl border border-[#BD85F14D] shadow-2xl overflow-hidden p-3 sm:p-8 lg:p-10"
                >
                  <div className="flex sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="p-2 bg-[#BD85F1] rounded-full border border-purple-400/50">
                        <MdStar className="sm:text-3xl text-white" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-base">Premium Member</h3>
                        <p className="text-[10px] sm:text-xs text-[#E9D5FF] mt-1">
                          Valid until 2026-01-15
                        </p>
                      </div>
                    </div>

                    <Button
                      sx={{
                        color: "white",
                        textTransform: "none",
                      }}
                    >
                      Manage
                    </Button>
                  </div>
                </motion.div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
