import { PetsImages, Prisma } from '@prisma/client'
import { PetsImagesRepository } from '../petsImages-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsImagesRepository implements PetsImagesRepository {
  public items: PetsImages[] = []

  async create(data: Prisma.PetsImagesUncheckedCreateInput) {
    const requirement = {
      id: randomUUID(),
      imageUrl: data.imageUrl,
      petId: data.petId || null,
    }

    this.items.push(requirement)

    return requirement
  }

  async findById(id: string) {
    const photo = this.items.find((photo) => photo.id === id)

    return photo || null
  }

  async findByPetId(petId: string) {
    const petImages = this.items.filter((item) => item.petId === petId)

    return petImages || null
  }
}
