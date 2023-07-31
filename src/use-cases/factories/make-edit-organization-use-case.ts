import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { EditOrganizationUseCase } from '../edit-organization'

export function makeEditOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()

  const editOrganizationUseCase = new EditOrganizationUseCase(
    organizationsRepository,
  )

  return editOrganizationUseCase
}
