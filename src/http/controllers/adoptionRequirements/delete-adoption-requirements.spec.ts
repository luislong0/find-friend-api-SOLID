import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'

describe('Delete Adoption Requirements (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a adoption requirements', async () => {
    const { token, organizationId } = await createAndAuthenticateUser(app, true)

    const createPetResponse = await prisma.pet.create({
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

    const createAdoptionRequirementsResponse =
      await prisma.adoptionRequirements.create({
        data: {
          details: 'detalhe 1',
          petId: createPetResponse.id,
        },
      })

    const deleteResponse = await request(app.server)
      .delete(`/requirement/delete/${createAdoptionRequirementsResponse.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(deleteResponse.status).toEqual(204)
  })
})
