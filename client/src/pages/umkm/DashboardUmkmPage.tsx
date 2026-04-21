import DashboardUmkmLayout from "@/components/layouts/DashboardUmkmLayout";
import { cn } from "@/lib/utils";
import BgImgDashboard from "@/assets/images/Bg Img Dashboard Umkm.png";
import { Link } from "react-router";

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
  return (
    <DashboardUmkmLayout>
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
                <button
                  className={cn(
                    "md:px-5 px-3.5 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-base transition-all",
                    "bg-white text-mint-300", // State Aktif
                  )}
                >
                  Rekrutmen & Lamaran
                </button>
                <button
                  className={cn(
                    "md:px-5 px-3.5 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-base transition-all",
                    "border border-white/80 text-white hover:bg-white/20 hover:border-white", // State Inaktif
                  )}
                >
                  Project & Task
                </button>
                <button
                  className={cn(
                    "md:px-5 px-3.5 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-base transition-all",
                    "border border-white/80 text-white hover:bg-white/20 hover:border-white", // State Inaktif
                  )}
                >
                  Shift Harian
                </button>
              </div>

              <Link
                to={"/umkm/dashboard"}
                className="md:px-5 px-3.5 py-1.5 md:py-2.5 rounded-full bg-white text-mint font-medium text-xs md:text-sm shadow-md hover:bg-gray-50 transition-colors w-fit"
              >
                Seleksi Pelamar
              </Link>
            </div>

            <div className="md:mt-10 mt-5">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Status Lamaran Saat Ini
              </h2>
              <p className="text-gray-200 text-sm font-medium">
                Pantau rekrutmen dan seleksi talenta usahamu
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-20 container mx-auto px-4 md:px-8 md:-mt-19 -mt-15 sm:-mt-20 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <StatCard
              title="Lamaran Masuk"
              value="12"
              colorClass="text-error"
            />
            <StatCard
              title="Dalam Seleksi"
              value="5"
              colorClass="text-warning"
            />
            <StatCard
              title="Talent Diterima"
              value="3"
              colorClass="text-primary"
            />
            <StatCard
              title="Posisi Terbuka"
              value="5"
              colorClass="text-success"
            />
          </div>
        </div>
      </section>

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
    </DashboardUmkmLayout>
  );
}
