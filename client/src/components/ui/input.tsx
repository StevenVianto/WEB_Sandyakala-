// src/components/ui/input.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full px-6 py-2.5 text-sm outline-none transition rounded-full focus:border-primary",
  {
    variants: {
      variant: {
        default: "border border-gray-300 focus:ring focus:ring-primary",
        ghost:
          "border border-transparent bg-gray-100 focus:ring focus:ring-primary",
        underline:
          "border-b border-gray-300 rounded-none focus:ring-0 focus:border-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
