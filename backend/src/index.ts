import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDB } from './config/db';

import userRoutes from './routes/user.routes';

const app = express();
connectToDB();

app.use(express.json());

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
     res.send('Healthy server');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server strated http://localhost:${PORT}`));