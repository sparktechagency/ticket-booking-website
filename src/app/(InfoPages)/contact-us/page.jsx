"use client";

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 900));
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      toast.error("Send failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e27] via-[#1a1338] to-[#0a0e27] py-12 px-4 sm:px-6 lg:px-8">
      <motion.main
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-xl sm:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-[#99A1AF] text-xs sm:text-lg">
            We&apos;d love to hear from you. Here&apos;s how you can reach us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Side - Contact Cards */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            variants={containerVariants}
          >
            <ContactCard
              icon={<IoChatbubbleEllipsesOutline className="text-2xl" />}
              title="Chat Support"
              description="Our fastest way to get help."
              detail="Available 24/7 via WhatsApp"
              variants={itemVariants}
            />

            <ContactCard
              icon={<MdEmail className="text-2xl" />}
              title="Email Us"
              description="For general inquiries and partnerships."
              detail="support@adrien-tickets.com"
              variants={itemVariants}
            />

            <ContactCard
              icon={<IoLocationOutline className="text-2xl" />}
              title="Visit Us"
              description="Come say hello at our HQ."
              detail="123 Innovation Drive, Tech City, TC 10210"
              variants={itemVariants}
            />
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div
              className="bg-linear-to-br from-[#1e1545] to-[#2a1a5e] rounded-2xl p-6 sm:p-8 shadow-2xl border border-purple-800/30"
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg sm:text-2xl text-white mb-6">
                Send us a message
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="text-white text-sm mb-2 block">
                      Name
                    </label>
                    <TextField
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(139, 92, 246, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#8b5cf6",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                          "&::placeholder": {
                            color: "rgba(255, 255, 255, 0.4)",
                            opacity: 1,
                          },
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#ef4444",
                        },
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="text-white text-sm mb-2 block">
                      Email
                    </label>
                    <TextField
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: "8px",
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(139, 92, 246, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#8b5cf6",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: "white",
                          "&::placeholder": {
                            color: "rgba(255, 255, 255, 0.4)",
                            opacity: 1,
                          },
                        },
                        "& .MuiFormHelperText-root": {
                          color: "#ef4444",
                        },
                      }}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-white text-sm mb-2 block">
                    Subject
                  </label>
                  <TextField
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    fullWidth
                    error={!!errors.subject}
                    helperText={errors.subject}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.1)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(139, 92, 246, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#8b5cf6",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                        "&::placeholder": {
                          color: "rgba(255, 255, 255, 0.4)",
                          opacity: 1,
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#ef4444",
                      },
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <label className="text-white text-sm mb-2 block">
                    Message
                  </label>
                  <TextField
                    placeholder="Tell us more details..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.message}
                    helperText={errors.message}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "8px",
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.1)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(139, 92, 246, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#8b5cf6",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                        "&::placeholder": {
                          color: "rgba(255, 255, 255, 0.4)",
                          opacity: 1,
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#ef4444",
                      },
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    fullWidth
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: "8px",
                      background:
                        "linear-gradient(135deg, #7c3aed 0%, #5B06A7 100%)",
                      color: "white",
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: 600,
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                        boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.5)",
                        transform: "translateY(-2px)",
                      },
                      "&:disabled": {
                        background: "rgba(139, 92, 246, 0.3)",
                        color: "rgba(255, 255, 255, 0.5)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <IoSend />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}

function ContactCard({ icon, title, description, detail, variants }) {
  return (
    <motion.div
      className="bg-linear-to-br from-[#1e1545] to-[#2a1a5e] rounded-xl p-6 border border-purple-800/30 cursor-pointer"
      variants={variants}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 40px -12px rgba(139, 92, 246, 0.4)",
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400 mb-4"
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-white text-lg mb-2">{title}</h3>
      <p
        className={`${poppins.className} text-[#99A1AF] text-xs sm:text-sm mb-3`}
      >
        {description}
      </p>
      <p className="text-white text-xs sm:text-sm font-medium">{detail}</p>
    </motion.div>
  );
}
