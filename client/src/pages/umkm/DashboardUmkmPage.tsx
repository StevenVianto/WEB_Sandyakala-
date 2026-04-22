import DashboardUmkmLayout from "@/components/layouts/DashboardUmkmLayout";
import { cn } from "@/lib/utils";
import BgImgDashboard from "@/assets/images/Bg Img Dashboard Umkm.png";
import { Link } from "react-router";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  title: string;
  value: number | string;
  colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, colorClass }) => {
  return (
    <div className="bg-white rounded-xl shadow md:shadow-xl border border-gray-100 p-6 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
      <h3 className={cn("text-sm font-medium mb-3", colorClass)}>{title}</h3>
      <span className={cn("text-4xl md:text-5xl font-bold", colorClass)}>
        {value}
      </span>
    </div>
  );
};

// Mock data lamaran
const lamaranTerbaru = [
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

const jadwalWawancara = [
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

const daftarLowongan = [
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

// Helper func for color badge
const getBadgeStyle = (status: string) => {
  switch (status) {
    case "Cek":
      return "bg-success text-white border-transparent";
    case "Wawancara":
      return "bg-info-100 text-primary-dark border border-primary-dark";
    case "Lolos":
    case "Buka":
      return "bg-white text-green-600 border-green-600";
    case "Tidak Lolos":
    case "Tutup":
      return "bg-white text-red-500 border-red-400";
    case "Segera Tutup":
      return "bg-white text-warning-200 border-warning-200";
    default:
      return "bg-gray-100 text-gray-600 border-transparent";
  }
};

export default function DashboardUmkmPage() {
  const [activeTab, setActiveTab] = useState<"rekrutmen" | "project" | "shift">(
    "rekrutmen",
  );

  return (
    <DashboardUmkmLayout>
      <HeroSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        description="Pantau rekrutmen dan seleksi talenta usahamu"
        isShowButtonRight={true}
        statCardData={dataStatCard.rekrutmen}
      />

      {activeTab === "rekrutmen" && <TabRekrutmen />}
      {activeTab === "project" && <TabProject />}
      {activeTab === "shift" && <TabShift />}
    </DashboardUmkmLayout>
  );
}

type StatCardData = {
  title: string;
  value: number | string;
  colorClass: string;
};

type StatCard = {
  rekrutmen: StatCardData[];
  project: StatCardData[];
  shift: StatCardData[];
};

const dataStatCard: StatCard = {
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

interface HeroSectionProps {
  title?: string;
  description: string;
  isShowTitleDescription?: boolean;
  isShowButtonRight?: boolean;
  statCardData: StatCardData[];
  activeTab: "rekrutmen" | "project" | "shift";
  setActiveTab: (tab: "rekrutmen" | "project" | "shift") => void;
}

const HeroSection = ({
  title = "Status Lamaran Saat Ini",
  description,
  isShowTitleDescription = true,
  isShowButtonRight = false,
  statCardData,
  setActiveTab,
  activeTab,
}: HeroSectionProps) => {
  type TabsType = {
    key: "rekrutmen" | "project" | "shift";
    label: string;
  };

  const tabs: TabsType[] = [
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

  return (
    <section className="w-full min-h-screen pt-7 md:pt-12 bg-white">
      <div
        className="relative bg-cover bg-center h-87.5 w-full"
        style={{ backgroundImage: `url(${BgImgDashboard})` }}
      >
        {/* Overlay Gelap */}
        {/* <div className="absolute inset-0 bg-black/50"></div> */}

        <div className="relative z-10 container px-4 md:px-8 pt-18 h-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
            <div className="flex flex-wrap gap-3">
              {tabs.map((tab) => (
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "md:px-5 px-3.5 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-base transition-all",
                    activeTab === tab.key
                      ? "bg-white text-mint-300" // State Aktif
                      : "border border-white/80 text-white hover:bg-white/20 hover:border-white", // State Inaktif
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {isShowButtonRight && (
              <Link
                to={"/umkm/dashboard"}
                className="md:px-5 px-3.5 py-1.5 md:py-2.5 rounded-full bg-white text-mint font-medium text-xs md:text-sm shadow-md hover:bg-gray-50 transition-colors w-fit"
              >
                Seleksi Pelamar
              </Link>
            )}
          </div>

          <div className="md:mt-10 mt-5">
            {isShowTitleDescription ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {title}
                </h2>
                <p className="text-gray-200 text-sm font-medium">
                  {description}
                </p>
              </>
            ) : (
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Quidem, harum.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-8 md:-mt-19 -mt-15 sm:-mt-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statCardData.map((card) => (
            <StatCard
              title={card.title}
              value={card.value}
              colorClass={card.colorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TabRekrutmen = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm md:text-lg font-bold text-primary-dark">
                Lamaran Terbaru
              </h2>
              <Link
                to={"/umkm/dashboard"}
                className="px-3 py-1 md:py-1.5 rounded-xl border border-mint text-mint text-xs md:text-sm font-semibold hover:bg-mint-100 transition-colors"
              >
                Seleksi Pelamar
              </Link>
            </div>

            <div className="flex flex-col">
              {lamaranTerbaru.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <h3 className="font-medium text-black text-xs md:text-base">
                        {item.name}
                      </h3>
                      <p className="text-gray-700 text-xs md:text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={cn(
                        "px-3 md:px-6 py-1 rounded-full text-[11px] md:text-xs font-semibold border",
                        getBadgeStyle(item.status),
                      )}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm md:text-lg font-bold text-primary-dark">
                Jadwal Wawancara
              </h2>
              <button className="px-3 py-1 md:py-1.5 rounded-xl border border-mint text-mint text-xs md:text-sm font-semibold hover:bg-mint-100 transition-colors">
                Lihat Wawancara
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {jadwalWawancara.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-100 rounded-xl py-4 px-6 flex justify-between items-center border border-gray-50"
                >
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs md:text-base">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-xs">{item.role}</p>
                    <p className="text-gray-400 text-xs">{item.project}</p>
                  </div>
                  <span className="bg-red-200 text-red-600 px-3 py-1 rounded-full text-xs font-base">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm md:text-lg font-bold text-primary-dark">
                Daftar Lowongan
              </h2>
              <button className="px-3 py-1 md:py-1.5 rounded-xl border border-mint text-mint text-xs md:text-sm font-semibold hover:bg-mint-100 transition-colors">
                Lihat Lowongan
              </button>
            </div>

            <div className="flex flex-col">
              {daftarLowongan.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-4 border-b border-gray-800 last:border-0"
                >
                  <div>
                    <h3 className="font-bold text-black text-xs md:text-base">
                      {item.role}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-xs mt-0.5">
                      {item.type}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className={cn(
                        "px-4 py-1 rounded-full text-[11px] md:text-xs font-semibold border",
                        getBadgeStyle(item.status),
                      )}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className }) => {
  const validPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className={cn("w-full items-center flex gap-7", className)}>
      <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${validPercentage}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 mb-5">
        {validPercentage}%
      </span>
    </div>
  );
};

const TabProject = () => {
  return (
    <section className="container pb-10">
      <div className="flex gap-2 mb-8">
        <Link
          to="/umkm/dashboard"
          className="flex items-center gap-2 px-4 py-2.5 border hover:bg-mint-200 transition-all duration-100 hover:text-white cursor-pointer border-mint text-mint bg-mint-200/50 text-sm rounded-md"
        >
          <FaPlus className=" text-xl" /> Tambah Project
        </Link>
        <Link
          to="/umkm/projects"
          className="px-4 text-mint py-2.5 border hover:bg-mint-200/50 border-mint cursor-pointer text-sm rounded-md"
        >
          Lihat Project
        </Link>
      </div>

      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-xl">Proyek Terbaru</h2>
        <Link
          to={"/umkm/projects"}
          className="text-xs text-mint font-medium hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="rounded-md space-y-3 border p-7 bg-white shadow-md mb-7">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="rounded-md shadow-md px-6 pt-3.5 bg-neutral-100"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">
                    Redesign Website Toko
                  </h3>
                  <p className="tetx-xs text-gray-400">
                    UI/UX Designer - 7/11 task deadline 28 Maret 2026
                  </p>
                </div>
                <Badge variant={"warning"} size={"sm"}>
                  Review
                </Badge>
              </div>
              <ProgressBar percentage={70} />
            </div>
          ))}
      </div>

      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-xl">Task Aktif</h2>
        <Link
          to={"/umkm/projects"}
          className="text-xs text-mint font-medium hover:underline"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="rounded-md space-y-3 border p-7 bg-white shadow-md mb-7">
        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 text-sm bg-mint rounded-full text-white">
            Semua
          </button>
          <button className="px-4 py-2 text-sm border border-mint rounded-full">
            Draft
          </button>
          <button className="px-4 py-2 text-sm border border-mint rounded-full">
            Review
          </button>
          <button className="px-4 py-2 text-sm border border-mint rounded-full">
            Revisi
          </button>
          <button className="px-4 py-2 text-sm border border-mint rounded-full">
            Selesai
          </button>
        </div>

        <div className="space-y-2">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="font-medium text-lg">
                      Wireframe Halaman Utama
                    </h3>
                    <p className="text-xs text-gray-500">
                      Rizki Handoko - Redesign Web Toko
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Badge
                      variant={"error"}
                      size={"sm"}
                      className="py-2 px-5 bg-white"
                    >
                      28-03-2026
                    </Badge>
                    <Badge variant={"info"} size={"sm"} className="py-2 px-5">
                      Draft
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

const TabShift = () => {
  return (
    <section className="container pb-10">
      <div className="flex gap-2 mb-8">
        <Link
          to="/umkm/dashboard"
          className="flex items-center gap-2 px-4 py-2.5 border hover:bg-mint-200 transition-all duration-100 hover:text-white cursor-pointer border-mint text-mint bg-mint-200/50 text-sm rounded-md"
        >
          <FaPlus className=" text-xl" /> Tambah Shift
        </Link>
        <Link
          to="/umkm/projects"
          className="px-4 text-mint py-2.5 border hover:bg-mint-200/50 border-mint cursor-pointer text-sm rounded-md"
        >
          Lihat Shift
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Status Pekerjaan Hari Ini</h2>
            <Link
              to={"/umkm/projects"}
              className="text-xs text-mint font-medium hover:underline"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="rounded-md space-y-3 border p-7 bg-white shadow-md mb-7">
            <div className="flex flex-col">
              {lamaranTerbaru.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <h3 className="font-medium text-black text-xs md:text-base">
                        {item.name}
                      </h3>
                      <p className="text-gray-700 text-xs md:text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={cn(
                        "px-3 md:px-6 py-1 rounded-full text-[11px] md:text-xs font-semibold border",
                        getBadgeStyle(item.status),
                      )}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Perlu Konfirmasi</h2>
            <Link
              to={"/umkm/projects"}
              className="text-xs text-mint font-medium hover:underline"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="rounded-md space-y-3 border p-7 bg-white shadow-md mb-7">
            <div className="flex flex-col">
              {lamaranTerbaru.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <h3 className="font-medium text-black text-xs md:text-base">
                        {item.name}
                      </h3>
                      <p className="text-gray-700 text-xs md:text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={cn(
                        "px-3 md:px-6 py-1 rounded-full text-[11px] md:text-xs font-semibold border",
                        getBadgeStyle(item.status),
                      )}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
