import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeDeleteAdoptionRequirementsUseCase } from '@/use-cases/factories/make-delete-adoption-requirements-use-case'

export async function deleteAdoptionRequirements(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    adoptionId: z.string(),
  })

  const { adoptionId } = paramsSchema.parse(request.params)

  console.log('ADOPTIONNN ID: ' + adoptionId)

  try {
    const deleteAdoptionRequirementsUseCase =
      makeDeleteAdoptionRequirementsUseCase()

    await deleteAdoptionRequirementsUseCase.execute({
      adoptionId,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
