import { cn } from "@/shared/lib/utils";
import { Link } from "react-router-dom";

export default function TitleCard({
  title,
  link,
  className,
}: {
  title: string;
  link: string;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <h2 className="font-semibold text-xl">{title}</h2>
      <Link to={link} className="text-xs text-mint font-medium hover:underline">
        Lihat Semua
      </Link>
    </div>
  );
}
