"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const pathname = usePathname();
  const linkRef = useRef(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="success" size={80} />
      </div>
    );
  }

  if (redirectToLogin) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p>You need to be logged in to access this page.</p>
        <Link
          href={{
            pathname: "/login",
            query: { message: "login-required", redirect: pathname },
          }}
          className="text-black font-semibold  bg-[#ECA30C] px-5 py-3 rounded-xl"
          ref={linkRef}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
