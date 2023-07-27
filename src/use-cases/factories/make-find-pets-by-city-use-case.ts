import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindPetByCityUseCase } from '../find-pets-by-city'

export function makeFindPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const findPetByCityUseCase = new FindPetByCityUseCase(petsRepository)

  return findPetByCityUseCase
}
