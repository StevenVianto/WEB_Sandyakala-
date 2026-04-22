import { Badge } from "@/shared/components/ui/badge";
import { Link } from "react-router-dom";
import ProgressBar from "./ui/ProgressBar";
import { FaPlus } from "react-icons/fa6";
import { Card } from "./ui/Card";
import TitleCard from "./ui/TitleCard";

export default function TabProject() {
  return (
    <section className="container pb-10">
      <div className="flex gap-2 mb-8">
        <Link
          to="/umkm/dashboard/addproject"
          className="flex items-center gap-2 px-4 py-2.5 border hover:bg-mint-200 transition-all duration-100 hover:text-white cursor-pointer border-mint text-mint bg-mint-200/50 text-sm rounded-md"
        >
          <FaPlus className=" text-xl" /> Tambah Project
        </Link>
        <Link
          to="/umkm/projects"
          className="px-4 text-mint py-2.5 border hover:bg-mint-200/50 border-mint cursor-pointer text-sm rounded-md"
        >
          Lihat Project
        </Link>
      </div>

      <TitleCard title="Proyek Terbaru" link="/umkm/projects" />

      <Card className="mb-10">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="rounded-md shadow-md px-6 pt-3.5 bg-neutral-100"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">
                    Redesign Website Toko
                  </h3>
                  <p className="tetx-xs text-gray-400">
                    UI/UX Designer - 7/11 task deadline 28 Maret 2026
                  </p>
                </div>
                <Badge variant={"warning"} size={"sm"}>
                  Review
                </Badge>
              </div>
              <ProgressBar percentage={70} />
            </div>
          ))}
      </Card>

      <TitleCard title="Task Aktif" link="/umkm/projects" className="mb-3" />

      <Card>
        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 text-sm bg-mint rounded-full text-white">
            Semua
          </button>
          <button className="px-4 py-2 text-sm border border-mint rounded-full">
            Draft
          </button>
          <button className="px-4 py-2 text-sm border border-mint rounded-full">
            Review
          </button>
          <button className="px-4 py-2 text-sm border border-mint rounded-full">
            Revisi
          </button>
          <button className="px-4 py-2 text-sm border border-mint rounded-full">
            Selesai
          </button>
        </div>

        <div className="space-y-2">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h3 className="font-medium text-lg">
                      Wireframe Halaman Utama
                    </h3>
                    <p className="text-xs text-gray-500">
                      Rizki Handoko - Redesign Web Toko
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Badge
                      variant={"error"}
                      size={"sm"}
                      className="py-2 px-5 bg-white"
                    >
                      28-03-2026
                    </Badge>
                    <Badge variant={"info"} size={"sm"} className="py-2 px-5">
                      Draft
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </section>
  );
}
