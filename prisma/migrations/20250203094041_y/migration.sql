/*
  Warnings:

  - Added the required column `produk_id` to the `Laporan` table without a default value. This is not possible if the table is not empty.
  - Made the column `provinsi` on table `Toko` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kota` on table `Toko` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Kecamatan` on table `Toko` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Kelurahan` on table `Toko` required. This step will fail if there are existing NULL values in that column.
  - Made the column `alamat` on table `Toko` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Latitude` on table `Toko` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Longitude` on table `Toko` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Laporan" ADD COLUMN     "AgendaId" TEXT,
ADD COLUMN     "produk_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Toko" ALTER COLUMN "provinsi" SET NOT NULL,
ALTER COLUMN "kota" SET NOT NULL,
ALTER COLUMN "Kecamatan" SET NOT NULL,
ALTER COLUMN "Kelurahan" SET NOT NULL,
ALTER COLUMN "alamat" SET NOT NULL,
ALTER COLUMN "Latitude" SET NOT NULL,
ALTER COLUMN "Longitude" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_AgendaId_fkey" FOREIGN KEY ("AgendaId") REFERENCES "Agenda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
