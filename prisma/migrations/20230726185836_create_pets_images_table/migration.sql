-- CreateTable
CREATE TABLE "pets_images" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "petId" TEXT,

    CONSTRAINT "pets_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets_images" ADD CONSTRAINT "pets_images_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
