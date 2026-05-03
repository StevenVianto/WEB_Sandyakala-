import DataTaskLayout from "@/shared/layouts/DataTaskLayout";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ModalShift } from "@/shared/components/ui/modal-shift";
import { DetailShiftContent } from "@/features/umkm/components/DetailShiftContent";

type Shift = {
  id: number;
  divisi_shift: string;
  nama_pekerja_shift: string;
  nama_shift: string;
  list_tugas_shift: string[];
  waktu_mulai_shift: string;
  waktu_selesai_shift: string;
  jenis_shift: string;
  tanggal_shift: string;
  jamMasuk: string;
  jamPulang: string;
  status_shift: "Disetujui" | "Proses" | "Review";
};

type OutletContextType = {
  shifts: Shift[];
  setShifts: React.Dispatch<React.SetStateAction<Shift[]>>;
};

export default function DataShift() {
  const { shifts } = useOutletContext<OutletContextType>();
  // ini agar button muncul saat status nya review, revisi, proses
  const showDetailButtonShift = ["Review", "Disetujui", "Proses"];

  // ini buat atur status nya
  const getStatusBadgeShift = (status_shift: Shift["status_shift"]) => {
    const classesShift: Record<string, string> = {
      disetujui: "bg-success-100 text-success-300",
      proses: "bg-neutral-600/25 text-neutral-800",
      review: "bg-warning-200/50 text-warning-300",
    };
    return classesShift[status_shift.toLowerCase()] ?? "";
  };

  const [open, setOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(shifts[0]);

  return (
    <DataTaskLayout
      title="Data Tugas Pekerja"
      description="Kelola semua tugas pekerja dalam satu tampilan"
      activeTab="dataShift"
      tabs={[
        {
          label: "Proyek Masuk",
          path: "/umkm/dashboard/data-project",
          key: "dataProject",
        },
        {
          label: "Shift Harian",
          path: "/umkm/dashboard/data-shift",
          key: "dataShift",
        },
      ]}
      statusOptions={["Disetujui", "Proses", "Review"]}
    >
      <div className="w-full px-6">
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full table-auto border-collapse text-sm text-neutral-900">
            <thead>
              <tr className="bg-mint/15 text-center">
                <th className="border px-3 py-2">No</th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  Nama Pekerja
                </th>
                <th className="border px-3 py-2">Tugas</th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  Waktu Shift
                </th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  Jenis Shift
                </th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  Tanggal Shift
                </th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  Jam Masuk
                </th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  Jam Pulang
                </th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {shifts.length > 0 ? (
                shifts.map((shift, index) => (
                  <tr
                    key={shift.id ?? index}
                    className="hover:bg-neutral-100 transition text-center text-xs"
                  >
                    <td className="border px-3 py-2">{index + 1}</td>

                    <td className="border px-3 py-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold whitespace-nowrap">
                          {shift.divisi_shift}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {shift.nama_pekerja_shift}
                        </span>
                      </div>
                    </td>

                    <td className="border px-3 py-2 max-w-160px truncate">
                      {shift.nama_shift}
                    </td>

                    <td className="border px-3 py-2 whitespace-nowrap">
                      {shift.waktu_mulai_shift} - {shift.waktu_selesai_shift}
                    </td>

                    <td className="border px-3 py-2 capitalize">
                      {shift.jenis_shift}
                    </td>

                    <td className="border px-3 py-2 whitespace-nowrap">
                      {shift.tanggal_shift}
                    </td>

                    <td className="border px-3 py-2">{shift.jamMasuk}</td>

                    <td className="border px-3 py-2">{shift.jamPulang}</td>

                    <td className="border px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusBadgeShift(
                          shift.status_shift,
                        )}`}
                      >
                        {shift.status_shift}
                      </span>
                    </td>

                    <td className="border px-3 py-2">
                      {showDetailButtonShift.includes(shift.status_shift) && (
                        <button
                          onClick={() => {
                            setSelectedShift(shift);
                            setOpen(true);
                          }}
                          className="border border-primary-dark px-3 py-1 text-xs rounded-md hover:bg-primary-dark hover:text-white transition cursor-pointer"
                        >
                          Detail
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-5 text-neutral-500"
                  >
                    Tidak ada data shift
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* modal detail shift */}
        <ModalShift
          open={open}
          onClose={() => setOpen(false)}
          title="Detail Shift"
          subtitle={selectedShift?.nama_pekerja_shift}
          subtitle2={selectedShift?.divisi_shift}
          status={selectedShift?.status_shift}
        >
          {selectedShift && <DetailShiftContent shift={selectedShift} onClose={() => setOpen(false)} />}
        </ModalShift>
      </div>
    </DataTaskLayout>
  );
}
