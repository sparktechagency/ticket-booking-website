"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LanguageToggle from "../utils/LanguageToggle";
import { motion, AnimatePresence } from "motion/react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import { TbRoad } from "react-icons/tb";
import { FaRegMessage, FaHeadphones } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { CiGlobe } from "react-icons/ci";

import { usePathname } from "next/navigation";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import useLogIn from "../libs/hooks/useLogIn";

export default function Navbar() {
  const { user, logOut, loading } = useLogIn();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const pathname = usePathname();

  console.log(user);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isMobileMenuOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageDropdownOpen = () => {
    setIsLanguageDropdownOpen(true);
  };

  const handleLanguageDropdownClose = () => {
    setIsLanguageDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/artists", label: "Artists" },
    { href: "/concert", label: "Concert" },
  ];

  const languages = [
    { code: "en", label: "English", short: "En" },
    { code: "es", label: "Español", short: "Es" },
    { code: "fr", label: "Français", short: "Fr" },
  ];

  return (
    <div className="sticky top-0 bg-[#03071C] z-50 shadow-md h-14 sm:h-20">
      <div className="flex items-center justify-between px-4 lg:px-18 h-full max-w-full mx-auto">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/Images/logo.png"
              alt="Go Connecte Logo"
              width={82}
              height={57}
              className="w-15 lg:w-24 h-10 lg:h-14"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-14 text-xs lg:text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-white transition-colors ${
                pathname === link.href
                  ? "text-white border-b-2 border-white"
                  : "hover:text-[#c0c0c0]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <Link className="text-white text-sm" href="/about-us">
            About Us
          </Link>
          <Link
            href="/"
            className="bg-linear-to-r from-[#04092C] to-[#6D1DB9] text-white text-sm px-2 lg:px-4 py-1 lg:py-2 rounded-full hover:bg-[#0d9488] transition-colors duration-300"
          >
            Join Now
          </Link>
          {/* {user ? (
          
          ) : (
            <Link
              href="sign-in"
              className="text-sm lg:text-base bg-[#00AEA8] text-white px-3 py-1 border rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:border hover:text-[#00AEA8] hover:font-medium"
            >
              Sign In
            </Link>
          )} */}
          {/* profile */}
          <div
            className="relative"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <FaRegUserCircle className="text-white text-2xl cursor-pointer hover:text-[#00AEA8]" />
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute right-0 top-10 mt-2 w-56 bg-gray-50 rounded-md shadow-lg py-2 z-50"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Link
                    href="/inbox"
                    className={`flex items-center gap-2 px-4 py-1.5 text-xs text-[#191919] ${
                      pathname === "/inbox"
                        ? "bg-gray-100"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={handleDropdownClose}
                  >
                    <FaRegMessage /> <span>Inbox</span>
                  </Link>
                  <Divider variant="middle" />
                  <Link
                    href="/profile"
                    className={`flex items-center gap-2 px-4 py-1.5 text-xs text-[#191919] ${
                      pathname === "/profile"
                        ? "bg-gray-100"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={handleDropdownClose}
                  >
                    <Image
                      src="/images/profile-image.png"
                      alt="Profile Image"
                      width={21}
                      height={21}
                    />
                    <p>Profile</p>
                  </Link>

                  <Divider variant="middle" />
                  {[
                    {
                      href: "/contact-us",
                      label: "Contact Support",
                      icon: <FaHeadphones />,
                    },
                    {
                      href: "/terms-and-conditions",
                      label: "Terms & Conditions",
                      icon: <CgNotes />,
                    },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-1.5 text-xs text-[#191919] ${
                        pathname === link.href
                          ? "bg-gray-100"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={handleDropdownClose}
                    >
                      {link.icon} {link.label}
                    </Link>
                  ))}
                  <Divider variant="middle" />
                  <Button
                    sx={{
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      px: "20px",
                      color: "#191919",
                      fontWeight: "500",
                      width: "100%",
                      justifyContent: "flex-start",
                      fontStyle: "normal",
                      fontSize: "15px",

                      "&:hover": { backgroundColor: "#e5e7eb" },
                    }}
                    onClick={logOut}
                  >
                    <FiLogOut />
                    Log Out
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>{" "}
          {/* language toggle */}
          <div
            className="relative"
            onMouseEnter={handleLanguageDropdownOpen}
            onMouseLeave={handleLanguageDropdownClose}
          >
            <div className="text-white cursor-pointer border border-[#404040] rounded-lg px-3 py-1 flex items-center gap-1 hover:border-[#00AEA8] transition-colors">
              <CiGlobe className="text-lg" />
              <span className="text-sm">
                {
                  languages.find((lang) => lang.code === selectedLanguage)
                    ?.short
                }
              </span>
            </div>
            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  className="absolute right-0 top-8 mt-2 w-40 bg-gray-50 rounded-md shadow-lg py-2 z-50"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textTransform: "none",
                        color: "#191919",
                        width: "100%",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        handleLanguageDropdownClose();
                      }}
                    >
                      {lang.label}
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-2xl">
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center font-medium py-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-700 text-sm transition-colors ${
                  pathname === link.href
                    ? "text-[#00AEA8] border-b-3 border-[#00AEA8]"
                    : "hover:text-[#00AEA8]"
                }`}
                onClick={toggleMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <LanguageToggle />
            <Link
              href="/"
              className="bg-[#00AEA8] text-white text-sm px-2 sm:px-4 am:py-2 rounded-md hover:bg-[#0d9488] transition-colors"
              onClick={toggleMobileMenu}
            >
              Become A Host
            </Link>
            {/* {user ? (
           
            ) : (
              <Link
                href="sign-in"
                className="text-sm lg:text-base bg-[#00AEA8] text-white px-3 py-1 border rounded-lg transition-all duration-300 ease-in-out hover:bg-white hover:border hover:text-[#00AEA8] hover:font-medium"
              >
                Sign In
              </Link>
            )} */}
            <div className="relative">
              <FaRegUserCircle
                className="text-2xl cursor-pointer hover:text-[#00AEA8]"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute top-8 left-0 transform -translate-x-1/2 w-56 bg-white rounded-md shadow-lg py-2 z-50">
                  {[
                    { href: "/trips", label: "Trips", icon: <TbRoad /> },
                    {
                      href: "/inbox",
                      label: "Inbox",
                      icon: <FaRegMessage />,
                    },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-1 text-base text-[#191919] ${
                        pathname === link.href
                          ? "bg-gray-100"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      {link.icon} {link.label}
                    </Link>
                  ))}

                  <Divider variant="middle" className="my-1" />

                  <Link
                    href="/profile"
                    className={`flex items-center gap-2 px-4 py-1 text-base text-[#191919] ${
                      pathname === "/profile"
                        ? "bg-gray-100"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    <Image
                      src="/images/profile-image.png"
                      alt="Profile Image"
                      width={21}
                      height={21}
                    />
                    <p>Profile</p>
                  </Link>

                  <Link
                    href="/account"
                    className={`flex items-center gap-2 px-4 py-1 text-base text-[#191919] ${
                      pathname === "/account"
                        ? "bg-gray-100"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    <FaRegUserCircle />
                    <p>Account</p>
                  </Link>

                  <Divider variant="middle" className="my-1" />

                  {[
                    {
                      href: "/contact-support",
                      label: "Contact Support",
                      icon: <FaHeadphones />,
                    },
                    {
                      href: "/terms-and-conditions",
                      label: "Terms & Conditions",
                      icon: <CgNotes />,
                    },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-1 text-base text-[#191919] ${
                        pathname === link.href
                          ? "bg-gray-100"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      {link.icon} {link.label}
                    </Link>
                  ))}

                  <Divider variant="middle" className="my-1" />

                  <Button
                    sx={{
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      px: "20px",
                      color: "#191919",
                      fontWeight: "500",
                      width: "100%",
                      justifyContent: "flex-start",
                      fontStyle: "normal",
                      fontSize: "15px",
                      "&:hover": { backgroundColor: "#e5e7eb" },
                    }}
                    onClick={() => {
                      handleLogOut();
                      toggleMobileMenu();
                    }}
                  >
                    <FiLogOut />
                    Log Out
                  </Button>
                </div>
              )}
            </div>
            <RiDashboardHorizontalLine className="text-2xl cursor-pointer hover:text-[#00AEA8]" />
          </div>
        </div>
      )}
    </div>
  );
}
