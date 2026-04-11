import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function VerificationPage() {
  return (
    <DashboardLayout
      title="Verifikasi Akun UMKM"
      description="Kelola dan verifikasi pengajuan akun baru"
    >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 mb-4">
        <StatCard
          variant={"blue"}
          title="Total Pengajuan"
          value={2}
          description="+3 hari ini"
        />
        <StatCard
          variant={"yellow"}
          title="Menunggu Persetujuan"
          value={2}
          description="+3 hari ini"
        />
        <StatCard
          variant={"green"}
          title="Terverifikasi"
          value={2}
          description="+3 hari ini"
        />
        <StatCard
          variant={"red"}
          title="Ditolak"
          value={2}
          description="+3 hari ini"
        />
      </div>

      <div className="my-8">
        <h1 className="text-xl font-semibold">Daftar Pengajuan Akun</h1>
        <p className="text-sm text-gray-500">
          Klik baris untuk melihat detail.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Cari nama atau perusahaan..."
            className="w-full pl-4 pr-10 py-2 rounded-md border border-blue-300"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-info-300">
            <BiSearch className="h-6 w-6 fill-secondary" />
          </span>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button className="rounded-full font-semibold" size={"sm"}>
            Semua
          </Button>
          <Button
            className="rounded-full bg-info-100 hover:text-white text-black font-semibold border border-info-200"
            size={"sm"}
          >
            Menunggu
          </Button>
          <Button
            className="rounded-full bg-info-100 hover:text-white text-black font-semibold border border-info-200"
            size={"sm"}
          >
            Terverifikasi
          </Button>
          <Button
            className="rounded-full bg-info-100 hover:text-white text-black font-semibold border border-info-200"
            size={"sm"}
          >
            Ditolak
          </Button>
        </div>
      </div>

      <div className="w-full overflow-x-auto mt-5 border border-info-100 rounded-lg">
        <table className="w-full border border-info-100 overflow-hidden rounded-lg">
          <thead className="bg-blue-100 text-sm ">
            <tr>
              <th className="px-4 py-2 text-center border border-info-100 ">
                No
              </th>
              <th className="px-4 py-2 text-center border border-info-100">
                Nama Usaha
              </th>
              <th className="px-4 py-2 text-center border border-info-100">
                Email
              </th>
              <th className="px-4 py-2 text-center border border-info-100">
                Status
              </th>
              <th className="px-4 py-2 text-center border border-info-100">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            <tr className="bg-white">
              <td className="px-4 py-2 border border-info-100 font-semibold">
                1
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold">
                Sambal Bakar Nusantara
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold">
                mamat@mail.com
              </td>
              <td className="px-4 py-2 border border-info-100">
                <Badge
                  size={"sm"}
                  className="border-none text-black font-semibold bg-primary "
                >
                  Verifikasi
                </Badge>
              </td>
              <td className="px-4 py-2 border border-info-100">
                <Link
                  to={""}
                  className="text-center block font-semibold underline text-blue-600 cursor-pointer"
                >
                  Detail
                </Link>
              </td>
            </tr>

            <tr className="bg-gray-50">
              <td className="px-4 py-2 border border-info-100 font-semibold">
                2
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold">
                Cendol Jaya
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold">
                sarti@mail.com
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold">
                <Badge
                  size={"sm"}
                  className="border-none text-black font-semibold bg-red-300 px-3"
                >
                  Tolak
                </Badge>
              </td>
              <td className="px-4 py-2 border border-info-100 ">
                <Link
                  to={""}
                  className="text-center block font-semibold underline text-blue-600 cursor-pointer"
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
