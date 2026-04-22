import DashboardUmkmLayout from "@/shared/layouts/DashboardUmkmLayout";
import TabRekrutmen from "./TabRekrutmen";
import TabProject from "./TabProject";
import TabShift from "./TabShift";
import type { TabsType } from "../types/dashboard.types";
import HeroSection from "./HeroSection";
import { useState } from "react";
import { dataStatCard } from "../constants/mock-data";
import BgImgRekrutmen from "@/assets/images/Bg Img Dashboard Umkm.png";
import BgImgTabProject from "@/assets/images/Bg Img Tab Project.png";
import BgImgTabShift from "@/assets/images/Bg Img Tab Shift.png";

export default function DashboardUmkm() {
  const [activeTab, setActiveTab] = useState<TabsType>("rekrutmen");

  return (
    <DashboardUmkmLayout>
      {activeTab === "rekrutmen" ? (
        <HeroSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          description="Pantau rekrutmen dan seleksi talenta usahamu"
          isShowButtonRight={true}
          statCardData={dataStatCard.rekrutmen}
          bgImage={BgImgRekrutmen}
        />
      ) : activeTab === "project" ? (
        <HeroSection
          title="Status Proyek Saat Ini"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          description="Pantau tugas proyek dari pekerja mu"
          isShowButtonRight={false}
          statCardData={dataStatCard.project}
          bgImage={BgImgTabProject}
        />
      ) : (
        <HeroSection
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isShowButtonRight={false}
          statCardData={dataStatCard.shift}
          isShowTitleDescription={false}
          bgImage={BgImgTabShift}
        />
      )}

      {activeTab === "rekrutmen" && <TabRekrutmen />}
      {activeTab === "project" && <TabProject />}
      {activeTab === "shift" && <TabShift />}
    </DashboardUmkmLayout>
  );
}
