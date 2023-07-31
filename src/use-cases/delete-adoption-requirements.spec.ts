import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoptionRequirements-repository'
import { RemoveAdoptionRequirementsUseCase } from './delete-adoption-requiremets'
import { randomUUID } from 'node:crypto'

let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository
let sut: RemoveAdoptionRequirementsUseCase

describe('Delete Adoption Requirements Use Case', () => {
  beforeEach(() => {
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()
    sut = new RemoveAdoptionRequirementsUseCase(adoptionRequirementsRepository)
  })

  it('should be able to delete a adoption requirement', async () => {
    const adoptionRequirementsCreate =
      await adoptionRequirementsRepository.create({
        id: randomUUID(),
        details: 'detalhe 1',
        petId: randomUUID(),
      })

    const { adoptionRequirements } = await sut.execute({
      adoptionId: adoptionRequirementsCreate.id,
    })

    expect(adoptionRequirements?.length).toEqual(0)
  })
})
