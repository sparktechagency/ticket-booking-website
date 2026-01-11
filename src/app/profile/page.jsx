"use client";

import { useState } from "react";
import { Button, Drawer, IconButton } from "@mui/material";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ProfileSidebar from "@/components/ProfileComponents/ProfileSidebar";
import MyTickets from "@/components/ProfileComponents/MyTickets";
import PersonalInfo from "@/components/ProfileComponents/PersonalInfo";
import Wishlist from "@/components/ProfileComponents/Wishlist";
import Security from "@/components/ProfileComponents/Security";

export default function Profile() {
  const [profileTabValue, setProfileTabValue] = useState(0);
  const [menuTabValue, setMenuTabValue] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileTabChange = (e, newValue) => setProfileTabValue(newValue);
  const handleMenuChange = (e, newValue) => {
    setMenuTabValue(newValue);
    setMobileMenuOpen(false);
  };

  const renderProfileTabContent = () => {
    switch (menuTabValue) {
      case 0:
        return <MyTickets />;
      case 1:
        return <PersonalInfo />;
      //   case 2:
      //     return <Wishlist />;
      case 2:
        return <Security />;

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#04092C]">
      <div className="flex min-h-screen max-w-7xl mx-auto py-10">
        {/* Mobile Menu Button */}
        <Button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          sx={{
            position: "fixed",
            top: { xs: "3.5rem", sm: "5rem" },
            left: "0.5rem",
            zIndex: 50,
            display: { xs: "flex", md: "none" },
            backgroundColor: "#6D1DB999",
            color: "white",
            padding: { xs: "0.5rem", sm: "0.75rem" },
            borderRadius: "0.375rem",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            minWidth: "auto",
            "&:hover": {
              backgroundColor: "#6D1DB9CC",
            },
          }}
        >
          <FaBars className="text-sm" />
        </Button>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: "80%",
              maxWidth: "320px",
              boxSizing: "border-box",
            },
            bgcolor: "#20033B",
          }}
        >
          <div className="h-full p-4 overflow-y-auto bg-[#31154d]">
            <div className="flex justify-end mb-4">
              <IconButton
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  color: "white",
                }}
              >
                <IoClose className="text-2xl" />
              </IconButton>
            </div>
            <ProfileSidebar
              profileTabValue={profileTabValue}
              menuTabValue={menuTabValue}
              onProfileTabChange={handleProfileTabChange}
              onMenuChange={handleMenuChange}
            />
          </div>
        </Drawer>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[320px] lg:w-75 xl:w-70 py-5 px-3 lg:px-4 overflow-y-auto">
          <ProfileSidebar
            profileTabValue={profileTabValue}
            menuTabValue={menuTabValue}
            onProfileTabChange={handleProfileTabChange}
            onMenuChange={handleMenuChange}
          />
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{renderProfileTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
