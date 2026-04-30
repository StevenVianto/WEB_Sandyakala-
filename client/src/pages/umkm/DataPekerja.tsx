import { useOutletContext } from "react-router-dom";
import DataTaskLayout from "@/shared/layouts/DataTaskLayout";

interface StatCardItem {
  title: string;
  value: number | string;
  description: string;
  variant?: "green" | "blue" | "yellow" | "red";
}

type Employee = {
  id: number;
  nama_pekerja: string;
  posisi_pekerja: string;
  jenis_penugasan_pekerja: string;
  no_hp_pekerja: string;
  tanggal_masuk_pekerja: string;
  status_pekerja: "Aktif" | "Nonaktif";
};

type OutletContextType = {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
};

export default function DataPekerja() {
  const { employees } = useOutletContext<OutletContextType>();
  const showDetailButtonEmployee = ["Aktif", "Nonaktif"];

  // Atur status project
  const getStatusBadgeEmployee = (
    status_pekerja: Employee["status_pekerja"],
  ) => {
    const classesEmployee: Record<string, string> = {
      nonaktif: "bg-error-100 text-error",
      aktif: "bg-success-100/50 text-success-300",
    };
    return classesEmployee[status_pekerja.toLowerCase()] ?? "";
  };

  const statCardDataPekerja: StatCardItem[] = [
    {
      title: "Pekerja Aktif",
      value: employees.filter((e) => e.status_pekerja === "Aktif").length,
      description: "Sedang bekerja",
      variant: "green",
    },
    {
      title: "Pekerja Nonaktif",
      value: employees.filter((e) => e.status_pekerja === "Nonaktif").length,
      description: "Tidak aktif",
      variant: "red",
    },
    {
      title: "Total Pekerja",
      value: employees.length,
      description: "Jumlah seluruh pekerja",
      variant: "blue",
    },
  ];

  return (
    <DataTaskLayout
      title="Data Pekerja"
      description="Kelola semua pekerja dalam satu tampilan"
      statusOptions={["Aktif", "Nonaktif"]}
      statCardData={statCardDataPekerja}
    >
      <div className="w-full px-6">
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full table-auto border-collapse text-sm text-neutral-900">
            <thead>
              <tr className="bg-mint/15 text-center">
                <th className="border px-3 py-2">No</th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  Nama Pekerja
                </th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  Posisi Pekerja
                </th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  Jenis Penugasan
                </th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  No Handphone
                </th>
                <th className="border px-3 py-2 whitespace-nowrap">
                  Mulai Bergabung
                </th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((Employee, index) => (
                  <tr
                    key={Employee.id ?? index}
                    className="hover:bg-neutral-100 transition text-center text-xs"
                  >
                    <td className="border px-3 py-2">{index + 1}</td>

                    <td className="border px-3 py-2 whitespace-nowrap">
                      {Employee.nama_pekerja}
                    </td>

                    <td className="border px-3 py-2 max-w-160px truncate">
                      {Employee.posisi_pekerja}
                    </td>

                    <td className="border px-3 py-2 capitalize">
                      {Employee.jenis_penugasan_pekerja}
                    </td>

                    <td className="border px-3 py-2 whitespace-nowrap">
                      {Employee.no_hp_pekerja}
                    </td>

                    <td className="border px-3 py-2 whitespace-nowrap">
                      {Employee.tanggal_masuk_pekerja}
                    </td>

                    <td className="border px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${getStatusBadgeEmployee(
                          Employee.status_pekerja,
                        )}`}
                      >
                        {Employee.status_pekerja}
                      </span>
                    </td>

                    <td className="border px-3 py-2">
                      {showDetailButtonEmployee.includes(
                        Employee.status_pekerja,
                      ) && (
                        <button className="border border-primary-dark px-3 py-1 text-xs rounded-md hover:bg-primary-dark hover:text-white transition cursor-pointer">
                          Detail
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-5 text-neutral-500"
                  >
                    Tidak ada data proyek
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DataTaskLayout>
  );
}
