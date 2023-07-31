import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async edit(organization: Prisma.OrganizationUncheckedUpdateInput) {
    const adoptionRequirement = await prisma.organization.update({
      where: {
        id: organization.id!.toString(),
      },
      data: {
        id: organization.id,
        name: organization.name,
        email: organization.email,
        address: organization.address,
        cep: organization.cep,
        city: organization.city,
        district: organization.district,
        phone: organization.phone,
        state: organization.state,
        role: organization.role,
      },
    })

    return adoptionRequirement
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findByCity(city: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        city,
      },
    })

    return organizations
  }
}
