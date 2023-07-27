import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsImagesRepository } from '../petsImages-repository'

export class PrismaPetsImagesRepository implements PetsImagesRepository {
  async create(data: Prisma.PetsImagesUncheckedCreateInput) {
    const petImage = await prisma.petsImages.create({
      data,
    })

    console.log('PET IMAGE: ' + petImage)

    return petImage
  }

  async findById(id: string) {
    const petImage = await prisma.petsImages.findUnique({
      where: {
        id,
      },
    })

    return petImage
  }

  async findByPetId(petId: string) {
    const petImages = await prisma.petsImages.findMany({
      where: {
        petId,
      },
    })

    return petImages
  }
}
