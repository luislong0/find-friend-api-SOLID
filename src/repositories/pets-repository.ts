import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCity(query: string, page: number): Promise<Pet[]>
  findByCharacteristic(query: string, page: number): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
