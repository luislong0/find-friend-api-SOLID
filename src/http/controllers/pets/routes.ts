import { FastifyInstance } from 'fastify'

import { createPet } from './create-pet'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { findPetByCharacteristic } from './find-pet-by-characteristic'
import { findPetInformation } from './find-pet-information'
import { findPetByCity } from './find-pets-by-city'
import { deletePet } from './delete-pet'

export async function petsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.get('/pet/characteristic', findPetByCharacteristic)
  app.get('/pet/information/:id', findPetInformation)
  app.get('/pet/city/:city', findPetByCity)

  app.post(
    '/pet/create',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    createPet,
  )

  app.delete(
    '/pet/delete/:petId',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    deletePet,
  )
}
