import { Button, InputAdornment, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { FaArrowRight, FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { poppins } from "../utils/FontPoppins";

export default function AddressForm({
  formData,
  errors,
  handleChange,
  handleNext,
  inputStyles,
}) {
  return (
    <motion.div
      key="address-form"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="max-w-lg"
    >
      <div className="bg-[#2B024E] rounded-2xl p-3 sm:p-6 border border-purple-500/30">
        <div className="space-y-4">
          <div>
            <label
              className={`${poppins.className} block text-sm text-gray-400 mb-2`}
            >
              Address Line 1*
            </label>
            <TextField
              fullWidth
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              placeholder="Street address, P.O. box, company name"
              error={errors.addressLine1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaHome className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </div>

          <div>
            <label
              className={`${poppins.className} block text-sm text-gray-400 mb-2`}
            >
              Address Line 2*
            </label>
            <TextField
              fullWidth
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Apartment, suite, unit, building, floor, etc."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaHome className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </div>

          <div>
            <label
              className={`${poppins.className} block text-sm text-gray-400 mb-2`}
            >
              City *
            </label>
            <TextField
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              error={errors.city}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`${poppins.className} block text-sm text-gray-400 mb-2`}
              >
                Zip Code *
              </label>
              <TextField
                fullWidth
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="12345"
                error={errors.zipCode}
                sx={inputStyles}
              />
            </div>
            <div>
              <label
                className={`${poppins.className} block text-sm text-gray-400 mb-2`}
              >
                Country *
              </label>
              <TextField
                fullWidth
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Spain"
                error={errors.country}
                sx={inputStyles}
              />
            </div>
          </div>
        </div>

        <Button
          fullWidth
          onClick={handleNext}
          variant="contained"
          endIcon={<FaArrowRight />}
          sx={{
            mt: 4,
            background: "linear-gradient(to right, #8F18FB, #5B06A7)",
            color: "white",
            py: 1.5,
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
    </motion.div>
  );
}
