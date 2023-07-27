import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  state: string
  city: string
  district: string
  address: string
  phone: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    district,
    address,
    phone,
    city,
    state,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      passwordHash: password_hash,
      cep,
      state,
      city,
      district,
      address,
      phone,
    })

    return {
      organization,
    }
  }
}
