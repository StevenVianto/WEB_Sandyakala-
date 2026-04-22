import { FaCircleCheck } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import type { IconType } from "react-icons";

export type ColorVariant = "blue" | "green" | "yellow" | "red";

export type StatCardData = {
  variant: ColorVariant;
  title: string;
  value: number;
  description: string;
};

export const dataStatCard: StatCardData[] = [
  {
    variant: "blue",
    title: "Total Pengguna",
    value: 5,
    description: "+8 dari bulan lalu",
  },
  {
    variant: "green",
    title: "UMKM Aktif",
    value: 2,
    description: "+5 dari bulan lalu",
  },
  {
    variant: "yellow",
    title: "Antrian Verifikasi",
    value: 2,
    description: "Terlama : 4 hari",
  },
  {
    variant: "red",
    title: "Laporan Aktif",
    value: 2,
    description: "Laporan perlu ditinjau",
  },
];

export type PopularUmkmData = {
  category: string;
  count: number;
  color: string;
};

export const dataPopularUmkm: PopularUmkmData[] = [
  { category: "Kuliner", count: 5, color: "bg-blue-700" },
  { category: "Fashion", count: 3, color: "bg-yellow-700" },
  { category: "Kesehatan", count: 3, color: "bg-green-700" },
  { category: "Teknologi", count: 3, color: "bg-red-700" },
  { category: "Kerajinan", count: 3, color: "bg-stone-700" },
];

export type ActionVariant = "info" | "error";

export type ActionCardData = {
  title: string;
  description: string;
  icon: IconType;
  to: string;
  variant?: ActionVariant;
  iconStyle?: string;
};

export const dataActionCard: ActionCardData[] = [
  {
    title: "Review Pengajuan",
    description: "3 Laporan aktif",
    icon: FaCircleCheck,
    to: "/admin/verifikasi",
    variant: "info",
    iconStyle: "h-10 w-10 fill-secondary",
  },
  {
    title: "Tindakan Laporan",
    description: "3 Laporan aktif",
    icon: IoIosWarning,
    to: "/admin/laporan",
    variant: "error",
    iconStyle: "h-10 w-10 fill-error",
  },
];

export const dataStatCardReport: StatCardData[] = [
  {
    variant: "red",
    title: "Total Laporan Masuk",
    value: 2,
    description: "+3 laporan baru minggu lalu",
  },
  {
    variant: "yellow",
    title: "Sedang diproses",
    value: 2,
    description: "Rata-rata 2 penyelesaian",
  },
  {
    variant: "blue",
    title: "Laporan Selesai",
    value: 2,
    description: "75% tingkat penyelesaian",
  },
];

export type DataTable = {
  id: string;
  namaUsaha: string;
  kategoriPelanggaran: string;
  alasanPelaporan: string;
  status: string;
  slug: string;
  variantStatus: "error" | "warning" | "success";
};

export const dataTableReport: DataTable[] = [
  {
    id: "RPT-001",
    namaUsaha: "Sambal Bakar Nusantara",
    kategoriPelanggaran: "Penipuan",
    alasanPelaporan:
      "Pemilik usaha melakukan tindakan penipuan dengan memberikan informasi yang menyesatkan dan berusaha memperoleh keuntungan secara tidak sah.",
    status: "Verifikasi",
    slug: "sambal-bakar-nusantara",
    variantStatus: "error",
  },
  {
    id: "RPT-002",
    namaUsaha: "Cendol Jaya",
    kategoriPelanggaran: "Data Palsu",
    alasanPelaporan:
      "Pemilik usaha mengunggah atau menggunakan data palsu yang tidak sesuai dengan fakta, sehingga berpotensi merugikan pihak lain.",
    status: "Tolak",
    slug: "cendol-jaya",
    variantStatus: "warning",
  },
];

export const dataStatCardVerification: StatCardData[] = [
  {
    variant: "blue",
    title: "Total Pengajuan",
    value: 2,
    description: "+3 hari ini",
  },
  {
    variant: "yellow",
    title: "Menunggu Persetujuan",
    value: 2,
    description: "+3 hari ini",
  },
  {
    variant: "green",
    title: "Terverifikasi",
    value: 2,
    description: "+3 hari ini",
  },
  {
    variant: "red",
    title: "Ditolak",
    value: 2,
    description: "+3 hari ini",
  },
];
