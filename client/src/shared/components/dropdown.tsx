import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { cn } from "../lib/utils";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { IconType } from "react-icons";

interface DropdownProps {
  title: string;
  icon: IconType;
  subItems: { name: string; to: string }[];
}

export default function Dropdown({
  title,
  icon: Icon,
  subItems,
}: DropdownProps) {
  const location = useLocation();

  // cek apakah ada sub menu yang aktif
  const isActive = subItems.some((item) =>
    location.pathname.startsWith(item.to),
  );

  const [isOpen, setIsOpen] = useState<boolean>(isActive);

  return (
    <div className="flex flex-col gap-1 w-full max-w-70">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all duration-200",
          isActive || isOpen
            ? "bg-primary-dark/50 text-white"
            : "text-white hover:bg-primary-dark/50",
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 shrink-0" />
          <span className="font-medium text-tittle-2">{title}</span>
        </div>
        {isOpen ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
      </button>

      {(isOpen || isActive) && (
        <div className="flex flex-col gap-1 mt-1 animate-in slide-in-from-top-2 fade-in duration-200">
          {subItems.map((item) => {
            return (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 pl-12 pr-4 py-3 rounded-2xl transition-all duration-200 text-[15px] font-medium",
                    isActive
                      ? "bg-info-300 text-white shadow-sm"
                      : "text-gray-100 hover:bg-info-300/50 hover:text-white",
                  )
                }
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}
