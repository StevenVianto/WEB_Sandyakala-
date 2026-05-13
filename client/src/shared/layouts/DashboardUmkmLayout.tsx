import { cn } from "@/shared/lib/utils";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import logo from "@/assets/images/logo.png";

const navItems = [
  { title: "Home", to: "/umkm/home" },
  { title: "Dashboard", to: "/umkm/dashboard" },
  { title: "Lowongan", to: "/umkm/lowongan" },
  { title: "Profile", to: "/umkm/profile" },
];

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
          "font-bold transition-colors duration-200 relative",
          isMobile ? "block text-sm py-2" : "text-sm pb-1",
          isActive
            ? isMobile
              ? "text-teal-400"
              : "text-teal-400 underline decoration-4 underline-offset-8"
            : "text-primary-dark hover:text-teal-400"
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
      <nav className="fixed top-0 left-0 w-full z-40 shadow-md bg-white transition-all">
        <div className="max-w-6xl mx-auto px-8 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/umkm/home">
              <img src={logo} alt="FreshStart" className="h-10 w-auto object-contain" />
            </Link>
          </div>
          <ul className="hidden md:flex gap-10 items-center">
            {navItems.map((item) => (
              <li key={item.title}>
                <NavItem to={item.to}>{item.title}</NavItem>
              </li>
            ))}

            <div className="h-10 w-10 bg-gray-100 rounded-full shadow ms-2 border border-slate-300 overflow-hidden cursor-pointer">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </ul>

          <button
            className="md:hidden cursor-pointer p-2 text-primary-dark focus:outline-none"
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
            {navItems.map((item) => (
              <li key={item.title}>
                <NavItem
                  to={item.to}
                  isMobile
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </NavItem>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {children}
    </>
  );
}
