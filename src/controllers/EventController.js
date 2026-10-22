import { prisma } from '../lib/prisma.js';

export class EventController {
  async create(req, res) {
    try {
      const { title, description, date, location, capacity, organizerId } = req.body;
      if (!title || !date || !location || !capacity || !organizerId) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
      }
      const organizer = await prisma.user.findUnique({ where: { id: organizerId } });
      if (!organizer) {
        return res.status(404).json({ error: 'Organizador não encontrado.' });
      }
      const event = await prisma.event.create({
        data: {
          title,
          description,
          date: new Date(date),
          location,
          capacity: Number(capacity),
          organizerId
        }
      });
      return res.status(201).json(event);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar evento.' });
    }
  }

  async list(req, res) {
    try {
      const events = await prisma.event.findMany({
        include: {
          organizer: { select: { id: true, name: true, email: true } },
          _count: { select: { tickets: true } }
        }
      });
      return res.json(events);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar eventos.' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const event = await prisma.event.findUnique({
        where: { id },
        include: { organizer: true, tickets: { include: { user: true } } }
      });
      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado.' });
      }
      return res.json(event);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar evento.' });
    }
  }
}