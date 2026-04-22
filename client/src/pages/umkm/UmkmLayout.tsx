import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/shared/components/ui/Navbar";


export default function UmkmLayout() {
  const [shifts, setShifts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  return (
    <>
    <Navbar />
      <div>
      <Outlet context={{ shifts, setShifts, projects, setProjects }} />     
      </div>
    </>
  );
}