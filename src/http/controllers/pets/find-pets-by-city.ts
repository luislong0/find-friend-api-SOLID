import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFindPetsByCityUseCase } from '@/use-cases/factories/make-find-pets-by-city-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function findPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    city: z.string(),
  })

  const querySchema = z.object({
    page: z.coerce.number(),
  })

  const { city } = paramsSchema.parse(request.params)
  const { page } = querySchema.parse(request.query)

  console.log('IDDDDD: ' + city)

  let response

  try {
    const findPetByCityUseCase = makeFindPetsByCityUseCase()

    response = await findPetByCityUseCase.execute({
      city,
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
