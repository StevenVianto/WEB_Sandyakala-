import { GoArrowLeft } from "react-icons/go";
import { Badge } from "@/shared/components/ui/badge";
import { FcFile } from "react-icons/fc";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { GoCheckCircle } from "react-icons/go";

type RevisiTugasProps = {
  onBack: () => void;
};

export default function RevisiTugas({ onBack }: RevisiTugasProps) {
  return (
    <div className="bg-neutral-400 min-h-screen p-25 flex justify-center">
      <div className="bg-white w-5xl px-12 py-6 rounded-lg shadow-md">
        {/* HEADER */}
        <div className="flex flex-row p-5 items-center">
          <GoArrowLeft
            className="text-3xl mr-5 cursor-pointer"
            onClick={onBack}
          />
          <div>
            <h3 className="font-extrabold text-h5">Revisi Hasil Kerja</h3>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-row gap-5 p-5">
          {/* ISI */}
          <div className="flex flex-col gap-10">
            {/* DETAIL TUGAS */}
            <div className=" flex flex-col gap-5 border border-neutral-300 rounded-lg w-xl px-10 py-5 ">
              {/* Content 1 */}
              <div className="flex flex-col gap-5 border-b pb-5">
                <div className="flex flex-row justify-between">
                  <h4 className="text-primary-dark text-lg">DETAIL TUGAS</h4>
                  <Badge
                    variant={"warning"}
                    size={"sm"}
                    className="bg-warning-200/50 border-none px-5"
                  >
                    Review
                  </Badge>
                </div>
                <p className="text-xs text-justify">
                  Lakukan redesign tampilan halaman agar terlihat lebih rapi dan
                  user-friendly. Perbaiki struktur layout, warna, dan elemen UI
                  supaya lebih konsisten dan mudah dipahami oleh pengguna.
                </p>
              </div>

              {/* Content 2 */}
              <table className="gap-5">
                <tr className="flex justify-between mb-2">
                  <th className="text-neutral-600 text-xs">Dikerjakan Oleh</th>
                  <th className="text-neutral-600 text-xs">Dikumpulkan</th>
                </tr>
                <tr className="flex justify-between mb-5">
                  <td className="text-xs font-bold">Dani Hermanto</td>
                  <td className="text-xs">7 Maret 2026 20:21 WIB</td>
                </tr>
                <tr className="flex justify-between mb-2">
                  <th className="text-neutral-600 text-xs">Tahap</th>
                  <th className="text-neutral-600 text-xs">Tenggat Waktu</th>
                </tr>
                <tr className="flex justify-between">
                  <td className="text-xs">Revisi ke-2</td>
                  <td className="text-xs text-error">9 Maret 2026 23:59 WIB</td>
                </tr>
              </table>
            </div>
            {/* CEK HASIL PEKERJAAN */}
            <div className=" flex flex-col gap-5 border border-neutral-300 rounded-lg w-xl px-10 py-5 ">
              <h4 className="text-primary-dark text-lg">CEK HASIL PEKERJAAN</h4>
              {/* hasil kerja pekerja */}
              <div className="flex flex-row border justify-between border-neutral-300 py-3 px-5 rounded-md">
                <div className="flex gap-3 items-center">
                  <FcFile className="text-lg" />
                  <p className="text-xs">Laporan_Panduan.pdf</p>
                </div>
                <Button
                  variant={"mint"}
                  size={"sm"}
                  className="border-mint-200 bg-white text-xs px-4"
                >
                  Lihat
                </Button>
              </div>

              {/* CATATAN PEKERJA */}
              <p className="text-xs font-bold">Catatan dari pekerja</p>
              <div className="flex flex-row border  border-neutral-300 py-3 px-3 rounded-md">
                <Input
                  className="border-none text-xs p-2 placeholder:text-neutral-950"
                  placeholder="Desain telah diperbarui dengan memperbaiki layout dan konsistensi warna"
                />
              </div>

              {/* BUTTON AMBIL TINDAKAN */}
              <Button className="bg-primary-dark hover:bg-primary-dark/90">
                Ambil Tindakan
              </Button>
            </div>
          </div>
          {/* RIWAYAT PERUBAHAN */}
          <div className=" flex flex-col gap-5 border border-neutral-300 rounded-lg w-xl px-5 py-5 h-fit">
            <h4 className="text-primary-dark text-lg">RIWAYAT PERUBAHAN</h4>

            {/* content 1*/}
            <div className="flex flex-row items-start gap-3">
              <GoCheckCircle className="text-2xl" />
              <div className="flex flex-col gap-1">
                <h6 className="text-sm">Revisi</h6>
                <p className="text-xs">25 Februari 2025, 16:00</p>
                <div className="bg-neutral-200 p-3 rounded-lg mr-6">
                  <p className="text-[9px]">
                    Perbaikan pada tampilan sesuai feedback yang diberikan.
                  </p>
                </div>
              </div>
            </div>

            {/* content 2*/}
            <div className="flex flex-row items-start gap-3">
              <GoCheckCircle className="text-2xl" />
              <div className="flex flex-col gap-1">
                <h6 className="text-sm">Revisi</h6>
                <p className="text-xs">25 Februari 2025, 16:00</p>
                <div className="bg-neutral-200 p-3 rounded-lg mr-6">
                  <p className="text-[9px]">
                    Perbaikan pada tampilan sesuai feedback yang diberikan.
                  </p>
                </div>
              </div>
            </div>

            {/* content 3*/}
            <div className="flex flex-row items-start gap-3">
              <GoCheckCircle className="text-2xl" />
              <div className="flex flex-col gap-1">
                <h6 className="text-sm">Revisi</h6>
                <p className="text-xs">25 Februari 2025, 16:00</p>
                <div className="bg-neutral-200 p-3 rounded-lg mr-6">
                  <p className="text-[9px]">
                    Perbaikan pada tampilan sesuai feedback yang diberikan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
