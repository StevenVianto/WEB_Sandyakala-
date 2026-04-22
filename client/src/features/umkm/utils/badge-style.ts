import type { JobStatus } from "../types/dashboard";

export const getBadgeStyle = (status: string) => {
  switch (status) {
    case "Cek":
      return "bg-success text-white border-transparent";
    case "Wawancara":
      return "bg-info-100 text-primary-dark border border-primary-dark";
    case "Lolos":
    case "Buka":
      return "bg-white text-green-600 border-green-600";
    case "Tidak Lolos":
    case "Tutup":
      return "bg-white text-red-500 border-red-400";
    case "Segera Tutup":
      return "bg-white text-warning-200 border-warning-200";
    default:
      return "bg-gray-100 text-gray-600 border-transparent";
  }
};

export const getStatusStyles = (status: JobStatus) => {
  switch (status) {
    case "Buka":
      return {
        topBorder: "border-t-success",
        badgeBg: "bg-green-100",
        badgeText: "text-green-700",
        dotColor: "bg-green-500",
      };
    case "Segera Tutup":
      return {
        topBorder: "border-t-warning",
        badgeBg: "bg-amber-100",
        badgeText: "text-amber-700",
        dotColor: "bg-amber-500",
      };
    case "Tutup":
      return {
        topBorder: "border-t-error",
        badgeBg: "bg-red-100",
        badgeText: "text-red-700",
        dotColor: "bg-red-500",
      };
  }
};
