// components/ui/stat-card.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statCardVariants = cva(
  " rounded-xl p-5 shadow-sm border-l-4 flex flex-col justify-between",
  {
    variants: {
      variant: {
        green: "border-green-600",
        blue: "border-info-300",
        yellow: "border-yellow-500",
        red: "border-red-500",
      },
    },
    defaultVariants: {
      variant: "green",
    },
  },
);

interface StatCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  description: string;
}

export function StatCard({
  title,
  value,
  description,
  variant,
  className,
}: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ variant }), className)}>
      <p className="text-sm font-semibold">{title}</p>

      <h2
        className={cn(
          "text-4xl font-semibold",
          variant === "green" && "text-green-600",
          variant === "blue" && "text-info-300",
          variant === "yellow" && "text-yellow-500",
          variant === "red" && "text-red-600",
        )}
      >
        {value}
      </h2>

      <p className="text-xs font-semibold">{description}</p>
    </div>
  );
}
