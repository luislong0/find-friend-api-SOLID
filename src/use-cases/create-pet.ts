import { AdoptionRequirementsRepository } from '@/repositories/adoptionRequirements-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetsImagesRepository } from '@/repositories/petsImages-repository'
import { Pet, Size } from '@prisma/client'

interface PetsInformation {
  id?: string
  name: string
  bio: string | null
  gender: string
  breed: string
  age: string
  size: Size
  independenceLevel: Size
  energy: number
  environment: Size
  organizationId?: string | null
}

interface AdoptionRequirements {
  id?: String
  details: String
  petId?: string | null
}

interface PetsImages {
  id?: String
  imageUrl: String
  petId?: string | null
}

interface CreatePetUseCaseRequest {
  pet: PetsInformation
  adoptionRequirements?: AdoptionRequirements[]
  petsImages?: PetsImages[] // Esta propriedade está definida aqui
}

interface CreatePetUseCaseResponse {
  petData: Pet
  adoptionRequirementsData: AdoptionRequirements[] | null
  petImagesData?: PetsImages[] | null
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private adoptionsRequirementsRepository: AdoptionRequirementsRepository,
    private petsImagesRepository: PetsImagesRepository,
  ) {}

  async execute({
    pet,
    adoptionRequirements,
    petsImages,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    console.log('PETSIMAGES IN USE CASE: ' + JSON.stringify(petsImages))

    const petData = await this.petsRepository.create({
      age: pet.age,
      bio: pet.bio,
      breed: pet.breed,
      energy: pet.energy,
      environment: pet.environment,
      gender: pet.gender,
      id: pet.id,
      independenceLevel: pet.independenceLevel,
      name: pet.name,
      organizationId: pet.organizationId,
      size: pet.size,
    })

    if (adoptionRequirements) {
      adoptionRequirements.forEach(async (adoptionRequirement) => {
        await this.adoptionsRequirementsRepository.create({
          id: adoptionRequirement.id?.toString(),
          details: adoptionRequirement.details.toString(),
          petId: petData.id,
        })
      })
    }

    if (petsImages) {
      petsImages.forEach(async (petsImage: PetsImages) => {
        await this.petsImagesRepository.create({
          id: petsImage.id?.toString(),
          imageUrl: petsImage.imageUrl.toString(),
          petId: petData.id,
        })
      })
    }

    const adoptionRequirementsData =
      await this.adoptionsRequirementsRepository.findByPetId(petData.id)

    const petImagesData = await this.petsImagesRepository.findByPetId(
      petData.id,
    )

    return {
      petData,
      adoptionRequirementsData: adoptionRequirementsData || null,
      petImagesData: petImagesData || null,
    }
  }
}
