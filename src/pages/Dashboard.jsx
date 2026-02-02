// Dashboard.js - Update untuk user baru
import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  BarChart3,
  TrendingUp,
  History,
  ArrowRight,
  Search,
  AlertCircle,
  Building,
  Calendar,
  XCircle,
  Key,
  User,
  FileSpreadsheet,
  Shield,
  Lock,
  AlertTriangle,
  Gavel // TAMBAHKAN INI
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewUser, setIsNewUser] = useState(true); // State untuk menandai user baru
  
  // Data untuk user baru
  const welcomeStatsNewUser = [
    {
      number: "0",
      label: "Laporan Tersedia",
      icon: FileText,
      color: "red",
      description: "Menunggu persetujuan hak akses"
    },
    {
      number: "1",
      label: "Akun Aktif",
      icon: User,
      color: "red",
      description: "Status: Terdaftar"
    },
    {
      number: "0",
      label: "Hak Akses",
      icon: Key,
      color: "red",
      description: "Belum memiliki akses"
    },
    {
      number: "Baru",
      label: "Status Akun",
      icon: Shield,
      color: "red",
      description: "Perlu verifikasi"
    }
  ];

  const quickAccessCardsNewUser = [
    {
      title: "Ajukan Hak Akses",
      description: "Ajukan permohonan untuk mengakses sistem pelaporan OJK",
      icon: FileSpreadsheet,
      color: "red",
      link: "/profile/hak-akses/pengajuan",
      status: "wajib",
      progress: 0
    },
    {
      title: "Lengkapi Profil",
      description: "Lengkapi data profil untuk proses verifikasi akun",
      icon: User,
      color: "red",
      link: "/profile",
      status: "perlu",
      progress: 40
    },
    {
      title: "Panduan Pengguna",
      description: "Pelajari cara penggunaan sistem IRS OJK untuk pemula",
      icon: FileText,
      color: "red",
      link: "/faq",
      status: "rekomendasi",
      progress: 100
    }
  ];

  const activityDataNewUser = [
    {
      id: 1,
      type: 'account',
      title: 'Akun Baru Dibuat',
      description: 'Akun IRS OJK berhasil dibuat',
      time: 'Baru saja',
      icon: User,
      color: 'red'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Perhatian: Hak Akses',
      description: 'Anda belum memiliki hak akses untuk menggunakan fitur pelaporan',
      time: 'Hari ini',
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      id: 3,
      type: 'info',
      title: 'Verifikasi Email',
      description: 'Email verifikasi telah dikirim ke alamat email terdaftar',
      time: '2 jam lalu',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-red-50/30 to-white min-h-screen p-4 lg:p-6">
      {/* Welcome Banner untuk User Baru */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl overflow-hidden border border-red-500">
        <div className="p-6 md:p-8 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Selamat Datang di Sistem IRS OJK
                </h1>
                <p className="text-red-100 text-lg mb-4">
                  Status: <span className="font-bold">User Baru</span> - Akses Terbatas
                </p>
                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-medium">Perlu Verifikasi</span>
                  </div>
                  <div className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full">
                    <span className="text-yellow-100 text-sm font-medium">Hak Akses Menunggu</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="w-20 h-20 bg-gradient-to-br from-white to-red-200 rounded-full flex items-center justify-center text-red-700 font-bold text-2xl border-4 border-white shadow-lg">
                  JD
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-300 mr-3" />
                <p className="text-white text-sm">
                  Untuk menggunakan fitur lengkap sistem, Anda perlu mengajukan hak akses terlebih dahulu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview untuk User Baru */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {welcomeStatsNewUser.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-red-50/50 border border-red-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                {stat.number === "0" && (
                  <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    Terkunci
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-red-900">{stat.number}</div>
                <div className="text-lg font-bold text-red-800">{stat.label}</div>
                <p className="text-red-600 text-sm">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Quick Access Cards untuk User Baru */}
     

      {/* Recent Activity untuk User Baru */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100 overflow-hidden hover:shadow-red transition-shadow duration-300">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-red-100 to-white rounded-lg border border-red-200">
                  <History className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-900">Aktivitas Akun Terbaru</h3>
                  <p className="text-sm text-red-600/80">Status pendaftaran dan verifikasi</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white">
            <div className="space-y-4">
              {activityDataNewUser.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-red-50 transition-colors duration-200">
                  <div className={`p-2 rounded-lg ${
                    activity.color === 'red' ? 'bg-red-100 text-red-600' :
                    activity.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900">{activity.title}</h4>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Informasi Sistem Terkunci */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Fitur Sistem Terkunci</h3>
                  <p className="text-red-100">Hak akses diperlukan untuk menggunakan fitur lengkap</p>
                </div>
              </div>
              <Link to="/profile/hak-akses/pengajuan">
                <button className="group flex items-center space-x-2 px-6 py-3 bg-white hover:bg-red-50 text-red-700 font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95">
                  <FileSpreadsheet className="w-5 h-5" />
                  <span>Ajukan Hak Akses</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-red-200" />
                  <div>
                    <p className="text-white font-medium">Laporan APOLO</p>
                    <p className="text-red-200 text-sm">Status: Terkunci</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-red-200" />
                  <div>
                    <p className="text-white font-medium">E-Reporting</p>
                    <p className="text-red-200 text-sm">Status: Terkunci</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <Gavel className="w-5 h-5 text-red-200" /> {/* DI SINI MENGGUNAKAN Gavel */}
                  <div>
                    <p className="text-white font-medium">SIPINA</p>
                    <p className="text-red-200 text-sm">Status: Terkunci</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panduan Cepat untuk User Baru */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Panduan Cepat untuk User Baru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
          <div className="space-y-3 p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-700 font-bold">1</span>
            </div>
            <h4 className="font-bold text-blue-900">Ajukan Hak Akses</h4>
            <p className="text-sm text-gray-600">Isi formulir pengajuan akses sesuai kebutuhan</p>
          </div>
          <div className="space-y-3 p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-700 font-bold">2</span>
            </div>
            <h4 className="font-bold text-blue-900">Tunggu Verifikasi</h4>
            <p className="text-sm text-gray-600">Tim OJK akan memverifikasi dalam 1-3 hari kerja</p>
          </div>
          <div className="space-y-3 p-4 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-700 font-bold">3</span>
            </div>
            <h4 className="font-bold text-blue-900">Akses Sistem</h4>
            <p className="text-sm text-gray-600">Gunakan semua fitur setelah disetujui</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;