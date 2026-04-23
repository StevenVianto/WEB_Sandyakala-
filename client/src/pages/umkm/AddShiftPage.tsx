import DashboardUmkmLayout from "@/shared/layouts/DashboardUmkmLayout";
import AddShift from "../../features/umkm/components/AddShift";
import { useState } from "react";
import type { Shift } from "@/features/umkm/types/dashboard.types";

export default function AddShiftPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);

  return (
    <DashboardUmkmLayout>
      <AddShift type="pagi" shifts={shifts} setShifts={setShifts} />
    </DashboardUmkmLayout>
  );
}
