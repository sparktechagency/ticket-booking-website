"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { FaRegMessage, FaHeadphones } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { CiGlobe } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { Button, Divider } from "@mui/material";
import useLogIn from "../libs/hooks/useLogIn";
import { ArtistData } from "../../../public/Data/ArtistData";

export default function Navbar() {
  const { user, logOut, loading } = useLogIn();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [activeNavDropdown, setActiveNavDropdown] = useState(null);
  const [mobileArtistDropdown, setMobileArtistDropdown] = useState(null);

  const pathname = usePathname();

  const getConcertArtists = () => {
    return ArtistData.filter((artist) => {
      return artist.active === true;
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileArtistDropdown(null);
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
    {
      href: "/artist-details",
      label: "Concerts",
      key: "concerts",
      hasDropdown: true,
    },
    { href: "/events", label: "Sports", key: "sports", hasDropdown: false },
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
        <div className="flex items-center gap-5">
          <Link href="/">
            <Image
              src="/Images/logo.png"
              alt="Go Connecte Logo"
              width={500}
              height={500}
              className="w-15 lg:w-32 h-4 lg:h-10"
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-10 text-xs lg:text-sm font-medium">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.hasDropdown && setActiveNavDropdown(link.key)
                }
                onMouseLeave={() =>
                  link.hasDropdown && setActiveNavDropdown(null)
                }
              >
                {link.hasDropdown ? (
                  <span
                    className={`text-white transition-colors cursor-pointer ${
                      pathname.startsWith(link.href)
                        ? "text-white border-b-2 border-white"
                        : "hover:text-[#c0c0c0]"
                    }`}
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-white transition-colors ${
                      pathname === link.href
                        ? "text-white border-b-2 border-white"
                        : "hover:text-[#c0c0c0]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}

                {link.hasDropdown && (
                  <AnimatePresence>
                    {activeNavDropdown === link.key && (
                      <motion.div
                        className="absolute left-0 top-8 mt-2 w-48 bg-gray-50 rounded-md shadow-lg py-2 z-50 max-h-64 overflow-y-auto"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        {getConcertArtists(link.key).map((artist) => (
                          <Link
                            key={artist.id}
                            href={`${link.href}/${artist.id}`}
                            className="block px-4 py-2 text-sm text-[#191919] hover:bg-gray-200 transition-colors"
                            onClick={() => setActiveNavDropdown(null)}
                          >
                            {artist.name}
                          </Link>
                        ))}
                        {getConcertArtists().length === 0 && (
                          <div className="px-4 py-2 text-sm text-gray-500">
                            No artists available
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-2 lg:gap-5">
          <Link className="text-white text-sm" href="/about-us">
            About Us
          </Link>

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
          </div>

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
          <button onClick={toggleMobileMenu} className="text-2xl text-white">
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#580e99] shadow-md">
          <div className="flex flex-col items-center font-medium py-2 space-y-2">
            {navLinks.map((link) => (
              <div key={link.href} className="w-full">
                {link.hasDropdown ? (
                  <button
                    onClick={() =>
                      setMobileArtistDropdown(
                        mobileArtistDropdown === link.key ? null : link.key
                      )
                    }
                    className={`w-full text-center text-white text-sm transition-colors  ${
                      pathname === link.href
                        ? "text-[#00AEA8] border-b-3 border-[#00AEA8]"
                        : "hover:text-[#00AEA8]"
                    }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`block text-center text-white text-sm transition-colors py-2 ${
                      pathname === link.href
                        ? "text-[#00AEA8] border-b-3 border-[#00AEA8]"
                        : "hover:text-[#00AEA8]"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Mobile artist dropdown - only for links with hasDropdown */}
                {link.hasDropdown && mobileArtistDropdown === link.key && (
                  <div className="bg-[#7f30ff] px-4 py-2">
                    {getConcertArtists().map((artist) => (
                      <Link
                        key={artist.id}
                        href={`${link.href}/${artist.slug || artist.id}`}
                        className="block text-white text-xs py-1.5 hover:text-[#00AEA8]"
                        onClick={toggleMobileMenu}
                      >
                        {artist.name}
                      </Link>
                    ))}
                    {getConcertArtists().length === 0 && (
                      <div className="text-white text-xs py-1.5 text-center">
                        No artists available
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

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
                    className="absolute right-5 top-5 mt-2 w-32 bg-[#7f30ff] rounded-md shadow-lg py-2 z-50"
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
                          color: "#fff",
                          width: "100%",
                          fontSize: "10px",
                          height: "25px",
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

            <div className="relative">
              <FaRegUserCircle
                className="text-2xl text-white cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute top-8 left-3 transform -translate-x-1/2 w-54 bg-[#7f30ff] rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/inbox"
                    className={`flex items-center gap-2 px-4 py-1 text-xs text-white ${
                      pathname === "/inbox"
                        ? "bg-gray-100"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    <FaRegMessage /> Inbox
                  </Link>

                  <Divider variant="middle" className="my-1" />

                  <Link
                    href="/profile"
                    className={`flex items-center gap-2 px-4 py-1 text-xs text-white ${
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
                      className={`flex items-center gap-2 px-4 py-1 text-xs text-white ${
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
                      color: "#fff",
                      fontWeight: "600",
                      width: "100%",
                      justifyContent: "flex-start",
                      fontStyle: "normal",
                      fontSize: "15px",
                      "&:hover": { backgroundColor: "#e5e7eb" },
                    }}
                    onClick={() => {
                      logOut();
                      toggleMobileMenu();
                    }}
                  >
                    <FiLogOut />
                    Log Out
                  </Button>
                </div>
              )}
            </div>
            <Link className="text-white text-sm" href="/about-us">
              About Us
            </Link>
            <RiDashboardHorizontalLine className="text-2xl text-white cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
}
