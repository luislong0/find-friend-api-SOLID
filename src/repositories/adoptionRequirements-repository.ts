import { AdoptionRequirements, Prisma } from '@prisma/client'

export interface AdoptionRequirementsRepository {
  create(
    data: Prisma.AdoptionRequirementsUncheckedCreateInput,
  ): Promise<AdoptionRequirements>
  edit(requirements: AdoptionRequirements): Promise<AdoptionRequirements | null>
  findById(id: string): Promise<AdoptionRequirements | null>
  findByPetId(petId: string): Promise<AdoptionRequirements[] | null>
  delete(adoptionId: string): Promise<AdoptionRequirements[] | null>
}
