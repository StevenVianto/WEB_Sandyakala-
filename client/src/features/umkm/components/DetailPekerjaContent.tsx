import { useState } from "react";
import type { Employee } from "../types/dashboard.types";
import { FcBusinessman } from "react-icons/fc";
import { ModalNotification } from "@/shared/components/ui/modal-notification";

type Props = {
  employee: Employee;
  onClose: () => void;
};

export function DetailPekerjaContent({ employee, onClose }: Props) {
  const [modalConfig, setModalConfig] = useState<{
    visible: boolean;
    type: "aktifkan" | "nonaktifkan";
  }>({ visible: false, type: "aktifkan" });

  const handleKonfirmasi = () => {
    if (modalConfig.type === "aktifkan") {
      console.log("Pekerja diaktifkan");
    } else {
      console.log("Pekerja dinon-aktifkan");
    }
    setModalConfig({ visible: false, type: "aktifkan" });
    onClose();
  };

  return (
    <div className="flex flex-col gap-6 ">
      {/* data profile */}
      <div className="flex flex-row gap-5 px-5 py-3">
        {/* poto profile */}
        <div className="bg-primary-subtle/50 rounded-full p-3">
          <FcBusinessman className="text-4xl" />
        </div>
        {/* data pekerja */}
        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl">Kathryn Murphy</p>
          <p className="font-light text-sm">
            Posisi: {employee.posisi_pekerja}
          </p>
        </div>
      </div>

      {/* informasi pekerja */}
      <div className="flex flex-col gap-2 px-5 py-3">
        <p className="text-sm font-light">INFORMASI PEKERJA</p>
        <div className="flex justify-between text-justify">
          <p className="text-neutral-500/50 text-xs">Pendidikan Terakhir</p>
          <p className="text-xs">S1 Desain Komunikasi Visual</p>
        </div>
        <div className="flex justify-between">
          <p className="text-neutral-500/50 text-xs">No HP</p>
          <p className="text-xs">{employee.no_hp_pekerja}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-neutral-500/50 text-xs">Jenis Penugasan</p>
          <p className="text-xs">{employee.jenis_penugasan_pekerja}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-neutral-500/50 text-xs">Mulai Bergabung</p>
          <p className="text-xs">{employee.tanggal_masuk_pekerja}</p>
        </div>
      </div>
      {/* button */}
      <div className="flex flex-row justify-evenly gap-7 border-t pt-5">
        <button
          onClick={() => setModalConfig({ visible: true, type: "nonaktifkan" })}
          className="bg-error-100 p-3 border text-error-300 border-error-300 rounded-lg w-45 cursor-pointer hover:bg-error-200/45"
        >
          Non Aktifkan
        </button>
        <button
          onClick={() => setModalConfig({ visible: true, type: "aktifkan" })}
          className="bg-success-100 border border-success-300 text-success-300 p-3 rounded-lg w-45 cursor-pointer hover:bg-success-200/45"
        >
          Aktifkan
        </button>
      </div>

      {/* Modal Konfirmasi */}
      <ModalNotification
        visible={modalConfig.visible}
        title={
          modalConfig.type === "aktifkan"
            ? "Aktifkan pekerja ini?"
            : "Tandai pekerja sebagai tidak aktif?"
        }
        subtitle={
          modalConfig.type === "aktifkan"
            ? "Pekerja akan langsung bisa mengakses sistem kembali."
            : "Pekerja dapat diaktifkan kembali kapan saja."
        }
        button={{
          type: "double",
          cancelLabel: "Tidak",
          confirmLabel: "Ya",
          onCancel: () =>
            setModalConfig((prev) => ({ ...prev, visible: false })),
          onConfirm: handleKonfirmasi,
        }}
        onClose={() => setModalConfig((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}
