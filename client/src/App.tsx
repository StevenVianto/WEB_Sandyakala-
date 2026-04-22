import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
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


function App() {
  const [shifts, setShifts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

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
          <Route path="verifikasi/:namaUsaha" Component={DetailVerificationPage} />
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
          element={<Outlet context={{ shifts, setShifts, projects, setProjects }} />}
        >
          <Route index element={<DashboardUmkmPage />} />
          <Route path="addproject" element={<AddProject />} />
          <Route path="addshift" element={<AddShift type="pagi" />} />
        </Route>
        </Route>

        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
}

export default App;
