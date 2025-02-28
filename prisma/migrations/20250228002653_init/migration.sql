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
CREATE TABLE "Pesanan" (
    "id" TEXT NOT NULL,
    "nomorPesanan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "jenispesanan" TEXT NOT NULL,
    "harga" TEXT NOT NULL,
    "PesanId" TEXT,
    "notivId" TEXT,
    "paketId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "travelId" TEXT,

    CONSTRAINT "Pesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carousel" (
    "id" TEXT NOT NULL,
    "carousel" JSONB,
    "promo" JSONB,
    "AuthorId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carousel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimony" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "pengalaman" TEXT,
    "star" TEXT NOT NULL,
    "AuthorId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimony_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifikasi" (
    "id" TEXT NOT NULL,
    "judulPesan" TEXT NOT NULL,
    "StatusPesan" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "statusNotiv" TEXT NOT NULL,
    "NotivId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "ruteId" TEXT,

    CONSTRAINT "Notifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paket" (
    "id" TEXT NOT NULL,
    "isipaket" TEXT NOT NULL,
    "from" TEXT,
    "fotoPaket" TEXT,
    "fotoPenerima" TEXT,
    "to" TEXT,
    "cityf" TEXT NOT NULL,
    "cityt" TEXT NOT NULL,
    "jadwal" TEXT NOT NULL,
    "pay" TEXT NOT NULL,
    "jam" TEXT NOT NULL,
    "berat" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "jenisPaket" TEXT NOT NULL,
    "namaPengirim" TEXT NOT NULL,
    "namaPenerima" TEXT NOT NULL,
    "nomorPengirim" TEXT NOT NULL,
    "nomorPenerima" TEXT NOT NULL,
    "harga" TEXT NOT NULL,
    "AuthorId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travel" (
    "id" TEXT NOT NULL,
    "from" TEXT,
    "to" TEXT,
    "mapfrom" TEXT NOT NULL,
    "cityf" TEXT NOT NULL,
    "cityt" TEXT NOT NULL,
    "mapto" TEXT NOT NULL,
    "jadwal" TEXT NOT NULL,
    "jam" TEXT NOT NULL,
    "pay" TEXT NOT NULL,
    "image" TEXT,
    "status" TEXT NOT NULL,
    "namaPenumpang" TEXT NOT NULL,
    "jenisTravel" TEXT NOT NULL,
    "nomorPengirim" TEXT NOT NULL,
    "harga" TEXT NOT NULL,
    "AuthorId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rute" (
    "id" TEXT NOT NULL,
    "From" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "image" TEXT,
    "provinsi" TEXT,
    "kota" TEXT,
    "Kecamatan" TEXT,
    "Kelurahan" TEXT,
    "alamat" TEXT NOT NULL,
    "Latitude" TEXT,
    "Longitude" TEXT,
    "jadwal" TEXT,
    "jamOprasional" TEXT,
    "harga" TEXT,
    "AuthorId" TEXT,
    "CreateDateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rute_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_contact_key" ON "User"("contact");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_PesanId_fkey" FOREIGN KEY ("PesanId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_notivId_fkey" FOREIGN KEY ("notivId") REFERENCES "Notifikasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_paketId_fkey" FOREIGN KEY ("paketId") REFERENCES "Paket"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "travel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carousel" ADD CONSTRAINT "Carousel_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimony" ADD CONSTRAINT "Testimony_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_NotivId_fkey" FOREIGN KEY ("NotivId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifikasi" ADD CONSTRAINT "Notifikasi_ruteId_fkey" FOREIGN KEY ("ruteId") REFERENCES "Rute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paket" ADD CONSTRAINT "Paket_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("contact") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travel" ADD CONSTRAINT "travel_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("contact") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rute" ADD CONSTRAINT "Rute_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_notivId_fkey" FOREIGN KEY ("notivId") REFERENCES "Notifikasi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
