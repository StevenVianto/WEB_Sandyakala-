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
