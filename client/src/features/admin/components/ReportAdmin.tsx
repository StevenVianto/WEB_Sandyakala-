import DashboardLayout from "@/shared/layouts/DashboardLayout";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { SearchInput } from "@/shared/components/ui/search-input";
import { StatCard } from "@/shared/components/ui/stat-card";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router";
import {
  dataStatCardReport,
  dataTableReport,
} from "../constants/data-dashboard";

export default function ReportAdmin() {
  return (
    <DashboardLayout
      title="Pelanggaran UMKM"
      description="Monitor dan tindak laporan pelanggaran UMKM"
    >
      <div className="flex flex-wrap w-full gap-3 my-8 justify-center lg:justify-evenly">
        {dataStatCardReport.map((item, index) => (
          <StatCard
            key={index}
            variant={item.variant}
            title={item.title}
            value={item.value}
            description={item.description}
          />
        ))}
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
            className="text-sm w-max whitespace-nowrap rounded-md bg-white border font-semibold flex items-center gap-1"
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
              <th className="table-head">No</th>
              <th className="table-head">Nama Usaha</th>
              <th className="table-head">Kategori Pelanggaran</th>
              <th className="table-head">Alasan Pelaporan</th>
              <th className="table-head">Status</th>
              <th className="table-head">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {dataTableReport.map((item) => (
              <tr className="bg-white">
                <td className="table-data font-medium">{item.id}</td>
                <td className="table-data font-medium">{item.namaUsaha}</td>
                <td className="table-data font-medium">
                  {item.kategoriPelanggaran}
                </td>
                <td className="table-data max-w-50 text-xs">
                  {item.alasanPelaporan}
                </td>
                <td className="table-data">
                  <Badge
                    size={"sm"}
                    variant={item.variantStatus}
                    className="border-none text-black"
                  >
                    {item.status}
                  </Badge>
                </td>
                <td className="table-data">
                  <Link
                    to={`/admin/laporan/${item.slug}`}
                    className="text-center block underline text-blue-600 cursor-pointer"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
