import express from 'express';

const app = express();

app.get('/', (req, res) => {
     res.send('Healthy server');
})

const PORT = 5000;
app.listen(PORT, () => console.log(`server strated http://localhost:${PORT}`));