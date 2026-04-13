import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { StatCard } from "@/components/ui/stat-card";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router";

export default function ReportPage() {
  return (
    <DashboardLayout
      title="Pelanggaran UMKM"
      description="Monitor dan tindak laporan pelanggaran UMKM"
    >
      <div className="flex flex-wrap w-full gap-3 my-8 justify-center lg:justify-evenly">
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
            <SearchInput placeholder="Cari atau nama perusahaan...." />
          </div>

          <Button
            variant={"soft"}
            className="text-sm w-max whitespace-nowrap font-semibold flex items-center gap-1"
          >
            Status Laporan
            <MdKeyboardArrowDown className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="rounded-lg overflow-x-scroll md:overflow-x-hidden overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-100 text-sm ">
            <tr>
              <th className="table-head ">No</th>
              <th className="table-head">Nama Usaha</th>
              <th className="table-head">Kategori Pelanggaran</th>
              <th className="table-head">Alasan Pelaporan</th>
              <th className="table-head">Status</th>
              <th className="table-head">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            <tr className="bg-white">
              <td className="table-data">RPT-001</td>
              <td className="table-data">Sambal Bakar Nusantara</td>
              <td className="table-data">Penipuan</td>
              <td className="table-data max-w-xs">
                Pemilik usaha melakukan tindakan penipuan dengan memberikan
                informasi yang menyesatkan dan berusaha memperoleh keuntungan
                secara tidak sah.
              </td>
              <td className="table-data">
                <Badge
                  size={"sm"}
                  variant={"error"}
                  className="border-none text-black"
                >
                  Verifikasi
                </Badge>
              </td>
              <td className="table-data">
                <Link
                  to={"/admin/laporan/sambal-bakar-nusantara"}
                  className="text-center block underline text-blue-600 cursor-pointer"
                >
                  Detail
                </Link>
              </td>
            </tr>

            <tr className="bg-white">
              <td className="table-data">RPT-002</td>
              <td className="table-data">Cendol Jaya</td>
              <td className="table-data">Data Palsu</td>
              <td className="table-data max-w-xs">
                Pemilik usaha mengunggah atau menggunakan data palsu yang tidak
                sesuai dengan fakta, sehingga berpotensi merugikan pihak lain.
              </td>
              <td className="table-data">
                <Badge
                  size={"sm"}
                  variant={"warning"}
                  className="border-none text-black bg-orange-300 px-3"
                >
                  Tolak
                </Badge>
              </td>
              <td className="table-data">
                <Link
                  to={"/admin/laporan/cendol-jaya"}
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
