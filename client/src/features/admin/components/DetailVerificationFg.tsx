import DashboardLayout from "@/shared/layouts/DashboardLayout";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { useParams } from "react-router";
import { Modal } from "@/shared/components/ui/modal";
import { useState } from "react";
import { BiFile, BiImage, BiSolidUser } from "react-icons/bi";

interface DocumentCardProps {
  label: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  iconType: "pdf" | "image";
}

const DocumentCard = ({
  label,
  fileName,
  fileType,
  fileSize,
  uploadDate,
  iconType,
}: DocumentCardProps) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <span className="text-sm font-medium text-gray-800 uppercase tracking-wide">
        {label}
      </span>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            {iconType === "pdf" ? (
              <BiFile className="text-blue-500 w-7 h-7" />
            ) : (
              <BiImage className="text-blue-400 w-7 h-7" />
            )}
          </div>

          <div className="flex flex-col">
            <h4 className="text-base font-semibold text-gray-900">
              {fileName}
            </h4>
            <p className="text-sm text-gray-500">
              {fileType} . {fileSize} . Diunggah {uploadDate}
            </p>
          </div>
        </div>

        <Button
          variant={"ghost"}
          size={"sm"}
          className="text-blue-800 font-semibold rounded-md"
        >
          Unduh
        </Button>
      </div>
    </div>
  );
};

export default function DetailVerificationFg() {
  const { email = "" } = useParams<{ email: string }>();

  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout title={`Detail Akun - ${email}`} showBackButton>
      <div className="flex justify-center">
        <Card className="max-w-2xl border-2 border-info-100">
          <CardHeader className=" flex justify-between items-center border-b-2 border-info-100">
            <h1 className="md:text-md text-base font-bold">Informasi Akun</h1>
            <Button className="bg-orange-400 text-black font-semibold rounded-full text-xs py-1.5">
              Perlu ditinjau
            </Button>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
              <div className="w-28 h-28 rounded-full border border-gray-400 p-1.5 shrink-0">
                <div className="w-full h-full rounded-full bg-mint flex items-center justify-center text-white overflow-hidden">
                  <BiSolidUser className="w-16 h-16 mt-4 opacity-90" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 w-full">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">
                    Nama Lengkap
                  </span>
                  <span className="text-base font-semibold text-gray-900">
                    Kathryn Murphy
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-1">No HP</span>
                  <span className="text-base font-semibold text-gray-900">
                    081234567890
                  </span>
                </div>

                <div className="flex flex-col sm:col-span-2">
                  <span className="text-sm text-gray-500 mb-1 w-max pb-0.5">
                    Pendidikan Terakhir
                  </span>
                  <span className="text-base font-semibold text-gray-900 mt-1">
                    S1 Desain Komunikasi Visual
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <DocumentCard
                label="DOKUMEN"
                fileName="CV_Kathryn Murphy.pdf"
                fileType="PDF"
                fileSize="1.2 MB"
                uploadDate="12 Mar 2025"
                iconType="pdf"
              />

              <DocumentCard
                label="DOKUMEN"
                fileName="Ijazah_Kathryn Murphy.png"
                fileType="png"
                fileSize="500 KB"
                uploadDate="12 Mar 2025"
                iconType="image"
              />
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
