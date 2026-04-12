import { BiNotepad, BiSolidGridAlt, BiSolidUser } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { IoIosArrowRoundBack } from "react-icons/io";

const menus = [
  { name: "Dashboard", icon: BiSolidGridAlt, to: "/admin/dashboard" },
  { name: "Verifikasi", icon: BiSolidUser, to: "/admin/verifikasi" },
  { name: "Laporan", icon: BiNotepad, to: "/admin/laporan" },
];

interface MenuItemProps {
  name: string;
  icon: React.ElementType;
  to: string;
}

const MenuItem = ({ name, icon: Icon, to }: MenuItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-3 items-center px-4 py-2 rounded-lg cursor-pointer text-white ${
          isActive ? "bg-info-300 " : "hover:bg-info-300/50"
        }`
      }
    >
      <Icon className="h-6 w-6" />
      <span>{name}</span>
    </NavLink>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  showBackButton?: boolean;
}

export default function DashboardLayout({
  children,
  title,
  description,
  showBackButton = false,
}: DashboardLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-info-100/15">
      <aside className="w-64 bg-secondary text-white flex flex-col justify-between">
        <div>
          <div className="px-6 py-4 font-semibold text-lg border-b border-white">
            FreshStart
          </div>

          <nav className="p-4 space-y-2.5">
            {menus.map((menu) => (
              <MenuItem
                key={menu.name}
                name={menu.name}
                icon={menu.icon}
                to={menu.to}
              />
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white flex justify-center items-center">
          <div className="flex gap-4 items-center">
            <div className="h-9 w-9 bg-white rounded-full"></div>
            <p className="text-sm">Admin Utama</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">
          <p className="text-sm">
            Selamat datang, <span className="font-semibold">ADMIN</span>
          </p>

          <div className="bg-secondary flex items-center gap-2 text-white px-4 py-1 rounded-full font-semibold text-sm">
            Admin <MdKeyboardArrowDown className="h-6 w-6" />
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-6">
          <div className="mb-4 flex items-center gap-3">
            {showBackButton && (
              <Button
                onClick={() => navigate(-1)}
                variant={"ghost"}
                className="text-5xl"
              >
                <IoIosArrowRoundBack />
              </Button>
            )}
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}
