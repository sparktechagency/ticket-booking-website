import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMessageCircle } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-[#04092C] to-[#6D1DB9] px-6 sm:px-10 md:px-16 lg:px-24 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/Images/logo.png"
                alt="Logo"
                width={140}
                height={54}
              />
            </div>
            <p className="text-xs sm:text-sm text-[#99A1AF] leading-relaxed max-w-xs">
              Your premier destination for concert and sports event tickets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white sm:text-xl font-semibold mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-xs sm:text-sm text-[#99A1AF] hover:text-white transition-colors"
              >
                Browse Events
              </Link>
              <Link
                href="/"
                className="text-xs sm:text-sm text-[#99A1AF] hover:text-white transition-colors"
              >
                Membership
              </Link>
              <Link
                href="/"
                className="text-xs sm:text-sm text-[#99A1AF] hover:text-white transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/"
                className="text-xs sm:text-sm text-[#99A1AF] hover:text-white transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white sm:text-xl font-semibold mb-4">
              Support
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-xs sm:text-sm text-[#99A1AF] hover:text-white transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/"
                className="text-xs sm:text-sm text-[#99A1AF] hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/"
                className="text-xs sm:text-sm text-[#99A1AF] hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/"
                className="text-xs sm:text-sm text-[#99A1AF] hover:text-white transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white sm:text-xl font-semibold mb-4">
              Community
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <FiMessageCircle className="text-[#99A1AF] sm:text-lg" />
              <Link
                href="/"
                className="text-xs sm:text-sm text-[#99A1AF] hover:text-white transition-colors"
              >
                Join Discord
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-[#99A1AF] hover:text-white transition-colors"
              >
                <FaInstagram className="sm:text-2xl" />
              </Link>
              <Link
                href="/"
                className="text-[#99A1AF] hover:text-white transition-colors"
              >
                <FaTwitter className="sm:text-2xl" />
              </Link>
              <Link
                href="/"
                className="text-[#99A1AF] hover:text-white transition-colors"
              >
                <FaFacebook className="sm:text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
