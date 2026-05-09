import { dataDummy, mockLowongan, mockWawancara } from "../constants/mock-data";

// Tabel Lamaran Masuk 
export const getPelamarWithLowongan = () => {
  return dataDummy.map((pelamar) => {
    const lowongan = mockLowongan.find((l) => l.id === pelamar.lowongan_id);
    return {
      ...pelamar,
      posisi_lowongan: lowongan?.posisi_lowongan ?? "-",
      tipe_lowongan: lowongan?.tipe_lowongan ?? "-",
    };
  });
};

// Tabel Dalam Seleksi 
export const getWawancaraWithDetail = () => {
  return mockWawancara.map((wawancara) => {
    const pelamar = dataDummy.find((p) => p.id === wawancara.pelamar_id);
    const lowongan = mockLowongan.find((l) => l.id === pelamar?.lowongan_id);
    return {
      ...wawancara,
      nama_pelamar: pelamar?.nama_pelamar ?? "-",
      pendidikan_terakhir_pelamar: pelamar?.pendidikan_terakhir_pelamar ?? "-",
      kontak_pelamar: pelamar?.kontak_pelamar ?? "-",
      posisi_lowongan: lowongan?.posisi_lowongan ?? "-",
    };
  });
};

// Tabel Posisi Terbuka
export const getLowonganWithCount = () => {
  return mockLowongan.map((lowongan) => {
    const jumlahPelamar = dataDummy.filter(
      (p) => p.lowongan_id === lowongan.id
    ).length;
    return {
      ...lowongan,
      jumlah_pelamar: jumlahPelamar, 
    };
  });
};