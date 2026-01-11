/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBack, MdEdit, MdStar } from "react-icons/md";
import { Button, CircularProgress } from "@mui/material";
import {
  useEditProfileMutation,
  useGetUserProfileQuery,
} from "@/Redux/slices/profileApi";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    data: userProfileData,
    isLoading,
    isError,
  } = useGetUserProfileQuery();
  const profileData = userProfileData?.data;
  console.log("profileData", profileData);

  const [editProfile, { isLoading: editingProfile }] = useEditProfileMutation();

  // Form data for editing - only used when in edit mode
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  // When entering edit mode, populate form with current profile data
  const handleEditClick = () => {
    setEditFormData({
      fullName: profileData?.fullName || "",
      phone: profileData?.phone || "",
      email: profileData?.email || "",
    });
    setIsEditing(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(profileData?.profileImage || null);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        fullName: editFormData.fullName,
        phone: editFormData.phone,
        email: editFormData.email,
      };
      const formData = new FormData();
      formData.append("data", updatedData);

      // Only append image if user uploaded a new one
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await editProfile(formData).unwrap();
      console.log(response);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    // Reset everything
    setEditFormData({
      fullName: "",
      phone: "",
      email: "",
    });
    setImagePreview(profileData?.profileImage || null);
    setProfileImage(null);
    setIsEditing(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="success" size={80} />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-xl text-red-400">Failed to load profile data</div>
      </div>
    );
  }

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
                <Button
                  onClick={handleCancel}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: "0.25rem", lg: "0.75rem" },
                    color: "#d8b4fe",
                    transition: "color 0.3s",
                    textTransform: "none",
                    "&:hover": {
                      color: "#ffffff",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <MdArrowBack className="sm:text-2xl" />
                  <span className="lg:text-lg font-medium">Back</span>
                </Button>

                <Button
                  sx={{
                    textTransform: "none",
                    color: "#d8b4fe",
                    fontSize: { xs: "1rem", lg: "1.125rem" },
                    fontWeight: 500,
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "#ffffff",
                    },
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>

              {/* Edit Form Card */}
              <div className="bg-[#20033B] rounded-xl border border-[#FFFFFF1A] shadow-2xl overflow-hidden p-3 sm:p-5 lg:p-10">
                <h1 className="text-lg sm:text-2xl font-bold mb-8 bg-linear-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Personal Information
                </h1>

                {/* Profile Image Upload */}
                <div className="mb-8 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden flex items-center justify-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl text-white/50">
                          {editFormData.fullName.charAt(0) ||
                            profileData?.fullName?.charAt(0) ||
                            "U"}
                        </span>
                      )}
                    </div>
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <div className="mt-4 flex gap-3">
                    <label
                      htmlFor="profile-upload"
                      className="px-6 py-2 bg-purple-600/50 hover:bg-purple-600/70 rounded-xl text-sm text-white cursor-pointer transition-all"
                    >
                      Upload Photo
                    </label>
                    {imagePreview && (
                      <button
                        onClick={handleRemoveImage}
                        className="px-6 py-2 bg-red-600/50 hover:bg-red-600/70 rounded-xl text-sm text-white transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editFormData.fullName}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          fullName: e.target.value,
                        })
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
                      value={editFormData.phone}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          phone: e.target.value,
                        })
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
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        })
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
                      <Button
                        onClick={handleEditClick}
                        sx={{
                          marginTop: { xs: "1rem", sm: 0 },
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "#d8b4fe",
                          transition: "color 0.3s",
                          textTransform: "none",
                          "&:hover": {
                            color: "#e9d5ff",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        <MdEdit style={{ fontSize: "1.25rem" }} />
                        <span className="">Edit Info</span>
                      </Button>
                    </div>

                    {/* Profile Image Display */}
                    <div className="mb-8 flex justify-center">
                      <div className="w-32 h-32 rounded-full bg-white/10 border-2 border-white/20 overflow-hidden flex items-center justify-center">
                        {imagePreview || profileData?.profileImage ? (
                          <img
                            src={imagePreview || profileData?.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl text-white/50">
                            {profileData?.fullName?.charAt(0) || "U"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={profileData?.fullName || "N/A"}
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
                          value={
                            profileData?.phone || profileData?.countryCode
                              ? `${profileData.countryCode || ""} ${
                                  profileData.phone
                                }`
                              : "N/A"
                          }
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
                          value={profileData?.email || "N/A"}
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
                        <h3 className="text-xs sm:text-base">
                          {profileData?.membershipType || "N/A"}
                        </h3>
                        {profileData?.premiumExpiresAt ? (
                          <p className="text-[10px] sm:text-xs text-[#E9D5FF] mt-1">
                            Valid until ${profileData?.premiumExpiresAt}
                          </p>
                        ) : (
                          ""
                        )}
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
