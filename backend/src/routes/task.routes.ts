import express from 'express';
import { createTask, fetchAllTasks, fetchTaskById, removeTask, updateTask } from '../controllers/task.controllers';

const router = express.Router();

router.post('/', createTask);
router.get('/', fetchAllTasks);
router.get('/:id', fetchTaskById);
router.put('/:id', updateTask);
router.delete('/:id', removeTask);

export default router;