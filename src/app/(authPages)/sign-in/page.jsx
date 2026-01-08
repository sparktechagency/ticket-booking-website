"use client";

import { useSignInMutation } from "@/Redux/slices/authApi";
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
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { toast } from "sonner";

export default function SignIn() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [logIn, { isLoading, error }] = useSignInMutation();

  const router = useRouter();

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmitLogIn = async (e) => {
    e.preventDefault();

    try {
      //  console.log("Logging in with values:", formValues);
      const response = await logIn(formValues).unwrap();
      console.log("res", response);

      if (response.success) {
        sessionStorage.setItem("accessToken", response?.data?.token);
        toast.success("Login Successful", response);
        router.push("/");
      }
    } catch (error) {
      if (error?.data?.message === "Password does not match") {
        toast.error("Incorrect Password.");
      }
      if (error?.data?.message === "User not found") {
        toast.error("Incorrect Email. User not found");
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="bg-linear-to-br from-[#0a0e27] via-[#16112e] to-[#0a0e27] min-h-[85vh] flex justify-center items-center p-4">
      <div className="flex flex-col gap-2 sm:gap-4 bg-linear-to-br from-[#1a0b2e] to-[#0c0520] shadow-2xl shadow-purple-900/20 rounded-lg w-full max-w-md px-3 sm:px-8 py-4 sm:py-12 border border-purple-500/20">
        <p className="text-center text-lg sm:text-3xl font-bold text-white mb-2">
          Sign In
        </p>

        <form onSubmit={handleSubmitLogIn} className="flex flex-col gap-3">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formValues.email}
            onChange={handleChange}
            InputProps={{
              sx: {
                height: {
                  xs: "44px",
                  sm: "48px",
                  md: "52px",
                  lg: "56px",
                },
                color: "#ffffff",
                backgroundColor: "rgba(139, 92, 246, 0.05)", // Purple tint
              },
            }}
            InputLabelProps={{
              sx: {
                color: "#c4b5fd", // Light purple
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
                  color: "#a78bfa", // Purple-400
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(168, 85, 247, 0.3)", // Purple border
                },
                "&:hover fieldset": {
                  borderColor: "rgba(168, 85, 247, 0.5)", // Lighter purple on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#a78bfa", // Purple-400 when focused
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#a78bfa",
              },
              "& .MuiOutlinedInput-input": {
                padding: {
                  xs: "12px 14px",
                  sm: "14px 14px",
                  md: "16px 14px",
                  lg: "18px 14px",
                },
              },
            }}
          />

          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            name="password"
            value={formValues.password}
            onChange={handleChange}
            InputProps={{
              sx: {
                height: {
                  xs: "44px",
                  sm: "48px",
                  md: "52px",
                  lg: "56px",
                },
                color: "#ffffff", // White text
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
                color: "#ffffff", // Add this to ensure input text is white
                padding: {
                  xs: "12px 14px",
                  sm: "14px 14px",
                  md: "16px 14px",
                  lg: "18px 14px",
                },
              },
              // Add input autofill styles
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px rgba(139, 92, 246, 0.1) inset",
                WebkitTextFillColor: "#ffffff",
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
                      onClick={handleShowPassword}
                      edge="end"
                      sx={{
                        color: "#c4b5fd",
                        "&:hover": {
                          color: "#a78bfa",
                          backgroundColor: "rgba(168, 85, 247, 0.1)",
                        },
                      }}
                    >
                      {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Link
            href="reset-password"
            className="flex justify-end text-xs sm:text-sm text-[#a78bfa] hover:text-[#c4b5fd] hover:font-medium mt-1 transition-colors"
          >
            Reset password
          </Link>

          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #8b5cf6, #7c3aed)", // Purple gradient
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
                background: "linear-gradient(to right, #7c3aed, #6d28d9)", // Darker purple on hover
                boxShadow: "0 8px 24px rgba(139, 92, 246, 0.4)",
              },
              "&:disabled": {
                background: "rgba(139, 92, 246, 0.3)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        {error && (
          <p className="text-center text-red-300 bg-red-500/10 border border-red-400/30 rounded-lg py-2 px-3 text-sm">
            {error}
          </p>
        )}

        <div className="flex items-center gap-1 justify-center text-sm">
          <p className="text-[#aeb1b6]">No account?</p>
          <Link
            href="sign-up"
            className="text-[#a78bfa] hover:text-[#c4b5fd] font-semibold transition-colors"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
