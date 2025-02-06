/*
  Warnings:

  - Made the column `start` on table `UlasanProduk` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UlasanProduk" ALTER COLUMN "start" SET NOT NULL,
ALTER COLUMN "start" SET DATA TYPE TEXT;
