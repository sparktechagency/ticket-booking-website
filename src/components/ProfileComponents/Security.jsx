"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShield, FiArrowLeft } from "react-icons/fi";
import { Poppins } from "next/font/google";
import { Button } from "@mui/material";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function Security() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleBack = () => {
    setIsChangingPassword(false);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  return (
    <>
      <div className="min-h-screen px-4 py-12">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            {!isChangingPassword ? (
              <motion.div
                key="security-overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#20033B] rounded-xl shadow-xl border border-[#FFFFFF1A] overflow-hidden w-full"
              >
                <div className="p-3 sm:p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <FiShield className="size-5 lg:size-8 text-purple-400" />
                    <h2 className="lg:text-2xl text-white">Security</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div className="mb-3">
                        <p className="text-white mb-2">Password</p>
                        <p
                          className={`${poppins.className} text-[#99A1AF] text-sm`}
                        >
                          Last changed 3 months ago
                        </p>
                      </div>
                      <Button
                        onClick={handleChangePassword}
                        sx={{
                          px: 2,
                          py: {
                            xs: 0.5,
                            sm: 1.5,
                          },
                          background:
                            "linear-gradient(90deg, #8F18FB 0%, #5B06A7 100%)",
                          borderRadius: "14px",
                          color: "white",
                          textTransform: "none",
                        }}
                      >
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="change-password"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-[#20033B] rounded-xl shadow-xl border border-[#FFFFFF1A] overflow-hidden"
              >
                <div className="p-3 sm:p-8">
                  <div className="flex flex-col mb-4 sm:mb-8">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={handleBack}
                        className="flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <FiArrowLeft className="size-4 sm:size-6" />
                        <span className="text-xs sm:text-base">Back</span>
                      </button>{" "}
                      <button
                        onClick={handleBack}
                        className="text-[#BD85F1] hover:text-slate-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="flex items-center mt-3 gap-2">
                      <FiShield className="sm:size-8 text-purple-400" />
                      <h2 className="sm:text-2xl text-white">Security</h2>
                    </div>
                  </div>

                  <form className="space-y-3 sm:space-y-6">
                    <div>
                      <label
                        htmlFor="current"
                        className={`${poppins.className} text-[#99A1AF] text-sm`}
                      >
                        Current Password
                      </label>
                      <input
                        id="current"
                        type="password"
                        className="w-full px-4 py-2 sm:py-3 bg-white border border-slate-700 rounded-2xl text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder=""
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="new"
                        className={`${poppins.className} text-[#99A1AF] text-sm`}
                      >
                        New Password
                      </label>
                      <input
                        id="new"
                        type="password"
                        className="w-full px-4 py-2 sm:py-3 bg-white border border-slate-700 rounded-2xl text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder=""
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="confirm"
                        className={`${poppins.className} text-[#99A1AF] text-sm`}
                      >
                        Confirm New Password
                      </label>
                      <input
                        id="confirm"
                        type="password"
                        className="w-full px-4 py-2 sm:py-3 bg-white border border-slate-700 rounded-2xl text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder=""
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 sm:py-4 text-xs sm:text-base bg-linear-to-r from-[#8F18FB] to-[#5B06A7] rounded-xl text-white shadow-lg hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer"
                    >
                      Update Password
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
