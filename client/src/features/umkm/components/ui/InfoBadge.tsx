export default function InfoBadge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-100 bg-white shadow-sm">
      <span className="text-mint-200">{icon}</span>
      <span className="text-[11px] md:text-xs font-semibold text-slate-600">
        {text}
      </span>
    </div>
  );
}
