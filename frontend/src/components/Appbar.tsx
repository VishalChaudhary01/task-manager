import { useAuthContext } from "@/context/auth.provider"
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
     const { isAuthenticated, handleLogout } = useAuthContext();
     const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-4 py-2 border rounded-md shadow-sm w-full">
     <h3 className="text-base font-semibold">Task Manager</h3>
     {isAuthenticated ? (
          <Button onClick={handleLogout}>Logout</Button>
     ) : (
          <Button onClick={() => navigate("/signin")}>Signin</Button>
     )}
    </div>
  )
}