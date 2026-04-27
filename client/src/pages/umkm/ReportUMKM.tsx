import React, { useState } from 'react';
import { Card } from "@/features/umkm/components/ui/Card";
import { Button } from "@/shared/components/ui/button";
import { MdWarning, MdError, MdBlock } from "react-icons/md";

type ReportStatus = 'warning' | 'inactive' | 'disabled';

export default function ReportUMKM() {
  const [status, setStatus] = useState<ReportStatus>('warning');

  const renderContent = () => {
    switch (status) {
      case 'warning':
        return (
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-12">
            <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <MdWarning className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Peringatan Akun</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Kami mendeteksi adanya aktivitas yang melanggar ketentuan layanan kami pada akun Anda. Mohon segera perbaiki pelanggaran tersebut. Jika pelanggaran terus berlanjut, akun Anda dapat dibekukan.
            </p>
            <div className="bg-yellow-50/80 border border-yellow-200 rounded-xl p-6 text-left w-full mb-8">
              <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <MdWarning className="w-5 h-5" /> Detail Pelanggaran:
              </h3>
              <ul className="list-disc list-inside text-yellow-700/90 space-y-2 text-sm ml-1">
                <li>Mengunggah lowongan pekerjaan yang tidak sesuai pedoman platform.</li>
                <li>Terdapat laporan dari beberapa pencari kerja terkait informasi yang tidak akurat.</li>
              </ul>
            </div>
            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all font-medium">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        );
      case 'inactive':
        return (
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-12">
            <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <MdError className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Akun Dibekukan Sementara</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Akun Anda saat ini dibekukan karena adanya indikasi pelanggaran berat atau laporan berulang. Selama masa pembekuan, Anda tidak dapat memposting lowongan baru atau merespons pelamar.
            </p>
            <div className="bg-orange-50/80 border border-orange-200 rounded-xl p-6 text-left w-full mb-8">
              <p className="text-orange-800 text-sm flex gap-3">
                <MdError className="w-6 h-6 shrink-0 mt-0.5" />
                <span>
                  <strong className="block mb-1 text-base">Tindakan yang diperlukan:</strong> 
                  Silakan hubungi tim dukungan kami untuk proses banding dan verifikasi ulang dokumen usaha Anda. Proses peninjauan memakan waktu 1-3 hari kerja.
                </span>
              </p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all font-medium">
              Hubungi Tim Support
            </Button>
          </div>
        );
      case 'disabled':
        return (
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-12">
            <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <MdBlock className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Akun Dinonaktifkan Permanen</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Mohon maaf, akun Anda telah dinonaktifkan secara permanen karena pelanggaran fatal terhadap Syarat dan Ketentuan platform kami. Keputusan ini bersifat final dan tidak dapat diganggu gugat.
            </p>
            <div className="bg-red-50/80 border border-red-200 rounded-xl p-6 text-left w-full mb-8">
              <p className="text-red-800 text-sm flex gap-3">
                <MdBlock className="w-5 h-5 shrink-0 mt-0.5" />
                <span>
                  Jika Anda merasa ini adalah sebuah kesalahan sistem, Anda memiliki waktu 7 hari sejak pemberitahuan ini untuk mengajukan banding terakhir. Lewat dari waktu tersebut, data Anda akan dihapus secara permanen.
                </span>
              </p>
            </div>
            <Button className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-2.5 rounded-full shadow-sm hover:shadow transition-all font-medium">
              Ajukan Banding Terakhir
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="container mx-auto p-4 md:p-8 min-h-screen pt-12 md:pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Debug Switcher */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <span className="w-full text-center text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Preview Mode (Dev Only)</span>
            <Button 
              variant={status === 'warning' ? 'default' : 'outline'} 
              onClick={() => setStatus('warning')}
              className={`rounded-full px-6 transition-all ${status === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Warning State
            </Button>
            <Button 
              variant={status === 'inactive' ? 'default' : 'outline'} 
              onClick={() => setStatus('inactive')}
              className={`rounded-full px-6 transition-all ${status === 'inactive' ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Inactive State
            </Button>
            <Button 
              variant={status === 'disabled' ? 'default' : 'outline'} 
              onClick={() => setStatus('disabled')}
              className={`rounded-full px-6 transition-all ${status === 'disabled' ? 'bg-red-500 hover:bg-red-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Disabled State
            </Button>
          </div>

          <Card className="p-4 md:p-8 overflow-hidden relative">
            {/* Decorative background blur */}
            <div className={`absolute top-0 left-0 w-full h-2 ${
              status === 'warning' ? 'bg-yellow-400' :
              status === 'inactive' ? 'bg-orange-400' : 'bg-red-500'
            }`} />
            
            <div className="relative z-10">
              {renderContent()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

