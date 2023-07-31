import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeDeletePetUseCase } from '@/use-cases/factories/make-delete-pet-use-case'

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = paramsSchema.parse(request.params)

  try {
    const deletePetUseCase = makeDeletePetUseCase()

    await deletePetUseCase.execute({
      petId,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
