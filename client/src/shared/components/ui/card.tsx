import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const cardVariants = cva(
  "rounded-2xl border transition bg-white text-neutral-900 overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-neutral-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  className?: string;
}

function Card({ variant, className, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)} {...props} />
  );
}

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(" py-4 px-7", className)} {...props} />;
}

function CardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("py-4 px-7", className)} {...props} />;
}

function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 py-4 px-7 flex items-center justify-end gap-2",
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardBody, CardFooter };
