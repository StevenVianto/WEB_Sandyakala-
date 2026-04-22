import { cn } from "@/shared/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  colorClass: string;
}

export default function StatCard({ title, value, colorClass }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow md:shadow-xl border border-gray-100 p-6 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
      <h3 className={cn("text-sm font-medium mb-3", colorClass)}>{title}</h3>
      <span className={cn("text-4xl md:text-5xl font-bold", colorClass)}>
        {value}
      </span>
    </div>
  );
}
