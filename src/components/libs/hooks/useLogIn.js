import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useLogIn() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Check if the user is already logged in from cookies
  useEffect(() => {
    const storedUser = getCookie("demo_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logIn = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      // Simple validation for demo purposes
      if (email === "abc@gmail.com" && password === "123456") {
        const u = { id: "1", name: "Demo User", email };
        setUser(u);
        setCookie("demo_user", JSON.stringify(u));
        toast.success("Log In Succesfull");
        router.push("/");
      }
    } catch (e) {
      setError(e.message || "Login failed");
      toast.error(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    if (typeof window !== "undefined") {
      deleteCookie("demo_user", { path: "/" });
      toast.success("Logged Out Successfully");
      router.push("/sign-in");
      setUser(null);
    }
  };

  return { user, loading, error, logIn, logOut };
}
