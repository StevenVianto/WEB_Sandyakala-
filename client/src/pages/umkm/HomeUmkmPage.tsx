import { Link, NavLink } from "react-router-dom";
import ImgHero from "@/assets/images/Bg Image Home UMKM.png";
import { RiUserSearchFill } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import type { IconType } from "react-icons";
import { BiSolidNotepad } from "react-icons/bi";
import { FaUserClock, FaUserPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import DashboardUmkmLayout from "@/components/layouts/DashboardUmkmLayout";

const dataCardBisnis = [
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

interface CardBisnisProps {
  title: string;
  description: string;
  Icon: IconType;
  link: string;
}

const CardBisnis = ({ title, description, Icon, link }: CardBisnisProps) => {
  return (
    <div className="flex flex-col py-2.5 px-4 rounded-xl bg-white shadow-md">
      <div className="bg-mint-100/50 rounded-lg p-3 w-max">
        <Icon className="h-10 w-10 fill-mint" />
      </div>
      <div className="my-4">
        <h5 className="mb-1.5 text-xl font-extrabold">{title}</h5>
        <p className="text-base text-slate-600">{description}</p>
      </div>
      <Link to={link} className="w-full flex justify-end">
        <IoIosArrowRoundForward className="h-10 w-10  fill-mint" />
      </Link>
    </div>
  );
};

const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h5 className="uppercase font-semibold text-xs text-mint-200 mb-1.5">
        {title}
      </h5>
      <h3 className="font-extrabold text-xl">{description}</h3>
    </div>
  );
};

export default function HomeUmkmPage() {
  return (
    <DashboardUmkmLayout>
      <section
        className="bg-cover bg-center flex items-center min-h-screen relative pt-20"
        style={{ backgroundImage: `url(${ImgHero})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <h1 className="text-2xl md:text-4xl xl:text-5xl font-extrabold mb-4 text-white leading-tight">
              Tumbuh Bersama Talenta Muda Hebat Indonesia
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-100 mb-6 leading-relaxed">
              Berikan kesempatan proyek nyata bagi first-jobber, dan dapatkan
              bantuan operasional yang efisien untuk memajukan bisnis mikro
              Anda. Jangan khawatir, kolaborasi pasti aman dan progres dapat
              dipantau.
            </p>
            <NavLink
              to="/umkm/dashboard"
              className="px-4.5 py-1.5 md:px-6 md:py-3 text-sm md:text-base inline-block bg-white rounded-full text-mint font-bold shadow-lg hover:bg-mint-200 hover:text-white transition-all"
            >
              Mulai Kolaborasi
            </NavLink>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <Header title="Akses Cepat" description="Kelola Bisnis Anda" />

        <div className="my-7 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {dataCardBisnis.map((item) => (
            <CardBisnis
              key={item.title}
              title={item.title}
              description={item.description}
              Icon={item.Icon}
              link={item.link}
            />
          ))}
        </div>
      </section>

      <section className="container py-10">
        <div className="flex items-center justify-between">
          <Header title="Tim Pekerja" description="Pekerja Aktif" />
          <Link
            to="/umkm/pekerja"
            className="border-mint hover:bg-mint-200 hover:text-mint-300 transition-all duration-100 border rounded-md px-4 py-2 text-mint text-sm font-semibold"
          >
            Lihat Selengkapnya
          </Link>
        </div>

        <div className="grid my-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="p-4 shadow-md flex flex-col rounded-xl bg-white"
            >
              <div className="flex gap-3 items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src="https://i.pravatar.cc/150?img=11"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.3">
                  <h4 className="font-extrabold text-lg">Rizky Handoko</h4>
                  <p className="text-gray-400">UI/UX Designer</p>
                </div>
              </div>
              <Button
                className="bg-mint-100 text-info-300 hover:text-white w-max font-bold mt-5 px-6 py-1"
                size={"sm"}
              >
                Berbasis Proyek
              </Button>

              <div className="flex justify-between items-center mb-5 mt-9">
                <p className="text-sm text-gray-400">Bergabung 1 Maret 2026</p>

                <Link
                  to={"/umkm/pekerja"}
                  className="p-2 border border-mint text-mint font-semibold text-xs rounded-md hover:bg-mint-200 transition-all duration-100 hover:text-mint-300"
                >
                  Profil Pekerja
                </Link>
              </div>
            </div>
          ))}
          <Link
            to={"/umkm/home"}
            className="border border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 gap-7"
          >
            <div className="h-18 w-18 rounded-full bg-mint-100 flex justify-center items-center">
              <FiPlus className="w-10 h-10 text-mint" />
            </div>
            <div className="space-y-1 text-center">
              <h4 className="text-xl font-extrabold">Tambah Pekerja</h4>
              <p className="text-xs text-gray-500">
                Seleksi Pelamar yang Melamar di UMKM Anda
              </p>
            </div>
          </Link>
        </div>
      </section>
    </DashboardUmkmLayout>
  );
}
