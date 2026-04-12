import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router";

export default function ReportPage() {
  return (
    <DashboardLayout
      title="Pelanggaran UMKM"
      description="Monitor dan tindak laporan pelanggaran UMKM"
    >
      <div className="flex gap-20 w-full my-8 justify-center">
        <StatCard
          variant={"red"}
          title="Total Laporan Masuk"
          value={2}
          description="+3 laporan baru minggu lalu"
        />
        <StatCard
          variant={"yellow"}
          title="Sedang diproses"
          value={2}
          description="Rata-rata 2 penyelesaian"
        />
        <StatCard
          variant={"blue"}
          title="Laporan Selesai"
          value={2}
          description="75% tingkat penyelesaian"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
        <div className="space-y-1.5">
          <h1 className="text-xl font-semibold">Daftar Laporan Pelanggaran</h1>
          <p className="text-sm text-gray-500">
            Klik baris untuk melihat detail laporan
          </p>
        </div>

        <div className="flex items-center gap-4">
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

          <Button className="text-sm w-max whitespace-nowrap bg-info-100 font-semibold text-info-300 flex items-center gap-1">
            Status Laporan
            <MdKeyboardArrowDown className="h-6 w-6" />
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
                Kategori Pelanggaran
              </th>
              <th className="px-4 py-2 text-center border border-info-100">
                Alasan Pelaporan
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
                RPT-001
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold">
                Sambal Bakar Nusantara
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold">
                Penipuan
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold max-w-xs">
                Pemilik usaha melakukan tindakan penipuan dengan memberikan
                informasi yang menyesatkan dan berusaha memperoleh keuntungan
                secara tidak sah.
              </td>
              <td className="px-4 py-2 border border-info-100">
                <Badge
                  size={"sm"}
                  variant={"error"}
                  className="border-none text-blackd bg-red-300 font-semibold "
                >
                  Verifikasi
                </Badge>
              </td>
              <td className="px-4 py-2 border border-info-100">
                <Link
                  to={"/admin/laporan/sambal-bakar-nusantara"}
                  className="text-center block font-semibold underline text-blue-600 cursor-pointer"
                >
                  Detail
                </Link>
              </td>
            </tr>

            <tr className="bg-gray-50">
              <td className="px-4 py-2 border border-info-100 font-semibold">
                RPT-002
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold">
                Cendol Jaya
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold">
                Data Palsu
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold max-w-xs">
                Pemilik usaha mengunggah atau menggunakan data palsu yang tidak
                sesuai dengan fakta, sehingga berpotensi merugikan pihak lain.
              </td>
              <td className="px-4 py-2 border border-info-100 font-semibold">
                <Badge
                  size={"sm"}
                  variant={"warning"}
                  className="border-none text-black font-semibold bg-orange-300 px-3"
                >
                  Tolak
                </Badge>
              </td>
              <td className="px-4 py-2 border border-info-100 ">
                <Link
                  to={"/admin/laporan/cendol-jaya"}
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
