import React, { useState, useEffect } from 'react';
import DashboardUmkmLayout from "@/shared/layouts/DashboardUmkmLayout";
import { Card } from "@/features/umkm/components/ui/Card";
import { Button } from "@/shared/components/ui/button";
import { MdVerified, MdStore } from "react-icons/md";
import { IoLocationSharp, IoPeople } from "react-icons/io5";
import { BiSolidBriefcaseAlt } from "react-icons/bi";
import { HiViewGridAdd } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import BgImgRekrutmen from "@/assets/images/Bg Img Dashboard Umkm.png";
import InfoBadge from "@/features/umkm/components/ui/InfoBadge";
import { apiRequest } from "@/shared/lib/api";

type ReportStatus = 'normal' | 'warning' | 'inactive' | 'disabled';

interface Report {
  id: number;
  kategoriPelanggaran: string;
  alasanPelaporan: string;
  status: string;
  created_at: string;
}

const ForkKnifeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm8-7h-3v20h3v-8h3V9c0-3.87-3.13-7-7-7z" />
  </svg>
);

const SectionHeader: React.FC<{
  title: string;
  actionText?: string;
  onAction?: () => void;
}> = ({ title, actionText, onAction }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-7 bg-[#2563EB] rounded-full" />
      <h2 className="text-[16px] md:text-[20px] font-bold text-[#1E293B]">{title}</h2>
    </div>
    {actionText && (
      <Button
        variant={"outline"}
        onClick={onAction}
        className="px-5 py-1 rounded-full border border-[#2DD4BF] text-[#14B8A6] text-xs font-semibold hover:bg-teal-50 transition-colors h-8"
      >
        {actionText}
      </Button>
    )}
  </div>
);

const determineStatus = (reports: Report[]): ReportStatus => {
  if (reports.length === 0) return 'normal';
  const statuses = reports.map((r) => r.status);
  if (statuses.includes('Blokir')) return 'disabled';
  if (statuses.includes('Peringatan')) return 'warning';
  if (statuses.includes('Valid') || statuses.includes('Menunggu')) return 'inactive';
  return 'normal';
};

export default function ReportUMKM() {
  const [status, setStatus] = useState<ReportStatus>('normal');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const res = await apiRequest<any>("/reports/umkm/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.success && Array.isArray(res.data)) {
        setReports(res.data);
        setStatus(determineStatus(res.data));
      }
      setLoading(false);
    };
    fetchReports();
  }, []);

  const renderBanner = () => {
    switch (status) {
      case 'warning':
        return (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl bg-[#FEF9C3] text-[#A16207] px-4 md:px-6 py-2.5 rounded shadow-sm flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 z-30">
            <span className="text-xs md:text-sm font-semibold text-center md:text-left">
              Akun Anda mendapat peringatan: Melanggar syarat & ketentuan (Terms of Service)
            </span>
            <button className="bg-[#FDE047] text-[#A16207] px-6 py-1.5 rounded text-xs font-bold hover:bg-[#FACC15] transition shrink-0">
              Lihat
            </button>
          </div>
        );
      case 'inactive':
        return (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl bg-[#E0E7FF] text-[#3730A3] px-4 md:px-6 py-2.5 rounded shadow-sm flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 z-30">
            <span className="text-xs md:text-sm font-semibold text-center md:text-left">
              Akun Anda sedang dalam peninjauan. Terdapat laporan yang masuk terhadap usaha Anda.
            </span>
            <button className="bg-[#6366F1] text-white px-6 py-1.5 rounded text-xs font-bold hover:bg-[#4F46E5] transition shrink-0">
              Lihat
            </button>
          </div>
        );
      case 'disabled':
        return (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl bg-[#FEE2E2] text-[#B91C1C] px-4 md:px-6 py-2.5 rounded shadow-sm flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 z-30">
            <span className="text-xs md:text-sm font-semibold text-center md:text-left">
              Akun Anda telah diblokir karena pelanggaran serius.
            </span>
            <button className="bg-[#EF4444] text-white px-6 py-1.5 rounded text-xs font-bold hover:bg-[#DC2626] transition shrink-0">
              Lihat
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <DashboardUmkmLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-neutral-500 text-sm">Memuat data...</p>
        </div>
      </DashboardUmkmLayout>
    );
  }

  return (
    <DashboardUmkmLayout>
      <div className="w-full bg-white min-h-screen relative pb-20 pt-[60px]">
        <section className="w-full">
          <div className="relative h-[280px] w-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${BgImgRekrutmen})` }}
            />
            {renderBanner()}
          </div>

          {status !== 'disabled' && (
            <div className="relative z-20 container mx-auto px-4 lg:px-12 -mt-24 pb-8 max-w-6xl">
              <Card className="w-full flex flex-col md:flex-row items-start md:items-center gap-6 relative p-8 md:p-10 rounded-[20px] shadow-sm border border-gray-100 bg-white">
                <div className="w-32 h-32 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0">
                  <ForkKnifeIcon className="w-14 h-14 text-[#EA580C]" />
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 w-full">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-[20px] md:text-[26px] font-extrabold text-slate-800">
                          Sambal Bakar Nusantara
                        </h1>
                        <MdVerified className="w-7 h-7 text-[#3B82F6]" />
                      </div>
                      <p className="text-slate-700 text-lg mb-5 font-medium">
                        Kuliner Nusantara Modern
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <InfoBadge icon={<IoLocationSharp />} text="Jakarta Selatan" />
                        <InfoBadge icon={<MdStore />} text="Berdiri sejak 2022" />
                        <InfoBadge icon={<IoPeople />} text="10 - 50 Karyawan" />
                        <InfoBadge icon={<BiSolidBriefcaseAlt />} text="4 Lowongan Aktif" />
                        <InfoBadge icon={<HiViewGridAdd />} text="Kuliner" />
                      </div>
                    </div>

                    {status === 'warning' && (
                      <div className="bg-[#FEF08A] text-[#CA8A04] px-4 py-1.5 rounded-full text-xs font-bold shrink-0">
                        Peringatan
                      </div>
                    )}
                    {status === 'inactive' && (
                      <div className="bg-[#DBEAFE] text-[#6366F1] px-4 py-1.5 rounded-full text-xs font-bold shrink-0">
                        Dalam Peninjauan
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </section>

        <div className="container mx-auto px-4 lg:px-12 pb-12 max-w-6xl">
          {status === 'disabled' ? (
            <div className="flex flex-col items-center justify-center mt-12 md:mt-24 w-full">
              <div className="bg-[#FFE4E6] w-full max-w-[600px] p-10 md:p-14 rounded-xl flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full border-2 border-[#E11D48] text-[#E11D48] flex items-center justify-center mb-6 bg-transparent">
                  <FiX className="w-10 h-10 stroke-[2px]" />
                </div>
                <h2 className="text-[#E11D48] text-[24px] font-extrabold mb-3">
                  Akun Anda telah dinonaktifkan
                </h2>
                <p className="text-[#E11D48] text-[16px] mb-8 font-medium">
                  Akun Anda diblokir karena pelanggaran serius
                </p>
                <Button className="bg-[#C1121F] hover:bg-[#A10E18] text-white px-12 py-3 rounded-[8px] text-[15px] font-bold">
                  Hubungi Admin
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {reports.length > 0 && (
                <Card className="rounded-[20px] border border-gray-100 shadow-sm p-8">
                  <SectionHeader title="Laporan Terhadap Usaha Anda" />
                  <div className="flex flex-col gap-3">
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className="border border-neutral-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-semibold text-neutral-800">
                            {report.kategoriPelanggaran}
                          </p>
                          <p className="text-xs text-neutral-500">{report.alasanPelaporan}</p>
                          <p className="text-xs text-neutral-400">
                            {new Date(report.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
                            report.status === "Blokir"
                              ? "bg-red-100 text-red-700"
                              : report.status === "Peringatan"
                              ? "bg-yellow-100 text-yellow-700"
                              : report.status === "Valid"
                              ? "bg-green-100 text-green-700"
                              : report.status === "Ditolak"
                              ? "bg-neutral-200 text-neutral-600"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <Card className="rounded-[20px] border border-gray-100 shadow-sm p-8">
                    <SectionHeader title="Tentang Kami" actionText="Ubah" />
                    <div className="text-gray-700 text-[15px] leading-relaxed text-justify">
                      <p>
                        <strong>Sambal Bakar Nusantara</strong> adalah UMKM kuliner
                        yang menghadirkan berbagai hidangan khas Indonesia dengan
                        cita rasa autentik dan sentuhan modern.
                      </p>
                    </div>
                  </Card>

                  <Card className="rounded-[20px] border border-gray-100 shadow-sm p-8">
                    <SectionHeader title="Keuntungan & Fasilitas" actionText="Tambah" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-[#F8FAFC] rounded-xl p-5">
                        <h3 className="font-bold text-gray-900 text-[14px] mb-2">Gaji Kompetitif</h3>
                        <p className="text-[12px] text-gray-500 leading-relaxed">Gaji pokok + bonus performa bulanan transparan</p>
                      </div>
                      <div className="bg-[#F4F6FF] rounded-xl p-5">
                        <h3 className="font-bold text-gray-900 text-[14px] mb-2">BPJS Lengkap</h3>
                        <p className="text-[12px] text-gray-500 leading-relaxed">BPJS Kesehatan & Ketenagakerjaan ditanggung penuh</p>
                      </div>
                      <div className="bg-[#F8FAFC] rounded-xl p-5">
                        <h3 className="font-bold text-gray-900 text-[14px] mb-2">Makan Gratis</h3>
                        <p className="text-[12px] text-gray-500 leading-relaxed">1x makan gratis setiap shift kerja berlangsung</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                  <Card className="rounded-[20px] border border-gray-100 shadow-sm p-8">
                    <SectionHeader title="Kontak Kami" actionText="Ubah" />
                    <div className="space-y-4">
                      <div className="bg-[#F8FAFC] rounded-xl p-4">
                        <span className="block text-[12px] font-semibold text-[#64748B] mb-1">Website</span>
                        <span className="block text-[14px] font-medium text-gray-800">www.sambalbakarnusantara.com</span>
                      </div>
                      <div className="bg-[#F8FAFC] rounded-xl p-4">
                        <span className="block text-[12px] font-semibold text-[#64748B] mb-1">Email HRD</span>
                        <span className="block text-[14px] font-medium text-gray-800">hrd@sambalbakar.id</span>
                      </div>
                      <div className="bg-[#F8FAFC] rounded-xl p-4">
                        <span className="block text-[12px] font-semibold text-[#64748B] mb-1">Telepon</span>
                        <span className="block text-[14px] font-medium text-gray-800">+62 812-3456-7890</span>
                      </div>
                      <div className="bg-[#F8FAFC] rounded-xl p-4">
                        <span className="block text-[12px] font-semibold text-[#64748B] mb-1">Alamat</span>
                        <span className="block text-[14px] font-medium text-gray-800">Jl. Kemang Raya No. 45, Jaksel</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardUmkmLayout>
  );
}
