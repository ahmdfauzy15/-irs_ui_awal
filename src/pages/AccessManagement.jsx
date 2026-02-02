import React, { useState, useEffect } from 'react';
import { 
  Key, 
  CheckCircle,
  User,
  Building,
  Mail,
  Phone,
  Shield,
  Database
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const AccessManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getActiveTabFromURL = () => {
    return 'profil';
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromURL());
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    setActiveTab(getActiveTabFromURL());
  }, [location.pathname]);

  useEffect(() => {
    const loadProfileData = () => {
      const dbProfile = {
        nama: 'John Doe',
        email: 'john.doe@contohljk.co.id',
        telepon: '+62 812-3456-7890',
        institusi: 'PT. Contoh Lembaga Jasa Keuangan',
        jabatan: 'Senior Manager Compliance',
        userId: 'LJK-COMP-2024-001',
        joinDate: '15 Januari 2023',
        status: 'Aktif',
        nip: '2023123456',
        divisi: 'Divisi Risk Management & Compliance',
        levelAkses: 'Level 4 - Senior Management'
      };
      setUserProfile(dbProfile);
      localStorage.setItem('userProfile', JSON.stringify(dbProfile));
    };
    
    loadProfileData();
  }, []);

  // Tabs untuk Management Account - hanya profil
  const tabs = [
    { id: 'profil', label: 'Informasi Profil', icon: User, path: '/AccessManagement' }
  ];

  const handleTabClick = (tabId, tabPath) => {
    setActiveTab(tabId);
    navigate(tabPath);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profil Akun IRS</h1>
                <p className="text-red-600 text-sm md:text-base font-medium">Informasi Profile IRS</p>
              </div>
            </div>
          </div>

        
          {/* Tabs dengan warna merah - hanya profil */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id, tab.path)}
                  className={`
                    flex items-center space-x-2 px-4 py-2.5 rounded-lg border transition-all duration-200
                    ${activeTab === tab.id 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600 shadow-md' 
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-red-50 hover:border-red-300'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content hanya profil */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <ProfileTab userProfile={userProfile} />
        </div>
      </div>
    </div>
  );
};

// Komponen Profil Tab yang disederhanakan
const ProfileTab = ({ userProfile }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <User className="w-5 h-5 text-red-600" />
          Informasi Profil
        </h2>
        <p className="text-sm text-gray-600 mt-1">Data profil lengkap pengguna</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informasi Pribadi */}
        <div>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header Informasi Pribadi */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg">
                  <User className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-white">Informasi Pribadi</h3>
              </div>
            </div>

            {/* Detail Informasi Pribadi */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500">Nama Lengkap</label>
                  <div className="flex items-center space-x-3 p-3 bg-red-50/50 rounded-lg border border-red-100">
                    <User className="w-4 h-4 text-red-600" />
                    <p className="font-medium text-gray-900">{userProfile?.nama || 'John Doe'}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500">Email</label>
                  <div className="flex items-center space-x-3 p-3 bg-red-50/50 rounded-lg border border-red-100">
                    <Mail className="w-4 h-4 text-red-600" />
                    <p className="font-medium text-gray-900">{userProfile?.email || 'john.doe@contohljk.co.id'}</p>
                  </div>
                </div>

                {/* Nomor Telepon */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500">Nomor Telepon</label>
                  <div className="flex items-center space-x-3 p-3 bg-red-50/50 rounded-lg border border-red-100">
                    <Phone className="w-4 h-4 text-red-600" />
                    <p className="font-medium text-gray-900">{userProfile?.telepon || '+62 812-3456-7890'}</p>
                  </div>
                </div>

                {/* Nama LJK / Institusi */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500">Nama LJK / Institusi</label>
                  <div className="flex items-center space-x-3 p-3 bg-red-50/50 rounded-lg border border-red-100">
                    <Building className="w-4 h-4 text-red-600" />
                    <p className="font-medium text-gray-900">{userProfile?.institusi || 'PT. Contoh Lembaga Jasa Keuangan'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistik Hak Akses */}
        <div>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full">
            {/* Header Statistik */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg">
                  <Key className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-white">Statistik Hak Akses</h3>
              </div>
            </div>

            {/* Detail Statistik */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Total Hak Akses */}
                {/* <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">3</p>
                      <p className="text-sm text-gray-600 mt-1">Total Hak Akses</p>
                    </div>
                    <div className="p-2 rounded-lg bg-red-50">
                      <Key className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                </div> */}

                {/* Akses Aktif */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">3</p>
                      <p className="text-sm text-gray-600 mt-1">Akses Aktif</p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-50">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>

         

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;