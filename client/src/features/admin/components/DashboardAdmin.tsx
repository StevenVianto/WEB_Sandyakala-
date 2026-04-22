import DashboardLayout from "@/shared/layouts/DashboardLayout";
import { Card, CardBody, CardHeader } from "@/shared/components/ui/card";
import { StatCard } from "@/shared/components/ui/stat-card";
import PopularUmkm from "./PopularUmkm";
import ActionCard from "./ActionCard";
import {
  dataActionCard,
  dataPopularUmkm,
  dataStatCard,
} from "../constants/data-dashboard";

export default function DashboardAdmin() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Ringkasan platform FreshStart"
    >
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 mb-4">
        {dataStatCard.map((item, index) => (
          <StatCard
            key={index}
            variant={item.variant}
            title={item.title}
            value={item.value}
            description={item.description}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
        <div className="md:w-[60%] w-full">
          <Card className="bg-info-100/20 border-2 border-info-100">
            <CardHeader className="flex items-center justify-between py-4 border-b border-info-100">
              <h1 className="font-semibold text-base">
                Kategori UMKM Terpopuler
              </h1>
              <h2 className="font-semibold text-sm">Total 98 Aktif</h2>
            </CardHeader>
            <CardBody className="bg-white space-y-4 pb-6">
              {dataPopularUmkm.map((item, index) => (
                <PopularUmkm
                  key={index}
                  category={item.category}
                  count={item.count}
                  color={item.color}
                />
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="md:w-[40%] w-full">
          <Card className="bg-info-100/20 border-2 border-info-100">
            <CardHeader className="flex items-center justify-between py-4 border-b border-info-100">
              <h1 className="font-bold text-base">Aksi Cepat</h1>
            </CardHeader>
            <CardBody className="bg-white space-y-4 pt-5 pb-10">
              {dataActionCard.map((item, index) => (
                <ActionCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={<item.icon className={item.iconStyle} />}
                  to={item.to}
                  variant={item.variant}
                />
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
