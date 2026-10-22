import { prisma } from '../lib/prisma.js';

export class UserController {
  async create(req, res) {
    try {
      const { name, email, role } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
      }
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado.' });
      }
      const user = await prisma.user.create({ data: { name, email, role } });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }

  async list(req, res) {
    try {
      const users = await prisma.user.findMany({
        include: { eventsOrganized: true, tickets: true }
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  }
}