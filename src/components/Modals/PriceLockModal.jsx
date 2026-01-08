import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { FaLock } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function PriceLockModal({ onClose }) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      // router.push("/purchase-details");
    }, 1000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onClose, router]);

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

          <h2 className="text-sm sm:text-lg mb-2">Your Price Is Locked</h2>
        </div>
      </motion.div>
    </motion.div>
  );
}
