import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'

describe('Edit adoption requirements (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit adoption requirements', async () => {
    const { token, organizationId } = await createAndAuthenticateUser(app, true)

    const createAdoptionRequirementsResponse =
      await prisma.adoptionRequirements.create({
        data: {
          details: 'Detalhe 1',
        },
      })

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

    console.log(
      'createAdoptionRequirementsResponse: ' +
        JSON.stringify(createAdoptionRequirementsResponse),
    )

    const response = await request(app.server)
      .put('/requirement/edit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: createAdoptionRequirementsResponse.id,
        details: 'Detalhe 2',
        petId: createPetsResponse.id,
      })

    expect(response.status).toEqual(201)
  })
})
