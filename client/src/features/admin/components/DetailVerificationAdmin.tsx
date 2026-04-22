import DashboardLayout from "@/shared/layouts/DashboardLayout";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { useParams } from "react-router";
import CardUmkm from "@/assets/images/card-umkm.png";
import { Modal } from "@/shared/components/ui/modal";
import { useState } from "react";
import { formatNamaUsaha } from "../utils/formar-nama-usaha";

export default function DetailVerificationAdmin() {
  const { namaUsaha = "" } = useParams<{ namaUsaha: string }>();

  const namaUsahaFormatted = formatNamaUsaha(namaUsaha);

  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout
      title={`Detail Akun - ${namaUsahaFormatted}`}
      description="Dimiliki Oleh Jane Doe"
      showBackButton
    >
      <div className="flex justify-center">
        <Card className="max-w-2xl border-2 border-info-100">
          <CardHeader className=" flex justify-between items-center border-b-2 border-info-100">
            <h1 className="md:text-md text-base font-bold">Informasi Usaha</h1>
            <Button className="bg-orange-400 text-black font-semibold rounded-full text-xs py-1.5">
              Perlu ditinjau
            </Button>
          </CardHeader>
          <CardBody>
            <div className="flex gap-6 justify-between items-center mb-6">
              <div className="shrink-0 w-40 h-40">
                <img
                  src={CardUmkm}
                  alt="Card Umkm"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="space-y-3">
                <h2 className="font-extrabold text-base md:text-3xl">
                  {namaUsahaFormatted}
                </h2>
                <p className="font-semibold text-sm">Kategori : Kuliner</p>
                <Button
                  size={"sm"}
                  className="w-max bg-info-100/40 hover:text-white text-info-300 text-xs font-bold shadow-md"
                >
                  NIB: 1232131231
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Nama Pemilik
                  </p>
                  <p className=" text-black font-extrabold">Jane Doe</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    No Telepon
                  </p>
                  <p className=" text-black font-extrabold">08123456789</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium">Alamat</p>
                  <p className=" text-black font-extrabold">Jakarta</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-black font-extrabold">janedoe@gmail.com</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Jumlah Karyawan
                  </p>
                  <p className="text-black font-extrabold">10 - 50 Karyawan</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Tanggal Bergabung
                  </p>
                  <p className="text-black font-extrabold">29 Maret 2026</p>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="bg-info-100/30 flex gap-5 justify-between px-10 border-t-2 border-info-100">
            <Button className="bg-info-200 border-info border text-info-300 hover:text-white hover:bg-info font-semibold w-1/2">
              Terima
            </Button>
            <Button
              onClick={() => setOpen(true)}
              className="bg-red-200 border hover:bg-red-500 hover:text-white border-red-500 text-red-500 font-semibold w-1/2"
            >
              Tolak
            </Button>
          </CardFooter>
        </Card>

        <Modal open={open} onClose={() => setOpen(false)}>
          <h1 className="text-center text-xl font-bold mb-4">
            Anda yakin ingin menolak pengajuan ini ?
          </h1>

          <form>
            <label className="text-sm font-bold mb-2.5 inline-block">
              Pesan Penolakan :
            </label>

            <textarea className="w-full h-28 border-2 border-slate-300 rounded-md p-2 text-sm outline-none resize-none" />
          </form>

          <div className="flex justify-end mt-4">
            <Button className="bg-secondary px-7 py-1 rounded-md">Kirim</Button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
