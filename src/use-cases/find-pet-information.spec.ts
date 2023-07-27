import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'crypto'
import { FindPetInformationUseCase } from './find-pet-information'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: FindPetInformationUseCase

describe('Find Pet By Character Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FindPetInformationUseCase(petsRepository)
  })

  it('should be able to get a pet information', async () => {
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

    const petInfo = await petsRepository.create({
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

    const { pet } = await sut.execute({
      id: petInfo.id,
    })

    expect(pet?.id).toEqual(petInfo.id)
  })

  it('should not be able to get a pet information', async () => {
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
          id: randomUUID(),
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
