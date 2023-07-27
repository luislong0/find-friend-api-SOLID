import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { editAdoptionRequirements } from './edit-adoption-requirements'
import { createAdoptionRequirements } from './create-adoption-requirements'

export async function adoptionRequirementsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post(
    '/requirement/create',
    { onRequest: [verifyUserRole('ADMIN')] },
    createAdoptionRequirements,
  )

  app.put(
    '/requirement/edit',
    { onRequest: [verifyUserRole('ADMIN')] },
    editAdoptionRequirements,
  )
}
