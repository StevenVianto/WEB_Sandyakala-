import { createContext, useContext, useState } from "react";
import { mockBenefits } from "../constants/mock-data";

type ModalKey = "profile" | "tentang" | "kontak" | "fasilitas";
type Fasilitas = {
  id: string;
  title: string;
  description: string;
};

const ProfileUmkmContext = createContext<any>(null);


export function ProfileUmkmProvider({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState({
    profile: false,
    tentang: false,
    kontak: false,
    fasilitas: false,
  });



  const openModal = (key: ModalKey) =>
    setModalState((prev) => ({ ...prev, [key]: true }));

  const closeModal = (key: ModalKey) =>
    setModalState((prev) => ({ ...prev, [key]: false }));

  const [namaUsaha, setNamaUsaha] = useState("Sambal Bakar Nusantara");
  const [keteranganUsaha, setKeteranganUsaha] = useState("Kuliner Nusantara Modern");
  const [lokasiUsaha, setLokasiUsaha] = useState("Jakarta Selatan");
  const [tahunDibangun, setTahunDibangun] = useState("2022");
  const [jumlahKaryawan, setJumlahKaryawan] = useState("10 - 50");
  const [kategoriUsaha, setKategoriUsaha] = useState("Kuliner");
  const [deskripsiUsaha, setDeskripsiUsaha] = useState("");
  const [website, setWebsite] = useState("www.sambalbakarnusantara.com");
  const [emailHrd, setEmailHrd] = useState("hrd@sambalbakar.id");
  const [telepon, setTelepon] = useState("+62 812-3456-7890");
  const [alamat, setAlamat] = useState("Jl. Kemang Raya No. 45, Jaksel");
  const [fasilitas, setFasilitas] = useState<Fasilitas[]>(mockBenefits as Fasilitas[]);
  const [judulFasilitas, setJudulFasilitas] = useState("");
  const [deskripsiFasilitas, setDeskripsiFasilitas] = useState("");

  const handleTambahFasilitas = () => {
    if (!judulFasilitas.trim()) return;
    setFasilitas((prev) => [
      ...prev,
      { id: String(Date.now()), title: judulFasilitas, description: deskripsiFasilitas },
    ]);
    setJudulFasilitas("");
    setDeskripsiFasilitas("");
    closeModal("fasilitas");
  };

  const handleHapusFasilitas = (id: string) => {
    setFasilitas((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <ProfileUmkmContext.Provider value={{
      modalState, openModal, closeModal,
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
      fasilitas, handleTambahFasilitas, handleHapusFasilitas,
      judulFasilitas, setJudulFasilitas,
      deskripsiFasilitas, setDeskripsiFasilitas,
    }}>
      {children}
    </ProfileUmkmContext.Provider>
  );
}

export const useProfileUmkm = () => useContext(ProfileUmkmContext);