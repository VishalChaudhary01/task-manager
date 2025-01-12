import { z } from 'zod';

export const createTaskSchema = z.object({
     title: z.string().min(1, 'Title is required').max(25, 'Title is too larg').trim(),
     description: z.string().max(150, 'Description is too larg').optional(),
});

export const updateTaskSchema = z.object({
     description: z.string().max(150, 'Description is too larg').optional(),
     status: z.enum(['PENDING', 'DONE']),
});

export type CreateTaskType = z.infer<typeof createTaskSchema>;
export type UpdateTaskType = z.infer<typeof updateTaskSchema>;