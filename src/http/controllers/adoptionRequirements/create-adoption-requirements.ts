import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateAdoptionRequirementsUseCase } from '@/use-cases/factories/make-create-adoption-requirements-use-case'

export async function createAdoptionRequirements(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAdoptionRequirementsBodySchema = z.object({
    details: z.string(),
    petId: z.string().uuid(),
  })

  const { details, petId } = createAdoptionRequirementsBodySchema.parse(
    request.body,
  )

  try {
    const createAdoptionRequirementsUseCase =
      makeCreateAdoptionRequirementsUseCase()

    await createAdoptionRequirementsUseCase.execute({
      adoptionRequirements: {
        details,
        petId,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
