import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindPetInformationUseCase } from '../find-pet-information'

export function makeFindPetInformationUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const findPetInformationUseCase = new FindPetInformationUseCase(
    petsRepository,
  )

  return findPetInformationUseCase
}
