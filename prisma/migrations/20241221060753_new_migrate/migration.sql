-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "contact" TEXT,
    "provinsi" TEXT,
    "kota" TEXT,
    "kecamatan" TEXT,
    "kelurahan" TEXT,
    "address" TEXT,
    "OTP" TEXT,
    "role" TEXT,
    "pencarian" JSONB,
    "Status" TEXT,
    "userName" TEXT,
    "password" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Takur" (
    "id" TEXT NOT NULL,
    "UserId" TEXT,
    "transaksi" TEXT,
    "status" TEXT,
    "hewan" JSONB,
    "Class" JSONB,
    "riwayat" JSONB,
    "notivId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Takur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pesanan" (
    "id" TEXT NOT NULL,
    "nomorPesanan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "PesanId" TEXT,
    "notivId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifikasi" (
    "id" TEXT NOT NULL,
    "judulPesan" TEXT NOT NULL,
    "StatusPesan" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "statusNotiv" TEXT NOT NULL,
    "NotivId" TEXT,
    "NotivTokoId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Toko" (
    "id" TEXT NOT NULL,
    "namaToko" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "katagories" TEXT NOT NULL,
    "nomorContact" TEXT NOT NULL,
    "provinsi" TEXT,
    "kota" TEXT,
    "Kecamatan" TEXT,
    "Kelurahan" TEXT,
    "alamat" TEXT,
    "Latitude" TEXT,
    "Longitude" TEXT,
    "fotoProfile" TEXT,
    "fotoDashboard" TEXT,
    "jadwal" TEXT,
    "jamOprasional" TEXT,
    "website" TEXT,
    "instagram" TEXT,
    "star" TEXT,
    "AuthorId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Toko_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produk" (
    "id" TEXT NOT NULL,
    "namaProduk" TEXT NOT NULL,
    "detailProduk" TEXT NOT NULL,
    "hargaProduk" TEXT NOT NULL,
    "variantProduk" JSONB,
    "hargavariant" JSONB,
    "fotoProduk" JSONB,
    "video" JSONB,
    "Stok" TEXT,
    "catProduk" TEXT NOT NULL,
    "volume" TEXT,
    "berat" TEXT,
    "JenisProduk" TEXT,
    "Lokasi" TEXT,
    "diskon" TEXT,
    "toko_id" TEXT,
    "PesananId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuickChat" (
    "id" TEXT NOT NULL,
    "ulasan" TEXT NOT NULL,
    "toko_id" TEXT NOT NULL,
    "AuthorId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuickChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laporan" (
    "id" TEXT NOT NULL,
    "ulasan" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "toko_id" TEXT NOT NULL,
    "AuthorId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Laporan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UlasanProduk" (
    "id" TEXT NOT NULL,
    "ulasan" TEXT NOT NULL,
    "start" JSONB,
    "fotoUlasan" JSONB,
    "produk_id" TEXT NOT NULL,
    "AuthorId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UlasanProduk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lowongan" (
    "id" TEXT NOT NULL,
    "namaLowongan" TEXT NOT NULL,
    "namaInstansi" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "katagori" TEXT NOT NULL,
    "deskripsiLowongan" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "Salary" TEXT NOT NULL,
    "expired" TEXT NOT NULL,
    "Latitude" TEXT,
    "longitude" TEXT,
    "fotoProfile" TEXT,
    "background" TEXT,
    "nocontact" TEXT NOT NULL,
    "linkGform" TEXT,
    "user_id" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lowongan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mhq" (
    "id" TEXT NOT NULL,
    "fotoProfile" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "iklan" JSONB,

    CONSTRAINT "Mhq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hewan" (
    "id" TEXT NOT NULL,
    "gambar" JSONB,
    "lokasi" TEXT,
    "bobot" TEXT NOT NULL,
    "jenisHewan" TEXT NOT NULL,
    "Kelas" TEXT NOT NULL,
    "noReg" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "Harga" TEXT NOT NULL,
    "user_id" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hewan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PesananMhq" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "namaPembeli" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "statusQurban" TEXT NOT NULL,
    "jenisHewan" TEXT NOT NULL,
    "noReg" TEXT,
    "idHewan" TEXT NOT NULL,
    "jenisPaket" TEXT NOT NULL,
    "pengiriman" TEXT NOT NULL,
    "StatusPembelian" TEXT,
    "statusPesanan" TEXT NOT NULL,
    "statusPembayaran" TEXT,
    "buktiTransfer" TEXT NOT NULL,
    "penyembelihan" TEXT,
    "bagianDaging" TEXT,
    "dokumentasi" TEXT,
    "nofaktur" TEXT,
    "buktiditerima" TEXT,
    "Sales" TEXT,
    "user_id" TEXT,
    "notivId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PesananMhq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agenda" (
    "id" TEXT NOT NULL,
    "namaKegiatan" TEXT NOT NULL,
    "namaInstansi" TEXT NOT NULL,
    "fotoProfile" TEXT,
    "background" TEXT,
    "deskripsiKegiatan" TEXT NOT NULL,
    "jadwal" TEXT NOT NULL,
    "Jam" TEXT NOT NULL,
    "fee" TEXT,
    "kategori" TEXT NOT NULL,
    "instagram" TEXT,
    "facebook" TEXT,
    "tiktok" TEXT,
    "Latitude" TEXT,
    "longitude" TEXT,
    "kota" TEXT,
    "provinsi" TEXT,
    "status" TEXT NOT NULL,
    "kontak" TEXT NOT NULL,
    "user_id" TEXT,
    "notivId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "komunitasId" TEXT,

    CONSTRAINT "Agenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Komunitas" (
    "id" TEXT NOT NULL,
    "fotoProfile" TEXT NOT NULL,
    "dashboard" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "instagram" TEXT,
    "facebook" TEXT,
    "tiktok" TEXT,
    "lokasi" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "iklan" JSONB,
    "user_id" TEXT,

    CONSTRAINT "Komunitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Takur" ADD CONSTRAINT "Takur_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Takur" ADD CONSTRAINT "Takur_notivId_fkey" FOREIGN KEY ("notivId") REFERENCES "Notifikasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_PesanId_fkey" FOREIGN KEY ("PesanId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_notivId_fkey" FOREIGN KEY ("notivId") REFERENCES "Notifikasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_NotivId_fkey" FOREIGN KEY ("NotivId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_NotivTokoId_fkey" FOREIGN KEY ("NotivTokoId") REFERENCES "Toko"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Toko" ADD CONSTRAINT "Toko_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produk" ADD CONSTRAINT "Produk_toko_id_fkey" FOREIGN KEY ("toko_id") REFERENCES "Toko"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produk" ADD CONSTRAINT "Produk_PesananId_fkey" FOREIGN KEY ("PesananId") REFERENCES "Pesanan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickChat" ADD CONSTRAINT "QuickChat_toko_id_fkey" FOREIGN KEY ("toko_id") REFERENCES "Toko"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickChat" ADD CONSTRAINT "QuickChat_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_toko_id_fkey" FOREIGN KEY ("toko_id") REFERENCES "Toko"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laporan" ADD CONSTRAINT "Laporan_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UlasanProduk" ADD CONSTRAINT "UlasanProduk_produk_id_fkey" FOREIGN KEY ("produk_id") REFERENCES "Produk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UlasanProduk" ADD CONSTRAINT "UlasanProduk_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lowongan" ADD CONSTRAINT "Lowongan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hewan" ADD CONSTRAINT "Hewan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Mhq"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PesananMhq" ADD CONSTRAINT "PesananMhq_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Mhq"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PesananMhq" ADD CONSTRAINT "PesananMhq_notivId_fkey" FOREIGN KEY ("notivId") REFERENCES "Notifikasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_notivId_fkey" FOREIGN KEY ("notivId") REFERENCES "Notifikasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_komunitasId_fkey" FOREIGN KEY ("komunitasId") REFERENCES "Komunitas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komunitas" ADD CONSTRAINT "Komunitas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
