import {
  Button,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaArrowRight, FaEnvelope, FaUser } from "react-icons/fa";
import { useState } from "react";
import { poppins } from "../utils/FontPoppins";
import Image from "next/image";
import { countryCodes } from "../../../public/Data/countryCodes";

export default function InfoForm({
  formData,
  handleChange,
  handleNext,
  errors,
  inputStyles,
}) {
  const [countryCode, setCountryCode] = useState("+1");

  return (
    <motion.div
      // key="info-form"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl w-full lg:min-w-lg"
    >
      <div className="bg-linear-to-b from-[#6D1DB9] to-[#090014] rounded-2xl p-3 sm:p-6 border border-purple-500/30">
        <h2 className="text-lg mb-3">Contact Information</h2>

        <div className="space-y-4">
          <div className="w-full">
            <label
              className={`${poppins.className} block text-sm text-gray-400 mb-2`}
            >
              Full Name *
            </label>
            <TextField
              fullWidth
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.fullName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </div>

          <div className="w-full">
            <label
              className={`${poppins.className} block text-sm text-gray-400 mb-2`}
            >
              Email *
            </label>
            <TextField
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="demo@example.com"
              error={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaEnvelope className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </div>

          <div className="w-full">
            <label
              className={`${poppins.className} block text-sm text-gray-400 mb-2`}
            >
              Phone Number *
            </label>
            <TextField
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="555 000 0000"
              error={errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      sx={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 500,
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSelect-icon": { color: "gray" },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        minWidth: "80px",
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: "#1a1a2e",
                            color: "white",
                            maxHeight: 300,
                            "& .MuiMenuItem-root": {
                              fontSize: "14px",
                              "&:hover": {
                                bgcolor: "rgba(168, 85, 247, 0.2)",
                              },
                              "&.Mui-selected": {
                                bgcolor: "rgba(168, 85, 247, 0.3)",
                                "&:hover": {
                                  bgcolor: "rgba(168, 85, 247, 0.4)",
                                },
                              },
                            },
                          },
                        },
                      }}
                    >
                      {countryCodes.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                          {/* <span className="mr-2">{item.flag}</span> */}
                          <div className="flex  items-center gap-1">
                            <span className="text-xs lg:text-sm font-medium">
                              {item.code}
                            </span>
                            <Image
                              src={item.flag}
                              alt={item.country}
                              width={50}
                              height={50}
                              className="w-5 h-3 mr-2 object-cover"
                            />
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                    <span className="text-gray-500 mx-2">|</span>
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </div>
        </div>
        <div className="w-full">
          <Button
            fullWidth
            onClick={handleNext}
            variant="contained"
            endIcon={<FaArrowRight />}
            sx={{
              mt: 4,
              background: "linear-gradient(to right, #8F18FB, #5B06A7)",
              color: "white",
              py: { xs: 1, sm: 1.5 },
              fontSize: "14px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(to right, #7c3aed, #6d28d9)",
                boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
              },
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
