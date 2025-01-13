import { Appbar } from "@/components/Appbar";
import { TaskCard } from "@/components/TaskCard";
import { TaskFormDialog } from "@/components/TaskFormDialog";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth.provider";
import { useTaskContext } from "@/context/task.provider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { isAuthenticated } = useAuthContext();
  const { tasks, handleFetchAllTasks } = useTaskContext();
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/signin");
    handleFetchAllTasks();
  }, [isAuthenticated, navigate, handleFetchAllTasks]);

  console.log(tasks);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-7xl m-4">
        <Appbar />
        <div className="relative w-full my-4">
               <Button onClick={() => setOpenTaskForm(true)} className="absolute right-0 top-0"> Add New Task </Button>
               <h2 className="text-xl md:text-3xl font-bold text-gray-800 text-center mb-4 w-1/2 md:w-full">
                    Your all Tasks are here
               </h2>
          </div>
          {tasks.length > 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 w-full my-4">
              {tasks.map((task) => <TaskCard key={task._id} task={task} />)}
            </div>
          ) : (
            <h3 className="text-lg md:text-xl font-bold text-gray-700 text-center mb-2">
              Your task list is empty
            </h3>
          )}
      </div>
      <TaskFormDialog openTaskForm={openTaskForm} setOpenTaskForm={setOpenTaskForm} />
    </div>
  );
};
