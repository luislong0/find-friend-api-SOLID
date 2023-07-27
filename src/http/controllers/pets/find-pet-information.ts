import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFindPetInformationUseCase } from '@/use-cases/factories/make-find-pet-information-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function findPetInformation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  console.log('IDDDDD: ' + id)

  let response

  try {
    const findPetInformationUseCase = makeFindPetInformationUseCase()

    response = await findPetInformationUseCase.execute({
      id,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send(response.pet)
}
