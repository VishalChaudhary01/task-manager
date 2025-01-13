import { SigninType, SignupType } from "@/types/user.type";
import axios from "axios";

const authAPI = axios.create({
     baseURL: import.meta.env.VITE_BACKEND_URL,
     headers: {
          "Content-Type": "application/json",
     },
});

export const signup = (values: SignupType) => authAPI.post("/api/user/signup", values);
export const signin = (values: SigninType) => authAPI.post("/api/user/signin", values);
export const profile = () => authAPI.get("/api/user/profile");