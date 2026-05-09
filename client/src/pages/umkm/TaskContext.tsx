import { createContext, useContext, useState } from "react";
import type { Shift, Project, Pelamar, Wawancara } from "@/features/umkm/types/dashboard.types";
import { mockProjects, mockShifts } from "@/features/umkm/constants/mock-data";
import { getPelamarWithLowongan, getWawancaraWithDetail } from "@/features/umkm/utils/rekrutmen-join";

type PelamarWithLowongan = Pelamar & { posisi_lowongan: string; tipe_lowongan: string };
type WawancaraWithDetail = Pelamar & Wawancara & { posisi_lowongan: string };

type TaskContextType = {
  shifts: Shift[];
  setShifts: React.Dispatch<React.SetStateAction<Shift[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  pelamarList: PelamarWithLowongan[];
  updateStatusPelamar: (id: number, status: Pelamar["status_pelamar"]) => void;
  wawancaraList: WawancaraWithDetail[];
  addWawancara: (data: WawancaraWithDetail) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [shifts, setShifts] = useState<Shift[]>(mockShifts);
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const [pelamarList, setPelamarList] = useState<PelamarWithLowongan[]>(
    getPelamarWithLowongan() as PelamarWithLowongan[]
  );

  const [wawancaraList, setWawancaraList] = useState<WawancaraWithDetail[]>(
    getWawancaraWithDetail() as WawancaraWithDetail[]
  );

  const updateStatusPelamar = (id: number, status: Pelamar["status_pelamar"]) => {
    setPelamarList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status_pelamar: status } : p))
    );
  };

  const addWawancara = (data: WawancaraWithDetail) => {
    setWawancaraList((prev) => [...prev, data]);
  };

  return (
    <TaskContext.Provider value={{
      shifts, setShifts,
      projects, setProjects,
      pelamarList, updateStatusPelamar,
      wawancaraList, addWawancara,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask harus digunakan dengan TaskProvider");
  return context;
}