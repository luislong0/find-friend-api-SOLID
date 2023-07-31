import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  edit(
    organization: Prisma.OrganizationUncheckedUpdateInput,
  ): Promise<Organization>
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  findByCity(city: string): Promise<Organization[] | null>
}
