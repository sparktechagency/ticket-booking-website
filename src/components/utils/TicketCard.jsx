import { Button } from "@mui/material";
import { motion } from "framer-motion";

export function TicketCard({ title, price, accent, selectTicket }) {
  return (
    <Button
      sx={{
        width: "100%",
        textTransform: "none",
        color: "white",
      }}
      onClick={selectTicket}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#0c123f] to-[#0a0f33] p-5 w-full"
      >
        <div
          className={`absolute left-0 top-0 h-full w-1 bg-linear-to-b ${accent}`}
        />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-base sm:text-lg">{title}</p>
            <p className="text-xs sm:text-sm text-[#05DF72] mt-1">Available</p>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold">{price}</p>
            <p className="text-xs text-[#99A1AF] uppercase">per person</p>
          </div>
        </div>
      </motion.div>
    </Button>
  );
}
