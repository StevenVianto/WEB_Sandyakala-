import { cn } from "@/shared/lib/utils";
import type { JobOpening } from "../../types/dashboard";
import { getStatusStyles } from "../../utils/badge-style";

export default function JobCard({ data }: { data: JobOpening }) {
  const styles = getStatusStyles(data.status);

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-md border border-gray-100 p-5 flex flex-col justify-between border-t-4",
        styles.topBorder,
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl",
            data.iconBgClass,
          )}
        >
          {data.iconStr}
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
            styles.badgeBg,
            styles.badgeText,
          )}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full", styles.dotColor)} />
          {data.status}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h3 className="font-bold text-gray-900 text-lg mb-1">{data.title}</h3>
          <p className="text-sm text-gray-500">{data.type}</p>
        </div>
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {data.applicantImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Applicant ${idx}`}
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          {data.extraApplicants > 0 && (
            <span className="text-xs text-gray-400 font-medium ml-2">
              +{data.extraApplicants}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between mt-auto">
        <div className="text-xs text-gray-400 font-medium">
          Dibuka {data.date}
        </div>

        <div className="flex flex-col items-end gap-3">
          <button className="px-4 py-1.5 rounded-lg border border-teal-200 text-teal-600 text-sm font-medium hover:bg-teal-50 transition-colors">
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}
