interface SectionTaskProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionTask({ title, children }: SectionTaskProps) {
  return (
    <div className="mt-6 space-y-4 p-6 border border-neutral-500 rounded-lg mx-7">
      <div className="border-b pb-3">
        <p className="font-semibold text-title-2 leading-base">{title}</p>
      </div>
      {children}
    </div>
  );
}