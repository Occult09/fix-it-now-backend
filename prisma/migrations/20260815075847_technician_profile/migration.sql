/*
  Warnings:

  - You are about to drop the column `isAvaiable` on the `technicianProfiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "technicianProfiles" DROP COLUMN "isAvaiable",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;
