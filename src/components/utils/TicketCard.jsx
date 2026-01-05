import { Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { poppins } from "./FontPoppins";

export function TicketCard({ title, price, color, tickets, selectTicket }) {
  const [showConsent, setShowConsent] = useState(false);

  const handleTicketClick = () => {
    setShowConsent(true);
  };

  const handleYes = () => {
    setShowConsent(false);
    selectTicket();
  };

  const handleNo = () => {
    setShowConsent(false);
  };

  return (
    <div className="relative w-full">
      <Button
        sx={{
          width: "100%",
          textTransform: "none",
          color: "white",
        }}
        onClick={handleTicketClick}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-[#0c123f] to-[#0a0f33] p-5 w-full"
        >
          <div
            className={`absolute left-0 top-0 h-full w-1`}
            style={{ backgroundColor: color }}
          />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-base sm:text-lg">{title}</p>
              <p className="text-xs sm:text-sm text-[#05DF72] mt-1">
                Available
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold">{price}</p>
              <p className="text-xs text-[#99A1AF] uppercase">per person</p>
            </div>
          </div>
        </motion.div>
      </Button>

      {/* Consent Section */}
      <AnimatePresence>
        {showConsent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-xl border border-white/10 bg-linear-to-br from-[#0c123f] to-[#0a0f33] p-2">
              <p
                className={`${poppins.className} text-xs sm:text-base mb-4 text-center`}
              >
                Are you sure you want to purchase {tickets} {title} ticket(s)?
              </p>

              <div className="flex gap-3 justify-end">
                <Button
                  onClick={handleNo}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#ef4444",
                    color: "white",
                    px: { xs: 3, sm: 4 },
                    py: 1,
                    fontSize: {
                      xs: "10px",
                      sm: "12px",
                    },
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "#dc2626",
                    },
                  }}
                  startIcon={<FaTimes />}
                >
                  No
                </Button>

                <Button
                  onClick={handleYes}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#22D3EE",
                    color: "#0a0f33",
                    px: { xs: 3, sm: 4 },
                    py: 1,
                    fontSize: {
                      xs: "10px",
                      sm: "12px",
                    },
                    borderRadius: "8px",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#06b6d4",
                    },
                  }}
                  startIcon={<FaCheck />}
                >
                  Yes, Continue
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
