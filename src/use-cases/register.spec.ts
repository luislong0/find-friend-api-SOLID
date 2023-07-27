import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let organizationsRepository: InMemoryOrganizationRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new RegisterUseCase(organizationsRepository)
  })

  it('should be able to register a organization', async () => {
    const { organization } = await sut.execute({
      name: 'Organização Fofa',
      email: 'organização.fofa@example.com',
      password: '123456',
      phone: '(018) 99999-9999',
      cep: '19973-136',
      city: 'Palmital',
      state: 'SP',
      district: 'Organização district',
      address: 'Rua organização fofa, 000',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Organização Fofa',
      email: 'organização.fofa@example.com',
      password: '123456',
      phone: '(018) 99999-9999',
      cep: '19973-136',
      city: 'Palmital',
      state: 'SP',
      district: 'Organização district',
      address: 'Rua organização fofa, 000',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.passwordHash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'organização.fofa@example.com'

    await sut.execute({
      name: 'Organização Fofa',
      email,
      password: '123456',
      phone: '(018) 99999-9999',
      cep: '19973-136',
      city: 'Palmital',
      state: 'SP',
      district: 'Organização district',
      address: 'Rua organização fofa, 000',
    })

    await expect(() =>
      sut.execute({
        name: 'Organização Fofa',
        email,
        password: '123456',
        phone: '(018) 99999-9999',
        cep: '19973-136',
        city: 'Palmital',
        state: 'SP',
        district: 'Organização district',
        address: 'Rua organização fofa, 000',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
