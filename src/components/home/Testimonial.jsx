"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import { FaQuoteRight } from "react-icons/fa";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Poppins } from "next/font/google";

const testimonials = [
  {
    id: 1,
    name: "annette black",
    role: "Customer",
    rating: 4,
    text: "Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "leslie alexander",
    role: "Customer",
    rating: 4,
    text: "Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "alis white",
    role: "Customer",
    rating: 5,
    text: "Renting a car from nova ride was a great decision. Not only did I get a reliable and comfortable vehicle, but the prices were also very competitive.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "morgan reed",
    role: "Customer",
    rating: 5,
    text: "I loved the smooth booking process and flexible pickup options. The car was spotless and drove like a dream.",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function TestimonialsCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    beforeChange: (current, next) => setActiveSlide(next),
    appendDots: (dots) => (
      <div style={{ bottom: "-40px" }}>
        <ul
          style={{
            margin: "0",
            padding: "0",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        style={{
          width: i === activeSlide ? "32px" : "8px",
          height: "8px",
          borderRadius: "9999px",
          backgroundColor: i === activeSlide ? "#00AEA8" : "#D1D5DB",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-5 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-20 bg-[#04092C] overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          variants={headerVariants}
        >
          <motion.p
            className="text-lg sm:text-2xl lg:text-4xl text-white mb-2 font-semibold px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.p>
          <motion.h2
            className="text-xs sm:text-base md:text-lg text-[#99a1af] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Real feedback from real event experiences.
          </motion.h2>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          className="relative px-0 sm:px-2 md:px-4 pb-12 sm:pb-14 md:pb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="px-2 sm:px-3">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      minHeight: { xs: "250px", sm: "300px", md: "320px" },
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: { xs: "12px", sm: "14px", md: "16px" },
                      py: { xs: "30px", sm: "40px", md: "50px" },
                      px: { xs: "10px", sm: "15px", md: "20px" },
                      background:
                        "linear-gradient(180deg, #1d113e 0%,#210e3f, #0b021a 100%)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        boxShadow: "0 20px 40px rgba(0, 174, 168, 0.2)",
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <div className="flex items-center justify-between sm:p-2">
                      <CardActions sx={{ gap: { xs: 0.5, sm: 1 }, p: 0 }}>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Avatar
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            sx={{
                              width: { xs: 30, sm: 40, md: 44 },
                              height: { xs: 30, sm: 40, md: 44 },
                            }}
                          />
                        </motion.div>
                        <div>
                          <motion.p
                            className="text-[#FFFFFF] md:mb-1 capitalize text-[10px] sm:text-base"
                            whileHover={{ color: "#00AEA8" }}
                            transition={{ duration: 0.2 }}
                          >
                            {testimonial.name}
                          </motion.p>
                          <Rating
                            value={testimonial.rating}
                            readOnly
                            size="small"
                            sx={{
                              fontSize: { xs: "12px", sm: "14px" },
                              "& .MuiRating-iconFilled": {
                                color: "#FFB400",
                              },
                            }}
                          />
                        </div>
                      </CardActions>
                      <motion.div
                        animate={{
                          rotate: [0, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <FaQuoteRight className="text-sm sm:text-3xl text-[#ffffff1c]" />
                      </motion.div>
                    </div>
                    <CardContent
                      sx={{ flexGrow: 1, pb: 1, px: { xs: 1, sm: 2 } }}
                    >
                      <p
                        className={`${poppins.className} text-[#99A1AF] text-xs sm:text-sm`}
                      >
                        {testimonial.text}
                      </p>
                    </CardContent>
                    <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
                  </Card>
                </motion.div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .slick-dots li button:before {
          display: none;
        }
        .slick-dots li {
          margin: 0;
        }
      `}</style>
    </section>
  );
}
