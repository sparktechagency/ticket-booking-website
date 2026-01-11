"use client";

import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { toast } from "sonner";
import { countryCodes } from "../../../../public/Data/countryCodes";
import Image from "next/image";
import { useSignUpMutation } from "@/Redux/slices/authApi";
import { setCookie } from "cookies-next";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();

  const [createUser, { isLoading, error }] = useSignUpMutation();

  const handleShowNewPassword = () => setShowPassword((prev) => !prev);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return toast.warning("Name is required");
    if (!email) return toast.warning("Email is required");
    if (!/\S+@\S+\.\S+/.test(email))
      return toast.warning("Enter a valid email");
    if (!phone) return toast.warning("Phone number is required");
    if (!password) return toast.warning("Password is required");
    if (password.length < 8)
      return toast.warning("Password must be at least of 8 characters");
    if (password !== confirmPassword)
      return toast.warning("Passwords do not match");

    if (!agreed)
      return toast.warning("You must agree to the terms and conditions");

    const payload = {
      name,
      email,
      countryCode,
      phone,
      password,
      role: "USER",
      agreedToTerms: agreed,
    };

    try {
      console.log(payload);
      const response = await createUser(payload).unwrap();
      console.log("Create User Response:", response);
      if (response?.success) {
        setCookie("userEmail", payload.email, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });
        setCookie("createUserToken", response?.data?.token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });

        const endTime = Date.now() + 180 * 1000; // 3 minutes from now
        setCookie("otpExpiry", endTime, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        });

        toast.success("OTP sent successfully!");
        toast.success("Check Your Mail for OTP!");
        router.push("/verify-otp");
      }
    } catch (error) {
      console.log(error);
      if (error.data.message === "Email already exist!") {
        toast.error("User already exists!");
      } else toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-linear-to-br from-[#0a0e27] via-[#16112e] to-[#0a0e27] min-h-[85vh] flex justify-center items-center p-4">
      <div className="flex flex-col gap-2 sm:gap-4 bg-linear-to-br from-[#1a0b2e] to-[#0c0520] shadow-2xl rounded-lg w-full max-w-xl px-3 sm:px-8 py-4 sm:py-12  border border-purple-500/20">
        <p className="text-center text-lg sm:text-3xl font-bold text-white">
          Sign Up
        </p>

        {/* <Button
          sx={{
            textTransform: "none",
            border: "1px solid #DADCE0",
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <div className="flex items-center gap-2 justify-center">
            <FcGoogle className="text-lg" />
            <p className="text-[#454959] font-semibold">Continue with Google</p>
          </div>
        </Button>

        <div className="flex items-center w-full">
          <Divider sx={{ flex: 1 }} />
          <p className="mx-3 text-[#828A99]">or</p>
          <Divider sx={{ flex: 1 }} />
        </div> */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          />

          <div className="flex gap-2">
            <FormControl sx={{ minWidth: 80 }}>
              <Select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                sx={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 500,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-icon": { color: "gray" },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  minWidth: "80px",
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#1a1a2e",
                      color: "white",
                      maxHeight: 300,
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        "&:hover": {
                          bgcolor: "rgba(168, 85, 247, 0.2)",
                        },
                        "&.Mui-selected": {
                          bgcolor: "rgba(168, 85, 247, 0.3)",
                          "&:hover": {
                            bgcolor: "rgba(168, 85, 247, 0.4)",
                          },
                        },
                      },
                    },
                  },
                }}
              >
                {countryCodes.map((item) => (
                  <MenuItem key={item.code} value={item.code}>
                    {/* <span className="mr-2">{item.flag}</span> */}
                    <div className="flex  items-center gap-1">
                      <span className="text-xs lg:text-sm font-medium">
                        {item.code}
                      </span>
                      <Image
                        src={item.flag}
                        alt={item.country}
                        width={50}
                        height={50}
                        className="w-5 h-3 mr-2 object-cover"
                      />
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Phone Number"
              fullWidth
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            />
          </div>

          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                      {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
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

          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                sx={{
                  color: "#a78bfa",
                  "&.Mui-checked": { color: "#a78bfa" },
                }}
              />
            }
            label={
              <span className="text-[#c4b5fd] text-sm">
                I agree to the{" "}
                <Link
                  href="/terms-and-conditions"
                  className="underline text-[#a78bfa]"
                >
                  Terms & Conditions
                </Link>
              </span>
            }
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
            Register
          </Button>
        </form>

        <div className="flex items-center gap-1 justify-center text-xs sm:text-sm">
          <p className="text-[#aeb1b6]">Already have an account? </p>
          <Link
            href="sign-in"
            className="text-[#a78bfa] hover:text-[#c4b5fd] font-semibold transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
