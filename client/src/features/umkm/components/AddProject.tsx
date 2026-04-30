import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← hapus useOutletContext di sini
import TaskLayout from "@/shared/layouts/TaskLayout";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { GoX, GoPlus } from "react-icons/go";
import SectionTask from "@/features/umkm/components/ui/section-task";

type Project = {
  id: string;
  nama_project: string;
  divisi_project: string;
  deskripsi_project: string;
  tanggal_mulai_project: string;
  tanggal_selesai_project: string;
  list_tugas_project: string[];
  anggota_tim_project: string;
  penanggung_jawab_project: string;
  status_project: "Review" | "Revisi" | "Selesai";
};

type AddProjectProps = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

export default function AddProject({ projects, setProjects }: AddProjectProps) {
  const navigate = useNavigate();

  const [project, setProject] = useState<Project>({
    id: "",
    nama_project: "",
    divisi_project: "",
    deskripsi_project: "",
    tanggal_mulai_project: "",
    tanggal_selesai_project: "",
    list_tugas_project: [""],
    anggota_tim_project: "",
    penanggung_jawab_project: "",
    status_project: "Review",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...project.list_tugas_project];
    newTasks[index] = value;
    setProject((prev) => ({ ...prev, list_tugas_project: newTasks }));
  };

  const addTaskProject = () => {
    setProject((prev) => ({
      ...prev,
      list_tugas_project: [...prev.list_tugas_project, ""],
    }));
  };

  const removeTask = (index: number) => {
    const newTasks = project.list_tugas_project.filter((_, i) => i !== index);
    setProject((prev) => ({
      ...prev,
      list_tugas_project: newTasks.length ? newTasks : [""],
    }));
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    const filteredTasks = project.list_tugas_project.filter(
      (t) => t.trim() !== "",
    );

    const newProject: Project = {
      ...project,
      id: String(projects.length + 1),
      list_tugas_project: filteredTasks,
      status_project: "Review",
    };

    setProjects((prev) => [...prev, newProject]);
    navigate("/umkm/dashboard/data-project");
  };

  return (
    <TaskLayout type="project" onSubmit={handleAdd}>
      <SectionTask title="Detail Project">
        <label>
          <span className="text-sm mb-2">Nama Project</span>
          <Input
            name="nama_project"
            value={project.nama_project}
            onChange={handleChange}
            placeholder="Nama project"
            className="rounded-lg mt-2 mb-2"
          />
        </label>

        <label>
          <span className="text-sm mb-2">Divisi Project</span>
          <Input
            name="divisi_project"
            value={project.divisi_project}
            onChange={handleChange}
            placeholder="Design / Development / QA"
            className="rounded-lg mt-2 mb-2"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm mb-2">Deskripsi Project</span>
          <textarea
            name="deskripsi_project"
            value={project.deskripsi_project}
            onChange={handleChange}
            placeholder="Deskripsi project"
            className="w-full px-6 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring focus:ring-primary"
          />
        </label>

        <div className="flex gap-3 mt-3">
          <div className="w-full">
            <span className="text-sm">Tanggal Mulai</span>
            <Input
              type="date"
              name="tanggal_mulai_project"
              value={project.tanggal_mulai_project}
              onChange={handleChange}
              className="mt-2 rounded-lg"
            />
          </div>

          <div className="w-full">
            <span className="text-sm">Tanggal Selesai</span>
            <Input
              type="date"
              name="tanggal_selesai_project"
              value={project.tanggal_selesai_project}
              onChange={handleChange}
              className="mt-2 rounded-lg"
            />
          </div>
        </div>
      </SectionTask>

      <SectionTask title="Milestone">
        <ol>
          {project.list_tugas_project.map((task, index) => (
            <li
              key={index}
              className="flex flex-row items-center border border-neutral-500 px-7 py-3 mt-2 rounded-md"
            >
              <span className="mr-5 font-bold bg-primary-dark px-3 py-1 text-white rounded-full">
                {index + 1}
              </span>

              <Input
                value={task}
                onChange={(e) => handleTaskChange(index, e.target.value)}
                placeholder="Tugas project"
                className="rounded-lg"
              />

              <GoX
                className="ml-3 cursor-pointer"
                onClick={() => removeTask(index)}
              />
            </li>
          ))}

          <Button
            type="button"
            onClick={addTaskProject}
            className="bg-white border border-teal-300 text-teal-300 rounded-lg mt-5 hover:bg-teal-100 font-semibold"
          >
            <GoPlus className="mr-2" /> Tambah Tugas
          </Button>
        </ol>
      </SectionTask>

      <SectionTask title="Tim">
        <span className="text-sm">Tambahkan Anggota Tim</span>
        <Input
          name="anggota_tim_project"
          value={project.anggota_tim_project}
          onChange={handleChange}
          placeholder="Anggota tim"
          className="mb-2 rounded-lg"
        />

        <span className="text-sm">Penanggung Jawab Tim</span>

        <Input
          name="penanggung_jawab_project"
          value={project.penanggung_jawab_project}
          onChange={handleChange}
          placeholder="Penanggung jawab"
          className="rounded-lg"
        />
      </SectionTask>
    </TaskLayout>
  );
}
