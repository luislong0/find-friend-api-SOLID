import { Prisma, Size } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findByCity(query: string, page: number) {
    const petsData = await prisma.organization.findMany({
      where: {
        city: query,
      },
      include: {
        pet: true,
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    const pets = petsData.flatMap((organization) => organization.pet)

    return pets
  }

  async findByCharacteristic(query: string, page: number) {
    const size = Size[query as keyof typeof Size]
    const independenceLevel = Size[query as keyof typeof Size]
    const environment = Size[query as keyof typeof Size]

    let age

    if (!isNaN(Number(query))) {
      age = parseInt(query)
    }

    const pets = await prisma.pet.findMany({
      where: {
        OR: [
          {
            gender: {
              contains: query,
            },
          },
          {
            breed: {
              contains: query,
            },
          },
          {
            age: {
              contains: query,
            },
          },
          {
            size: size || undefined,
          },
          {
            independenceLevel: independenceLevel || undefined,
          },
          {
            energy: age,
          },
          {
            environment: environment || undefined,
          },
        ],
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
