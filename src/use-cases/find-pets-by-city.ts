import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindPetByCityUseCaseRequest {
  city: string
  page: number
}

interface FindPetByCityUseCaseResponse {
  pets: Pet[] | null
}

export class FindPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: FindPetByCityUseCaseRequest): Promise<FindPetByCityUseCaseResponse> {
    const pets: Pet[] = await this.petsRepository.findByCity(city, page)

    console.log('PEEEEEETS: ' + JSON.stringify(pets))

    if (pets.length === 0) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
