import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDB } from './config/db';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import taskRouter from './routes/task.routes';
import { isAuth } from './middlewares/auth';

const app = express();
connectToDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/tasks', isAuth, taskRouter);

app.get('/', (req, res) => {
     res.send('Healthy server');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server strated http://localhost:${PORT}`));