import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoptionRequirements-repository'
import { RemoveAdoptionRequirementsUseCase } from '../delete-adoption-requiremets'

export function makeDeleteAdoptionRequirementsUseCase() {
  const adoptionsRequirementsRepository =
    new PrismaAdoptionRequirementsRepository()

  const deleteAdoptionRequirementsUseCase =
    new RemoveAdoptionRequirementsUseCase(adoptionsRequirementsRepository)

  return deleteAdoptionRequirementsUseCase
}
