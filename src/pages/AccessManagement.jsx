import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building } from 'lucide-react';

const SimpleProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const profileData = {
      nama: 'John Doe',
      email: 'john.doe@contohljk.co.id',
      telepon: '+62 812-3456-7890',
      institusi: 'PT. Contoh Lembaga Jasa Keuangan'
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
    },
    {
      icon: Building,
      label: 'Nama LJK / Institusi',
      value: userProfile.institusi,
      description: 'Lembaga terafiliasi'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil IRS</h1>
          <p className="text-red-600 font-medium">Informasi Profil Terdaftar</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">Informasi Profil</h2>
                <p className="text-white/90 text-sm mt-1">Data lengkap pengguna IRS</p>
              </div>
            </div>
          </div>

          {/* Profile Information Grid */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="group transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <label className="text-sm font-semibold text-gray-700">
                        {item.label}
                      </label>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-100 
                                   group-hover:border-red-300 group-hover:shadow-md transition-all">
                      <p className="text-xl font-bold text-gray-900 mb-1">
                        {item.value}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                  Data diperbarui terakhir: {new Date().toLocaleDateString('id-ID')}
                </p>
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Status: Aktif</span>
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