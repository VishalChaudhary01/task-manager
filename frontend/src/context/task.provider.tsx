import { createTask, deleteTask, fetchAllTasks, updateTask } from "@/api/task.api";
import { CreateTaskType, UpdateTaskType } from "@/types/task.type";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const TaskContext = React.createContext<ITaskContext | null>(null);

export const TaskProvider: React.FC<ITaskProvider> = ({ children }) => {
     const [tasks, setTasks] = useState<ITask[]>([]);

     async function handleFetchAllTasks() {
          try {
               const { data } = await fetchAllTasks();
               if (data.success) {
                    setTasks(data.tasks);
               }
          } catch (error: any) {
               console.error("❌ Error during fetch all tasks: ", error);
               toast.error(error?.response?.data?.message || "Failed to fetch tasks");
          }
     }

     async function handleCreateTask(values: CreateTaskType) {
          try {
               const { data } = await createTask(values);
               if (data.success) {
                    toast.success(data.message || "Task added successfully");
                    setTasks((prevTasks) => [
                         ...prevTasks,
                         data.task
                    ]);
               }
          } catch (error: any) {
               console.error("❌ Error during add new tasks: ", error);
               toast.error(error?.response?.data?.message || "Failed to create task tasks");
          }
     }

     async function handleUpdateTask({ id, values }: { id: string, values: UpdateTaskType }) {
          try {
               const { data } = await updateTask(id, values);
               if (data.success) {
                    toast.success(data.message || "Task updated successfully");
                    setTasks((prevTasks) => (
                         prevTasks.map((task) => (
                              task._id === id ? {
                                   ...task,
                                   ...data.task,
                              } : task
                         ))
                    ));
               }
          } catch (error: any) {
               console.error("❌ Error during update task: ", error);
               toast.error(error?.response?.data?.message || "Failed to update task");
          }
     }

     async function handleDeleteTask(id: string) {
          try {
               const { data } = await deleteTask(id);
               if (data.success) {
                    toast.success(data.message || "Task deleted successfully");
                    setTasks((prevTasks) => (
                         prevTasks.filter((task) => task._id !== id)
                    ));
               }
          } catch (error: any) {
               console.error("❌ Error during delete task: ", error);
               toast.error(error?.response?.data?.message || "Failed to delete task");
          }
     }

     return (
          <TaskContext.Provider value={{ tasks, handleFetchAllTasks, handleCreateTask, handleUpdateTask, handleDeleteTask }}>
               {children}
          </TaskContext.Provider>
     );
}

export const useTaskContext = () => {
     const taskContext = useContext(TaskContext);
     if (!taskContext) throw new Error("useTaskContext must be within a TaskProvider");
     return taskContext;
}