import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/ui/card";
import { FaBan } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdPauseCircleFilled } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { useParams } from "react-router-dom";

export default function DetailReportPage() {
  const { namaUsaha = "" } = useParams<{ namaUsaha: string }>();

  const namaUsahaFormatted = namaUsaha
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <DashboardLayout
      title={`Detail Laporan - ${namaUsahaFormatted}`}
      description="Menindaklanjuti pelanggaran yang dilakukan UMKM"
      showBackButton
    >
      <div className="flex justify-center">
        <Card className="max-w-2xl border-2 border-info-100">
          <CardHeader className=" flex justify-between items-center border-b-2 border-info-100">
            <h1 className="md:text-md text-xl font-bold">Informasi Laporan</h1>
          </CardHeader>
          <CardBody>
            <h1 className="text-2xl mb-2 font-extrabold">
              {namaUsahaFormatted}
            </h1>
            <p className="font-semibold mb-2 text-sm">Kategori : Kuliner</p>
            <p className="font-semibold mb-6 text-sm">
              Nama Pemilik : Jane Doe
            </p>

            <div className="mb-4">
              <p className="font-medium text-sm text-slate-400">
                Kategori Pelanggaran
              </p>
              <h3 className="font-bold text-sm">Penipuan</h3>
            </div>

            <p className="font-medium text-sm text-slate-400">
              Alasan Pelaporan
            </p>
            <h3 className="font-bold text-sm">
              Pemilik usaha melakukan tindakan penipuan dengan memberikan
              informasi yang menyesatkan dan berusaha memperoleh keuntungan
              secara tidak sah.
            </h3>
          </CardBody>
          <CardFooter className="bg-info-100/30 flex gap-5 justify-between px-10 border-t-2 border-info-100">
            <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-2">
              <Button className="bg-info-200 w-full border-info border text-info-300 hover:text-white hover:bg-info font-bold flex flex-col gap-1 lg:text-xl text-base">
                <MdPauseCircleFilled className="h-7 w-7 lg:h-10 lg:w-10 fill-blue-600" />
                Terima
                <span className="text-xs">Akun dibekukan sementara waktu</span>
              </Button>
              <Button className="bg-red-200 w-full border-red-500 border text-red-400 hover:text-white hover:bg-red-500 font-bold flex flex-col gap-1 lg:text-xl text-base">
                <FaBan className="h-7 w-7 lg:h-10 lg:w-10 fill-red-400" />
                Ban Permanen
                <span className="text-xs">
                  Akun dihapus & diblokir selamanya
                </span>
              </Button>
              <Button className="bg-orange-200 w-full border-orange-500 border text-orange-400 hover:text-white hover:bg-orange-500 font-bold flex flex-col gap-1 lg:text-xl text-base">
                <PiWarningCircle className="h-7 w-7 lg:h-10 lg:w-10 fill-orange-400" />
                Beri Peringatan
                <span className="text-xs">
                  Kirim Notifikasi Pelanggaran Resmi
                </span>
              </Button>
              <Button className="bg-slate-200 w-full border-slate-500 border text-slate-600 hover:text-white hover:bg-slate-500 font-bold flex flex-col gap-1 lg:text-xl text-base">
                <IoClose className="h-7 w-7 lg:h-10 lg:w-10 fill-slate-400" />
                Abaikan
                <span className="text-xs">
                  Laporan tidak terbukti, tutup kasus
                </span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
