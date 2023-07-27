import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { randomUUID } from 'crypto'
import { AdoptionRequirementsRepository } from '@/repositories/adoptionRequirements-repository'
import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoptionRequirements-repository'
import { InMemoryPetsImagesRepository } from '@/repositories/in-memory/in-memory-petsImages-repository'

let petsRepository: InMemoryPetsRepository
let adoptionsRequirementsRepository: AdoptionRequirementsRepository
let petsImagesRepository: InMemoryPetsImagesRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    adoptionsRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()
    petsImagesRepository = new InMemoryPetsImagesRepository()
    sut = new CreatePetUseCase(
      petsRepository,
      adoptionsRequirementsRepository,
      petsImagesRepository,
    )
  })

  it('should be able to create a pet', async () => {
    const { petData } = await sut.execute({
      pet: {
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
      },
    })

    expect(petData.id).toEqual(expect.any(String))
  })

  it('should be able to create a pet with adoption requirements', async () => {
    const { petData, adoptionRequirementsData } = await sut.execute({
      pet: {
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
      },
      adoptionRequirements: [
        {
          id: randomUUID(),
          details: 'Detalhe 1',
        },
        {
          id: randomUUID(),
          details: 'Detalhe 2',
        },
        {
          id: randomUUID(),
          details: 'Detalhe 3',
        },
      ],
    })

    expect(petData.id).toEqual(expect.any(String))
    expect(adoptionRequirementsData![0].petId).toEqual(petData.id)
  })

  it('should be able to create a pet with pet images', async () => {
    const { petData, petImagesData } = await sut.execute({
      pet: {
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
      },
      petsImages: [
        {
          id: randomUUID(),
          imageUrl: 'imagem foda',
        },
        {
          id: randomUUID(),
          imageUrl: 'imagem foda2',
        },
        {
          id: randomUUID(),
          imageUrl: 'imagem foda3',
        },
      ],
    })

    expect(petData.id).toEqual(expect.any(String))
    expect(petImagesData![0].petId).toEqual(petData.id)
  })

  it('should be able to create a pet with pet images and adoption requirements', async () => {
    const { petData, adoptionRequirementsData, petImagesData } =
      await sut.execute({
        pet: {
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
        },
        adoptionRequirements: [
          {
            id: randomUUID(),
            details: 'Detalhe 1',
          },
          {
            id: randomUUID(),
            details: 'Detalhe 2',
          },
          {
            id: randomUUID(),
            details: 'Detalhe 3',
          },
        ],
        petsImages: [
          {
            id: randomUUID(),
            imageUrl: 'imagem foda',
          },
          {
            id: randomUUID(),
            imageUrl: 'imagem foda2',
          },
          {
            id: randomUUID(),
            imageUrl: 'imagem foda3',
          },
        ],
      })

    expect(petData.id).toEqual(expect.any(String))
    expect(adoptionRequirementsData![0].petId).toEqual(petData.id)
    expect(petImagesData![0].petId).toEqual(petData.id)
  })
})
