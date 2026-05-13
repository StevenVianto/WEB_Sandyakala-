import { FcManager } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
        <div className="max-w-6xl mx-auto px-8 py-3 flex items-center justify-between">
          {/* logo freshstart */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/umkm/home")}>
            <img src={logo} alt="FreshStart" className="h-10 w-auto object-contain" />
          </div>

          {/* link nav */}
          <ul className="hidden md:flex items-center gap-10 font-bold">
            <li>
              <NavLink
                to="/umkm/home"
                end
                className={({ isActive }) =>
                  `text-sm font-bold transition-colors duration-200 relative pb-1 ${
                    isActive
                      ? "text-teal-400 underline decoration-4 underline-offset-8"
                      : "text-primary-dark hover:text-teal-400"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-sm font-bold transition-colors duration-200 relative pb-1 ${
                    isActive
                      ? "text-teal-400 underline decoration-4 underline-offset-8"
                      : "text-primary-dark hover:text-teal-400"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/umkm/lowongan"
                className={({ isActive }) =>
                  `text-sm font-bold transition-colors duration-200 relative pb-1 ${
                    isActive
                      ? "text-teal-400 underline decoration-4 underline-offset-8"
                      : "text-primary-dark hover:text-teal-400"
                  }`
                }
              >
                Lowongan
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/umkm/profile"
                className={({ isActive }) =>
                  `text-sm font-bold transition-colors duration-200 relative pb-1 ${
                    isActive
                      ? "text-teal-400 underline decoration-4 underline-offset-8"
                      : "text-primary-dark hover:text-teal-400"
                  }`
                }
              >
                Profil UMKM
              </NavLink>
            </li>
            <li>
              <FcManager
                className="text-4xl cursor-pointer"
                onClick={() => navigate("/umkm/profile")}
              />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
