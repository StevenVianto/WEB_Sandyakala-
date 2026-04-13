import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center rounded-xl font-medium transition",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-dark",
        "primary-dark": "bg-primary-dark text-white hover:bg-primary",
        soft: "bg-info-100 text-info-300 hover:bg-info-200",

        outline: "border border-neutral-300 hover:bg-neutral-100",
        ghost: "hover:bg-neutral-100",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
