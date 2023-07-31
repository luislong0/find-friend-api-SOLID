import { AdoptionRequirementsRepository } from '@/repositories/adoptionRequirements-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { AdoptionRequirements } from '@prisma/client'

interface RemoveAdoptionRequirementsUseCaseRequest {
  adoptionId: string
}

interface RemoveAdoptionRequirementsUseCaseResponse {
  adoptionRequirements: AdoptionRequirements[] | null
}

export class RemoveAdoptionRequirementsUseCase {
  constructor(
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
  ) {}

  async execute({
    adoptionId,
  }: RemoveAdoptionRequirementsUseCaseRequest): Promise<RemoveAdoptionRequirementsUseCaseResponse> {
    if (!adoptionId) {
      throw new ResourceNotFoundError()
    }

    const adoptionRequirements =
      await this.adoptionRequirementsRepository.delete(adoptionId)

    if (!adoptionRequirements) {
      throw new ResourceNotFoundError()
    }

    return {
      adoptionRequirements,
    }
  }
}
