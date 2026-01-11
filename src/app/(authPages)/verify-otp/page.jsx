"use client";

import { poppins } from "@/components/utils/FontPoppins";
import {
  useResendOtpMutation,
  useUserOtpVerifyMutation,
} from "@/Redux/slices/authApi";
import { Button, TextField } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OTPPage() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(() => {
    const expiry = sessionStorage.getItem("otpExpiry");
    return expiry ? Math.max(Math.floor((expiry - Date.now()) / 1000), 0) : 180;
  });
  const router = useRouter();

  const [userOtpVerify] = useUserOtpVerifyMutation();
  const [resendOtp] = useResendOtpMutation();

  // const token =
  //   typeof window !== "undefined"
  //     ? sessionStorage.getItem("createUserToken")
  //     : null;

  const email = sessionStorage.getItem("userEmail");

  // ⏱ Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      const expiry = sessionStorage.getItem("otpExpiry");
      if (!expiry) {
        clearInterval(timer);
        setTimeLeft(0);
        return;
      }
      const newTimeLeft = Math.max(Math.floor((expiry - Date.now()) / 1000), 0);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    if (otp.length < 6) {
      toast.warning("Please fill in all OTP fields");
      return;
    }

    // if (!token) {
    //   toast.error("Error!. Please start the reset process again.");
    //   router.push("/forgot-password");
    //   return;
    // }

    try {
      const data = {
        email,
        oneTimeCode: Number(otp),
      };

      const response = await userOtpVerify(data).unwrap();
      console.log("OTP verification response:", response);

      if (response.success) {
        sessionStorage.removeItem("createUserToken");
        toast.success("Verification Succesfull. Please Log In");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.data?.message === "You provided wrong otp") {
        toast.error("Invalid OTP. Please try again.");
      } else if (
        error.data?.message === "Otp already expired, Please try again"
      ) {
        toast.error("Otp already expired, Please try again");
      } else if (error.data?.message === "OTP did not match") {
        toast.error(" OTP did not match");
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found. Please start the reset process again.");
      navigate("/sign-up");
      return;
    }

    const data = { email };
    console.log("resend data", data);
    try {
      const response = await resendOtp(data).unwrap();
      if (response.success) {
        toast.success("An OTP has been sent to your email!");
        setOtp("");

        // Reset countdown
        const endTime = Date.now() + 180 * 1000; // 3 minutes from now
        sessionStorage.setItem("otpExpiry", endTime);
        setTimeLeft(180);
      }
    } catch (error) {
      console.log(error);
      // console.error("Error sending reset code:", error);
      if (error.data?.message === "User not found") {
        toast.error("Incorrect Email.");
      }
      if (error.data?.message === "Otp exist. Please check email.") {
        toast.error("OTP already sent. Please check your email.");
      } else {
        toast.error("Failed to resend OTP. Try again.");
      }
    }
  };

  return (
    <div className="bg-linear-to-br from-[#0a0e27] via-[#16112e] to-[#0a0e27] min-h-[85vh] flex justify-center items-center p-4">
      <div className="flex flex-col gap-2 sm:gap-4 bg-linear-to-br from-[#1a0b2e] to-[#0c0520] shadow-2xl rounded-lg w-full max-w-xl px-3 sm:px-8 py-4 sm:py-12  border border-purple-500/20">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-center text-lg sm:text-3xl font-bold text-white">
            Verify OTP
          </p>
          <p
            className={`${poppins.className} text-[#b8b8b8] text-xs sm:text-base`}
          >
            A 6-digit code has been sent to your email.
          </p>
        </div>

        <form onSubmit={handleOTPSubmit} className="flex flex-col gap-3">
          <MuiOtpInput
            value={otp}
            onChange={setOtp}
            length={6}
            TextFieldsProps={{
              size: "small",
              sx: {
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#414457",
                    color: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#414457",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#414457",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "#ffffff",
                  textAlign: "center",
                },

                // optional: caret color
                "& input": {
                  caretColor: "#ffffff",
                },
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #8b5cf6, #7c3aed)",
              textTransform: "none",
              fontWeight: "600",
              color: "#FFFFFF",
              padding: {
                xs: "6px 16px",
                sm: "10px 20px",
                md: "12px 24px",
              },
              fontSize: {
                xs: "0.875rem",
                sm: "0.9375rem",
                md: "1rem",
              },
              borderRadius: "8px",
              width: "100%",
              minHeight: {
                xs: "40px",
                sm: "48px",
                md: "52px",
              },
              "&:hover": {
                background: "linear-gradient(to right, #7c3aed, #6d28d9)",
                boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
              },
              "&:disabled": {
                background: "rgba(139, 92, 246, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
            type="submit"
          >
            Send OTP
          </Button>
        </form>
        {/* ⏱ Countdown + Resend */}
        <div className="text-center text-sm text-[#b4b4b4]">
          {timeLeft > 0 ? (
            <p>
              Resend OTP in{" "}
              <span className="font-semibold text-[#b192fa]">
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </p>
          ) : (
            <Button
              onClick={handleResendOtp}
              variant="text"
              sx={{
                background: "linear-gradient(to right, #8b5cf6, #7c3aed)",
                textTransform: "none",
                fontWeight: "600",
                color: "#FFFFFF",
                padding: {
                  xs: "6px 16px",
                  sm: "10px 20px",
                  md: "6px 15px",
                },
                fontSize: {
                  xs: "0.875rem",
                  sm: "0.9375rem",
                  md: "1rem",
                },
                borderRadius: "8px",
                width: "50%",
                minHeight: {
                  xs: "30px",
                  sm: "35px",
                  md: "40px",
                },
                "&:hover": {
                  background: "linear-gradient(to right, #7c3aed, #6d28d9)",
                  boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
                },
                "&:disabled": {
                  background: "rgba(139, 92, 246, 0.3)",
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}
            >
              Resend OTP
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
