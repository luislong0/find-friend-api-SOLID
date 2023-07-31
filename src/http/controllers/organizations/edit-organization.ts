import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeEditOrganizationUseCase } from '@/use-cases/factories/make-edit-organization-use-case'

export async function editOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editAdoptionRequirementsBodySchema = z.object({
    id: z.string().uuid(),
    address: z.string(),
    cep: z.string(),
    city: z.string(),
    district: z.string(),
    email: z.string().email(),
    name: z.string(),
    phone: z.string(),
    state: z.string(),
    role: z.enum(['ADMIN', 'MEMBER']),
  })

  const { address, cep, city, district, email, id, name, phone, state, role } =
    editAdoptionRequirementsBodySchema.parse(request.body)

  let response

  try {
    const editOrganizationUseCase = makeEditOrganizationUseCase()

    response = await editOrganizationUseCase.execute({
      data: {
        id,
        address,
        cep,
        city,
        district,
        email,
        name,
        phone,
        state,
        role,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send(response)
}
