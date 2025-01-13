import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";

export function TaskFormDialog ({ openTaskForm, setOpenTaskForm, task }: ITaskFormDialog) {
     return (
          <Dialog open={openTaskForm} onOpenChange={setOpenTaskForm}>
               <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                         <DialogTitle>Update Task</DialogTitle>
                         <DialogDescription>
                              Mark as Done or Edit description of the task.
                         </DialogDescription>
                    </DialogHeader>
                    <TaskForm task={task} setOpenTaskForm={setOpenTaskForm} />
               </DialogContent>
          </Dialog>
     )
}