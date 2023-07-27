import { PetsImages, Prisma } from '@prisma/client'

export interface PetsImagesRepository {
  create(data: Prisma.PetsImagesUncheckedCreateInput): Promise<PetsImages>
  findById(id: string): Promise<PetsImages | null>
  findByPetId(petId: string): Promise<PetsImages[] | null>
}
