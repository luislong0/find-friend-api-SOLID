import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'

describe('Create adoption requirements (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create adoption requirements', async () => {
    const { token, organizationId } = await createAndAuthenticateUser(app, true)

    const createPetsResponse = await prisma.pet.create({
      data: {
        name: 'arlindo',
        bio: 'bio fofa',
        gender: 'male',
        breed: 'viralata',
        age: '3',
        size: 'BIG',
        independenceLevel: 'SMALL',
        energy: 4,
        environment: 'MEDIUM',
        organizationId,
      },
    })

    const response = await request(app.server)
      .post('/requirement/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        details: 'Detalhe 2',
        petId: createPetsResponse.id,
      })

    expect(response.status).toEqual(201)
  })
})
