import { useState } from "react";
import DataTaskLayout from "@/shared/layouts/DataTaskLayout";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";

type Lowongan = {
  id: number;
  posisi: string;
  tipeKerja: string;
  tanggalBuka: string;
  tanggalTutup: string;
  jumlahPelamar: number;
  status: "Buka" | "Tutup";
};

const dataDummy: Lowongan[] = [
  {
    id: 1,
    posisi: "UI/UX Designer",
    tipeKerja: "Berbasis proyek",
    tanggalBuka: "12 Maret 2025",
    tanggalTutup: "20 Maret 2025",
    jumlahPelamar: 8,
    status: "Buka",
  },
  {
    id: 2,
    posisi: "Web Designer",
    tipeKerja: "Berbasis Shift",
    tanggalBuka: "12 Maret 2025",
    tanggalTutup: "20 Maret 2025",
    jumlahPelamar: 10,
    status: "Tutup",
  },
];

type ModalStep = "edit" | "batalEdit" | "simpanBerhasil" | "konfirmasiHapus" | "batalHapus" | "hapusBerhasil" | null;

const tabs = [
  { label: "Lamaran Masuk", path: "/umkm/dashboard/lamaran-masuk", key: "lamaranMasuk" },
  { label: "Dalam Seleksi", path: "/umkm/dashboard/dalam-seleksi", key: "dalamSeleksi" },
  { label: "Posisi Terbuka", path: "/umkm/dashboard/posisi-terbuka", key: "posisiTerbuka" },
];

const getStatusBadge = (status: Lowongan["status"]) => {
  return status === "Buka"
    ? "bg-teal-100 text-teal-700"
    : "bg-red-100 text-red-500";
};

export default function DataPosisiTerbuka() {
  const [modalStep, setModalStep] = useState<ModalStep>(null);
  const [selected, setSelected] = useState<Lowongan | null>(null);

  const [namaposisi, setNamaPosisi] = useState("");
  const [tipeKerja, setTipeKerja] = useState("Berbasis Proyek");
  const [tanggalBuka, setTanggalBuka] = useState("");
  const [tanggalTutup, setTanggalTutup] = useState("");
  const [statusLowongan, setStatusLowongan] = useState<"Buka" | "Tutup">("Buka");

  const openEdit = (item: Lowongan) => {
    setSelected(item);
    setNamaPosisi(item.posisi);
    setTipeKerja(item.tipeKerja);
    setStatusLowongan(item.status);
    setTanggalBuka("");
    setTanggalTutup("");
    setModalStep("edit");
  };

  const openHapus = (item: Lowongan) => {
    setSelected(item);
    setModalStep("konfirmasiHapus");
  };

  const closeModal = () => {
    setModalStep(null);
    setSelected(null);
  };

  return (
    <DataTaskLayout
      title="Data Lowongan"
      description="Kelola semua lowongan dalam satu tampilan"
      activeTab="posisiTerbuka"
      tabs={tabs}
      statusOptions={["Buka", "Tutup"]}
    >
      <div className="w-full px-6">
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <table className="w-full table-auto border-collapse text-sm text-neutral-900">
            <thead>
              <tr className="bg-mint/15 text-center">
                <th className="border px-3 py-2">No</th>
                <th className="border px-3 py-2">Posisi</th>
                <th className="border px-3 py-2 whitespace-nowrap">Tipe Kerja</th>
                <th className="border px-3 py-2 whitespace-nowrap">Tanggal Buka Lowongan</th>
                <th className="border px-3 py-2">Pelamar</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataDummy.length > 0 ? (
                dataDummy.map((item, index) => (
                  <tr key={item.id} className="hover:bg-neutral-100 transition text-center text-xs">
                    <td className="border px-3 py-2">{index + 1}</td>
                    <td className="border px-3 py-2 font-semibold">{item.posisi}</td>
                    <td className="border px-3 py-2">{item.tipeKerja}</td>
                    <td className="border px-3 py-2 whitespace-nowrap">
                      {item.tanggalBuka} - {item.tanggalTutup}
                    </td>
                    <td className="border px-3 py-2">{item.jumlahPelamar} Pelamar</td>
                    <td className="border px-3 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="border px-3 py-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="text-yellow-500 hover:text-yellow-600 transition"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openHapus(item)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          <RiDeleteBin6Line className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-5 text-neutral-500">
                    Tidak ada data lowongan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalStep && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

          {/* Modal: Edit Lowongan */}
          {modalStep === "edit" && selected && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
              <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setModalStep("batalEdit")} className="text-gray-600 hover:text-gray-900">
                    <GoArrowLeft className="text-xl" />
                  </button>
                  <div>
                    <h2 className="font-extrabold text-lg">Edit Lowongan</h2>
                    <p className="text-gray-400 text-sm">Perbarui informasi posisi yang tersedia</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(statusLowongan)}`}>
                  {statusLowongan}
                </span>
              </div>
              <hr />
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Nama Posisi</label>
                  <input
                    type="text"
                    value={namaposisi}
                    onChange={(e) => setNamaPosisi(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Tipe Kerja</label>
                  <select
                    value={tipeKerja}
                    onChange={(e) => setTipeKerja(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  >
                    <option>Berbasis Proyek</option>
                    <option>Berbasis Shift</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-sm text-gray-700 mb-1 block">Tanggal Buka</label>
                    <input
                      type="date"
                      value={tanggalBuka}
                      onChange={(e) => setTanggalBuka(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-700 mb-1 block">Tanggal Tutup</label>
                    <input
                      type="date"
                      value={tanggalTutup}
                      onChange={(e) => setTanggalTutup(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-1 block">Jumlah Pelamar</label>
                  <input
                    type="number"
                    value={selected.jumlahPelamar}
                    readOnly
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">Otomatis dihitung dari data pelamar masuk</p>
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">Status Lowongan</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStatusLowongan("Tutup")}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition ${
                        statusLowongan === "Tutup"
                          ? "bg-red-50 border-red-300 text-red-500"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Tutup Lowongan
                    </button>
                    <button
                      onClick={() => setStatusLowongan("Buka")}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition ${
                        statusLowongan === "Buka"
                          ? "bg-teal-50 border-teal-400 text-teal-600"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Buka Lowongan
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="px-6 py-4 flex gap-3">
                <button
                  onClick={() => setModalStep("batalEdit")}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  onClick={() => setModalStep("simpanBerhasil")}
                  className="flex-1 py-3 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* Modal: Batal Edit */}
          {modalStep === "batalEdit" && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl px-8 py-10 text-center">
              <h2 className="font-extrabold text-xl mb-3">Perubahan Anda tidak tersimpan</h2>
              <p className="text-gray-400 text-sm mb-8">Silakan lakukan simpan ulang jika ingin menyimpan</p>
              <button
                onClick={closeModal}
                className="w-full py-3 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition"
              >
                Lihat Lowongan Lainnya
              </button>
            </div>
          )}

          {/* Modal: Simpan Berhasil */}
          {modalStep === "simpanBerhasil" && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl px-8 py-10 text-center">
              <h2 className="font-extrabold text-xl mb-3">Update lowongan berhasil dilakukan</h2>
              <p className="text-gray-400 text-sm mb-8">Silakan lanjutkan melihat lowongan lainnya.</p>
              <button
                onClick={closeModal}
                className="w-full py-3 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition"
              >
                Lihat Lowongan Lainnya
              </button>
            </div>
          )}

          {/* Modal: Konfirmasi Hapus */}
          {modalStep === "konfirmasiHapus" && selected && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl px-8 py-10 text-center">
              <h2 className="font-extrabold text-xl mb-3">Yakin ingin menghapus lowongan?</h2>
              <p className="text-gray-400 text-sm mb-8">Lowongan ini akan dihapus permanen dan tidak bisa dipulihkan</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setModalStep("batalHapus")}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition"
                >
                  Tidak
                </button>
                <button
                  onClick={() => setModalStep("hapusBerhasil")}
                  className="flex-1 py-3 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition"
                >
                  Ya
                </button>
              </div>
            </div>
          )}

          {/* Modal: Batal Hapus */}
          {modalStep === "batalHapus" && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl px-8 py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <IoClose className="text-2xl text-gray-500" />
              </div>
              <h2 className="font-extrabold text-xl mb-3">Lowongan tidak dihapus</h2>
              <p className="text-gray-400 text-sm mb-8">Lowongan tetap tersedia dan dapat dikelola kembali.</p>
              <button
                onClick={closeModal}
                className="w-full py-3 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition"
              >
                Lihat Lowongan Lainnya
              </button>
            </div>
          )}

          {/* Modal: Hapus Berhasil */}
          {modalStep === "hapusBerhasil" && (
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl px-8 py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center mx-auto mb-4">
                <IoCheckmark className="text-2xl text-white" />
              </div>
              <h2 className="font-extrabold text-xl mb-3">Lowongan berhasil dihapus</h2>
              <p className="text-gray-400 text-sm mb-8">Lowongan telah dihapus secara permanen dari sistem.</p>
              <button
                onClick={closeModal}
                className="w-full py-3 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 transition"
              >
                Lihat Lowongan Lainnya
              </button>
            </div>
          )}

        </div>
      )}
    </DataTaskLayout>
  );
}