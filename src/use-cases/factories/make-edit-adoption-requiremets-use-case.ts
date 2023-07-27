import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoptionRequirements-repository'
import { EditAdoptionRequirementsUseCase } from '../edit-adoption-requirements'

export function makeEditAdoptionRequirementsUseCase() {
  const adoptionRequirementRepository =
    new PrismaAdoptionRequirementsRepository()

  const editAdoptionRequirementsUseCase = new EditAdoptionRequirementsUseCase(
    adoptionRequirementRepository,
  )

  return editAdoptionRequirementsUseCase
}
