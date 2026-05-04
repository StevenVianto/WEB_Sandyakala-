import { GoArrowLeft } from "react-icons/go";

interface ModalPekerjaProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  status?: string;
}

export function ModalPekerja({
  open,
  onClose,
  children,
  title,
  status,
}: ModalPekerjaProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-500/50">
          <div className="flex items-center gap-7">
            <GoArrowLeft
              className="text-2xl cursor-pointer"
              onClick={onClose}
            />

            <div className="flex flex-col items-start">
              <p className="font-bold text-md">{title}</p>
            </div>
          </div>

          {status && (
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                status.toLowerCase() === "aktif"
                  ? "bg-success-100 text-success-300"
                  : "bg-error-100 text-error-300"
              }`}
            >
              {status}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
