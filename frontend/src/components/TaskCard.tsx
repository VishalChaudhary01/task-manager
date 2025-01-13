import { Button } from "./ui/button";
import { useState } from "react";
import { useTaskContext } from "@/context/task.provider";
import { TaskFormDialog } from "./TaskFormDialog";

export const TaskCard: React.FC<ITaskCard> = ({ task }) => {
     const { handleDeleteTask } = useTaskContext();
     const [taskToUpdate, setTaskToUpdate] = useState<ITask | undefined>(undefined);
     const [openTaskForm, setOpenTaskForm] = useState(false);
     
     return (
          <div className="border border-gray-200 rounded-md shadow-sm p-4 w-full md:max-w-4xl">
               <div className="flex items-center justify-between gap-6">
                    <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                    <div className="flex items-center gap-4">
                         <span className={`border px-2 py-0.5 rounded-md text-sm ${task.status === 'DONE' ? 'bg-green-100 border-green-400' : 'bg-yellow-100 border-yellow-400'}`}>Status: {task.status}</span>
                         <Button onClick={() => { setOpenTaskForm(true); setTaskToUpdate(task) }} variant={'ghost'}>Update</Button>
                         <Button onClick={() => handleDeleteTask(task._id)} variant={'ghost'}>Delete</Button>
                    </div>
               </div>
               <p className="text-base">{task.description}</p>
               <TaskFormDialog openTaskForm={openTaskForm} setOpenTaskForm={setOpenTaskForm} task={taskToUpdate} />
          </div>
     )
}