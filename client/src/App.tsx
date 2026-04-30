import { useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerificationPage from "./pages/admin/VerificationPage";
import DetailVerificationPage from "./pages/admin/DetailVerificationPage";
import ReportPage from "./pages/admin/ReportPage";
import DetailReportPage from "./pages/admin/DetailReportPage";

import AddShift from "./pages/umkm/AddShift";
import AddProject from "./pages/umkm/AddProject";

import HomeUmkmPage from "./pages/umkm/HomeUmkmPage";
import DashboardUmkmPage from "./pages/umkm/DashboardUmkmPage";
import LowonganUmkmPage from "./pages/umkm/LowonganUmkmPage";
import ProfileUmkmPage from "./pages/umkm/ProfileUmkmPage";
import type { type } from "os";
import DataShift from "./pages/umkm/DataShift";
import DataProject from "./pages/umkm/DataProject";
import DataPekerja from "./pages/umkm/DataPekerja";

function App() {
  const [shifts, setShifts] = useState<any[]>([
    {
      id: "1",
      nama_shift: "UI/UX Designer",
      nama_pekerja_shift: "Kathryn Murphy",
      list_tugas_shift: "Design Promo Toko",
      waktu_mulai_shift: "07:00",
      waktu_selesai_shift: "12:00",
      jenis_shift: "pagi",
      tanggal_shift: "2025-03-18",
      jamMasuk: "06:55",
      jamPulang: "12:05",
      status_shift: "Disetujui",
    },
  ]);
  const [projects, setProjects] = useState<any[]>([
    {
      id: 1,
      nama_project: "Redesign Web Tokopedia",
      divisi_project: "UI/UX Designer",
      anggota_tim_project: "3 anggota",
      penanggung_jawab_project: "Kathryn Murphy",
      tanggal_mulai_project: "1 Maret 2025",
      tanggal_selesai_project: "15 Maret 2025",
      status_project: "Review",
    },
  ]);
  const [employees, setEmployees] = useState<any[]>([
    {
      id: 1,
      nama_pekerja: "Kathryn Murphy",
      posisi_pekerja: "UI/UX Designer",
      jenis_penugasan_pekerja: "Berbasis Proyek",
      no_hp_pekerja: "081234567890",
      tanggal_masuk_pekerja: "19 Maret 2025",
      status_pekerja: "Aktif",
    },
  ]);

  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage} />

        <Route path="/auth">
          <Route path="login" Component={LoginPage} />
          <Route path="register" Component={RegisterPage} />
        </Route>

        {/* Route for Admin */}
        <Route path="/admin">
          <Route path="dashboard" Component={DashboardPage} />
          <Route path="verifikasi" Component={VerificationPage} />
          <Route
            path="verifikasi/:namaUsaha"
            Component={DetailVerificationPage}
          />
          <Route path="laporan" Component={ReportPage} />
          <Route path="laporan/:namaUsaha" Component={DetailReportPage} />
        </Route>

        {/* Route for UMKM */}
        <Route path="/umkm">
          <Route path="home" Component={HomeUmkmPage} />
          <Route path="lowongan" Component={LowonganUmkmPage} />
          <Route path="profile" Component={ProfileUmkmPage} />

          {/* Dashboard Area */}
          <Route
            path="dashboard"
            element={
              <Outlet context={{ shifts, setShifts, projects, setProjects, employees, setEmployees }} />
            }
          >
            <Route index element={<DashboardUmkmPage />} />
            <Route path="addproject" element={<AddProject />} />
            <Route path="addshift" element={<AddShift type="pagi" />} />
            <Route path="data-shift" element={<DataShift />} />
            <Route path="data-project" element={<DataProject />} />
            <Route path="data-pekerja" element={<DataPekerja />} />
          </Route>
        </Route>

        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
}

export default App;
