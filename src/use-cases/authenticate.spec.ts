import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let organizationsRepository: InMemoryOrganizationRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      name: 'Organização Fofa',
      email: 'organização.fofa@example.com',
      passwordHash: await hash('123456', 6),
      phone: '(018) 99999-9999',
      cep: '19973-136',
      city: 'Palmital',
      state: 'SP',
      district: 'Organização district',
      address: 'Rua organização fofa, 000',
    })

    const { organization } = await sut.execute({
      email: 'organização.fofa@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'organização.fofa@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      name: 'Organização Fofa',
      email: 'organização.fofa@example.com',
      passwordHash: await hash('123456', 6),
      phone: '(018) 99999-9999',
      cep: '19973-136',
      city: 'Palmital',
      state: 'SP',
      district: 'Organização district',
      address: 'Rua organização fofa, 000',
    })

    await expect(() =>
      sut.execute({
        email: 'organização.fofa@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
