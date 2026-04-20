import { cn } from "@/lib/utils";
import { Link, NavLink } from "react-router";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import LogoFreshstart from "@/assets/images/Logo FreshStart.png";

const NavItem = ({
  to,
  children,
  onClick,
  isMobile = false,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  isMobile?: boolean;
}) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "font-semibold transition-all text-sm duration-300",
          isMobile ? "block" : "pb-2 border-b-3",
          isActive
            ? "text-mint border-mint"
            : "text-slate-500 border-transparent hover:text-mint",
        )
      }
    >
      {children}
    </NavLink>
  );
};

export default function DashboardUmkmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="py-2 bg-white shadow rounded-b-2xl fixed w-full top-0 z-40 transition-all">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex gap-2 md:gap-3 items-center">
            <img
              src={LogoFreshstart}
              alt="Logo FreshStart"
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <Link
              to="/umkm/home"
              className="text-lg md:text-base font-bold text-mint-300"
            >
              FreshStart
            </Link>
          </div>
          <ul className="hidden md:flex gap-7 items-center">
            <li>
              <NavItem to="/umkm/home">Home</NavItem>
            </li>
            <li>
              <NavItem to="/umkm/dashboard">Dashboard</NavItem>
            </li>
            <li>
              <NavItem to="/umkm/lowongan">Lowongan</NavItem>
            </li>
            <li>
              <NavItem to="/umkm/profile">Profile</NavItem>
            </li>

            <div className="h-9 w-9 bg-gray-100 rounded-full shadow ms-6 border border-slate-300 overflow-hidden">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </ul>

          <button
            className="md:hidden cursor-pointer p-2 text-mint-300 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end p-4 border-b border-gray-100">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 cursor-pointer text-gray-500 hover:text-red-500 bg-gray-50 rounded-full transition-colors"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-6">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="h-12 w-12 bg-gray-100 rounded-full overflow-hidden border border-slate-300">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-bold text-mint-300 text-sm">UMKM Partner</h2>
              <p className="text-xs text-gray-500">Lihat Profil</p>
            </div>
          </div>

          <ul className="flex flex-col gap-6">
            <li>
              <NavItem
                to="/umkm/home"
                isMobile
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavItem>
            </li>
            <li>
              <NavItem
                to="/umkm/dashboard"
                isMobile
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </NavItem>
            </li>
            <li>
              <NavItem
                to="/umkm/lowongan"
                isMobile
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Lowongan
              </NavItem>
            </li>
            <li>
              <NavItem
                to="/umkm/profile"
                isMobile
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </NavItem>
            </li>
          </ul>
        </div>
      </div>

      {children}
    </>
  );
}
