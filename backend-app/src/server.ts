import express from 'express';
import cors from 'cors'
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World! Vendo se Atualiza');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})