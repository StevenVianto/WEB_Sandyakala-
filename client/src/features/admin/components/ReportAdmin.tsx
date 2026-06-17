import { useState, useMemo, useEffect } from "react";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { SearchInput } from "@/shared/components/ui/search-input";
import { StatCard } from "@/shared/components/ui/stat-card";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { apiRequest } from "@/shared/lib/api";
import { Skeleton } from "@/shared/components/ui/skeleton";

type StatusFilter =
  | ""
  | "Menunggu"
  | "Valid"
  | "Peringatan"
  | "Blokir"
  | "Ditolak";

type VariantStatus =
  | "warning"
  | "orange"
  | "success"
  | "error"
  | "primary"
  | "gray"
  | "info"
  | "success2";

interface TableReportItem {
  id: number;
  namaUsaha: string;
  kategoriPelanggaran: string;
  alasanPelaporan: string;
  status: StatusFilter;
  variantStatus: VariantStatus;
  slug: string;
}

const dataStatCardReport: {
  title: string;
  description: string;
  variant: "blue" | "yellow" | "success2" | "orange" | "red" | "gray";
  filterStatus: StatusFilter;
}[] = [
  {
    title: "Total Laporan",
    description: "Keseluruhan laporan masuk",
    variant: "blue",
    filterStatus: "",
  },
  {
    title: "Menunggu",
    description: "Belum ditindaklanjuti",
    variant: "yellow",
    filterStatus: "Menunggu",
  },
  {
    title: "Valid",
    description: "Laporan terbukti valid",
    variant: "success2",
    filterStatus: "Valid",
  },
  {
    title: "Peringatan",
    description: "UMKM mendapat peringatan",
    variant: "orange",
    filterStatus: "Peringatan",
  },
  {
    title: "Blokir",
    description: "UMKM diblokir",
    variant: "red",
    filterStatus: "Blokir",
  },
  {
    title: "Ditolak",
    description: "Laporan tidak valid",
    variant: "gray",
    filterStatus: "Ditolak",
  },
];

const STATUS_OPTIONS: StatusFilter[] = [
  "",
  "Menunggu",
  "Valid",
  "Peringatan",
  "Blokir",
  "Ditolak",
];

const STATUS_VARIANT: Record<StatusFilter, VariantStatus> = {
  "": "warning",
  "Menunggu": "warning",
  "Valid": "success2",
  "Peringatan": "orange",
  "Blokir": "error",
  "Ditolak": "gray"
};

export default function ReportAdmin() {
  const [reportsData, setReportsData] = useState<TableReportItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await apiRequest<any[]>("/reports");
        if (response.success && response.data) {
          const mapped: TableReportItem[] = response.data.map((r: any) => ({
            id: r.id,
            namaUsaha: r.namaUsaha || "Usaha Anonim",
            kategoriPelanggaran: r.kategoriPelanggaran || "Umum",
            alasanPelaporan: r.alasanPelaporan || "-",
            status: (r.status as StatusFilter) || "Menunggu",
            variantStatus: STATUS_VARIANT[r.status as StatusFilter] || "warning",
            slug: (r.namaUsaha || "usaha").toLowerCase().replace(/\s+/g, "-")
          }));
          setReportsData(mapped);
        }
      } catch (e) {
        console.error("Error fetching reports", e);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredData = useMemo(() => {
    return reportsData.filter((item) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.namaUsaha.toLowerCase().includes(q) ||
        item.kategoriPelanggaran.toLowerCase().includes(q) ||
        item.alasanPelaporan.toLowerCase().includes(q);

      const matchStatus = !statusFilter || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter, reportsData]);

  const statCardsWithCount = useMemo(() => {
    return dataStatCardReport.map((card) => ({
      ...card,
      value: card.filterStatus
        ? reportsData.filter((d) => d.status === card.filterStatus).length
        : reportsData.length,
    }));
  }, [reportsData]);

  function handleStatCardClick(filterStatus: string) {
    setStatusFilter((filterStatus as StatusFilter) ?? "");
    setIsDropdownOpen(false);
  }

  function handleStatusSelect(status: StatusFilter) {
    setStatusFilter(status);
    setIsDropdownOpen(false);
  }

  return (
    <DashboardLayout
      title="Pelanggaran UMKM"
      description="Monitor dan tindak laporan pelanggaran UMKM"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {statCardsWithCount.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer w-full transition-opacity hover:opacity-80"
            onClick={() => handleStatCardClick(item.filterStatus ?? "")}
            title={`Filter: ${item.filterStatus || "Semua"}`}
          >
            <StatCard
              variant={item.variant}
              title={item.title}
              value={loading ? <Skeleton className="h-9 w-12 bg-white/20" /> : item.value}
              description={item.description}
              className={
                statusFilter === (item.filterStatus ?? "")
                  ? "ring-2 ring-offset-1 ring-current"
                  : ""
              }
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
        <div className="space-y-1.5">
          <h1 className="text-xl font-semibold">Daftar Laporan Pelanggaran</h1>
          <p className="text-sm text-gray-500">
            Klik baris untuk melihat detail laporan &mdash;{" "}
            <span className="font-medium text-gray-700">
              {loading ? (
                <Skeleton className="inline-block h-4 w-12 mr-1" />
              ) : (
                filteredData.length
              )}{" "}
              dari{" "}
              {loading ? (
                <Skeleton className="inline-block h-4 w-12 mr-1" />
              ) : (
                reportsData.length
              )}{" "}
              laporan
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-md">
            <SearchInput
              placeholder="Cari nama usaha atau kategori...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <Button
              variant={"soft"}
              className="text-sm w-max whitespace-nowrap rounded-md bg-white border font-semibold flex items-center gap-1"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              {statusFilter || "Status Laporan"}
              <MdKeyboardArrowDown
                className={`h-6 w-6 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </Button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 z-50 bg-white border rounded-md shadow-lg min-w-160px py-1">
                {STATUS_OPTIONS.map((option) => (
                  <button
                    key={option}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      statusFilter === option
                        ? "font-semibold text-primary"
                        : "text-gray-700"
                    }`}
                    onClick={() => handleStatusSelect(option)}
                  >
                    {option || "Semua Status"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-x-scroll md:overflow-x-hidden overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-100 text-sm">
            <tr>
              <th className="table-head">No</th>
              <th className="table-head">Nama Usaha</th>
              <th className="table-head">Kategori Pelanggaran</th>
              <th className="table-head">Alasan Pelaporan</th>
              <th className="table-head">Status</th>
              <th className="table-head">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="bg-white border-b border-gray-100">
                  <td className="table-data"><Skeleton className="h-4 w-4" /></td>
                  <td className="table-data"><Skeleton className="h-4 w-32" /></td>
                  <td className="table-data"><Skeleton className="h-4 w-28" /></td>
                  <td className="table-data"><Skeleton className="h-4 w-48" /></td>
                  <td className="table-data"><Skeleton className="h-5 w-16 rounded-full" /></td>
                  <td className="table-data"><Skeleton className="h-7 w-16 rounded-md" /></td>
                </tr>
              ))
            ) : filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="table-data text-center text-gray-400 py-10"
                >
                  Tidak ada laporan yang sesuai dengan pencarian.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id} className="bg-white">
                  <td className="table-data font-medium">{index + 1}</td>
                  <td className="table-data font-medium">{item.namaUsaha}</td>
                  <td className="table-data font-medium">
                    {item.kategoriPelanggaran}
                  </td>
                  <td className="table-data max-w-50 text-xs">
                    {item.alasanPelaporan}
                  </td>
                  <td className="table-data">
                    <Badge
                      size={"sm"}
                      variant={item.variantStatus}
                      className="border-none text-black"
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="table-data">
                    <Link
                      to={`/admin/laporan/${item.slug}`}
                      className="text-center block border p-1 border-primary rounded-md text-blue-600 cursor-pointer hover:bg-primary/25"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </DashboardLayout>
  );
}

