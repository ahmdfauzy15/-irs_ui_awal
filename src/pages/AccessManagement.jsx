import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, AlertCircle } from 'lucide-react';

const SimpleProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const profileData = {
      nama: 'John Doe',
      email: 'john.doe@contohljk.co.id',
      telepon: '+62 812-3456-7890'
      // institusi dihapus
    };
    setUserProfile(profileData);
  }, []);

  if (!userProfile) return null;

  const profileItems = [
    {
      icon: User,
      label: 'Nama Lengkap',
      value: userProfile.nama,
      description: 'Nama lengkap terdaftar'
    },
    {
      icon: Mail,
      label: 'Email',
      value: userProfile.email,
      description: 'Alamat email resmi'
    },
    {
      icon: Phone,
      label: 'Nomor Telepon',
      value: userProfile.telepon,
      description: 'Nomor kontak terdaftar'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Profil IRS</h1>
          <p className="text-red-600 font-medium text-sm md:text-base">Informasi Profil Terdaftar</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Card Header - Responsive */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 md:p-6">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="p-2 md:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-bold text-white">Informasi Profil</h2>
                <p className="text-white/90 text-xs md:text-sm mt-1">Data lengkap pengguna IRS</p>
              </div>
            </div>
          </div>

          {/* Profile Information Grid - Responsive (mobile: 1 kolom, tablet: 2 kolom, desktop: 3 kolom) */}
          <div className="p-4 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {profileItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="group transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <div className="p-1.5 md:p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                      </div>
                      <label className="text-xs md:text-sm font-semibold text-gray-700">
                        {item.label}
                      </label>
                    </div>
                    
                    <div className="p-3 md:p-4 bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-100 group-hover:border-red-300 group-hover:shadow-md transition-all">
                      <p className="text-base md:text-xl font-bold text-gray-900 mb-1 break-words">
                        {item.value}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer Data dari Pelaporan.id - Responsive */}
            <div className="mt-6 md:mt-8 p-3 md:p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-yellow-100 rounded-lg flex-shrink-0">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-yellow-800">Informasi Data</p>
                  <p className="text-xs md:text-sm text-yellow-700">
                    Data ini merupakan data awal dari validasi Pelaporan.id. Silakan lengkapi data Anda melalui pengajuan hak akses untuk dapat menggunakan aplikasi pelaporan.
                  </p>
                </div>
              </div>
            </div>

            {/* Informasi Hak Akses - User Baru (Belum Ada Hak Akses) - Responsive */}
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 bg-gray-100 rounded-lg flex-shrink-0">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-gray-700">Status Hak Akses</p>
                  <p className="text-xs md:text-sm text-gray-600">
                    Anda belum memiliki hak akses untuk aplikasi APOLO, E-Reporting, dan SIPINA.
                  </p>
                  <p className="text-xs text-gray-500 mt-1 md:mt-2">
                    Silakan ajukan permohonan hak akses melalui menu Management Account IRS.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer - Responsive */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
                <p className="text-xs md:text-sm text-gray-500 text-center sm:text-left">
                  Data diperbarui terakhir: {new Date().toLocaleDateString('id-ID')}
                </p>
                <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-xs md:text-sm font-medium text-gray-700">Status: Menunggu Aktivasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProfile;