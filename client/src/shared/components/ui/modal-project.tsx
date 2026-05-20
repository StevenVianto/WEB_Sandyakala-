import type { Project } from "@/features/umkm/types/dashboard.types";
import { GoArrowLeft } from "react-icons/go";

interface ModalDetailProjectProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getMemberList(str: string) {
  return str.split(",").map((s) => s.trim()).filter(Boolean);
}

const statusClasses: Record<string, string> = {
  revisi: "bg-red-100 text-red-700",
  review: "bg-yellow-100 text-yellow-700",
  selesai: "bg-green-100 text-green-700",
};

export function ModalDetailProject({
  open,
  onClose,
  project,
}: ModalDetailProjectProps) {
  if (!open || !project) return null;

  const members = getMemberList(project.anggota_tim_project);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-500/50">
          <div className="flex items-center gap-7">
            <GoArrowLeft
              className="text-2xl cursor-pointer"
              onClick={onClose}
            />
            <div className="flex flex-col items-start">
              <p className="font-bold text-md whitespace-break-spaces">{project.nama_project}</p>
              <p className="text-xs text-neutral-500">
                {project.divisi_project}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              statusClasses[project.status_project.toLowerCase()] ??
              "bg-neutral-200 text-neutral-700"
            }`}
          >
            {project.status_project}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col gap-4">

          {/* Detail info */}
          <div className="flex flex-col gap-1">
            {[
              ["Mulai Proyek", formatDate(project.tanggal_mulai_project)],
              ["Deadline Proyek", formatDate(project.tanggal_selesai_project)],
              ["Divisi / Posisi", project.divisi_project],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between items-center py-2 border-b border-neutral-100 text-sm last:border-none"
              >
                <span className="text-neutral-500">{label}</span>
                <span className="font-medium text-neutral-800">{value}</span>
              </div>
            ))}
          </div>

          {/* Anggota tim */}
          <div>
            <p className="text-sm font-semibold text-neutral-700 mb-2">
              Anggota Tim
              <span className="ml-2 text-xs font-normal text-neutral-400">
                ({members.length} orang)
              </span>
            </p>
            <div className="flex flex-col gap-2">
              {members.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-3 bg-neutral-50 rounded-lg px-3 py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-xs shrink-0">
                    {getInitials(name)}
                  </div>
                  <span className="text-sm text-neutral-800">{name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}