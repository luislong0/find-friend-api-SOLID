import { Organization, Pet, PetsImages, Size } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

type PetWithOrganization = Pet & { organization?: Organization } & {
  petsImages?: PetsImages
}

export class InMemoryPetsRepository implements PetsRepository {
  public items: PetWithOrganization[] = []

  async create(data: PetWithOrganization) {
    const pet = {
      id: data.id!,
      name: data.name,
      bio: data.bio ? data.bio : null,
      gender: data.gender,
      breed: data.breed,
      age: data.age,
      size: data.size,
      independenceLevel: data.independenceLevel,
      energy: data.energy,
      environment: data.environment as Size,
      organizationId: data.organizationId || null,
      organization: data.organization,
    }

    this.items.push(pet)

    return pet
  }

  async findByCity(query: string, page: number) {
    let pets = this.items.filter((pet) => pet.organization?.city === query)

    pets = pets.slice((page - 1) * 20, page * 20)

    return pets
  }

  async findByCharacteristic(query: string, page: number) {
    const pets = this.items
      .filter(
        (item) =>
          item.gender === query ||
          item.breed === query ||
          item.age === query ||
          item.size === query ||
          item.independenceLevel === query ||
          item.energy.toString() === query ||
          item.environment === query,
      )
      .slice((page - 1) * 20, page * 20)

    return Promise.resolve(pets)
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    return pet || null
  }
}
