import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { userRoutes } from './routes/userRoutes.js';
import { eventRoutes } from './routes/eventRoutes.js';
import { ticketRoutes } from './routes/ticketRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Aponta para a pasta public na raiz do projeto
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Rota principal garante a entrega do frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/tickets', ticketRoutes);

// Só inicia o servidor localmente (a Vercel gerencia o app via export default)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;