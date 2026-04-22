import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
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
import UmkmLayout from "./pages/umkm/UmkmLayout";
import HomepageAfterLogin from "./pages/umkm/HomepageAfterLogin";
import Dashboard from "./pages/umkm/Dashboard";

function App() {
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

        {/* umkm */}
        <Route path="/umkm" element={<UmkmLayout />}>
          <Route path="homepage" element={<HomepageAfterLogin />} />

          <Route path="dashboard" element={<Dashboard />}>
            <Route
              index
              element={
                <div className="mt-24 p-5">
                  <h1>Dashboard</h1>
                  <Link to="addshift">Go to addshift</Link>
                </div>
              }
            />
            <Route path="addshift" element={<AddShift type="pagi" />} />
            <Route path="addproject" element={<AddProject />} />
          </Route>
        </Route>

        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
}

export default App;
