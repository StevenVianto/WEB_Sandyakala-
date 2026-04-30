import { FcManager } from "react-icons/fc";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-between rounded-b-3xl shadow-md z-50 bg-white">
        {/* logo freshstart */}
        <div>
          <div className="flex flex-row items-center gap-2 py-4 pl-15">
            <img
            src="/logoFreshstart.png"
            className=" cursor-pointer w-12"
            alt="Logo FreshStart"
          />
          <p className="text-lg cursor-pointer font-extrabold bg-linear-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            FreshStart
          </p>
          </div>
        </div>

        {/* link nav */}
        <nav className="items-center py-6 pr-15">
          <ul className="flex items-center gap-10 font-bold">
            <li>
              <NavLink
                to="/umkm/homepage"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-400 underline decoration-4 underline-offset-15"
                    : "text-primary-dark"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/umkm/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-400 underline decoration-4 underline-offset-15"
                    : "text-primary-dark"
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-400 underline decoration-4 underline-offset-15"
                    : "text-primary-dark"
                }
              >
                Lowongan
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-teal-400 underline decoration-4 underline-offset-15"
                    : "text-primary-dark"
                }
              >
                Profil UMKM
              </NavLink>
            </li>
            <li>
              <FcManager className="text-4xl cursor-pointer" />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
