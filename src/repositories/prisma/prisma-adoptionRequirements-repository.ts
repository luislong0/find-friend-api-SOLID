import { AdoptionRequirements, Prisma } from '@prisma/client'
import { AdoptionRequirementsRepository } from '../adoptionRequirements-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async findByPetId(petId: string) {
    const adoptionRequirement = await prisma.adoptionRequirements.findMany({
      where: {
        petId,
      },
    })

    return adoptionRequirement
  }

  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const adoptionRequirement = await prisma.adoptionRequirements.create({
      data,
    })

    return adoptionRequirement
  }

  async edit(requirements: AdoptionRequirements) {
    const adoptionRequirement = await prisma.adoptionRequirements.update({
      where: {
        id: requirements.id,
      },
      data: requirements,
    })

    return adoptionRequirement
  }

  async delete(adoptionId: string) {
    const adoptionRequirement = await prisma.adoptionRequirements.delete({
      where: {
        id: adoptionId,
      },
    })

    return [adoptionRequirement]
  }

  async findById(id: string) {
    const adoptionRequirement = await prisma.adoptionRequirements.findUnique({
      where: {
        id,
      },
    })

    return adoptionRequirement
  }
}
