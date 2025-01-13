import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createTaskSchema, CreateTaskType, updateTaskSchema, UpdateTaskType } from "@/types/task.type";
import { useTaskContext } from "@/context/task.provider";

export const TaskForm: React.FC<ITaskForm> = ({ task, setOpenTaskForm }) => {  
     const { handleCreateTask, handleUpdateTask } = useTaskContext();
  const form = useForm<CreateTaskType | UpdateTaskType>({
    resolver: zodResolver(task ? updateTaskSchema : createTaskSchema),
    defaultValues: task ? {
      description: task?.description,
      status: task?.status,
     } : {
      title: "",
      description: "", 
    },
  });
 
  async function onSubmit(values: UpdateTaskType | CreateTaskType) {
    if (task) {
     await handleUpdateTask({ id: task._id, values: values as UpdateTaskType });
    } else {
     await handleCreateTask(values as CreateTaskType);
    }
    setOpenTaskForm(false);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {!task && <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title of task" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      }
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="More details about task" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {task && <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DONE">DONE</SelectItem>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />}
        <Button type="submit" className="my-2">Submit</Button>
      </form>
    </Form>
  )
}