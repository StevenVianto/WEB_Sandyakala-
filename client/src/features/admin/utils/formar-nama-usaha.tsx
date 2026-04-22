export const formatNamaUsaha = (namaUsaha: string) => {
  return namaUsaha
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
