import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskLayout from "@/components/layouts/TaskLayout";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { GoX } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import SectionTask from "@/components/ui/section-task";
import type { Shift } from "../types/dashboard.types";

interface AddShiftProps {
  type: "pagi" | "siang" | "malam";
  shifts: Shift[];
  setShifts: React.Dispatch<React.SetStateAction<Shift[]>>;
}

export default function AddShift({ type, shifts, setShifts }: AddShiftProps) {
  // ini kalo button jenis shiftnya dipencet
  const [activeType, setActiveType] = useState<"pagi" | "siang" | "malam">(
    type,
  );

  // untuk form inputan
  const [shift, setShift] = useState<Shift>({
    id: "",
    nama_shift: "",
    nama_pekerja_shift: "",
    waktu_mulai_shift: "",
    waktu_selesai_shift: "",
    jenis_shift: "",
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

    setShift({
      ...shift,
      list_tugas_shift: newTasks,
    });
  };

  //nambahin list tugas
  const addTaskShift = () => {
    setShift({
      ...shift,
      list_tugas_shift: [...shift.list_tugas_shift, ""],
    });
  };

  // hapus list
  const removeTask = (index: number) => {
    const newTasks = shift.list_tugas_shift.filter((_, i) => i !== index);

    setShift({
      ...shift,
      list_tugas_shift: newTasks,
    });
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    const newShift = {
      ...shift,
      id: String(shifts.length + 1),
    };

    setShifts([...shifts, newShift]);

    navigate("/umkm/home");
  };

  return (
    <TaskLayout type="shift" onSubmit={handleAdd}>
      <SectionTask title="Detail Shift Harian">
        {/* inputan */}
        {/* nama tugas shift */}
        <label htmlFor="">
          <span className="text-sm leading-base mb-2">Nama Tugas Shift</span>
          <Input
            name="nama_shift"
            value={shift.nama_shift}
            onChange={handleChange}
            placeholder="Nama Shift"
            className="rounded-lg mt-2"
          />
        </label>

        {/* pilih pekerja */}
        <div className="mt-3">
          <label htmlFor="">
            <span className="text-sm leading-base">Tambahkan Pekerja</span>
            <Input
              name="nama_pekerja_shift"
              value={shift.nama_pekerja_shift}
              onChange={handleChange}
              placeholder="tambah pekerja yang ditugaskan pada shift tersebut"
              className="rounded-lg mt-2"
            />
          </label>
        </div>

        {/* waktu shift */}
        <div className="flex flex-row justify-between mt-3">
          <div className="flex flex-col w-full pr-3">
            <label htmlFor="">
              <span className="text-sm leading-base">Waktu Mulai Shift</span>
              <Input
                type="time"
                name="waktu_mulai_shift"
                value={shift.waktu_mulai_shift}
                onChange={handleChange}
                className="rounded-lg mt-2"
              />
            </label>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="">
              <span className="text-sm leading-base">Waktu Selesai Shift</span>
              <Input
                type="time"
                name="waktu_selesai_shift"
                value={shift.waktu_selesai_shift}
                onChange={handleChange}
                className="rounded-lg mt-2"
              />
            </label>
          </div>
        </div>

        {/* jenis shift */}
        <div className="w-fit mt-3">
          <label>
            <span className="text-sm leading-base">Jenis Shift</span>
            <div className="w-fit flex flex-row mt-2 gap-3">
              <Button
                type="button"
                onClick={() => {
                  setActiveType("pagi");
                  setShift((prev) => ({ ...prev, jenis_shift: "pagi" }));
                }}
                className={`w-fit px-3 border ${
                  activeType === "pagi"
                    ? "bg-teal-100 border-primary-dark text-primary-dark hover:bg-teal-100 font-semibold"
                    : "bg-white border-neutral-900 text-neutral-900 hover:bg-gray-100"
                }`}
              >
                Pagi
              </Button>

              <Button
                type="button"
                onClick={() => {
                  setActiveType("siang");
                  setShift((prev) => ({ ...prev, jenis_shift: "siang" }));
                }}
                className={`w-fit px-3 border ${
                  activeType === "siang"
                    ? "bg-teal-100 border-primary-dark text-primary-dark hover:bg-teal-100 font-semibold"
                    : "bg-white border-neutral-900 text-neutral-900 hover:bg-gray-100"
                }`}
              >
                Siang
              </Button>

              <Button
                type="button"
                onClick={() => {
                  setActiveType("malam");
                  setShift((prev) => ({ ...prev, jenis_shift: "malam" }));
                }}
                className={`w-fit px-3 border ${
                  activeType === "malam"
                    ? "bg-teal-100 border-primary-dark text-primary-dark hover:bg-teal-100 font-semibold"
                    : "bg-white border-neutral-900 text-neutral-900 hover:bg-gray-100"
                }`}
              >
                Malam
              </Button>
            </div>
          </label>
        </div>

        {/* buat masukin list tugas shift */}
        <label htmlFor="" className="flex flex-col">
          <span className="text-sm leading-base">List Tugas Shift</span>
          <ol>
            {shift.list_tugas_shift.map((taskShift, index) => (
              <li
                key={index}
                className="flex flex-row items-center border border-neutral-500 px-7 py-3 mt-2 rounded-md"
              >
                {/* nomor */}
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
                <GoX
                  className="text-2xl ml-3 cursor-pointer"
                  onClick={() => removeTask(index)}
                />
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
