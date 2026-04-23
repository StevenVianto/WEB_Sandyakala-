import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskLayout from "@/shared/layouts/TaskLayout";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { GoX } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import SectionTask from "@/shared/components/ui/section-task";
import type { Project } from "@/features/umkm/types/dashboard.types";

interface AddProjectProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export default function AddProject({ projects, setProjects }: AddProjectProps) {
  // untuk form inputan
  const [project, setProject] = useState<Project>({
    id: "",
    nama_project: "",
    deskripsi_project: "",
    tanggal_mulai_project: "",
    tanggal_selesai_project: "",
    list_tugas_project: [""],
    anggota_tim_project: "",
    penanggung_jawab_project: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...project.list_tugas_project];
    newTasks[index] = value;

    setProject({
      ...project,
      list_tugas_project: newTasks,
    });
  };

  //nambahin list tugas
  const addTaskProject = () => {
    setProject({
      ...project,
      list_tugas_project: [...project.list_tugas_project, ""],
    });
  };

  // hapus list
  const removeTask = (index: number) => {
    const newTasks = project.list_tugas_project.filter((_, i) => i !== index);

    setProject({
      ...project,
      list_tugas_project: newTasks,
    });
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    const newProject = {
      ...project,
      id: String(projects.length + 1),
    };

    setProjects([...projects, newProject]);

    navigate("/umkm/home");
  };

  return (
    <div>
      <TaskLayout type="project" onSubmit={handleAdd}>
        <SectionTask title="Detail Project">
          {/* inputan */}
          {/* nama tugas project */}
          <label htmlFor="">
            <span className="text-sm leading-base mb-2">Nama Project</span>
            <Input
              name="nama_project"
              value={project.nama_project}
              onChange={handleChange}
              placeholder="Nama project yang ingin diberikan"
              className="rounded-lg mt-2 mb-2"
            />
          </label>

          {/* deskripsi project */}
          <label htmlFor="" className="flex flex-col ">
            <span className="text-sm leading-base mb-2">
              Deskripsi & Tugas Project
            </span>
            <textarea
              name="deskripsi_project"
              value={project.deskripsi_project}
              onChange={handleChange}
              placeholder="Deskripsikan tugas project yang akan diberikan"
              className="w-full px-6 py-2.5 text-sm outline-none transition rounded-lg focus:border-primary border border-gray-300 focus:ring focus:ring-primary"
            ></textarea>
          </label>

          {/* tanggal project */}
          <div className="flex flex-row justify-between mt-3">
            <div className="flex flex-col w-full pr-3">
              <label htmlFor="">
                <span className="text-sm leading-base">
                  Tanggal Mulai Project
                </span>
                <Input
                  type="date"
                  name="tanggal_mulai_project"
                  value={project.tanggal_mulai_project}
                  onChange={handleChange}
                  className="rounded-lg mt-2"
                />
              </label>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="">
                <span className="text-sm leading-base">
                  Tanggal Selesai Project
                </span>
                <Input
                  type="date"
                  name="tanggal_selesai_project"
                  value={project.tanggal_selesai_project}
                  onChange={handleChange}
                  className="rounded-lg mt-2"
                />
              </label>
            </div>
          </div>
        </SectionTask>

        {/* milestone */}
        <SectionTask title="Milestone & Tahapan">
          {/* buat masukin milestone & tahapan project */}
          <label htmlFor="" className="flex flex-col">
            <ol>
              {project.list_tugas_project.map((taskProject, index) => (
                <li
                  key={index}
                  className="flex flex-row items-center border border-neutral-500 px-7 py-3 mt-2 rounded-md"
                >
                  {/* nomor */}
                  <span className="mr-5 font-bold bg-primary-dark px-3 py-1 text-white rounded-full">
                    {index + 1}
                  </span>
                  <Input
                    value={taskProject}
                    name="list_tugas_project"
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
                onClick={addTaskProject}
                className="bg-white border border-teal-300 text-teal-300 rounded-lg mt-5 hover:bg-teal-100 font-semibold"
              >
                <GoPlus className="text-teal-300 mr-2" /> Tambah Tugas
              </Button>
            </ol>
          </label>
        </SectionTask>

        {/* tim pekerja */}
        <SectionTask title="Tim Pekerja">
          {/* pilih pekerja */}
          <div className="mt-3">
            <label htmlFor="">
              <span className="text-sm leading-base">
                Tambahkan Anggota Tim
              </span>
              <Input
                name="anggota_tim_project"
                value={project.anggota_tim_project}
                onChange={handleChange}
                placeholder="tambah pekerja yang akan ditugaskan pada project"
                className="rounded-lg mt-2 mb-2"
              />
            </label>
            <label htmlFor="">
              <span className="text-sm leading-base">
                Penanggung Jawab Utama
              </span>
              <Input
                name="penanggung_jawab_project"
                value={project.penanggung_jawab_project}
                onChange={handleChange}
                placeholder="tambah pekerja yang akan menjadi penanggung jawab pada project"
                className="rounded-lg mt-2"
              />
            </label>
          </div>
        </SectionTask>
      </TaskLayout>
    </div>
  );
}
