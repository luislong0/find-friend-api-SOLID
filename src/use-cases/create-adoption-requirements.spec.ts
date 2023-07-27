import { expect, describe, it, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'
import { AdoptionRequirementsRepository } from '@/repositories/adoptionRequirements-repository'
import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoptionRequirements-repository'
import { CreateAdoptionRequirementsUseCase } from './create-adoption-requirements'

let adoptionsRequirementsRepository: AdoptionRequirementsRepository

let sut: CreateAdoptionRequirementsUseCase

describe('Create adoption requirements Use Case', () => {
  beforeEach(() => {
    adoptionsRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()

    sut = new CreateAdoptionRequirementsUseCase(adoptionsRequirementsRepository)
  })

  it('should be able to create a adoption requirements', async () => {
    const { adoptionRequirementsData } = await sut.execute({
      adoptionRequirements: {
        details: 'detalhes 1',
        petId: randomUUID(),
      },
    })

    expect(adoptionRequirementsData!.id).toEqual(expect.any(String))
  })
})
