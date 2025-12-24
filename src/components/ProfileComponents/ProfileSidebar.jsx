"use client";

import { Tabs, Tab, IconButton } from "@mui/material";
import { FaUser, FaRegHeart, FaLock } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";

export default function ProfileSidebar({
  profileTabValue,
  menuTabValue,
  onProfileTabChange,
  onMenuChange,
}) {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profile-image-upload").click();
  };

  const userModeItems = [
    { icon: LuTicket, label: "My Tickets" },
    { icon: FaUser, label: "Personal Info" },
    // { icon: FaRegHeart, label: "Wishlist" },
    { icon: IoMdSettings, label: "Security" },
  ];

  return (
    <div className="">
      {/* Vertical Menu Tabs */}
      <Tabs
        orientation="vertical"
        value={menuTabValue}
        onChange={onMenuChange}
        textColor="inherit"
        indicatorColor="none"
        className="w-full"
      >
        {userModeItems.map((item, index) => (
          <Tab
            key={index}
            sx={{
              textTransform: "none",
              borderRadius: "5px",
              background:
                menuTabValue === index
                  ? "linear-gradient(90deg, #8F18FB 0%, #5B06A7 100%)"
                  : "transparent",
              color: menuTabValue === index ? "#FFFFFF" : "#99A1AF",
              alignItems: "flex-start",
              textAlign: "left",
              minHeight: { xs: "40px", sm: "48px" },
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              py: { xs: 1, sm: 1.5 },
              px: { xs: 1.5, sm: 2 },
            }}
            label={
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium w-full">
                <item.icon
                  className={
                    menuTabValue === index ? "text-white" : "text-[#99A1AF]"
                  }
                  style={{ fontSize: "20px" }}
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
}
