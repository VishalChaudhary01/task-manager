import { Appbar } from "@/components/Appbar";
import { useAuthContext } from "@/context/auth.provider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/signin");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-7xl m-4">
        <Appbar />
        <div>Hello</div>
      </div>
    </div>
  );
};
