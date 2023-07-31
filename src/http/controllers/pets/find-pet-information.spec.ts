import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-organization'

describe('Find pet information (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find pets information', async () => {
    const { token, organizationId } = await createAndAuthenticateUser(app, true)

    await request(app.server)
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
      })

    await request(app.server)
      .post('/pet/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pet: {
          name: 'arlindo 2',
          bio: 'bio fofa 2',
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
      })

    const petResponse = await request(app.server).get(
      `/pet/characteristic?query=a&page=1&city=Palmital`,
    )

    console.log('JSON BODY:  ' + JSON.stringify(petResponse.body))

    const response = await request(app.server).get(
      `/pet/information/${petResponse.body[0].id}`,
    )

    expect(response.status).toEqual(200)
    expect(response.body.id).toEqual(petResponse.body[0].id)
  })
})
