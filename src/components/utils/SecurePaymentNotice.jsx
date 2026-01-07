import React from "react";
import { CiLock } from "react-icons/ci";
import { poppins } from "./FontPoppins";

export default function SecurePaymentNotice() {
  return (
    <div className="bg-[#FFFFFF0D] rounded-xl p-3 sm:p-6 border border-green-500/20">
      <div className={`${poppins.className} flex items-start gap-3`}>
        <div className="bg-[#00C9501A] p-3 rounded-full">
          <CiLock className="text-[#05DF72] text-xl" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold mb-1">
            Secure Payment
          </h3>
          <p className="text-xs sm:text-sm text-[#99A1AF]">
            Your payment information is encrypted and secure. We never store
            your card details.
          </p>
        </div>
      </div>
    </div>
  );
}
