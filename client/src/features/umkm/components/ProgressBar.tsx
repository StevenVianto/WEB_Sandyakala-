import { cn } from "@/shared/lib/utils";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export default function ProgressBar({
  percentage,
  className,
}: ProgressBarProps) {
  const validPercentage = Math.min(100, Math.max(0, percentage));
  return (
    <div className={cn("w-full items-center flex gap-7", className)}>
      <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${validPercentage}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 mb-5">
        {validPercentage}%
      </span>
    </div>
  );
}
