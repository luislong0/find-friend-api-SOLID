import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Pet } from '@prisma/client'

interface RemovePetsUseCaseRequest {
  petId: string
}

interface RemovePetsUseCaseResponse {
  pets: Pet[] | null
}

export class RemovePetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: RemovePetsUseCaseRequest): Promise<RemovePetsUseCaseResponse> {
    if (!petId) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.delete(petId)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
