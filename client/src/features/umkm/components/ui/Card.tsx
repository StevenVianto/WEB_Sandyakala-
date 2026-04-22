import { cn } from "@/shared/lib/utils";
import { Link } from "react-router-dom";

export function CardHeader({
  title,
  linkTitle,
  to,
}: {
  title: string;
  linkTitle?: string;
  to: string;
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-sm md:text-lg font-bold text-primary-dark">
        {title}
      </h2>
      <Link
        to={to}
        className="px-3 py-1 md:py-1.5 rounded-xl border border-mint text-mint text-xs md:text-sm font-semibold hover:bg-mint-100 transition-colors"
      >
        {linkTitle}
      </Link>
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-100 p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}
