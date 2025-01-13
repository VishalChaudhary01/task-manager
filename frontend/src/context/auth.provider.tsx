import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "@/api/auth.api";
import { SigninType, SignupType } from "@/types/user.type";
import { isTokenValid } from "@/utils";
import { toast } from "sonner";

const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    isTokenValid(localStorage.getItem("userInfo"))
  );

  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    if (!token || !isTokenValid(token)) {
      setIsAuthenticated(false);
      localStorage.removeItem("userInfo");
    }
    setIsAuthenticated(true);
  }, []);

  async function handleSignup(values: SignupType) {
    try {
      const { data } = await signup(values);
      if (data.success && data.token) {
        localStorage.setItem("userInfo", JSON.stringify(data.token));
        setIsAuthenticated(true);
        toast.success(data.message || "Signup successful");
        navigate("/");
      }
    } catch (error: any) {
      console.error("❌ Error during signup: ", error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  }

  async function handleSignin(values: SigninType) {
    try {
      const { data } = await signin(values);
      if (data.success && data.token) {
        localStorage.setItem("userInfo", data.token);
        setIsAuthenticated(true);
        toast.success(data.message || "Signin successful");
        navigate("/");
      }
    } catch (error: any) {
      console.error("❌ Error during signin: ", error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  }

  async function handleLogout() {
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    toast.success("You have been logged out");
    navigate("/signin");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleSignup, handleSignin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
