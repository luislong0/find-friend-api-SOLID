import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'crypto'
import { FindPetByCharacteristicUseCase } from './find-pet-by-characteristic'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: FindPetByCharacteristicUseCase

describe('Find Pet By Characteristic Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FindPetByCharacteristicUseCase(petsRepository)
  })

  it('should be able to search a pet with characteristic', async () => {
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
      organizationId: randomUUID(),
    })

    await petsRepository.create({
      id: randomUUID(),
      name: 'arlindo2',
      bio: 'bio fofa2',
      gender: 'female',
      breed: 'viralata',
      age: '3',
      size: 'BIG',
      independenceLevel: 'SMALL',
      energy: 4,
      environment: 'MEDIUM',
      organizationId: randomUUID(),
    })

    const { pets } = await sut.execute({
      query: 'female',
      page: 1,
    })

    expect(pets.length).toEqual(1)
    expect(pets[0].gender).toEqual('female')
  })

  it('should not be able to search a pet with characteristic', async () => {
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
      organizationId: randomUUID(),
    })

    await petsRepository.create({
      id: randomUUID(),
      name: 'arlindo2',
      bio: 'bio fofa2',
      gender: 'female',
      breed: 'viralata',
      age: '3',
      size: 'BIG',
      independenceLevel: 'SMALL',
      energy: 4,
      environment: 'MEDIUM',
      organizationId: randomUUID(),
    })

    await expect(
      async () =>
        await sut.execute({
          query: 'test error query',
          page: 1,
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
