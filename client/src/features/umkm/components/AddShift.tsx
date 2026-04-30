import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskLayout from "@/shared/layouts/TaskLayout";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { GoX } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import SectionTask from "@/features/umkm/components/ui/section-task";

interface AddShiftProps {
  type: "pagi" | "siang" | "malam";
}

interface AddShiftProps {
  type: "pagi" | "siang" | "malam";
  shifts: any[];
  setShifts: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function AddShift({ type,shifts,setShifts }: AddShiftProps) {
  const [activeType, setActiveType] = useState<"pagi" | "siang" | "malam">(
    type,
  );

  const [shift, setShift] = useState({
    nama_shift: "",
    nama_pekerja_shift: "",
    tanggal_shift: "",
    waktu_mulai_shift: "",
    waktu_selesai_shift: "",
    jenis_shift: type,
    list_tugas_shift: [""],
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setShift((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...shift.list_tugas_shift];
    newTasks[index] = value;
    setShift((prev) => ({ ...prev, list_tugas_shift: newTasks }));
  };

  const addTaskShift = () => {
    setShift((prev) => ({
      ...prev,
      list_tugas_shift: [...prev.list_tugas_shift, ""],
    }));
  };

  const removeTask = (index: number) => {
    if (shift.list_tugas_shift.length === 1) return;
    const newTasks = shift.list_tugas_shift.filter((_, i) => i !== index);
    setShift((prev) => ({ ...prev, list_tugas_shift: newTasks }));
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    const newShift = {
      id: String(shifts.length + 1),
      nama_shift: shift.nama_shift,
      nama_pekerja_shift: shift.nama_pekerja_shift,
      tanggal_shift: shift.tanggal_shift,
      waktu_mulai_shift: shift.waktu_mulai_shift,
      waktu_selesai_shift: shift.waktu_selesai_shift,
      jenis_shift: shift.jenis_shift,
      list_tugas_shift: shift.list_tugas_shift.filter((t) => t.trim() !== ""),
      jamMasuk: "-",
      jamPulang: "-",
      status_shift: "Proses" as "Disetujui" | "Proses" | "Review",
    };

    setShifts([...shifts, newShift]);
    navigate("/umkm/dashboard/data-shift");
  };

  return (
    <TaskLayout type="shift" onSubmit={handleAdd}>
      <SectionTask title="Detail Shift Harian">
        {/* Nama Tugas Shift */}
        <label htmlFor="nama_shift" className="flex flex-col">
          <span className="text-sm leading-base mb-2">Nama Tugas Shift</span>
          <Input
            id="nama_shift"
            name="nama_shift"
            value={shift.nama_shift}
            onChange={handleChange}
            placeholder="Nama Shift"
            className="rounded-lg mt-2"
          />
        </label>

        {/* Pilih Pekerja */}
        <div className="mt-3">
          <label htmlFor="nama_pekerja_shift" className="flex flex-col">
            <span className="text-sm leading-base">Tambahkan Pekerja</span>
            <Input
              id="nama_pekerja_shift"
              name="nama_pekerja_shift"
              value={shift.nama_pekerja_shift}
              onChange={handleChange}
              placeholder="Tambah pekerja yang ditugaskan pada shift tersebut"
              className="rounded-lg mt-2"
            />
          </label>
        </div>

        {/* Tanggal Shift */}
        <div className="mt-3">
          <label htmlFor="tanggal_shift" className="flex flex-col">
            <span className="text-sm leading-base">Tanggal Shift</span>
            <Input
              id="tanggal_shift"
              type="date"
              name="tanggal_shift"
              value={shift.tanggal_shift}
              onChange={handleChange}
              className="rounded-lg mt-2"
            />
          </label>
        </div>

        {/* Waktu Shift */}
        <div className="flex flex-row justify-between mt-3">
          <div className="flex flex-col w-full pr-3">
            <label htmlFor="waktu_mulai_shift" className="flex flex-col">
              <span className="text-sm leading-base">Waktu Mulai Shift</span>
              <Input
                id="waktu_mulai_shift"
                type="time"
                name="waktu_mulai_shift"
                value={shift.waktu_mulai_shift}
                onChange={handleChange}
                className="rounded-lg mt-2"
              />
            </label>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="waktu_selesai_shift" className="flex flex-col">
              <span className="text-sm leading-base">Waktu Selesai Shift</span>
              <Input
                id="waktu_selesai_shift"
                type="time"
                name="waktu_selesai_shift"
                value={shift.waktu_selesai_shift}
                onChange={handleChange}
                className="rounded-lg mt-2"
              />
            </label>
          </div>
        </div>

        {/* Jenis Shift */}
        <div className="w-fit mt-3">
          <label>
            <span className="text-sm leading-base">Jenis Shift</span>
            <div className="w-fit flex flex-row mt-2 gap-3">
              {(["pagi", "siang", "malam"] as const).map((jenisItem) => (
                <Button
                  key={jenisItem}
                  type="button"
                  onClick={() => {
                    setActiveType(jenisItem);
                    setShift((prev) => ({ ...prev, jenis_shift: jenisItem }));
                  }}
                  className={`w-fit px-3 border capitalize ${
                    activeType === jenisItem
                      ? "bg-teal-100 border-primary-dark text-primary-dark hover:bg-teal-100 font-semibold"
                      : "bg-white border-neutral-900 text-neutral-900 hover:bg-gray-100"
                  }`}
                >
                  {jenisItem.charAt(0).toUpperCase() + jenisItem.slice(1)}
                </Button>
              ))}
            </div>
          </label>
        </div>

        {/* List Tugas Shift */}
        <label htmlFor="" className="flex flex-col mt-3">
          <span className="text-sm leading-base">List Tugas Shift</span>
          <ol>
            {shift.list_tugas_shift.map((taskShift, index) => (
              <li
                key={index}
                className="flex flex-row items-center border border-neutral-500 px-7 py-3 mt-2 rounded-md"
              >
                <span className="mr-5 font-bold bg-primary-dark px-3 py-1 text-white rounded-full">
                  {index + 1}
                </span>
                <Input
                  value={taskShift}
                  name="list_tugas_shift"
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  placeholder="Ketik tugas yang ingin kamu berikan"
                  className="rounded-lg"
                />
                {shift.list_tugas_shift.length > 1 && (
                  <GoX
                    className="text-2xl ml-3 cursor-pointer text-red-400 hover:text-red-600"
                    onClick={() => removeTask(index)}
                  />
                )}
              </li>
            ))}
            <Button
              type="button"
              onClick={addTaskShift}
              className="bg-white border border-teal-300 text-teal-300 rounded-lg mt-5 hover:bg-teal-100 font-semibold"
            >
              <GoPlus className="text-teal-300 mr-2" /> Tambah Tugas
            </Button>
          </ol>
        </label>
      </SectionTask>
    </TaskLayout>
  );
}
