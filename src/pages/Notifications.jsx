import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Info, 
  Mail,
  Filter,
  CheckCheck,
  Trash2,
  Archive,
  Eye,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Laporan APOLO Berhasil Dikirim",
      message: "Laporan Keuangan Q1 2023 telah berhasil dikirim dan diverifikasi oleh sistem.",
      type: "success",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      category: "apolo"
    },
    {
      id: 2,
      title: "Deadline Laporan Mendekati",
      message: "Laporan e-Reporting triwulanan deadline 3 hari lagi. Silakan segera selesaikan.",
      type: "warning",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: true,
      category: "ereporting"
    },
    {
      id: 3,
      title: "Laporan SIPINA Ditolak",
      message: "Laporan SIPINA Anda ditolak karena data tidak lengkap. Silakan perbaiki dan kirim ulang.",
      type: "danger",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: false,
      category: "sipina"
    },
    {
      id: 4,
      title: "Update Sistem IRS",
      message: "Versi terbaru sistem IRS v1.2.0 telah dirilis dengan berbagai perbaikan dan fitur baru.",
      type: "info",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      category: "system"
    },
    {
      id: 5,
      title: "Laporan Audit Disetujui",
      message: "Laporan audit internal Q1 2023 telah disetujui oleh auditor.",
      type: "success",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      category: "apolo"
    },
    {
      id: 6,
      title: "Maintenance Jadwal",
      message: "Akan ada maintenance sistem pada Minggu, 12 Januari 2025 pukul 00:00 - 04:00 WIB.",
      type: "info",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      read: true,
      category: "system"
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'read' && !notification.read) return false;
    if (categoryFilter !== 'all' && notification.category !== categoryFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type) => {
    const icons = {
      success: <CheckCircle className="w-5 h-5 text-red-500" />,
      warning: <Clock className="w-5 h-5 text-yellow-500" />,
      danger: <AlertCircle className="w-5 h-5 text-red-600" />,
      info: <Info className="w-5 h-5 text-red-400" />,
    };
    return icons[type] || <Bell className="w-5 h-5 text-gray-500" />;
  };

  const getTypeBadge = (type) => {
    const styles = {
      success: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      danger: 'bg-red-200 text-red-900 border-red-300',
      info: 'bg-red-50 text-red-700 border-red-100',
    };
    
    const labels = {
      success: 'Sukses',
      warning: 'Peringatan',
      danger: 'Penting',
      info: 'Informasi',
    };

    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${styles[type]}`}>
        {labels[type]}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const styles = {
      apolo: 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-red-200',
      ereporting: 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-red-200',
      sipina: 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-red-200',
      system: 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-red-200',
    };
    
    const labels = {
      apolo: 'APOLO',
      ereporting: 'E-REPORTING',
      sipina: 'SIPINA',
      system: 'SISTEM',
    };

    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${styles[category]}`}>
        {labels[category]}
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

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in bg-gradient-to-br from-red-50/30 to-white min-h-screen p-4 lg:p-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Notifikasi Sistem</h1>
              <p className="text-red-100 mt-1">
                {unreadCount > 0 
                  ? `${unreadCount} notifikasi belum dibaca` 
                  : 'Semua notifikasi telah dibaca'}
              </p>
            </div>
          </div>
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              unreadCount === 0 
                ? 'bg-white/20 text-red-100 cursor-not-allowed' 
                : 'bg-white text-red-700 hover:bg-red-50 hover:scale-105 active:scale-95 shadow-lg'
            }`}
          >
            <CheckCheck className="w-5 h-5" />
            <span>Tandai Semua Dibaca</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-red-50 p-4 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-900">{notifications.length}</p>
              <p className="text-sm text-red-600 font-medium">Total Notifikasi</p>
            </div>
            <Bell className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-red-50 p-4 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-900">{unreadCount}</p>
              <p className="text-sm text-red-600 font-medium">Belum Dibaca</p>
            </div>
            <div className="relative">
              <Mail className="w-8 h-8 text-red-600" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-red-50 p-4 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-900">
                {notifications.filter(n => n.type === 'success').length}
              </p>
              <p className="text-sm text-red-600 font-medium">Sukses</p>
            </div>
            <CheckCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-red-50 p-4 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-red-900">
                {notifications.filter(n => n.category === 'apolo').length}
              </p>
              <p className="text-sm text-red-600 font-medium">Laporan APOLO</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-red-100 to-white rounded-lg flex items-center justify-center border border-red-200">
              <span className="text-red-700 font-bold">A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-gradient-to-br from-white to-red-50/50 rounded-xl shadow-lg border border-red-100 overflow-hidden">
        <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-100 to-white rounded-lg border border-red-200">
                <Filter className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-900">Filter Notifikasi</h3>
                <p className="text-sm text-red-600/80">Sesuaikan tampilan notifikasi</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'all' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md' 
                    : 'bg-gradient-to-r from-red-50 to-white text-red-700 border border-red-200 hover:border-red-300'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                  filter === 'unread' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md' 
                    : 'bg-gradient-to-r from-red-50 to-white text-red-700 border border-red-200 hover:border-red-300'
                }`}
              >
                Belum Dibaca
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold border border-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === 'read' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md' 
                    : 'bg-gradient-to-r from-red-50 to-white text-red-700 border border-red-200 hover:border-red-300'
                }`}
              >
                Sudah Dibaca
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-red-800 mb-2">
                Kategori Sistem
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
              >
                <option value="all">Semua Kategori</option>
                <option value="apolo">APOLO</option>
                <option value="ereporting">E-REPORTING</option>
                <option value="sipina">SIPINA</option>
                <option value="system">Sistem IRS</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border ${
                notification.read ? 'border-red-100' : 'border-red-200 shadow-red'
              } overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              onClick={() => setSelectedNotification(notification)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Notification Icon */}
                  <div className={`p-3 rounded-xl border ${
                    notification.read 
                      ? 'bg-gradient-to-br from-red-50 to-white border-red-200' 
                      : 'bg-gradient-to-br from-red-100 to-white border-red-300'
                  }`}>
                    {getTypeIcon(notification.type)}
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-lg font-bold ${
                            notification.read ? 'text-red-800' : 'text-red-900'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <p className="text-red-700 mb-4 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-red-600 font-medium">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{formatTimeAgo(notification.timestamp)}</span>
                      </div>
                    </div>

                    {/* Badges and Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-red-100">
                      <div className="flex flex-wrap gap-2">
                        {getTypeBadge(notification.type)}
                        {getCategoryBadge(notification.category)}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Tandai Dibaca</span>
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Hapus</span>
                        </button>
                        <ChevronRight className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gradient-to-br from-white to-red-50/30 rounded-xl shadow-lg border border-red-100">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-white rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
              <Mail className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">Tidak ada notifikasi</h3>
            <p className="text-red-700 max-w-md mx-auto">
              Tidak ada notifikasi yang sesuai dengan filter yang dipilih. Coba ubah pengaturan filter.
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between text-white">
          <div>
            <h4 className="text-lg font-bold">Ingatkan Saya</h4>
            <p className="text-red-100 text-sm mt-1">
              Aktifkan notifikasi browser untuk mendapatkan update real-time
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors shadow-md">
            Pengaturan Notifikasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;