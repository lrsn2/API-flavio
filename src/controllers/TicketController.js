import { prisma } from '../lib/prisma.js';

export class TicketController {
  async create(req, res) {
    try {
      const { eventId, userId } = req.body;
      if (!eventId || !userId) {
        return res.status(400).json({ error: 'eventId e userId são obrigatórios.' });
      }
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { _count: { select: { tickets: true } } }
      });
      if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado.' });
      }
      if (event._count.tickets >= event.capacity) {
        return res.status(400).json({ error: 'Ingressos esgotados para este evento.' });
      }
      const ticket = await prisma.ticket.create({
        data: { eventId, userId },
        include: { event: true, user: true }
      });
      return res.status(201).json(ticket);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao emitir ingresso.' });
    }
  }

  async listByUser(req, res) {
    try {
      const { userId } = req.params;
      const tickets = await prisma.ticket.findMany({
        where: { userId },
        include: { event: true }
      });
      return res.json(tickets);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar ingressos.' });
    }
  }
}