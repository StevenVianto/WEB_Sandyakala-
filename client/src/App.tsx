import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

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
        </Route>

        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
}

export default App;
