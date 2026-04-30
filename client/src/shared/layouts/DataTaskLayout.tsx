import { SearchInput } from "@/shared/components/ui/search-input";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { StatCard } from "@/shared/components/ui/stat-card";

interface StatCardItem {
  title: string;
  value: number | string;
  description: string;
  variant?: "green" | "blue" | "yellow" | "red";
}


interface DataTaskLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  tabs?: {
    label: string;
    path: string;
    key: string;
  }[];
  activeTab?: string;
  statusOptions?: string[];
  statCardData?: StatCardItem[];
}

export default function DataTaskLayout ({
  children,
  title,
  description,
  tabs = [],
  activeTab,
  statusOptions = [],
  statCardData,
}: DataTaskLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-neutral-400 min-h-screen p-25 flex justify-center">
      <div className="bg-white w-6xl px-12 py-6 rounded-lg shadow-md">

        {/* HEADER */}
        <div className="flex flex-row p-5 items-center">
          <GoArrowLeft
            className="text-3xl mr-5 cursor-pointer"
            onClick={() => navigate("/umkm/dashboard")}
          />
          <div>
            <h3 className="font-extrabold text-h5">{title}</h3>
            <p className="text-neutral-600 mt-1.5">{description}</p>
          </div>
        </div>

        {/* statcard */}
        {statCardData && statCardData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 mt-4">
          {statCardData.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              value={item.value}
              description={item.description}
              variant={item.variant}
            />
          ))}
        </div>
      )}

        {/* TABS (optional) */}
        {tabs.length > 0 && (
          <div className="w-fit px-8 mt-6 mb-3">
            <div className="flex gap-10 border-b border-neutral-300 text-lg font-bold text-primary-dark">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => navigate(tab.path)}
                  className={`pb-2 px-5 transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? "border-b-4 border-mint"
                      : "border-b-4 border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SEARCH & FILTER */}
        <div className="flex gap-3 p-6">
          <SearchInput placeholder="Cari..." />

          {statusOptions.length > 0 && (
            <select className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-mint-100/15">
              <option selected disabled >
                Pilih Status
              </option>

              {statusOptions.map((status) => (
                <option key={status} value={status.toLowerCase()}>
                  {status}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* CONTENT */}
        {children}
      </div>
    </div>
  );
}
