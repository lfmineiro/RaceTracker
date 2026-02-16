import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import authRouter from './routes/auth.routes.js';
import { prisma } from './lib/prisma.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas de autenticação
app.use('/api/auth', authRouter);

// Rotas da API
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World! Vendo se Atualiza');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})