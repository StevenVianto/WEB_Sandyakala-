import { cn } from "@/shared/lib/utils";
import { Link } from "react-router";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
  image: string;
  imageAlt?: string;
  className?: string;
};

export const EmptyData = ({
  title,
  description,
  actionLabel,
  actionTo,
  image,
  imageAlt = "Empty Illustration",
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "mx-auto md:max-w-3xl border border-gray-300 rounded-md flex items-center",
        className,
      )}
    >
      <div className="space-y-2 md:space-y-4 p-4 md:p-8 pe-0">
        <h3 className="font-bold text-primary-dark text-base md:text-2xl">
          {title}
        </h3>

        <p className="text-xs md:text-sm text-primary">{description}</p>

        {actionLabel && actionTo && (
          <Link
            to={actionTo}
            className="inline-block rounded-md border border-mint text-mint text-xs md:text-sm px-2 md:px-10 py-2"
          >
            {actionLabel}
          </Link>
        )}
      </div>

      <figure className="w-90 h-full">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-contain"
        />
      </figure>
    </div>
  );
};
