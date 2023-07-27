import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'crypto'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { FindPetByCityUseCase } from './find-pets-by-city'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationRepository
let sut: FindPetByCityUseCase

describe('Find Pet By City', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new FindPetByCityUseCase(petsRepository)
  })

  it('should be able to get a pet by the city name', async () => {
    const organization1 = await organizationsRepository.create({
      name: 'Organização Fofa',
      email: 'organização.fofa@example.com',
      passwordHash: '123456',
      phone: '(018) 99999-9999',
      cep: '19973-136',
      city: 'Palmital',
      state: 'SP',
      district: 'Organização district',
      address: 'Rua organização fofa, 000',
    })

    const organization2 = await organizationsRepository.create({
      name: 'Organização Fofa 2',
      email: 'organização.fofa@example.com',
      passwordHash: '123456',
      phone: '(018) 99999-9999',
      cep: '19973-136',
      city: 'Assis',
      state: 'SP',
      district: 'Organização district',
      address: 'Rua organização fofa, 000',
    })

    await petsRepository.create({
      id: randomUUID(),
      name: 'arlindo',
      bio: 'bio fofa',
      gender: 'male',
      breed: 'viralata',
      age: '3',
      size: 'BIG',
      independenceLevel: 'SMALL',
      energy: 4,
      environment: 'MEDIUM',
      organizationId: organization1.id,
      organization: organization1,
    })

    await petsRepository.create({
      id: randomUUID(),
      name: 'arlindo',
      bio: 'bio fofa',
      gender: 'male',
      breed: 'viralata',
      age: '3',
      size: 'BIG',
      independenceLevel: 'SMALL',
      energy: 4,
      environment: 'MEDIUM',
      organizationId: organization2.id,
      organization: organization2,
    })

    const { pets } = await sut.execute({
      city: 'Palmital',
      page: 1,
    })

    expect(pets?.length).toEqual(1)
  })

  it('not should be able to get a pet by the city name', async () => {
    const organization1 = await organizationsRepository.create({
      name: 'Organização Fofa',
      email: 'organização.fofa@example.com',
      passwordHash: '123456',
      phone: '(018) 99999-9999',
      cep: '19973-136',
      city: 'Palmital',
      state: 'SP',
      district: 'Organização district',
      address: 'Rua organização fofa, 000',
    })

    const organization2 = await organizationsRepository.create({
      name: 'Organização Fofa 2',
      email: 'organização.fofa@example.com',
      passwordHash: '123456',
      phone: '(018) 99999-9999',
      cep: '19973-136',
      city: 'Assis',
      state: 'SP',
      district: 'Organização district',
      address: 'Rua organização fofa, 000',
    })

    await petsRepository.create({
      id: randomUUID(),
      name: 'arlindo',
      bio: 'bio fofa',
      gender: 'male',
      breed: 'viralata',
      age: '3',
      size: 'BIG',
      independenceLevel: 'SMALL',
      energy: 4,
      environment: 'MEDIUM',
      organizationId: organization1.id,
      organization: organization1,
    })

    await petsRepository.create({
      id: randomUUID(),
      name: 'arlindo',
      bio: 'bio fofa',
      gender: 'male',
      breed: 'viralata',
      age: '3',
      size: 'BIG',
      independenceLevel: 'SMALL',
      energy: 4,
      environment: 'MEDIUM',
      organizationId: organization2.id,
      organization: organization2,
    })

    await expect(
      async () =>
        await sut.execute({
          city: 'Marilia',
          page: 1,
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
