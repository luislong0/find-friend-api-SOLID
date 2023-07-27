import { AdoptionRequirementsRepository } from '@/repositories/adoptionRequirements-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { AdoptionRequirements } from '@prisma/client'

interface EditAdoptionRequirementsUseCaseRequest {
  data: AdoptionRequirements
}

interface EditAdoptionRequirementsUseCaseResponse {
  editedRequirement: AdoptionRequirements
}

export class EditAdoptionRequirementsUseCase {
  constructor(
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
  ) {}

  async execute({
    data,
  }: EditAdoptionRequirementsUseCaseRequest): Promise<EditAdoptionRequirementsUseCaseResponse> {
    const toEditRequirements =
      await this.adoptionRequirementsRepository.findById(data.id)

    if (!toEditRequirements) {
      throw new ResourceNotFoundError()
    }

    const editedRequirement = await this.adoptionRequirementsRepository.edit(
      data,
    )

    if (!editedRequirement) {
      throw new ResourceNotFoundError()
    }

    return {
      editedRequirement,
    }
  }
}
