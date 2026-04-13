import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { StatCard } from "@/components/ui/stat-card";
import { Link } from "react-router-dom";

export default function VerificationPage() {
  return (
    <DashboardLayout
      title="Verifikasi Akun UMKM"
      description="Kelola dan verifikasi pengajuan akun baru"
    >
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 mb-4">
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

      <div className="flex flex-col md:flex-row lg:items-center lg:justify-between gap-4 mb-7">
        <div className="relative w-full md:max-w-xl lg:max-w-md">
          <SearchInput placeholder="Cari nama atau perusahaan...." />
        </div>

        <div className="flex gap-3">
          <Button className="rounded-full font-semibold" size={"sm"}>
            Semua
          </Button>
          <Button
            variant={"soft"}
            className="rounded-full font-semibold border border-info-200"
            size={"sm"}
          >
            Menunggu
          </Button>
          <Button
            variant={"soft"}
            className="rounded-full font-semibold border border-info-200"
            size={"sm"}
          >
            Terverifikasi
          </Button>
          <Button
            variant={"soft"}
            className="rounded-full font-semibold border border-info-200"
            size={"sm"}
          >
            Ditolak
          </Button>
        </div>
      </div>

      <div className=" rounded-lg overflow-x-scroll md:overflow-x-hidden overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-100 text-sm overflow-hidden">
            <tr>
              <th className="table-head">No</th>
              <th className="table-head">Nama Usaha</th>
              <th className="table-head">Email</th>
              <th className="table-head">Status</th>
              <th className="table-head">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            <tr className="bg-white">
              <td className="table-data">1</td>
              <td className="table-data">Sambal Bakar Nusantara</td>
              <td className="table-data">mamat@mail.com</td>
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
                  to={"/admin/verifikasi/sambal-bakar-nusantara"}
                  className="text-center block underline text-blue-600 cursor-pointer"
                >
                  Detail
                </Link>
              </td>
            </tr>

            <tr className="bg-white">
              <td className="table-data">2</td>
              <td className="table-data">Cendol Jaya</td>
              <td className="table-data">sarti@mail.com</td>
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
