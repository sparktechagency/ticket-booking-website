import { Button, MenuItem, Select } from "@mui/material";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { MdOutlineChair } from "react-icons/md";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export function TicketQuantityModal({ onClose }) {
  const [tickets, setTickets] = useState(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-[#120033] via-[#1b004b] to-[#0b0020] p-6 shadow-2xl"
      >
        {/* Close */}
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 4,
            top: 4,
            color: "#FFFFFF",
          }}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          ✕
        </Button>
        <h2 className="sm:text-xl font-bold text-center mb-2 text-white">
          How many tickets?
        </h2>
        <p
          className={`${poppins.className} text-sm text-[#99A1AF] text-center mb-4`}
        >
          Select the number of tickets you would like to purchase.
        </p>

        <Select
          value={tickets}
          onChange={(e) => setTickets(Number(e.target.value))}
          fullWidth
          sx={{
            bgcolor: "#2a1a55",
            color: "white",
            borderRadius: "10px",
            fontSize: "14px",
            mb: 2,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.1)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.2)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#8b5cf6",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#1b1240",
                color: "white",
                borderRadius: "10px",
                mt: 1,
                "& .MuiMenuItem-root:hover": {
                  bgcolor: "#2a1a55",
                },
              },
            },
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <MenuItem key={n} value={n}>
              {n} Ticket{n > 1 ? "s" : ""}
            </MenuItem>
          ))}
        </Select>
        <div
          className={`${poppins.className} flex items-center gap-2 text-xs text-gray-300 mb-5`}
        >
          <MdOutlineChair color="#BD85F1" fontSize={16} />{" "}
          <p>Relax! You’ll be seated together guaranteed.</p>
        </div>
        <Button
          fullWidth
          sx={{
            borderRadius: "12px",
            background: "linear-gradient(135deg, #8F18FB 0%, #5B06A7 100%)",
            color: "white",
            textTransform: "none",
            fontWeight: 600,
            py: 1.5,
            "&:hover": {
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
            },
          }}
        >
          <FaTicketAlt className="mr-2 text-lg" /> Continue to Select Tickets
        </Button>
      </motion.div>
    </div>
  );
}
