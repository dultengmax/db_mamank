export class StatePayment {
  order_id: string;
  gross_amount: number;
  item_id: string[];
  price: number;
  quantity: string;
  nameProduk: string;
  toko: string;
  catProduk: string;
  kategori: string;
  url: string;
}

export class StateTravel {
  from: string;
  to: string;
  mapfrom: string;
  mapto: string;
  cityf: string;
  cityt: string;
  jadwal: string;
  pay: string;
  jam: string;
  image: string;
  status: string;
  namaPenumpang: string;
  jenisTravel: string;
  volume: string;
  nomorPengirim: string;
  harga: string;
}

export class StatePaket {
  isipaket: string;
  from: string;
  to: string;
  berat: string;
  volume: string;
  jenisPaket: string;
  cityf: string;
  cityt: string;
  jadwal: string;
  pay: string;
  jam: string;
  nomorPengirim: string;
  nomorPenerima: string;
  harga: string;
  fotoPaket: string;
}
