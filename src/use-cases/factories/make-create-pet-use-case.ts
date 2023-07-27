import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoptionRequirements-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsImagesRepository } from '@/repositories/prisma/prisma-petsImages-repository'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const adoptionsRequirementsRepository =
    new PrismaAdoptionRequirementsRepository()
  const petsImagesRepository = new PrismaPetsImagesRepository()

  const authenticateUseCase = new CreatePetUseCase(
    petsRepository,
    adoptionsRequirementsRepository,
    petsImagesRepository,
  )

  return authenticateUseCase
}
