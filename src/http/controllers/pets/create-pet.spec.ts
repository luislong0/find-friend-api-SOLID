import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-organization'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, organizationId } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/pet/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pet: {
          name: 'arlindo',
          bio: 'bio fofa',
          gender: 'MALE',
          breed: 'viralata',
          age: '3',
          size: 'BIG',
          independenceLevel: 'SMALL',
          energy: '4',
          environment: 'MEDIUM',
          organizationId,
        },
        adoptionRequirements: [
          {
            details: 'Detalhe 1',
          },
          {
            details: 'Detalhe 2',
          },
          {
            details: 'Detalhe 3',
          },
        ],
        petImages: [
          {
            imageUrl: 'Imagem 1',
          },
          {
            imageUrl: 'Imagem 2',
          },
          {
            imageUrl: 'Imagem 3',
          },
        ],
      })

    expect(response.status).toEqual(201)
  })
})
