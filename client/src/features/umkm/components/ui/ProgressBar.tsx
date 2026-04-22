import { cn } from "@/shared/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressBarVariant = cva(
  "h-full rounded-full transition-all duration-500 ease-in-out",
  {
    variants: {
      variant: {
        warning: "bg-orange-500",
        error: "bg-red-500",
        success: "bg-green-500",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);

export interface ProgressBarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariant> {
  percentage: number;
}

export default function ProgressBar({
  percentage,
  variant,
  className,
}: ProgressBarProps) {
  const validPercentage = Math.min(100, Math.max(0, percentage));
  return (
    <div className={"w-full items-center flex gap-7"}>
      <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
        <div
          className={cn(progressBarVariant({ variant }), className)}
          style={{ width: `${validPercentage}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 mb-5">
        {validPercentage}%
      </span>
    </div>
  );
}
