import { Button, InputAdornment, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { FaArrowRight, FaCreditCard, FaLock } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { SiAmericanexpress, SiMastercard } from "react-icons/si";
import { poppins } from "../utils/FontPoppins";

export default function PaymentMethodForm({
  formData,
  errors,
  handleChange,
  handleNext,
  inputStyles,
}) {
  return (
    <motion.div
      key="payment-form"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="max-w-lg"
    >
      <div className="bg-linear-to-b from-[#6D1DB9] to-[#090014] rounded-2xl p-2 sm:p-6 border border-purple-500/30">
        <div className="bg-[#BD85F11A] border border-[#BD85F1] rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <FaCreditCard className="text-xl text-[#BD85F1]" />
            <div className={`${poppins.className}`}>
              <p className="text-sm font-medium">Credit / Debit Card</p>
              <p className="text-xs text-gray-400">Powered by Stripe</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              className={`${poppins.className} block text-sm text-gray-400 mb-2`}
            >
              Card Number*
            </label>
            <TextField
              fullWidth
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              error={errors.cardNumber}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div className="flex gap-1">
                      <RiVisaLine className="text-2xl text-blue-600" />
                      <SiMastercard className="text-xl text-red-600" />
                      <SiAmericanexpress className="text-xl text-blue-500" />
                    </div>
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
              Card Holder Name*
            </label>
            <TextField
              fullWidth
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.cardHolder}
              sx={inputStyles}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`${poppins.className} block text-sm text-gray-400 mb-2`}
              >
                Expiry Date *
              </label>
              <TextField
                fullWidth
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                error={errors.expiry}
                sx={inputStyles}
              />
            </div>
            <div>
              <label
                className={`${poppins.className} block text-sm text-gray-400 mb-2`}
              >
                Verification Code *
              </label>
              <TextField
                fullWidth
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
                placeholder="123"
                error={errors.cvc}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FaCreditCard className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
          <FaLock className="text-sm" />
          <span
            className={`${poppins.className} block text-xs sm:text-sm text-gray-400`}
          >
            Your payment information is secure and encrypted
          </span>
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
