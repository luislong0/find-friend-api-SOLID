import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeEditAdoptionRequirementsUseCase } from '@/use-cases/factories/make-edit-adoption-requiremets-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function editAdoptionRequirements(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editAdoptionRequirementsBodySchema = z.object({
    id: z.string().uuid(),
    details: z.string(),
    petId: z.string().uuid(),
  })

  const { id, details, petId } = editAdoptionRequirementsBodySchema.parse(
    request.body,
  )

  try {
    const editAdoptionRequirementsUseCase =
      makeEditAdoptionRequirementsUseCase()

    await editAdoptionRequirementsUseCase.execute({
      data: {
        id,
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
