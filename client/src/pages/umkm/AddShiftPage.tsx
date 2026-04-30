import DashboardUmkmLayout from "@/shared/layouts/DashboardUmkmLayout";
import AddShift from "../../features/umkm/components/AddShift";

type Props = {
  shifts: any[];
  setShifts: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function AddShiftPage({ shifts, setShifts }: Props) {
  return (
    <DashboardUmkmLayout>
      <AddShift type="pagi" shifts={shifts} setShifts={setShifts} />
    </DashboardUmkmLayout>
  );
}