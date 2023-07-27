import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoptionRequirements-repository'
import { CreateAdoptionRequirementsUseCase } from '../create-adoption-requirements'

export function makeCreateAdoptionRequirementsUseCase() {
  const adoptionsRequirementsRepository =
    new PrismaAdoptionRequirementsRepository()

  const createAdoptionRequirementsUseCase =
    new CreateAdoptionRequirementsUseCase(adoptionsRequirementsRepository)

  return createAdoptionRequirementsUseCase
}
