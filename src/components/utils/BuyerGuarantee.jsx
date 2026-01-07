import React from "react";
import { MdOutlineShield } from "react-icons/md";
import { poppins } from "./FontPoppins";

export default function BuyerGuarantee() {
  return (
    <div className="bg-[#FFFFFF0D] rounded-xl p-3 sm:p-6 border border-green-500/20">
      <div className={`${poppins.className} flex items-start gap-3`}>
        <div className="bg-[#13a0f11a] p-3 rounded-full">
          <MdOutlineShield className="text-[#22D3EE] text-xl" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-1">
            {" "}
            Buyer Guarantee Protected
          </h3>
          <p className="text-xs sm:text-sm text-[#99A1AF]">
            If your event gets cancelled, we&apos;re committed to making it
            right. Full refunds are processed within 5-7 business days for any
            cancelled events.
          </p>
        </div>
      </div>
    </div>
  );
}
