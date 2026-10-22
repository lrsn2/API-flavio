import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes.js';
import { eventRoutes } from './routes/eventRoutes.js';
import { ticketRoutes } from './routes/ticketRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Servir os arquivos da pasta public (irá abrir o index.html automaticamente na rota /)
app.use(express.static('public'));

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;