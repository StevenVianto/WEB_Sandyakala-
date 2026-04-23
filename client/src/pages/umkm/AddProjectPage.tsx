import { useState } from "react";
import AddProject from "../../features/umkm/components/AddProject";
import DashboardUmkmLayout from "@/shared/layouts/DashboardUmkmLayout";
import type { Project } from "@/features/umkm/types/dashboard.types";

export default function AddProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <DashboardUmkmLayout>
      <AddProject projects={projects} setProjects={setProjects} />
    </DashboardUmkmLayout>
  );
}
