import DashboardLayout from "@/shared/layouts/DashboardLayout";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { SearchInput } from "@/shared/components/ui/search-input";
import { StatCard } from "@/shared/components/ui/stat-card";
import { Link } from "react-router-dom";
import { dataStatCardVerification } from "@/features/admin/constants/data-dashboard";

const dataCta = [
  {
    title: "Menunggu",
  },
  {
    title: "Terverifikasi",
  },
  {
    title: "Ditolak",
  },
];

export default function VerificationFg() {
  return (
    <DashboardLayout
      title="Verifikasi Akun Fresh Graduate"
      description="Kelola dan verifikasi pengajuan akun baru"
    >
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 mb-4">
        {dataStatCardVerification.map((item, index) => (
          <StatCard
            key={index}
            variant={item.variant}
            title={item.title}
            value={item.value}
            description={item.description}
          />
        ))}
      </div>

      <div className="my-8">
        <h1 className="text-xl font-semibold">Daftar Pengajuan Akun</h1>
        <p className="text-sm text-gray-500">
          Klik baris untuk melihat detail.
        </p>
      </div>

      <div className="flex flex-col md:flex-row lg:items-center lg:justify-between gap-4 mb-7">
        <div className="relative w-full md:max-w-xl lg:max-w-md">
          <SearchInput placeholder="Cari nama atau perusahaan...." />
        </div>

        <div className="flex gap-3">
          <Button className="rounded-full font-semibold" size={"sm"}>
            Semua
          </Button>
          {dataCta.map((item, index) => (
            <Button
              key={index}
              variant={"soft"}
              className="rounded-full font-semibold border border-info-200"
              size={"sm"}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>

      <div className=" rounded-lg overflow-x-scroll md:overflow-x-hidden overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-100 text-sm overflow-hidden">
            <tr>
              <th className="table-head">No</th>
              <th className="table-head">Nama Lengkap</th>
              <th className="table-head">No Hp</th>
              <th className="table-head">Pendidikan Terakhir</th>
              <th className="table-head">Status</th>
              <th className="table-head">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            <tr className="bg-white">
              <td className="table-data">1</td>
              <td className="table-data">Kathryn Murphy</td>
              <td className="table-data">08123456789</td>
              <td className="table-data">S1 Desain Komunikasi Visual</td>
              <td className="table-data">
                <Badge
                  size={"sm"}
                  variant={"primary"}
                  className="border-none text-black "
                >
                  Verifikasi
                </Badge>
              </td>
              <td className="table-data ">
                <Link
                  to={"/admin/verifikasi-freshgraduate/kathryn-murphy"}
                  className="text-center block underline text-blue-600 cursor-pointer"
                >
                  Detail
                </Link>
              </td>
            </tr>

            <tr className="bg-white">
              <td className="table-data">2</td>
              <td className="table-data">Devon Lane</td>
              <td className="table-data">081234567890</td>
              <td className="table-data">S1 Teknik Informatika</td>
              <td className="table-data">
                <Badge
                  size={"sm"}
                  variant={"error"}
                  className="border-none text-black  px-3"
                >
                  Tolak
                </Badge>
              </td>
              <td className="table-data">
                <Link
                  to={"/admin/verifikasi/cendol-jaya"}
                  className="text-center block underline text-blue-600 cursor-pointer"
                >
                  Detail
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
