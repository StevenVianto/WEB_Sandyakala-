import { RiUserSearchFill } from "react-icons/ri";
import type { StatCard, TabsData } from "../types/dashboard";
import { FaUserClock, FaUserPlus } from "react-icons/fa6";
import { BiSolidNotepad } from "react-icons/bi";

export const lamaranTerbaru = [
  {
    id: 1,
    name: "Kathryn Murphy",
    role: "Medical Assistant",
    status: "Cek",
    date: "12 Mar",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "Ralph Edwards",
    role: "President of Sales",
    status: "Wawancara",
    date: "12 Mar",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "Devon Lane",
    role: "Nursing Assistant",
    status: "Tidak Lolos",
    date: "12 Mar",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    name: "Marvin McKinney",
    role: "Dog Trainer",
    status: "Lolos",
    date: "12 Mar",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: 5,
    name: "Dianne Russell",
    role: "Web Designer",
    status: "Lolos",
    date: "12 Mar",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    id: 6,
    name: "Savannah Nguyen",
    role: "President of Sales",
    status: "Tidak Lolos",
    date: "12 Mar",
    avatar: "https://i.pravatar.cc/150?u=6",
  },
  {
    id: 7,
    name: "Darlene Robertson",
    role: "Nursing Assistant",
    status: "Tidak Lolos",
    date: "12 Mar",
    avatar: "https://i.pravatar.cc/150?u=7",
  },
  {
    id: 8,
    name: "Ronald Richards",
    role: "Marketing Coordinator",
    status: "Lolos",
    date: "12 Mar",
    avatar: "https://i.pravatar.cc/150?u=8",
  },
];

export const jadwalWawancara = [
  {
    id: 1,
    name: "Rizky Handoko",
    role: "UI/UX Designer",
    project: "Redesign web toko",
    date: "12 Maret 2026",
  },
  {
    id: 2,
    name: "Ralph Edwards",
    role: "UI/UX Designer",
    project: "Redesign web toko",
    date: "12 Maret 2026",
  },
  {
    id: 3,
    name: "Ralph Edwards",
    role: "UI/UX Designer",
    project: "Redesign web toko",
    date: "12 Maret 2026",
  },
];

export const daftarLowongan = [
  {
    id: 1,
    role: "UI/UX Designer",
    type: "Redesign web toko - berbasis proyek",
    status: "Buka",
    date: "12 Mar",
  },
  {
    id: 2,
    role: "Kasir",
    type: "Kasir harian - berbasis shift",
    status: "Segera Tutup",
    date: "12 Mar",
  },
  {
    id: 3,
    role: "Fotografer",
    type: "Katalog produk - berbasis proyek",
    status: "Tutup",
    date: "12 Mar",
  },
  {
    id: 4,
    role: "Content Creator",
    type: "Konten video pendek - berbasis proyek",
    status: "Buka",
    date: "12 Mar",
  },
  {
    id: 5,
    role: "Customer Service",
    type: "Customer service harian - berbasis shift",
    status: "Tutup",
    date: "12 Mar",
  },
];

export const dataStatCard: StatCard = {
  rekrutmen: [
    {
      title: "Lamaran Masuk",
      value: "12",
      colorClass: "text-error",
    },
    {
      title: "Dalam Seleksi",
      value: "5",
      colorClass: "text-warning",
    },
    {
      title: "Talent Diterima",
      value: "3",
      colorClass: "text-primary",
    },
    {
      title: "Posisi Terbuka",
      value: "5",
      colorClass: "text-success",
    },
  ],
  project: [
    {
      title: "Project Aktif",
      value: "12",
      colorClass: "text-primary",
    },
    {
      title: "Perlu Review",
      value: "5",
      colorClass: "text-warning",
    },
    {
      title: "Perlu Revisi",
      value: "3",
      colorClass: "text-error",
    },
    {
      title: "Project Selesai",
      value: "5",
      colorClass: "text-success",
    },
  ],
  shift: [
    {
      title: "Shift Aktif",
      value: "12",
      colorClass: "text-primary",
    },
    {
      title: "Perlu Konfirmasi",
      value: "5",
      colorClass: "text-warning",
    },
    {
      title: "Shift Selesai",
      value: "3",
      colorClass: "text-success",
    },
    {
      title: "Total Shift",
      value: "5",
      colorClass: "text-success",
    },
  ],
};

export const tabs: TabsData[] = [
  {
    key: "rekrutmen",
    label: "Rekrutmen & Lamaran",
  },
  {
    key: "project",
    label: "Project & Task",
  },
  {
    key: "shift",
    label: "Shift Harian",
  },
];

export const dataCardBisnis = [
  {
    title: "Buat Lowongan",
    description: "Pasang posisi & mulai terima pelamar.",
    Icon: RiUserSearchFill,
    link: "/umkm/lowongan",
  },
  {
    title: "Kelola Pelamar",
    description: "Seleksi & Wawancara kandidat terbaik.",
    Icon: FaUserPlus,
    link: "/umkm/pelamar",
  },
  {
    title: "Proyek & Task",
    description: "Pantau progres proyek tim secara langsung.",
    Icon: BiSolidNotepad,
    link: "/umkm/proyek",
  },
  {
    title: "Shift Harian",
    description: "Atur jadwal & konfirmasi kehadiran",
    Icon: FaUserClock,
    link: "/umkm/proyek",
  },
];
