import { expect, describe, it, beforeEach } from 'vitest'

import { randomUUID } from 'node:crypto'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RemovePetsUseCase } from './delete-pet'

let petsRepository: InMemoryPetsRepository
let sut: RemovePetsUseCase

describe('Delete Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RemovePetsUseCase(petsRepository)
  })

  it('should be able to delete a pet', async () => {
    const createPetResponse = await petsRepository.create({
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

    const { pets } = await sut.execute({
      petId: createPetResponse.id,
    })

    expect(pets?.length).toEqual(0)
  })
})
