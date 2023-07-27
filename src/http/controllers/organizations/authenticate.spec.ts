import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/organizations').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '(018) 99999-9999',
      cep: '19973-136',
      state: 'São Paulo',
      city: 'Palmital',
      district: 'Paraná',
      address: 'Rua org fofa, 000',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
