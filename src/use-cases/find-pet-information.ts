import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindPetInformationUseCaseRequest {
  id: string
}

interface FindPetInformationUseCaseResponse {
  pet: Pet | null
}

export class FindPetInformationUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: FindPetInformationUseCaseRequest): Promise<FindPetInformationUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
