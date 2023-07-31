import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'

describe('Delete Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a pet', async () => {
    const { token, organizationId } = await createAndAuthenticateUser(app, true)

    const createResponse = await prisma.pet.create({
      data: {
        name: 'arlindo',
        bio: 'bio fofa',
        gender: 'MALE',
        breed: 'viralata',
        age: '3',
        size: 'BIG',
        independenceLevel: 'SMALL',
        energy: 4,
        environment: 'MEDIUM',
        organizationId,
      },
    })

    const deleteResponse = await request(app.server)
      .delete(`/pet/delete/${createResponse.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(deleteResponse.status).toEqual(204)
  })
})
