import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { EditOrganizationUseCase } from './edit-organization'
import { hash } from 'bcryptjs'

let organizationsRepository: InMemoryOrganizationRepository
let sut: EditOrganizationUseCase

describe('Edit Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new EditOrganizationUseCase(organizationsRepository)
  })

  it('should be able to edit a adoption requirement', async () => {
    const organization = await organizationsRepository.create({
      name: 'Organização Fofa',
      email: 'organização.fofa@example.com',
      passwordHash: await hash('123456', 6),
      phone: '(018) 99999-9999',
      cep: '19973-136',
      city: 'Palmital',
      state: 'SP',
      district: 'Organização district',
      address: 'Rua organização fofa, 000',
      role: 'ADMIN',
    })

    const toEditOrganization = {
      id: organization.id,
      name: 'Organização Fofa 2',
      email: organization.email,
      passwordHash: organization.passwordHash,
      cep: organization.cep,
      state: organization.state,
      city: organization.city,
      district: organization.district,
      address: organization.address,
      phone: organization.phone,
      role: organization.role,
    }

    const { editedOrganization } = await sut.execute({
      data: toEditOrganization,
    })

    expect(editedOrganization.name).toEqual('Organização Fofa 2')
  })
})
