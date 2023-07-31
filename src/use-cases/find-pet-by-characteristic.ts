import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindPetByCharacteristicUseCaseRequest {
  query: string
  page: number
  city: string
}

interface FindPetByCharacteristicUseCaseResponse {
  pets: Pet[]
}

export class FindPetByCharacteristicUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
    city,
  }: FindPetByCharacteristicUseCaseRequest): Promise<FindPetByCharacteristicUseCaseResponse> {
    const pets = await this.petsRepository.findByCharacteristic(
      query,
      page,
      city,
    )

    if (pets.length === 0) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
