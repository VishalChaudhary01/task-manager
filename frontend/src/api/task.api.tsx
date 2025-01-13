import { CreateTaskType, UpdateTaskType } from "@/types/task.type";
import axios from "axios";
const token = localStorage.getItem("userInfo");

const taskAPI = axios.create({
     baseURL: import.meta.env.VITE_BACKEND_URL,
     headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
     },
});

export const fetchAllTasks = () => taskAPI.get("/api/tasks");
export const fetchTaskById = (id: string) => taskAPI.get(`/api/tasks/${id}`);
export const createTask = (values: CreateTaskType) => taskAPI.post("/api/tasks/", values);
export const updateTask = (id: string, values: UpdateTaskType) => taskAPI.put(`/api/tasks/${id}`, values);
export const deleteTask = (id: string) => taskAPI.delete(`/api/tasks/${id}`);