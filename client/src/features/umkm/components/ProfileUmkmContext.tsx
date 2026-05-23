import { createContext, useContext, useState, useEffect } from "react";
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

  // Load saved profile data if available
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userEmail = user?.email || "";
  const profileKey = userEmail ? `registered_umkm_profile_${userEmail}` : "registered_umkm_profile";
  const savedProfileStr = localStorage.getItem(profileKey);
  const savedProfile = savedProfileStr ? JSON.parse(savedProfileStr) : null;

  const [namaUsaha, setNamaUsaha] = useState(savedProfile?.businessName || "Sambal Bakar Nusantara");
  const [keteranganUsaha, setKeteranganUsaha] = useState(savedProfile ? `${savedProfile.businessCategory} Nusantara` : "Kuliner Nusantara Modern");
  const [lokasiUsaha, setLokasiUsaha] = useState(savedProfile?.address || "Jakarta Selatan");
  const [tahunDibangun, setTahunDibangun] = useState(savedProfile?.establishedAt || "2022");
  const [jumlahKaryawan, setJumlahKaryawan] = useState(savedProfile?.employeeCount || "10 - 50");
  const [kategoriUsaha, setKategoriUsaha] = useState(savedProfile?.businessCategory || "Kuliner");
  const [deskripsiUsaha, setDeskripsiUsaha] = useState("");
  const [website, setWebsite] = useState(savedProfile ? (savedProfile.websiteSosmed || "") : "www.sambalbakarnusantara.com");
  const [emailHrd, setEmailHrd] = useState(savedProfile?.businessEmail || "hrd@sambalbakar.id");
  const [telepon, setTelepon] = useState(savedProfile?.businessPhone || "+62 812-3456-7890");
  const [alamat, setAlamat] = useState(savedProfile?.address || "Jl. Kemang Raya No. 45, Jaksel");
  const [fasilitas, setFasilitas] = useState<Fasilitas[]>(mockBenefits as Fasilitas[]);
  const [judulFasilitas, setJudulFasilitas] = useState("");
  const [deskripsiFasilitas, setDeskripsiFasilitas] = useState("");
  const [logoUsaha, setLogoUsaha] = useState(savedProfile?.businessLogo || "");

  // Sync profile edits back to local storage automatically
  useEffect(() => {
    if (!profileKey) return;
    const currentProfileStr = localStorage.getItem(profileKey);
    const currentProfile = currentProfileStr ? JSON.parse(currentProfileStr) : {};
    const updatedProfile = {
      ...currentProfile,
      businessName: namaUsaha,
      businessCategory: kategoriUsaha,
      employeeCount: jumlahKaryawan,
      establishedAt: tahunDibangun,
      businessEmail: emailHrd,
      businessPhone: telepon,
      websiteSosmed: website,
      address: alamat,
      businessLogo: logoUsaha,
    };
    localStorage.setItem(profileKey, JSON.stringify(updatedProfile));
  }, [namaUsaha, kategoriUsaha, jumlahKaryawan, tahunDibangun, emailHrd, telepon, website, alamat, logoUsaha, profileKey]);

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
      logoUsaha, setLogoUsaha,
    }}>
      {children}
    </ProfileUmkmContext.Provider>
  );
}

export const useProfileUmkm = () => useContext(ProfileUmkmContext);