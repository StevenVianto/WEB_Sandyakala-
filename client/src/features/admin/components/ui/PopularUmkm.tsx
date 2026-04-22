export default function PopularUmkm({
  category,
  count,
  color,
}: {
  category: string;
  count: number;
  color: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold ">{category}</p>
        <p className="text-sm text-gray-400">{count} UMKM</p>
      </div>
      <hr className={`py-1 border-none w-full ${color} rounded-full`} />
    </div>
  );
}
