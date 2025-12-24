import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { FaLock } from "react-icons/fa";

export function PurchaseLockModal({ onClose, onStart }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ duration: 0.25 }}
        className="w-[90%] max-w-md rounded-xl bg-linear-to-br from-[#1b0634] to-[#12072a] p-6 border border-white/10 text-white"
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
            <FaLock />
          </div>

          <h2 className="text-lg font-semibold mb-2">
            You have 10 minutes to complete your purchase
          </h2>

          <p className="text-sm text-gray-400 mb-5">
            The price of your tickets will be locked during this time
          </p>

          <Button
            fullWidth
            hooking
            onClick={onStart}
            sx={{
              bgcolor: "#7c3aed",
              color: "white",
              textTransform: "none",
              "&:hover": { bgcolor: "#6d28d9" },
            }}
          >
            Start
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
