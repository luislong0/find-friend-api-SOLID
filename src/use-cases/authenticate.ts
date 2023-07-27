import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Organization
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(
      password,
      organization.passwordHash,
    )

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
