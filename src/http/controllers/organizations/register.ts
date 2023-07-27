import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(11),
    cep: z.string().min(9),
    state: z.string(),
    city: z.string(),
    district: z.string(),
    address: z.string(),
  })

  const { name, email, password, phone, cep, address, city, district, state } =
    registerBodySchema.parse(request.body)

  let organization

  try {
    const registerUseCase = makeRegisterUseCase()

    organization = await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      cep,
      state,
      city,
      district,
      address,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send({
    organization: organization.organization,
  })
}
