import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-organization'

describe('Edit organization requirements (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit a organization', async () => {
    const { token, organizationId } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .put('/organization/edit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: organizationId,
        name: 'John Doe 2',
        email: 'johndoe3@example.com',
        phone: '(018) 99999-9999',
        cep: '19973-136',
        state: 'São Paulo',
        city: 'Palmital',
        district: 'Paraná',
        address: 'Rua org fofa, 000',
        role: 'ADMIN',
      })

    console.log('BODYYYY: ' + JSON.stringify(response.body))

    expect(response.status).toEqual(200)
    expect(response.body.editedOrganization.name).toEqual('John Doe 2')
  })
})
