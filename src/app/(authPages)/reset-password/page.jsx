"use client";

import useLogIn from "@/components/libs/hooks/useLogIn";
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { toast } from "sonner";

export default function ResetPassword() {
  const { user, loading, error, logIn } = useLogIn();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleShowNewPassword = () => setShowPassword((prev) => !prev);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6 || confirmPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    toast.success("Password reset successful!");

    // Navigate to the sign-in page

    router.push("/sign-in");
  };

  return (
    <div className="bg-linear-to-br from-[#0a0e27] via-[#16112e] to-[#0a0e27] min-h-[85vh] flex justify-center items-center p-4">
      <div className="flex flex-col gap-2 sm:gap-5 bg-linear-to-br from-[#1a0b2e] to-[#0c0520] shadow-md rounded-lg w-full max-w-md px-3 sm:px-8 py-4 sm:py-12">
        <p className="text-center text-lg sm:text-3xl font-bold text-white">
          Set New Password
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              sx: {
                height: {
                  xs: "44px",
                  sm: "48px",
                  md: "52px",
                  lg: "56px",
                },
                color: "#ffffff",
                backgroundColor: "rgba(139, 92, 246, 0.05)",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#c4b5fd",
                fontSize: {
                  xs: "0.875rem",
                  sm: "0.9375rem",
                  md: "1rem",
                },
                transform: {
                  xs: "translate(14px, 12px) scale(1)",
                  sm: "translate(14px, 14px) scale(1)",
                  md: "translate(14px, 16px) scale(1)",
                  lg: "translate(14px, 18px) scale(1)",
                },
                "&.MuiInputLabel-shrink": {
                  transform: "translate(14px, -9px) scale(0.75)",
                  color: "#a78bfa",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(168, 85, 247, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(168, 85, 247, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#a78bfa",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#a78bfa",
              },
              "& .MuiOutlinedInput-input": {
                color: "#ffffff",
                padding: {
                  xs: "12px 14px",
                  sm: "14px 14px",
                  md: "16px 14px",
                  lg: "18px 14px",
                },
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px rgba(139, 92, 246, 0.5) inset",
                WebkitTextFillColor: "inherit",
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleShowNewPassword}
                      edge="end"
                      sx={{
                        color: "#c4b5fd",
                        "&:hover": {
                          color: "#a78bfa",
                          backgroundColor: "rgba(168, 85, 247, 0.1)",
                        },
                      }}
                    >
                      {newPassword ? <IoIosEyeOff /> : <IoMdEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Confirm Password"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              sx: {
                height: {
                  xs: "44px",
                  sm: "48px",
                  md: "52px",
                  lg: "56px",
                },
                color: "#ffffff",
                backgroundColor: "rgba(139, 92, 246, 0.05)",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#c4b5fd",
                fontSize: {
                  xs: "0.875rem",
                  sm: "0.9375rem",
                  md: "1rem",
                },
                transform: {
                  xs: "translate(14px, 12px) scale(1)",
                  sm: "translate(14px, 14px) scale(1)",
                  md: "translate(14px, 16px) scale(1)",
                  lg: "translate(14px, 18px) scale(1)",
                },
                "&.MuiInputLabel-shrink": {
                  transform: "translate(14px, -9px) scale(0.75)",
                  color: "#a78bfa",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(168, 85, 247, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(168, 85, 247, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#a78bfa",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#a78bfa",
              },
              "& .MuiOutlinedInput-input": {
                color: "#ffffff",
                padding: {
                  xs: "12px 14px",
                  sm: "14px 14px",
                  md: "16px 14px",
                  lg: "18px 14px",
                },
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px rgba(139, 92, 246, 0.5) inset",
                WebkitTextFillColor: "inherit",
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                      onClick={handleShowConfirmPassword}
                      edge="end"
                      sx={{
                        color: "#c4b5fd",
                        "&:hover": {
                          color: "#a78bfa",
                          backgroundColor: "rgba(168, 85, 247, 0.1)",
                        },
                      }}
                    >
                      {showConfirmPassword ? <IoIosEyeOff /> : <IoMdEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#a78bfa",
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
                backgroundColor: "#a78bfa",
              },
            }}
            type="submit"
          >
            Set Password
          </Button>
        </form>
      </div>
    </div>
  );
}
