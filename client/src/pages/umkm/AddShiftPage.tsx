import DashboardUmkmLayout from "@/shared/layouts/DashboardUmkmLayout";
import AddShift from "../../features/umkm/components/AddShift";

type AddShiftProps = {
  shifts: any[];
  setShifts: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function AddShiftPage({ shifts, setShifts }: AddShiftProps) {
  return (
    <DashboardUmkmLayout>
      <AddShift type="pagi" shifts={shifts} setShifts={setShifts} />
    </DashboardUmkmLayout>
  );
}