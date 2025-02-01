import { Lowongan } from '@prisma/client';

export class stateLowongan {
  namaLowongan: string;
  namaInstansi: string;
  provinsi: string;
  kota: string;
  katagori: string;
  deskripsiLowongan: string;
  requirement: string;
  Salary: string;
  expired: string;
  Latitude: string;
  longitude: string;
  fotoProfile: string;
  background: string;
  nocontact: string;
  linkGform: string;
  userId: string;
}

export const DataLowongan = async (data: Lowongan): Promise<stateLowongan> => {
  return {
    namaLowongan: data.namaLowongan,
    namaInstansi: data.namaInstansi,
    provinsi: data.provinsi,
    kota: data.kota,
    katagori: data.katagori,
    expired: data.expired,
    deskripsiLowongan: data.deskripsiLowongan,
    requirement: data.requirement,
    Salary: data.Salary,
    nocontact: data.nocontact,
    linkGform: data.linkGform,
    fotoProfile: data.fotoProfile,
    background: data.background,
    userId: data.userId,
    Latitude: data.Latitude,
    longitude: data.longitude,
    // id: data.id,
    // CreateDateAt: data.CreateDateAt,
    // UpdatedAt: data.UpdatedAt,
  };
};
