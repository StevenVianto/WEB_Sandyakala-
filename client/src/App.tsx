import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerificationPage from "./pages/admin/VerificationPage";
import DetailVerificationPage from "./pages/admin/DetailVerificationPage";
import ReportPage from "./pages/admin/ReportPage";
import DetailReportPage from "./pages/admin/DetailReportPage";

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

        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
}

export default App;
