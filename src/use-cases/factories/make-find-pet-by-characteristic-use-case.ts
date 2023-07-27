import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindPetByCharacteristicUseCase } from '../find-pet-by-characteristic'

export function makeFindPetByCharacteristicUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const findPetByCharacteristicUseCase = new FindPetByCharacteristicUseCase(
    petsRepository,
  )

  return findPetByCharacteristicUseCase
}
