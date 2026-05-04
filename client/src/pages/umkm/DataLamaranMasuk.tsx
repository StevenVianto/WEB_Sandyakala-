import { useState } from "react";
import DataTaskLayout from "@/shared/layouts/DataTaskLayout";
import { FiUser } from "react-icons/fi";
import { IoClose, IoCheckmark } from "react-icons/io5";
import { BsFilePdf } from "react-icons/bs";

type Pelamar = {
  id: number;
  nama: string;
  posisi: string;
  pendidikan: string;
  noHp: string;
  tanggalMelamar: string;
  status: "Diterima" | "Ditolak" | "Menunggu";
};

const dataDummy: Pelamar[] = [
  {
    id: 1,
    nama: "Kathryn Murphy",
    posisi: "UI/UX Designer",
    pendidikan: "S1 Desain Komunikasi Visual",
    noHp: "081234567890",
    tanggalMelamar: "19 Maret 2025",
    status: "Diterima",
  },
  {
    id: 2,
    nama: "Devon Lane",
    posisi: "Web Designer",
    pendidikan: "S1 Teknik Informatika",
    noHp: "081234857690",
    tanggalMelamar: "22 Maret 2025",
    status: "Ditolak",
  },
];

type ModalStep =
  | "detail"
  | "tolak"
  | "ditolak"
  | "jadwal"
  | "terkirim"
  | null;

const getStatusBadge = (status: Pelamar["status"]) => {
  const classes: Record<string, string> = {
    diterima: "bg-success-100 text-success-300",
    ditolak: "bg-error-100 text-error",
    menunggu: "bg-neutral-600/25 text-neutral-800",
  };
  return classes[status.toLowerCase()] ?? "";
};

export default function DataLamaranMasuk() {
  const [modalStep, setModalStep] = useState<ModalStep>(null);
  const [selectedPelamar, setSelectedPelamar] = useState<Pelamar | null>(null);
  const [pesanTolak, setPesanTolak] = useState("");
  const [metode, setMetode] = useState<"Google Meet" | "Tatap Muka">("Google Meet");
  const [tanggal, setTanggal] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [catatan, setCatatan] = useState("");

  const openDetail = (pelamar: Pelamar) => {
    setSelectedPelamar(pelamar);
    setModalStep("detail");
  };

  const closeModal = () => {
    setModalStep(null);
    setSelectedPelamar(null);
    setPesanTolak("");
  };

  const tabs = [
    { label: "Lamaran Masuk", path: "/umkm/dashboard/lamaran-masuk", key: "lamaranMasuk" },
    { label: "Dalam Seleksi", path: "/umkm/dashboard/dalam-seleksi", key: "dalamSeleksi" },
    { label: "Posisi Terbuka", path: "/umkm/dashboard/posisi-terbuka", key: "posisiTerbuka" },
  ];

  return (
    <DataTaskLayout
      title="Data Pelamar"
      description="Kelola semua pelamar dalam satu tampilan"
      activeTab="lamaranMasuk"
      tabs={tabs}
      statusOptions={["Diterima", "Ditolak", "Menunggu"]}
    >
      <div className="w-full px-6">
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full table-auto border-collapse text-sm text-neutral-900">
            <thead>
              <tr className="bg-mint/15 text-center">
                <th className="border px-3 py-2">No</th>
                <th className="border px-3 py-2 whitespace-nowrap">Nama Pelamar</th>
                <th className="border px-3 py-2">Posisi</th>
                <th className="border px-3 py-2 whitespace-nowrap">Pendidikan Terakhir</th>
                <th className="border px-3 py-2 whitespace-nowrap">No Handphone</th>
                <th className="border px-3 py-2 whitespace-nowrap">Tanggal Melamar</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataDummy.length > 0 ? (
                dataDummy.map((p, index) => (
                  <tr key={p.id} className="hover:bg-neutral-100 transition text-center text-xs">
                    <td className="border px-3 py-2">{index + 1}</td>
                    <td className="border px-3 py-2 font-semibold whitespace-nowrap">{p.nama}</td>
                    <td className="border px-3 py-2">{p.posisi}</td>
                    <td className="border px-3 py-2">{p.pendidikan}</td>
                    <td className="border px-3 py-2">{p.noHp}</td>
                    <td className="border px-3 py-2 whitespace-nowrap">{p.tanggalMelamar}</td>
                    <td className="border px-3 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="border px-3 py-2">
                      <button
                        onClick={() => openDetail(p)}
                        className="border border-primary-dark px-3 py-1 text-xs rounded-md hover:bg-primary-dark hover:text-white transition cursor-pointer"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-5 text-neutral-500">
                    Tidak ada data pelamar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {modalStep && selectedPelamar && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

          {/* Modal: Detail Pelamar */}
          {modalStep === "detail" && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
                <div className="px-6 pt-6 pb-4 flex items-center gap-4">
                    <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                        <IoClose className="text-xl" />
                    </button>
                    <div>
                        <h2 className="font-extrabold text-lg">Detail Pelamar</h2>
                        <p className="text-gray-400 text-sm">{selectedPelamar.nama} - {selectedPelamar.posisi}</p>
                    </div>
                </div>
              <hr />
              <div className="px-6 py-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUser className="text-3xl text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg">{selectedPelamar.nama}</h3>
                    <p className="text-gray-500 text-sm">Melamar: {selectedPelamar.posisi}</p>
                  </div>
                </div>

                <p className="text-xs font-bold tracking-widest text-gray-500 mb-3">INFORMASI PELAMAR</p>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-400 text-sm">Pendidikan Terakhir</span>
                  <span className="font-bold text-sm">{selectedPelamar.pendidikan}</span>
                </div>
                <div className="flex justify-between py-2 mb-4">
                  <span className="text-gray-400 text-sm">No. HP</span>
                  <span className="font-bold text-sm">{selectedPelamar.noHp}</span>
                </div>

                <p className="text-xs font-bold tracking-widest text-gray-500 mb-3">DOKUMEN</p>
                <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <BsFilePdf className="text-2xl text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">CV_{selectedPelamar.nama.replace(" ", "_")}.pdf</p>
                      <p className="text-gray-400 text-xs">PDF . 1.2 MB . Diunggah 12 Mar 2025</p>
                    </div>
                  </div>
                  <button className="text-blue-600 font-bold text-sm hover:underline">Unduh</button>
                </div>
              </div>
              <hr />
              <div className="px-6 py-4 flex gap-3">
                <button
                  onClick={() => setModalStep("tolak")}
                  className="flex-1 py-3 rounded-xl bg-red-50 text-red-500 font-bold text-sm hover:bg-red-100 transition"
                >
                  Tolak Lamaran
                </button>
                <button
                  onClick={() => setModalStep("jadwal")}
                  className="flex-1 py-3 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition"
                >
                  Terima Lamaran
                </button>
              </div>
            </div>
          )}

          {/* Modal: Tolak Lamaran */}
          {modalStep === "tolak" && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
                <div className="px-6 pt-6 pb-4 flex items-center gap-4">
                    <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                        <IoClose className="text-xl" />
                    </button>
                    <div>
                        <h2 className="font-extrabold text-lg">Tolak Lamaran</h2>
                        <p className="text-gray-400 text-sm">{selectedPelamar.nama} - {selectedPelamar.posisi}</p>
                    </div>
                </div>
              <hr />
              <div className="px-6 py-5">
                <p className="text-xs font-bold tracking-widest text-gray-700 mb-4">ALASAN PENOLAKAN</p>
                <label className="text-sm text-gray-600 mb-2 block">Pesan Penolakan</label>
                <textarea
                  value={pesanTolak}
                  onChange={(e) => setPesanTolak(e.target.value)}
                  placeholder="Masukkan 0 - 200 kata"
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm h-36 resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => setModalStep("ditolak")}
                  className="w-full py-3 rounded-xl bg-red-50 text-red-500 font-bold text-sm hover:bg-red-100 transition"
                >
                  Konfirmasi Penolakan
                </button>
              </div>
            </div>
          )}

          {/* Modal: Lamaran Ditolak */}
          {modalStep === "ditolak" && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
              <div className="px-6 py-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <IoClose className="text-3xl text-red-500" />
                </div>
                <h2 className="font-extrabold text-lg text-red-700 mb-2">Lamaran Ditolak</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Lamaran {selectedPelamar.nama} untuk posisi {selectedPelamar.posisi} telah ditolak.<br />
                  Notifikasi penolakan telah dikirim ke pelamar
                </p>
              </div>
              <hr />
              <div className="px-6 py-4">
                <button
                  onClick={closeModal}
                  className="w-full py-3 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition"
                >
                  Lihat Lamaran Lainnya
                </button>
              </div>
            </div>
          )}

          {/* Modal: Jadwal Wawancara */}
          {modalStep === "jadwal" && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
                <div className="px-6 pt-6 pb-4 flex items-center gap-4">
                    <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                        <IoClose className="text-xl" />
                    </button>
                    <div>
                        <h2 className="font-extrabold text-lg">Jadwalkan Wawancara</h2>
                        <p className="text-gray-400 text-sm">{selectedPelamar.nama} - {selectedPelamar.posisi}</p>
                    </div>
                </div>
              <hr />
              <div className="px-6 py-5 space-y-4">
                <p className="text-xs font-bold tracking-widest text-gray-700">WAKTU INTERVIEW</p>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Tanggal</label>
                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-sm text-gray-600 mb-1 block">Waktu Mulai</label>
                    <input
                      type="time"
                      value={waktuMulai}
                      onChange={(e) => setWaktuMulai(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-600 mb-1 block">Waktu Selesai</label>
                    <input
                      type="time"
                      value={waktuSelesai}
                      onChange={(e) => setWaktuSelesai(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                  </div>
                </div>

                <p className="text-xs font-bold tracking-widest text-gray-700">METODE INTERVIEW</p>
                <div className="flex gap-3">
                  {(["Google Meet", "Tatap Muka"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMetode(m)}
                      className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition ${
                        metode === m
                          ? "bg-teal-50 border-teal-400 text-teal-600"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Link atau Lokasi</label>
                  <input
                    type="text"
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                    placeholder="meet.google.com/abc-xyz"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Catatan Tambahan</label>
                  <input
                    type="text"
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    placeholder="Siapkan portofolio desain sebelum interview"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                </div>
              </div>
              <div className="px-6 pb-6 space-y-3">
                <button
                  onClick={() => setModalStep("terkirim")}
                  className="w-full py-3 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition"
                >
                  Konfirmasi & Kirim Undangan
                </button>
                <button className="w-full py-3 rounded-xl border border-teal-600 text-teal-600 font-semibold text-sm hover:bg-teal-50 transition">
                  Hubungi Pelamar
                </button>
              </div>
            </div>
          )}

          {/* Modal: Undangan Terkirim */}
          {modalStep === "terkirim" && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
              <div className="px-6 py-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4">
                  <IoCheckmark className="text-3xl text-white" />
                </div>
                <h2 className="font-extrabold text-lg text-teal-700 mb-3">Undangan Terkirim!</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {selectedPelamar.nama} telah diundang untuk interview {tanggal}, {waktuMulai} - {waktuSelesai} via {metode}.<br />
                  Notifikasi telah dikirim ke pelamar.
                </p>
                <hr className="w-full mb-4" />
                <div className="text-left w-full">
                  <p className="font-bold text-sm mb-1">Langkah Selanjutnya</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Pelamar akan menerima detail jadwal. Anda bisa memantau status di{" "}
                    <span className="font-bold">Jadwal Wawancara</span> atau melanjutkan percakapan lewat chat
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 space-y-3">
                <button className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 transition">
                  Hubungi Pelamar
                </button>
                <button
                  onClick={closeModal}
                  className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
                >
                  Lihat Lamaran Lainnya
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </DataTaskLayout>
  );
}