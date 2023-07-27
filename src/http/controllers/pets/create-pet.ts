import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    pet: z.object({
      name: z.string(),
      bio: z.string(),
      gender: z.enum(['MALE', 'FEMALE']),
      breed: z.string(),
      age: z.string().max(2),
      size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
      independenceLevel: z.enum(['SMALL', 'MEDIUM', 'BIG']),
      energy: z.string().transform(Number),
      environment: z.enum(['SMALL', 'MEDIUM', 'BIG']),
      organizationId: z.string().optional(),
    }),
    adoptionRequirements: z
      .array(
        z.object({
          details: z.string(),
        }),
      )
      .optional(),
    petsImages: z
      .array(
        z.object({
          imageUrl: z.string(),
        }),
      )
      .optional(),
  })

  const { pet, adoptionRequirements, petsImages } = createPetBodySchema.parse(
    request.body,
  )

  try {
    const createPetUseCase = makeCreatePetUseCase()

    console.log('PETS IMAGES REQUEST: ' + JSON.stringify(petsImages))

    await createPetUseCase.execute({
      pet: {
        age: pet.age,
        bio: pet.bio,
        breed: pet.breed,
        energy: pet.energy,
        environment: pet.environment,
        gender: pet.gender,
        independenceLevel: pet.independenceLevel,
        name: pet.name,
        size: pet.size,
        organizationId: pet.organizationId,
      },
      adoptionRequirements,
      petsImages,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
