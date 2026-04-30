import AddProject from "../../features/umkm/components/AddProject";
import DashboardUmkmLayout from "@/shared/layouts/DashboardUmkmLayout";


type AddProjectProps = {
  projects: any[];
  setProjects: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function AddProjectPage({ projects, setProjects }: AddProjectProps) {
  return (
    <DashboardUmkmLayout>
      <AddProject projects={projects} setProjects={setProjects} />
    </DashboardUmkmLayout>
  );
}