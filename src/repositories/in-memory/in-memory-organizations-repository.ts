import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization: Organization = {
      id: randomUUID(),
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name,
      phone: data.phone,
      cep: data.cep,
      city: data.city,
      state: data.state,
      address: data.address,
      district: data.district,
      role: 'ADMIN',
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByCity(city: string) {
    const organizations = this.items.filter((item) => item.city === city)

    if (!organizations) {
      return null
    }

    return organizations
  }
}
