import { AdoptionRequirementsRepository } from '@/repositories/adoptionRequirements-repository'

interface AdoptionRequirements {
  id?: string
  details: string
  petId?: string | null
}

interface CreateAdoptionRequirementsUseCaseRequest {
  adoptionRequirements: AdoptionRequirements
}

interface CreateAdoptionRequirementsUseCaseResponse {
  adoptionRequirementsData: AdoptionRequirements | null
}

export class CreateAdoptionRequirementsUseCase {
  constructor(
    private adoptionsRequirementsRepository: AdoptionRequirementsRepository,
  ) {}

  async execute({
    adoptionRequirements,
  }: CreateAdoptionRequirementsUseCaseRequest): Promise<CreateAdoptionRequirementsUseCaseResponse> {
    const adoptionRequirementsData =
      await this.adoptionsRequirementsRepository.create({
        details: adoptionRequirements.details,
        petId: adoptionRequirements.petId,
      })

    return {
      adoptionRequirementsData,
    }
  }
}
