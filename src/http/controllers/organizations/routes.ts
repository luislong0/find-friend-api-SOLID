import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'
import { refresh } from './refresh'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
