type Shift = {
  nama_pekerja_shift: string;
  list_tugas_shift: string[];
  waktu_mulai_shift: string;
  waktu_selesai_shift: string;
  tanggal_shift: string;
  jamMasuk: string;
  jamPulang: string;
  status_shift: "Disetujui" | "Proses" | "Review";
};

type Props = {
  shift: Shift;
  onClose: () => void;
};

export function DetailShiftContent({ shift, onClose }: Props) {
  const isProses = shift.status_shift === "Proses";
  const isReview = shift.status_shift === "Review";
  const isDisetujui = shift.status_shift === "Disetujui";

  const checklist = shift.list_tugas_shift ?? [];
  const isDone = shift.status_shift === "Disetujui";

  const completed = isDisetujui ? checklist.length : 0;

  return (
    <div className="flex flex-col gap-5">
      {/* GRID DETAIL */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-neutral-100 rounded-lg p-3">
          <p className="text-xs text-neutral-500 mb-2">Tanggal Shift</p>
          <p className="font-semibold text-sm text-primary-dark">{shift.tanggal_shift}</p>
        </div>

        <div className="bg-neutral-100 rounded-lg p-3">
          <p className="text-xs text-neutral-500 mb-2">Waktu Shift</p>
          <p className="font-semibold text-sm text-primary-dark">
            {shift.waktu_mulai_shift} - {shift.waktu_selesai_shift}
          </p>
        </div>

        <div className="bg-neutral-100 rounded-lg p-3">
          <p className="text-xs text-neutral-500 mb-2">Jam Masuk</p>
          <p className="font-semibold text-sm text-primary-dark">{shift.jamMasuk}</p>
        </div>

        <div className="bg-neutral-100 rounded-lg p-3">
          <p className="text-xs text-neutral-500 mb-2">Jam Pulang</p>
          <p className="font-semibold text-sm text-primary-dark">{shift.jamPulang || "--:--"}</p>
        </div>
      </div>

      {/* PROGRESS */}
      <div>
        <div className="flex justify-between text-sm mb-3">
          <span>Progress Tugas</span>
          <span className="text-green-500">
            {completed}/{checklist.length} Terselesaikan
          </span>
        </div>

        <div className="h-2 bg-neutral-200 rounded-full">
          <div
            className="h-2 bg-green-500 rounded-full transition-all"
            style={{ width: `${(completed / checklist.length) * 100}%` }}
          />
        </div>
      </div>

      {/* CHECKLIST */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-neutral-600">Checklist</p>

        {checklist.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {/* checkbox */}
            <div
              className={`w-4 h-4 mt-1 rounded border flex items-center justify-center ${
                isDone ? "bg-green-500 text-white" : ""
              }`}
            >
              {isDone}
            </div>

            {/* text */}
            <p
              className={`text-sm ${
                isDone ? "line-through text-neutral-400" : ""
              }`}
            >
              {item}
            </p>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div className="mt-4">
        {isReview && (
          <button className="w-full bg-primary-dark text-white py-2 rounded-md">
            Setujui
          </button>
        )}

        {(isProses || isDisetujui) && (
          <button onClick={onClose} className="w-full border border-neutral-500 py-2 rounded-md cursor-pointer hover:bg-neutral-500/25">Kembali</button>
        )}
      </div>
    </div>
  );
}
