import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDB } from './config/db';

const app = express();
connectToDB();

app.get('/', (req, res) => {
     res.send('Healthy server');
})

const PORT = 5000;
app.listen(PORT, () => console.log(`server strated http://localhost:${PORT}`));