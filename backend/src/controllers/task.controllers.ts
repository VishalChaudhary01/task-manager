import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { createTaskSchema, updateTaskSchema } from '../types/task.type';
import { Task } from '../models/Task';

export const createTask = async (req: AuthRequest, res: Response) => {
     try {
          const validatedInput = createTaskSchema.safeParse(req.body);
          if (!validatedInput.success) {
               res.status(411).json({ success: false, message: validatedInput.error.issues[0].message });
               return;
          }
          const { title, description } = validatedInput.data;
          const isAlready = await Task.findOne({ title });
          if (isAlready) {
               res.status(400).json({ success: false, message: 'Task with given title is already present' });
               return;
          }
          const task = await Task.create({ 
               userId: req.id, 
               title, 
               description 
          });
          res.status(201).json({ success: true, message: 'Task Created successfully', task });
     } catch (error) {
          console.error('❌ Failed to add new task: ', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
     }
}

export const updateTask = async (req: AuthRequest, res: Response) => {
     try {
          const taskId = req.params.id;
          const validatedInput = updateTaskSchema.safeParse(req.body);
          if (!validatedInput.success) {
               res.status(411).json({ success: false, message: validatedInput.error.issues[0].message });
               return;
          }
          const { description, status } = validatedInput.data;
          const task = await Task.findOne({ _id: taskId, userId: req.id });
          if (!task) {
               res.status(404).json({ success: false, message: 'Task not found' });
               return;
          }
          if (status !== undefined) task.status = status;
          if (description !== undefined) task.description = description;

          await task.save();
          res.status(200).json({ success: true, message: 'Task updated successfully', task });
     } catch (error) {
          console.error('❌ Failed to update task: ', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
     }
}

export const removeTask = async (req: AuthRequest, res: Response) => {
     try {
          const task = await Task.findOne({ _id: req.params.id, userId: req.id });
          if (!task) {
               res.status(404).json({ success: false, message: 'Task not found' });
               return;
          }
          await Task.deleteOne({ _id: task._id });
          
          res.status(200).json({ success: true, message: 'Task removed successfully' });
     } catch (error) {
          console.error('❌ Failed to remove task: ', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
     }
}

export const fetchAllTasks = async (req: AuthRequest, res: Response) => {
     try {
          const tasks = await Task.find({ userId: req.id }).sort({ createdAt: 'desc' });;
          res.status(200).json({ success: true, tasks });
     } catch (error) {
          console.error('❌ Failed to fetch task: ', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
     }
}

export const fetchTaskById = async (req: AuthRequest, res: Response) => {
     try {
          const task = await Task.findOne({ _id: req.params.id, userId: req.id });
          if (!task) {
               res.status(404).json({ success: false, message: 'Task not found' });
               return;
          }
          res.status(200).json({ success: true, task });
     } catch (error) {
          console.error('❌ Failed to fetch task: ', error);
          res.status(500).json({ success: false, message: 'Internal server error' });
     }
}
