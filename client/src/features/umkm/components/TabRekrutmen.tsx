import {
  daftarLowongan,
  jadwalWawancara,
  lamaranTerbaru,
} from "../constants/mock-data";
import { cn } from "@/shared/lib/utils";
import { getBadgeStyle } from "../utils/badge-style";
import { Card, CardHeader } from "./ui/Card";

export default function TabRekrutmen() {
  return (
    <section className="container mx-auto px-4 md:px-8 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <Card>
            <CardHeader
              title="Lamaran Terbaru"
              linkTitle="Seleksi Pelamar"
              to={"/umkm/dashboard"}
            />

            <div className="flex flex-col">
              {lamaranTerbaru.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <h3 className="font-medium text-black text-xs md:text-base">
                        {item.name}
                      </h3>
                      <p className="text-gray-700 text-xs md:text-sm">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={cn(
                        "px-3 md:px-6 py-1 rounded-full text-[11px] md:text-xs font-semibold border",
                        getBadgeStyle(item.status),
                      )}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card>
            <CardHeader
              title="Jadwal Wawancara"
              linkTitle="Lihat Wawancara"
              to={"/umkm/dashboard"}
            />

            <div className="flex flex-col gap-3">
              {jadwalWawancara.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-100 rounded-xl py-4 px-6 flex justify-between items-center border border-gray-50"
                >
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs md:text-base">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-xs">{item.role}</p>
                    <p className="text-gray-400 text-xs">{item.project}</p>
                  </div>
                  <span className="bg-red-200 text-red-600 px-3 py-1 rounded-full text-xs font-base">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Daftar Lowongan"
              linkTitle="Lihat Lowongan"
              to={"/umkm/dashboard"}
            />

            <div className="flex flex-col">
              {daftarLowongan.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-4 border-b border-gray-800 last:border-0"
                >
                  <div>
                    <h3 className="font-bold text-black text-xs md:text-base">
                      {item.role}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-xs mt-0.5">
                      {item.type}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className={cn(
                        "px-4 py-1 rounded-full text-[11px] md:text-xs font-semibold border",
                        getBadgeStyle(item.status),
                      )}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
