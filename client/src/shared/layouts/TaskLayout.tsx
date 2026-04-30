import { Button } from "@/shared/components/ui/button";import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface TaskLayoutProps {
  children: React.ReactNode;
  type: "shift" | "project";
  onSubmit: (e: React.FormEvent) => void;
}

export default function TaskLayout({
  children,
  type,
  onSubmit,
}: TaskLayoutProps) {
  // navigasi
  const navigate = useNavigate();
  // button active
  const [activeType, setActiveType] = useState<"shift" | "project">(type);

  return (
    <div className="bg-neutral-400 p-25 flex justify-center">
      <div className="bg-white w-3xl items-center mt-10 px-12 py-6 rounded-lg shadow-md">
        {/* HEADER */}
        <div className="flex flex-row p-5 items-center">
          <GoArrowLeft
            className="text-3xl mr-5 cursor-pointer"
            onClick={() => navigate("/umkm/dashboard")}
          />
          <div className="flex flex-col font-sans">
            <h3 className="font-extrabold text-h5">Buat Tugas Baru</h3>
            <p className="text-neutral-600 mt-1.5">
              Pilih jenis tugas yang ingin diberikan kepada pekerja
            </p>
          </div>
        </div>

        {/* BUTTON TYPE */}
        <div className="w-full flex flex-row px-8 gap-6">
          <Button
            type="button"
            onClick={() => {
              setActiveType("shift");
              navigate("/umkm/dashboard/addshift");
            }}
            className={`flex-1 border rounded-lg font-extrabold ${
              activeType === "shift"
                ? "bg-teal-100 border-primary-dark text-primary-dark hover:bg-teal-100"
                : "bg-white border-primary-dark text-primary-dark hover:bg-teal-100"
            }`}
          >
          Shift Harian
          </Button>

          <Button
            type="button"
            onClick={() => {
              setActiveType("project");
              navigate("/umkm/dashboard/addproject");
            }}
            className={`flex-1 border rounded-lg font-extrabold ${
              activeType === "project"
                ? "bg-teal-100 border-primary-dark text-primary-dark hover:bg-teal-100"
                : "bg-white border-primary-dark text-primary-dark hover:bg-teal-100"
            }`}
          >
          Project
          </Button>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit} className="space-y-6">
          {children}

          {/* ACTION BUTTON */}
          <div className="flex flex-row justify-end w-full mt-10">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-error-300 text-error-300 bg-white hover:bg-error-100"
            >
              Batal
            </Button>

            <Button type="submit" className="bg-primary-dark text-white ml-7" >
              Kirim Tugas {type === "shift" ? "Shift" : "Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
