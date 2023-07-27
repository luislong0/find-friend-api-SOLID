import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindPetByCharacteristicUseCaseRequest {
  query: string
  page: number
}

interface FindPetByCharacteristicUseCaseResponse {
  pets: Pet[]
}

export class FindPetByCharacteristicUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: FindPetByCharacteristicUseCaseRequest): Promise<FindPetByCharacteristicUseCaseResponse> {
    const pets = await this.petsRepository.findByCharacteristic(query, page)

    if (pets.length === 0) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
