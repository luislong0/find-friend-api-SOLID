/*
  Warnings:

  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independenceLevel` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "independenceLevel" "Size" NOT NULL;

-- CreateTable
CREATE TABLE "adoption_requirements" (
    "id" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "petId" TEXT,

    CONSTRAINT "adoption_requirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
