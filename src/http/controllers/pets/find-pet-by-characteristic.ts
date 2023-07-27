import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFindPetByCharacteristicUseCase } from '@/use-cases/factories/make-find-pet-by-characteristic-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function findPetByCharacteristic(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    query: z.string(),
    page: z.string().transform(Number),
  })

  const { query, page } = querySchema.parse(request.query)

  let response

  try {
    const findPetByCharacteristicUseCase = makeFindPetByCharacteristicUseCase()

    response = await findPetByCharacteristicUseCase.execute({
      query,
      page,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send(response.pets)
}
