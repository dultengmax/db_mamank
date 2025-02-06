/*
  Warnings:

  - Added the required column `namaKomunitas` to the `Komunitas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Komunitas" ADD COLUMN     "namaKomunitas" TEXT NOT NULL,
ALTER COLUMN "fotoProfile" DROP NOT NULL,
ALTER COLUMN "dashboard" DROP NOT NULL;
