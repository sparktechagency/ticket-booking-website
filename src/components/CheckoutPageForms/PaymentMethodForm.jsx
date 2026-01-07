import {
  Button,
  InputAdornment,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCreditCard,
  FaEnvelope,
  FaLock,
  FaTimes,
} from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { SiAmericanexpress, SiMastercard } from "react-icons/si";
import { useState } from "react";
import { poppins } from "../utils/FontPoppins";
import Link from "next/link";
import { PiStarFourBold } from "react-icons/pi";

export default function PaymentMethodForm({
  formData,
  errors,
  handleChange,
  inputStyles,
  orderDetails,
  subtotal,
  serviceFee,
  total,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const handleOpenGiftCard = () => {
    setOpenModal(true);
    setPromoError("");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPromoCode("");
    setPromoError("");
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    // Simulate promo validation (replace with your actual logic)
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({
        code: promoCode,
        discount: "10%",
      });
      handleCloseModal();
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  return (
    <>
      <motion.div
        key="payment-form"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="space-y-10"
      >
        <div className="bg-[#FFFFFF0D] rounded-2xl p-6 border border-[#FFFFFF1A]">
          <p className="sm:text-xl mb-2">Your Information</p>
          <div className="flex items-center gap-2 mb-2">
            <FaEnvelope className="text-[#BD85F1]" />
            <h2 className={`${poppins.className} text-sm text-[#99A1AF]`}>
              Contact
            </h2>
          </div>
          <div className={`${poppins.className} space-y-1 text-sm`}>
            <p className="text-gray-300">{formData.fullName}</p>
            <p className="text-gray-400">{formData.email}</p>
            <p className="text-gray-400">+1 {formData.phone}</p>
          </div>
          {/* Address Display */}
          {/* <div className="bg-transparent mt-5 pt-5 border-t border-[#FFFFFF1A]">
                     <div className="flex items-center gap-2 mb-2">
                       <FaMapMarkerAlt className="text-[#BD85F1]" />
                       <h2 className={`${poppins.className} text-sm text-[#99A1AF]`}>
                         Delivery Address
                       </h2>
                     </div>
                     <div
                       className={`${poppins.className} flex flex-wrap items-center text-sm text-white`}
                     >
                       <p>{formData.addressLine1},</p>
                       {formData.addressLine2 && <p>{formData.addressLine2},</p>}
                       <p>
                         {formData.city}, {formData.zipCode},
                       </p>
                       <p>{formData.country}</p>
                     </div>
                   </div> */}
        </div>{" "}
        <div className="bg-linear-to-b from-[#6D1DB9] to-[#090014] rounded-2xl p-2 sm:p-6 border border-purple-500/30">
          <div className="bg-[#BD85F11A] border border-[#BD85F1] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <FaCreditCard className="text-xl text-[#BD85F1]" />
              <div className="font-sans">
                <p className="text-sm font-medium">Credit / Debit Card</p>
                <p className="text-xs text-gray-400">Powered by Stripe</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="font-sans block text-sm text-gray-400 mb-2">
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
              <label className="font-sans block text-sm text-gray-400 mb-2">
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
                <label className="font-sans block text-sm text-gray-400 mb-2">
                  Expiry Date *
                </label>
                <TextField
                  fullWidth
                  name="expiry"
                  value={formData.expiry}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");

                    if (value.length >= 2) {
                      value = value.slice(0, 2) + "/" + value.slice(2, 4);
                    }

                    handleChange({
                      target: {
                        name: "expiry",
                        value: value.slice(0, 5),
                      },
                    });
                  }}
                  placeholder="MM/YY"
                  inputProps={{ maxLength: 5 }}
                  error={errors.expiry}
                  sx={inputStyles}
                />
              </div>
              <div>
                <label className="font-sans block text-sm text-gray-400 mb-2">
                  Verification Code *
                </label>
                <TextField
                  fullWidth
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  placeholder="123"
                  inputProps={{ maxLength: 4 }}
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
          {appliedPromo && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-sm font-medium text-green-400">
                  Promo Applied: {appliedPromo.code}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400">
                  {appliedPromo.discount} discount
                </p>
              </div>
              <button
                onClick={handleRemovePromo}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
            <FaLock className="text-sm" />
            <span className="font-sans block text-xs sm:text-sm text-gray-400">
              Your payment information is secure and encrypted
            </span>
          </div>
          <div className="flex items-center justify-between px-3 py-1 bg-white rounded-lg mt-2">
            <p className="text-black text-[10px]">Gift Card / Promo Code</p>
            <Button
              onClick={handleOpenGiftCard}
              sx={{
                textTransform: "none",
                bgcolor: "#efefef",
                fontWeight: "600",
                "&:hover": {
                  bgcolor: "#e0e0e0",
                },
              }}
            >
              {appliedPromo ? "Change" : "Add"}
            </Button>
          </div>
        </div>{" "}
      </motion.div>

      {/* Promo Code Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background: "linear-gradient(to bottom, #1a0b2e, #0a0118)",
            border: "1px solid rgba(189, 133, 241, 0.3)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <span className="font-sans text-sm font-semibold">
            Add Promo Code
          </span>
          <IconButton onClick={handleCloseModal} sx={{ color: "gray" }}>
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value.toUpperCase());
              setPromoError("");
            }}
            placeholder="Enter promo code"
            error={!!promoError}
            helperText={promoError}
            autoFocus
            sx={{
              ...inputStyles,
              "& .MuiFormHelperText-root": {
                color: "#ef4444",
              },
            }}
          />
          <p className="text-[10px] sm:text-xs text-gray-400 mt-3">
            Enter your gift card or promotional code to receive a discount
          </p>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleCloseModal}
            sx={{
              textTransform: "none",
              color: "gray",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApplyPromo}
            variant="contained"
            sx={{
              textTransform: "none",
              background: "linear-gradient(to right, #8F18FB, #5B06A7)",
              fontWeight: 600,
              px: 4,
              "&:hover": {
                background: "linear-gradient(to right, #7c3aed, #6d28d9)",
              },
            }}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
