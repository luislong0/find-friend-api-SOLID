import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'crypto'
import { AdoptionRequirementsRepository } from '@/repositories/adoptionRequirements-repository'
import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoptionRequirements-repository'
import { EditAdoptionRequirementsUseCase } from './edit-adoption-requirements'

let petsRepository: InMemoryPetsRepository
let adoptionsRequirementsRepository: AdoptionRequirementsRepository
let sut: EditAdoptionRequirementsUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    adoptionsRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()
    sut = new EditAdoptionRequirementsUseCase(adoptionsRequirementsRepository)
  })

  it('should be able to edit a adoption requirement', async () => {
    const pet = await petsRepository.create({
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

    const requirement = await adoptionsRequirementsRepository.create({
      id: randomUUID(),
      details: 'Details one',
      petId: pet.id,
    })

    const toEditRequirement = {
      id: requirement.id,
      details: 'Details one',
      petId: pet.id,
    }

    const { editedRequirement } = await sut.execute({ data: toEditRequirement })

    expect(editedRequirement.id).toEqual(requirement.id)
  })
})
