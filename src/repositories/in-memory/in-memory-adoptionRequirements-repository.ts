import { AdoptionRequirements, Prisma } from '@prisma/client'
import { AdoptionRequirementsRepository } from '../adoptionRequirements-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async findByPetId(petId: string) {
    const adoptionRequirement = this.items.filter(
      (item) => item.petId === petId,
    )

    return adoptionRequirement || null
  }

  async findById(id: string) {
    const adoptionRequirement = this.items.find((item) => item.id === id)

    return adoptionRequirement || null
  }

  public items: AdoptionRequirements[] = []

  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const requirement = {
      id: randomUUID(),
      details: data.details,
      petId: data.petId || null,
    }

    this.items.push(requirement)

    return requirement
  }

  async edit(requirements: AdoptionRequirements) {
    const requirementIndex = this.items.findIndex(
      (item) => item.id === requirements.id,
    )

    if (requirementIndex >= 0) {
      this.items[requirementIndex] = requirements
    }

    const editedRequirement = this.items[requirementIndex]

    return editedRequirement
  }

  async delete(adoptionId: string) {
    const newAdoptionRequirements = this.items.filter(
      (item) => item.id !== adoptionId,
    )

    return newAdoptionRequirements
  }
}
