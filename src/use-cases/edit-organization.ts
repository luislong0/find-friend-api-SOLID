import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { Organization, Prisma } from '@prisma/client'

interface EditOrganizationUseCaseRequest {
  data: Prisma.OrganizationUncheckedUpdateInput
}

interface EditOrganizationUseCaseResponse {
  editedOrganization: Organization
}

export class EditOrganizationUseCase {
  constructor(private OrganizationsRepository: OrganizationsRepository) {}

  async execute({
    data,
  }: EditOrganizationUseCaseRequest): Promise<EditOrganizationUseCaseResponse> {
    const toEditOrganization = await this.OrganizationsRepository.findById(
      data.id!.toString(),
    )

    if (!toEditOrganization) {
      throw new ResourceNotFoundError()
    }

    const editedOrganization = await this.OrganizationsRepository.edit(data)

    if (!editedOrganization) {
      throw new ResourceNotFoundError()
    }

    return {
      editedOrganization,
    }
  }
}
