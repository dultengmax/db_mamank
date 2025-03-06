-- AlterTable
ALTER TABLE "Paket" ADD COLUMN     "resi" TEXT,
ALTER COLUMN "jenisPaket" DROP NOT NULL,
ALTER COLUMN "namaPengirim" DROP NOT NULL,
ALTER COLUMN "namaPenerima" DROP NOT NULL;

-- AlterTable
ALTER TABLE "travel" ADD COLUMN     "resi" TEXT,
ALTER COLUMN "status" DROP NOT NULL;
