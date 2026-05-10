import { useProfileUmkm } from "./ProfileUmkmContext";
import ProfileModal from "@/shared/components/ui/modal-profile";

export default function ProfileUmkmModals() {
  const {
    modalState, closeModal,
    namaUsaha, setNamaUsaha,
    keteranganUsaha, setKeteranganUsaha,
    lokasiUsaha, setLokasiUsaha,
    tahunDibangun, setTahunDibangun,
    jumlahKaryawan, setJumlahKaryawan,
    kategoriUsaha, setKategoriUsaha,
    deskripsiUsaha, setDeskripsiUsaha,
    website, setWebsite,
    emailHrd, setEmailHrd,
    telepon, setTelepon,
    alamat, setAlamat,
    judulFasilitas, setJudulFasilitas,
    deskripsiFasilitas, setDeskripsiFasilitas,
    handleTambahFasilitas,
  } = useProfileUmkm();

  return (
    <>
      {/* Edit Profile */}
      {modalState.profile && (
        <ProfileModal
          title="Edit Profile UMKM"
          onClose={() => closeModal("profile")}
          onSubmit={() => closeModal("profile")}
          submitLabel="Simpan"
        >
          <div className="flex flex-col gap-4">
            {[
              { label: "Nama Usaha", value: namaUsaha, onChange: setNamaUsaha, type: "text" },
              { label: "Keterangan Usaha", value: keteranganUsaha, onChange: setKeteranganUsaha, type: "text" },
              { label: "Lokasi Usaha", value: lokasiUsaha, onChange: setLokasiUsaha, type: "text" },
              { label: "Tahun Dibangun", value: tahunDibangun, onChange: setTahunDibangun, type: "number" },
              { label: "Jumlah Karyawan", value: jumlahKaryawan, onChange: setJumlahKaryawan, type: "text" },
              { label: "Kategori Usaha", value: kategoriUsaha, onChange: setKategoriUsaha, type: "text" },
            ].map(({ label, value, onChange, type }) => (
              <div key={label}>
                <label className="text-sm text-neutral-700 block mb-1">{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              </div>
            ))}
          </div>
        </ProfileModal>
      )}

      {/* Tentang Kami */}
      {modalState.tentang && (
        <ProfileModal
          title="Edit Tentang Kami"
          onClose={() => closeModal("tentang")}
          onSubmit={() => closeModal("tentang")}
          submitLabel="Simpan"
        >
          <div>
            <label className="text-sm text-neutral-700 block mb-1">Deskripsi Usaha</label>
            <textarea
              value={deskripsiUsaha}
              onChange={(e) => setDeskripsiUsaha(e.target.value)}
              rows={5}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-300 resize-none"
            />
          </div>
        </ProfileModal>
      )}

      {/* Kontak */}
      {modalState.kontak && (
        <ProfileModal
          title="Edit Kontak Kami"
          onClose={() => closeModal("kontak")}
          onSubmit={() => closeModal("kontak")}
          submitLabel="Simpan"
        >
          <div className="flex flex-col gap-4">
            {[
              { label: "Website", value: website, onChange: setWebsite, type: "text" },
              { label: "Email HRD", value: emailHrd, onChange: setEmailHrd, type: "email" },
              { label: "Telepon", value: telepon, onChange: setTelepon, type: "text" },
              { label: "Alamat", value: alamat, onChange: setAlamat, type: "text" },
            ].map(({ label, value, onChange, type }) => (
              <div key={label}>
                <label className="text-sm text-neutral-700 block mb-1">{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-300"
                />
              </div>
            ))}
          </div>
        </ProfileModal>
      )}

      {/* Fasilitas */}
      {modalState.fasilitas && (
        <ProfileModal
          title="Tambah Fasilitas"
          onClose={() => closeModal("fasilitas")}
          onSubmit={handleTambahFasilitas}
          submitLabel="Tambah"
        >
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-neutral-700 block mb-1">Judul Fasilitas</label>
              <input
                type="text"
                value={judulFasilitas}
                onChange={(e) => setJudulFasilitas(e.target.value)}
                placeholder="contoh: Gaji Kompetitif"
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-300"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-700 block mb-1">Deskripsi</label>
              <textarea
                value={deskripsiFasilitas}
                onChange={(e) => setDeskripsiFasilitas(e.target.value)}
                placeholder="contoh: Gaji pokok + bonus performa bulanan"
                rows={3}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-300 resize-none"
              />
            </div>
          </div>
        </ProfileModal>
      )}
    </>
  );
}