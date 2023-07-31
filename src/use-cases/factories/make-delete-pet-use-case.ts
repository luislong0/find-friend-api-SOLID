import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RemovePetsUseCase } from '../delete-pet'

export function makeDeletePetUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const deletePetUseCase = new RemovePetsUseCase(petsRepository)

  return deletePetUseCase
}
