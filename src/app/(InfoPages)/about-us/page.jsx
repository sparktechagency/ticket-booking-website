"use client";
import { motion } from "motion/react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaChartLine, FaGift } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { FiTarget } from "react-icons/fi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { Card, CardContent, Paper } from "@mui/material";
import Image from "next/image";
import { AboutUsImage } from "../../../../public/Images/AllImages";
import { poppins } from "@/components/utils/FontPoppins";

export default function App() {
  const missionVisionCards = [
    {
      icon: FiTarget,
      title: "Our Mission",
      description:
        "To democratize access to live entertainment by creating the world's most trust Framework one tap: literally focusing on convenience, transparency, affordability, and creating memorable fans and the experiences they love, while maintaining the highest standards of security and authenticity.",
    },
    {
      icon: FaChartLine,
      title: "Our Vision",
      description:
        "To become the global standard for premium ticketing experiences, where every transaction is seamless, every ticket is authentic, every fan feels valued. We envision a future where technology and human touch work in harmony to create unforgettable moments.",
    },
  ];

  const features = [
    {
      icon: IoShieldCheckmarkOutline,
      title: "100% Authentic",
      description:
        "Every ticket is verified through our rigorous authentication process to ensure you get your money-back guarantee.",
    },
    {
      icon: FaTicket,
      title: "Premium Selection",
      description:
        "Access exclusive events, VIP experiences, and sold-out shows you won't find anywhere else",
    },
    {
      icon: LuUsers,
      title: "Expert Support",
      description:
        "Our dedicated team is available 24/7 to ensure your experience is seamless from start to finish",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090014]">
      {/* Hero Section */}
      <section className="w-full bg-[#090014] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white text-base sm:text-xl xl:text-[30px] leading-tight"
                >
                  Your Gateway To
                  <br />
                  Unforgettable Experiences
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`${poppins.className} text-[#99A1AF] text-xs sm:text-base leading-relaxed max-w-2xl`}
                >
                  Athena Ticket Hub is a simple platform for booking concert and
                  sports tickets. You can explore live shows, major matches, and
                  popular events in one place. We focus on caring, speed, and
                  ease of use. We&apos;re events lovers with a goal to make live
                  entertainment accessible and enjoyable for fans all over.
                </motion.p>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-3 gap-4 sm:gap-6"
              >
                {[
                  { value: "500+", label: "Events Listed" },
                  { value: "50K+", label: "Tickets Sold" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="text-[#BD85F1] text-base sm:text-xl lg:text-3xl">
                      {stat.value}
                    </div>
                    <div
                      className={`${poppins.className} text-[#99A1AF] text-xs sm:text-base`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md mx-auto lg:max-w-none"
            >
              <div className="relative aspect-square sm:aspect-5/4  rounded-2xl overflow-hidden">
                <Image
                  src={AboutUsImage}
                  alt="Concert tickets with bokeh lights"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full bg-linear-to-b from-[#6D1DB94D] via-[#6D1DB999] to-[#090014] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {missionVisionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        bgcolor: "#20033B",
                        border: "1px solid rgba(147, 51, 234, 0.3)",
                        borderRadius: "16px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "rgba(147, 51, 234, 0.5)",
                          boxShadow: "0 10px 30px rgba(147, 51, 234, 0.2)",
                        },
                      }}
                      elevation={0}
                    >
                      <CardContent className="p-6 lg:p-8">
                        <div className="space-y-2 sm:space-y-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.2 + 0.3,
                            }}
                            className="bg-[#BD85F11A] rounded-lg p-2 sm:p-3 w-fit"
                          >
                            <Icon className="w-6 h-6 text-[#BD85F1]" />
                          </motion.div>
                          <h2 className="text-white text-base sm:text-2xl">
                            {card.title}
                          </h2>
                          <p
                            className={`${poppins.className} text-[#99A1AF] text-sm sm:text-base`}
                          >
                            {card.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-[#090014] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 mb-10 lg:mb-16"
          >
            <h2 className="text-white text-lg sm:text-2xl lg:text-3xl">
              Why Choose Us
            </h2>
            <p
              className={`${poppins.className} text-[#99A1AF] text-sm sm:text-base`}
            >
              Experience the difference of premium ticketing
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <Card
                      sx={{
                        bgcolor: "#20033B",
                        border: "1px solid #FFFFFF1A",
                        borderRadius: "16px",
                        height: "100%",
                        transition: "all 0.3s ease",
                        minHeight: {
                          sx: "220px",
                          sm: "235px",
                        },
                        "&:hover": {
                          borderColor: "rgba(147, 51, 234, 0.5)",
                          boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
                        },
                      }}
                      elevation={0}
                    >
                      <CardContent className="p-6 lg:p-8">
                        <div className="flex flex-col items-center gap-3">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.15 + 0.3,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="rounded-lg p-2 sm:p-3 w-fit bg-linear-to-b from-[#BD85F1] to-[#6D1DB9]"
                          >
                            <Icon className="size-3 sm:size-6 text-white" />
                          </motion.div>
                          <h3 className="text-white text-sm sm:text-xl">
                            {feature.title}
                          </h3>
                          <p
                            className={`${poppins.className} text-[#99A1AF] text-sm sm:text-base text-center`}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
