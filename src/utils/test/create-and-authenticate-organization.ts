import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const organization = await prisma.organization.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      phone: '(018) 99999-9999',
      cep: '19973-136',
      state: 'São Paulo',
      city: 'Palmital',
      district: 'Paraná',
      address: 'Rua org fofa, 000',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    organizationId: organization.id,
  }
}
