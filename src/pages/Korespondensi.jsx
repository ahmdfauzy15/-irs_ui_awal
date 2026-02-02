import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Info, 
  Mail,
  Filter,
  Megaphone,
  Calendar,
  Download,
  Bookmark,
  ChevronRight,
  X,
  Eye,
  Share2,
  Printer,
  FileText,
  User,
  Clock as ClockIcon,
  Tag,
  Check,
  AlertTriangle,
  Zap,
  Award,
  Users,
  MapPin,
  Target,
  TrendingUp,
  Cpu,
  BookOpen,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useNavigate, useLocation } from 'react-router-dom';

// Komponen untuk konten detail pengumuman - DIPERBAIKI
const AnnouncementDetailContent = ({ announcement }) => {
  if (!announcement) return null;
  
  // Data deskripsi lengkap untuk pengumuman
  const announcementDetails = {
    1: {
      fullDescription: `Kementerian Keuangan secara resmi merilis Panduan Sistem e-Reporting Tahun 2024 yang merupakan pembaruan komprehensif dari versi sebelumnya. Panduan ini dikembangkan berdasarkan masukan dari pengguna selama setahun terakhir dan mengintegrasikan teknologi terbaru untuk meningkatkan efisiensi pelaporan keuangan negara.`,
      
      sections: [
        {
          title: "📋 Latar Belakang Pembaruan",
          content: "Panduan ini dikeluarkan sebagai respon terhadap perkembangan teknologi dan kebutuhan akan sistem pelaporan yang lebih cepat, akurat, dan terintegrasi. Update tahun 2024 fokus pada peningkatan user experience dan keamanan data.",
          icon: <Info className="w-5 h-5 text-blue-600" />
        },
        {
          title: "🎯 Tujuan Pembaruan",
          content: "Mempercepat proses pelaporan hingga 40%, mengurangi kesalahan input data, meningkatkan keamanan informasi keuangan, dan menyediakan analitik data real-time untuk pengambilan keputusan.",
          icon: <Target className="w-5 h-5 text-green-600" />
        },
        {
          title: "⏰ Timeline Implementasi",
          content: "Implementasi bertahap dimulai Januari 2024 dengan pelatihan nasional. Sistem penuh akan beroperasi mulai Maret 2024. Masa transisi diberikan hingga Juni 2024.",
          icon: <Calendar className="w-5 h-5 text-purple-600" />
        }
      ],
      
      features: [
        {
          name: "Real-time Validation",
          description: "Validasi data secara real-time dengan algoritma cerdas yang mendeteksi anomali dan ketidaksesuaian sebelum submit.",
          benefit: "Mengurangi kesalahan hingga 95%"
        },
        {
          name: "Auto-Save System",
          description: "Sistem penyimpanan otomatis setiap 2 menit dengan version control yang memungkinkan recovery data hingga 30 hari ke belakang.",
          benefit: "Mencegah kehilangan data"
        },
        {
          name: "Enhanced Security",
          description: "Enkripsi AES-256, two-factor authentication, audit trail lengkap, dan monitoring aktivitas real-time.",
          benefit: "Sertifikasi keamanan ISO 27001"
        },
        {
          name: "Mobile Optimization",
          description: "Antarmuka responsif yang dioptimalkan untuk smartphone dan tablet dengan performa loading di bawah 3 detik.",
          benefit: "Akses dari mana saja"
        }
      ]
    }
  };

  const detail = announcementDetails[announcement.id] || {
    fullDescription: announcement.shortMessage || "Deskripsi lengkap pengumuman sedang dalam proses pembaruan. Silakan hubungi administrator untuk informasi lebih lanjut."
  };

  return (
    <div className="space-y-8">
      {/* Deskripsi Utama */}
      <div className="prose prose-lg max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
          📋 Deskripsi Lengkap Pengumuman
        </h3>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            {detail.fullDescription}
          </p>
        </div>

        <h4 className="text-xl font-bold text-gray-900 mb-4">Detail Informasi:</h4>
        
        {/* Sections */}
        <div className="grid md:grid-cols-3 gap-6">
          {detail.sections?.map((section, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-gray-100 rounded-lg mr-3">
                  {section.icon}
                </div>
                <h4 className="font-bold text-gray-900">{section.title}</h4>
              </div>
              <p className="text-gray-700 text-sm">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 mt-6">
          <h4 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Fitur Utama e-Reporting 2024
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {detail.features?.map((feature, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-blue-800">{feature.name}</h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {feature.benefit}
                  </span>
                </div>
                <p className="text-blue-700 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-green-50 p-5 rounded-xl border border-green-200">
            <h4 className="font-bold text-green-900 mb-3 text-lg">📅 Timeline Implementasi</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-green-800">Pelatihan Nasional</span>
                <span className="font-bold text-green-900">Jan-Feb 2024</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-green-800">Masa Transisi</span>
                <span className="font-bold text-green-900">Mar-Jun 2024</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-green-800">Implementasi Penuh</span>
                <span className="font-bold text-green-900">Jul 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-3 text-lg">🎯 Target Pencapaian</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-purple-800">100% instansi pemerintah terintegrasi</span>
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-purple-800">Waktu pelaporan berkurang 40%</span>
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-purple-800">Error rate di bawah 1%</span>
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-purple-800">Kepuasan pengguna di atas 90%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 mt-8">
        <h4 className="font-bold text-gray-900 mb-3 text-lg">📞 Kontak & Informasi Lanjutan</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-800">Helpdesk Kemenkeu:</p>
            <p className="text-gray-700">021-1234-5678 (ext. 1234)</p>
          </div>
          <div>
            <p className="font-medium text-gray-800">Email Support:</p>
            <a href="mailto:helpdesk@kemenkeu.go.id" className="text-gray-600 hover:underline">
              helpdesk@kemenkeu.go.id
            </a>
          </div>
          <div>
            <p className="font-medium text-gray-800">Jam Operasional:</p>
            <p className="text-gray-700">Senin-Jumat, 08:00-17:00 WIB</p>
          </div>
          <div>
            <p className="font-medium text-gray-800">Website Resmi:</p>
            <a href="#" className="text-gray-600 hover:underline">www.kemenkeu.go.id</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Korespondensi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Determine active tab from URL
  const activeTab = location.pathname.includes('pengumuman') ? 'pengumuman' : 'notifikasi';
  
  // Sample data untuk notifikasi
  const notifications = [
    {
      id: 1,
      title: "Laporan APOLO Berhasil Dikirim",
      message: "Laporan Keuangan Q1 2023 telah berhasil dikirim dan diverifikasi oleh sistem APOLO.",
      type: "success",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      category: "apolo"
    },
    {
      id: 2,
      title: "Deadline Laporan e-Reporting Mendekati",
      message: "Deadline laporan e-Reporting triwulanan tinggal 3 hari lagi. Silakan segera selesaikan.",
      type: "warning",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: true,
      category: "ereporting"
    }
  ];

  // HANYA SATU PENGUMUMAN
  const announcements = [
    {
      id: 1,
      title: "Panduan Baru e-Reporting 2024",
      shortMessage: "Panduan lengkap untuk penggunaan sistem e-Reporting tahun 2024 telah tersedia untuk diunduh.",
      category: "ereporting",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      publishDate: new Date('2024-01-10'),
      author: "Tim Pengembangan e-Reporting",
      tags: ["Panduan", "Update Sistem", "2024"],
      attachments: [
        { name: "Panduan Lengkap e-Reporting 2024.pdf", size: "2.4 MB" },
        { name: "Template Laporan.xlsx", size: "1.2 MB" },
        { name: "FAQ e-Reporting 2024.pdf", size: "1.8 MB" }
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h-400&fit=crop",
      important: true,
      views: 1250,
      downloadCount: 842,
      readTime: "8 menit",
      lastUpdated: new Date('2024-01-09'),
      version: "v1.2"
    }
  ];

  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (categoryFilter !== 'all' && notification.category !== categoryFilter) return false;
    return true;
  });

  const filteredAnnouncements = announcements.filter(announcement => {
    if (categoryFilter !== 'all' && announcement.category !== categoryFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const importantAnnouncements = announcements.filter(a => a.important).length;

  const getTypeIcon = (type) => {
    const icons = {
      success: <CheckCircle className="w-5 h-5 text-green-500" />,
      warning: <Clock className="w-5 h-5 text-yellow-500" />,
      danger: <AlertCircle className="w-5 h-5 text-red-600" />,
      info: <Info className="w-5 h-5 text-blue-500" />,
    };
    return icons[type] || <Bell className="w-5 h-5 text-gray-500" />;
  };

  const getCategoryBadge = (category) => {
    const styles = {
      apolo: 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200',
      ereporting: 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200',
      sipina: 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200',
      system: 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200',
    };
    
    const labels = {
      apolo: 'APOLO',
      ereporting: 'E-REPORTING',
      sipina: 'SIPINA',
      system: 'SISTEM IRS',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[category]}`}>
        {labels[category]}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const styles = {
      success: 'bg-green-100 text-green-800 border border-green-200',
      warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      danger: 'bg-red-100 text-red-800 border border-red-200',
      info: 'bg-blue-100 text-blue-800 border border-blue-200',
    };
    
    const labels = {
      success: 'Sukses',
      warning: 'Peringatan',
      danger: 'Penting',
      info: 'Informasi',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[type]}`}>
        {labels[type]}
      </span>
    );
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m lalu`;
    if (diffHours < 24) return `${diffHours}j lalu`;
    if (diffDays < 7) return `${diffDays}h lalu`;
    return format(timestamp, 'dd MMM yyyy', { locale: id });
  };

  const formatFullDate = (date) => {
    return format(date, 'EEEE, dd MMMM yyyy', { locale: id });
  };

  const formatDateTime = (date) => {
    return format(date, 'dd MMM yyyy HH:mm', { locale: id });
  };

  // Handler untuk mengganti tab
  const handleTabChange = (tab) => {
    if (tab === 'notifikasi') {
      navigate('/korespondensi/notifikasi');
    } else {
      navigate('/korespondensi/pengumuman');
    }
  };

  // Handler untuk melihat detail pengumuman
  const handleViewDetail = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-900">Korespondensi</h1>
                <p className="text-red-600 text-sm">Notifikasi dan pengumuman sistem</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Notifikasi</p>
                </div>
                <Bell className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                  <p className="text-sm text-gray-600 mt-1">Belum Dibaca</p>
                </div>
                <div className="relative">
                  <Mail className="w-8 h-8 text-red-500" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Pengumuman</p>
                </div>
                <Megaphone className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-red-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{importantAnnouncements}</p>
                  <p className="text-sm text-gray-600 mt-1">Pengumuman Penting</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden mb-8">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-red-100">
            <button
              onClick={() => handleTabChange('notifikasi')}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === 'notifikasi'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : 'text-red-700 hover:bg-red-50'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Notifikasi</span>
              {unreadCount > 0 && activeTab !== 'notifikasi' && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => handleTabChange('pengumuman')}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === 'pengumuman'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : 'text-red-700 hover:bg-red-50'
              }`}
            >
              <Megaphone className="w-5 h-5" />
              <span>Pengumuman</span>
              {importantAnnouncements > 0 && activeTab !== 'pengumuman' && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {importantAnnouncements}
                </span>
              )}
            </button>
          </div>

          {/* Content Area */}
          <div className="p-4 md:p-6">
            {activeTab === 'notifikasi' ? (
              /* Notifikasi List - View Only */
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`bg-gradient-to-br from-white to-red-50 rounded-xl border ${
                        notification.read ? 'border-red-100' : 'border-red-200'
                      } p-4 hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`p-2 rounded-lg ${
                          notification.read ? 'bg-red-50' : 'bg-red-100'
                        }`}>
                          {getTypeIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-900">
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500 text-sm">
                              <Calendar className="w-3 h-3" />
                              <span>{formatTimeAgo(notification.timestamp)}</span>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-red-100">
                            {getTypeBadge(notification.type)}
                            {getCategoryBadge(notification.category)}
                          </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-2" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Tidak ada notifikasi</h3>
                    <p className="text-gray-600 text-sm">
                      Tidak ada notifikasi yang sesuai dengan filter yang dipilih.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Pengumuman List dengan Detail Modal */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className={`bg-white rounded-xl border ${
                        announcement.important ? 'border-red-200 shadow-md' : 'border-red-100'
                      } overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
                      onClick={() => handleViewDetail(announcement)}
                    >
                      {/* Gambar dengan Overlay */}
                      <div className="h-48 bg-red-100 relative overflow-hidden">
                        <img 
                          src={announcement.image} 
                          alt={announcement.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23fee2e2'/%3E%3Ctext x='400' y='200' text-anchor='middle' font-family='Arial' font-size='24' fill='%23dc2626'%3EE-REPORTING%3C/text%3E%3C/svg%3E";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        {announcement.important && (
                          <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                            ⚠️ PENTING
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Category & Date */}
                        <div className="flex items-center justify-between mb-3">
                          {getCategoryBadge(announcement.category)}
                          <div className="flex items-center space-x-1 text-gray-500 text-xs">
                            <Calendar className="w-3 h-3" />
                            <span>{formatTimeAgo(announcement.timestamp)}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                          {announcement.title}
                        </h3>

                        {/* Short Message */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {announcement.shortMessage}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {announcement.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-3 text-gray-500 text-xs pt-4 border-t border-gray-100">
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{announcement.views.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <ClockIcon className="w-3 h-3" />
                            <span>{announcement.readTime}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FileText className="w-3 h-3" />
                            <span>{announcement.attachments.length} lampiran</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Megaphone className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Tidak ada pengumuman</h3>
                    <p className="text-gray-600 text-sm">
                      Tidak ada pengumuman yang sesuai dengan filter yang dipilih.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h4 className="text-lg font-bold mb-1">Informasi Korespondensi</h4>
              <p className="text-red-100 text-sm">
                {activeTab === 'notifikasi' 
                  ? 'Notifikasi bersifat real-time dan otomatis dari sistem'
                  : 'Klik pada pengumuman untuk melihat deskripsi lengkap'}
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-red-100">
              <p>Data diperbarui: {formatDateTime(new Date())}</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Klik pada pengumuman untuk melihat deskripsi lengkap. Untuk informasi lebih lanjut hubungi administrator.
          </p>
        </div>
      </div>

      {/* Modal Detail Pengumuman */}
      {isModalOpen && selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Container */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8 z-10">
            {/* Modal Header - Sticky */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                    <Megaphone className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedAnnouncement.title}</h2>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-gray-600 flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {selectedAnnouncement.author}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatFullDate(selectedAnnouncement.publishDate)}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {selectedAnnouncement.readTime} membaca
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-4"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Hero Image */}
              <div className="relative rounded-xl overflow-hidden mb-6">
                <div className="h-72 relative">
                  <img 
                    src={selectedAnnouncement.image} 
                    alt={selectedAnnouncement.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23fee2e2'/%3E%3Ctext x='400' y='200' text-anchor='middle' font-family='Arial' font-size='24' fill='%23dc2626'%3EE-REPORTING%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center space-x-4">
                      {getCategoryBadge(selectedAnnouncement.category)}
                      {selectedAnnouncement.important && (
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          PENTING
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metadata Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedAnnouncement.views.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center">
                    <Eye className="w-3 h-3 mr-1" />
                    Views
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedAnnouncement.downloadCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center">
                    <Download className="w-3 h-3 mr-1" />
                    Downloads
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedAnnouncement.attachments.length}</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center">
                    <FileText className="w-3 h-3 mr-1" />
                    Lampiran
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedAnnouncement.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Konten Detail Lengkap */}
              <AnnouncementDetailContent announcement={selectedAnnouncement} />

              {/* Attachments */}
              {selectedAnnouncement.attachments.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Lampiran ({selectedAnnouncement.attachments.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedAnnouncement.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-red-500 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">{attachment.name}</p>
                            <p className="text-sm text-gray-500">{attachment.size}</p>
                          </div>
                        </div>
                        <button 
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Mengunduh: ${attachment.name}`);
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Unduh
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer - Sticky */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  ID: {selectedAnnouncement.id} • Dipublikasikan: {formatTimeAgo(selectedAnnouncement.timestamp)}
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Korespondensi;