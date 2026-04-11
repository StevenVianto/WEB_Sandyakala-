import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { Link } from "react-router-dom";

const PopularUmkm = ({
  category,
  count,
  color,
}: {
  category: string;
  count: number;
  color: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold ">{category}</p>
        <p className="text-sm ">{count} UMKM</p>
      </div>
      <hr className={`py-1 border-none w-full ${color} rounded-full`} />
    </div>
  );
};

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Ringkasan platform FreshStart"
    >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 mb-4">
        <StatCard
          variant={"blue"}
          title="Total Pengguna"
          value={5}
          description="+8 dari bulan lalu"
        />
        <StatCard
          variant={"green"}
          title="UMKM Aktif"
          value={2}
          description="+5 dari bulan lalu"
        />
        <StatCard
          variant={"yellow"}
          title="Antrian Verifikasi"
          value={2}
          description="Terlama : 4 hari"
        />
        <StatCard
          variant={"red"}
          title="Laporan Aktif"
          value={2}
          description="Laporan perlu ditinjau"
        />
      </div>

      <div className="flex gap-4 w-full mt-8">
        <div className="w-[60%]">
          <Card className="bg-info-100/20 border-2 border-info-100">
            <CardHeader className="flex items-center justify-between py-4 border-b border-info-100">
              <h1 className="font-semibold text-base">
                Kategori UMKM Terpopuler
              </h1>
              <h2 className="font-semibold text-sm">Total 98 Aktif</h2>
            </CardHeader>
            <CardBody className="bg-white space-y-4 pb-6">
              <PopularUmkm category="Kuliner" count={5} color="bg-blue-700" />
              <PopularUmkm category="Fashion" count={3} color="bg-yellow-700" />
              <PopularUmkm
                category="Kesehatan"
                count={3}
                color="bg-green-700"
              />
              <PopularUmkm category="Teknologi" count={3} color="bg-red-700" />
              <PopularUmkm
                category="Kerajinan"
                count={3}
                color="bg-stone-700"
              />
            </CardBody>
          </Card>
        </div>

        <div className="w-[40%]">
          <Card className="bg-info-100/20 border-2 border-info-100">
            <CardHeader className="flex items-center justify-between py-4 border-b border-info-100">
              <h1 className="font-semibold">Aksi Cepat</h1>
            </CardHeader>
            <CardBody className="bg-white space-y-4 pt-5 pb-10">
              <div className="flex gap-2 justify-between items-center py-4 px-6 w-full bg-info-100/50 rounded-3xl border-2 border-blue-500">
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-secondary p-3">
                  <FaCheck className="w-full h-full fill-white" />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold mb-1 text-md">
                    Review Pengajuan
                  </h1>
                  <p className="text-sm">3 Laporan aktif</p>
                </div>
                <Link to="/admin/verifikasi">
                  <BiRightArrowAlt className="h-10 w-10" />
                </Link>
              </div>
              <div className="flex gap-2 justify-between items-center py-4 px-6 w-full bg-red-200 rounded-3xl border-2 border-red-300">
                <IoIosWarning className="h-12 w-12 fill-red-500" />
                <div className="flex flex-col">
                  <h1 className="font-semibold mb-1 text-md">
                    Tindakan Laporan
                  </h1>
                  <p className="text-sm">3 Laporan aktif</p>
                </div>
                <Link to="/admin/laporan">
                  <BiRightArrowAlt className="h-10 w-10" />
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
