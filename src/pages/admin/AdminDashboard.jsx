// pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Filter,
  Search,
  Download,
  Eye,
  Mail,
  Phone,
  Building,
  Calendar,
  Shield,
  Key,
  Database,
  BarChart3,
  TrendingUp,
  UserCheck,
  XCircle,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  FileSpreadsheet,
  Layers,
  UserPlus,
  UserMinus,
  Send,
  Bell,
  X,
  Check,
  AlertTriangle,
  ExternalLink,
  ChevronLeft,
  Lock,
  KeyIcon,
  File,
  User,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    processing: 0,
    aroPending: 0,
    todaySubmissions: 0
  });
  const [filters, setFilters] = useState({
    status: 'pending',
    app: 'all',
    dateRange: 'all',
    type: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [approvalNote, setApprovalNote] = useState('');
  const [selectedActionId, setSelectedActionId] = useState(null);
  const [actionType, setActionType] = useState('');
  const [selectedARO, setSelectedARO] = useState(null);
  const [showAROActionModal, setShowAROActionModal] = useState(false);
  const [aroAction, setAroAction] = useState('');
  const [viewDocument, setViewDocument] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);

  // Load data
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
        const submittedSubs = storedSubs.filter(sub => 
          sub.status !== 'draft' && 
          !(sub.app === 'ereporting' && sub.status === 'approved' && sub.approvedBy === 'System Auto-Approval')
        );
        
        const today = new Date().toDateString();
        let aroPendingCount = 0;
        let todaySubmissionsCount = 0;
        
        submittedSubs.forEach(sub => {
          const subDate = new Date(sub.submittedAt || sub.timestamp).toDateString();
          if (subDate === today) todaySubmissionsCount++;
          
          if (sub.aros) {
            sub.aros.forEach(aro => {
              if (aro.status === 'pending') aroPendingCount++;
            });
          }
        });
        
        setSubmissions(submittedSubs);
        
        const statsData = {
          total: submittedSubs.length,
          pending: submittedSubs.filter(s => s.status === 'pending').length,
          approved: submittedSubs.filter(s => s.status === 'approved').length,
          rejected: submittedSubs.filter(s => s.status === 'rejected').length,
          processing: submittedSubs.filter(s => s.status === 'processing').length,
          aroPending: aroPendingCount,
          todaySubmissions: todaySubmissionsCount
        };
        
        setStats(statsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
      setLoading(false);
    }, 500);
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter(sub => {
    if (filters.status !== 'all' && sub.status !== filters.status) {
      return false;
    }
    
    if (filters.app !== 'all' && sub.app !== filters.app) {
      return false;
    }
    
    if (filters.type === 'aro') {
      if (!sub.aros || sub.aros.length === 0) return false;
      const hasPendingARO = sub.aros.some(aro => aro.status === 'pending');
      return hasPendingARO;
    } else if (filters.type === 'app') {
      return sub.status === 'pending';
    }
    
    if (filters.dateRange !== 'all') {
      const submissionDate = new Date(sub.submittedAt || sub.timestamp);
      const today = new Date();
      const diffDays = Math.floor((today - submissionDate) / (1000 * 60 * 60 * 24));
      
      if (filters.dateRange === 'today' && diffDays > 0) return false;
      if (filters.dateRange === 'week' && diffDays > 7) return false;
      if (filters.dateRange === 'month' && diffDays > 30) return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchable = [
        sub.dataUmum?.nama || '',
        sub.dataUmum?.institusi || '',
        sub.app || '',
        sub.trackingId || '',
        sub.dataUmum?.email || ''
      ].join(' ').toLowerCase();
      
      return searchable.includes(query);
    }
    
    return true;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Menunggu Admin
          </span>
        );
      case 'approved':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Disetujui
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Ditolak
          </span>
        );
      case 'processing':
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Diproses
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-full">
            Unknown
          </span>
        );
    }
  };

  const getAppBadge = (app) => {
    const appNames = {
      'sipina': 'SIPINA',
      'apolo': 'APOLO',
      'ereporting': 'E-Reporting'
    };
    
    return (
      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
        app === 'sipina' ? 'bg-red-100 text-red-800 border-red-200' :
        app === 'apolo' ? 'bg-red-100 text-red-800 border-red-200' :
        'bg-red-100 text-red-800 border-red-200'
      }`}>
        {appNames[app] || app.toUpperCase()}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleApprove = (id) => {
    const submission = submissions.find(s => s.id === id);
    if (!submission) return;
    
    setSelectedActionId(id);
    setActionType('app');
    setShowApproveModal(true);
  };

  const handleReject = (id) => {
    const submission = submissions.find(s => s.id === id);
    if (!submission) return;
    
    setSelectedActionId(id);
    setActionType('app');
    setShowRejectModal(true);
  };

  // Confirm approve dengan handle ARO yang sudah diedit admin
  const confirmApprove = () => {
    if (!selectedActionId) return;
    
    const adminName = 'Admin IRS';
    
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === selectedActionId) {
        // Jika ada ARO yang statusnya 'pending', approve semua ARO yang ada
        let updatedAROs = sub.aros || [];
        if (updatedAROs.length > 0) {
          updatedAROs = updatedAROs.map(aro => ({
            ...aro,
            status: 'approved',
            approvedAt: new Date().toISOString(),
            approvedBy: adminName,
            approvalNote: approvalNote || 'Disetujui oleh admin',
            log: [...(aro.log || []), {
              timestamp: new Date().toISOString(),
              action: 'Disetujui oleh Admin',
              description: `ARO ${aro.nama} disetujui oleh ${adminName}`,
              status: 'approved',
              details: approvalNote || 'ARO disetujui oleh administrator'
            }]
          }));
        }
        
        const updatedLog = [...(sub.log || []), {
          timestamp: new Date().toISOString(),
          action: 'Disetujui oleh Admin',
          description: `Pengajuan hak akses ${sub.app.toUpperCase()} disetujui oleh ${adminName}`,
          status: 'approved',
          details: approvalNote || 'Pengajuan telah disetujui oleh administrator',
          admin: adminName
        }];
        
        return {
          ...sub,
          status: 'approved',
          approvedAt: new Date().toISOString(),
          approvedBy: adminName,
          approvalNote: approvalNote,
          aros: updatedAROs,
          log: updatedLog
        };
      }
      return sub;
    });
    
    updateLocalStorage(updatedSubmissions);
    resetModals();
    alert('✅ Pengajuan berhasil disetujui!');
  };

  const confirmReject = () => {
    if (!selectedActionId) return;
    
    const adminName = 'Admin IRS';
    
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === selectedActionId) {
        // Jika ada ARO, reject semua ARO yang masih pending
        let updatedAROs = sub.aros || [];
        if (updatedAROs.length > 0) {
          updatedAROs = updatedAROs.map(aro => ({
            ...aro,
            status: aro.status === 'pending' ? 'rejected' : aro.status,
            rejectedAt: aro.status === 'pending' ? new Date().toISOString() : aro.rejectedAt,
            rejectedBy: aro.status === 'pending' ? adminName : aro.rejectedBy,
            rejectionNote: aro.status === 'pending' ? approvalNote : aro.rejectionNote,
            log: [...(aro.log || []), {
              timestamp: new Date().toISOString(),
              action: 'Ditolak oleh Admin',
              description: `ARO ${aro.nama} ditolak oleh ${adminName}`,
              status: 'rejected',
              details: approvalNote || 'ARO ditolak oleh administrator'
            }]
          }));
        }
        
        const updatedLog = [...(sub.log || []), {
          timestamp: new Date().toISOString(),
          action: 'Ditolak oleh Admin',
          description: `Pengajuan hak akses ${sub.app.toUpperCase()} ditolak oleh ${adminName}`,
          status: 'rejected',
          details: approvalNote || 'Pengajuan ditolak oleh administrator',
          admin: adminName
        }];
        
        return {
          ...sub,
          status: 'rejected',
          rejectedAt: new Date().toISOString(),
          rejectedBy: adminName,
          rejectionNote: approvalNote,
          aros: updatedAROs,
          log: updatedLog
        };
      }
      return sub;
    });
    
    updateLocalStorage(updatedSubmissions);
    resetModals();
    alert('❌ Pengajuan berhasil ditolak!');
  };

  // Update localStorage dan state - sinkron ke semua data
  const updateLocalStorage = (updatedSubmissions) => {
    try {
      const allSubmissions = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
      const updatedAllSubmissions = allSubmissions.map(sub => {
        const updated = updatedSubmissions.find(s => s.id === sub.id);
        return updated || sub;
      });
      
      localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedAllSubmissions));
      setSubmissions(updatedSubmissions);
      loadData();
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  };

  const resetModals = () => {
    setApprovalNote('');
    setSelectedActionId(null);
    setSelectedARO(null);
    setShowApproveModal(false);
    setShowRejectModal(false);
    setShowAROActionModal(false);
    setDocumentViewerOpen(false);
    setViewDocument(null);
  };

  // Handle update AROs dari admin (tambah/edit/remove) - langsung update ke storage
  const handleUpdateAROs = (submissionId, updatedAROs) => {
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          aros: updatedAROs,
          updatedAt: new Date().toISOString(),
          log: [...(sub.log || []), {
            timestamp: new Date().toISOString(),
            action: 'ARO Diperbarui oleh Admin',
            description: `Admin memperbarui daftar ARO`,
            details: 'Daftar ARO disesuaikan oleh administrator',
            admin: 'Admin IRS'
          }]
        };
      }
      return sub;
    });
    
    updateLocalStorage(updatedSubmissions);
    alert('✅ Daftar ARO berhasil diperbarui! Perubahan langsung tersinkronisasi.');
  };

  // Handle approve/reject ARO individual (tidak digunakan, semua di handle di modal detail)
  const handleApproveARO = (submissionId, aro) => {
    // Tidak digunakan, semua di handle di modal detail
  };

  const handleRejectARO = (submissionId, aro) => {
    // Tidak digunakan, semua di handle di modal detail
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter & Search */}
          <div className="bg-white rounded-2xl border border-red-200 shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama, instansi, ID tracking..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={loadData}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 shadow-md transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Jenis Approval
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">Semua Jenis</option>
                  <option value="app">Pengajuan Aplikasi</option>
                  <option value="aro">Penambahan ARO</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Database className="w-4 h-4 inline mr-1" />
                  Aplikasi
                </label>
                <select
                  value={filters.app}
                  onChange={(e) => setFilters({...filters, app: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">Semua Aplikasi</option>
                  <option value="sipina">SIPINA</option>
                  <option value="apolo">APOLO</option>
                  <option value="ereporting">E-Reporting</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="pending">Menunggu</option>
                  <option value="all">Semua Status</option>
                  <option value="approved">Disetujui</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Periode
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">Semua Waktu</option>
                  <option value="today">Hari Ini</option>
                  <option value="week">Minggu Ini</option>
                  <option value="month">Bulan Ini</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Pengajuan</p>
                  <p className="text-3xl font-bold mt-2">{stats.total}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 text-sm opacity-90">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stats.todaySubmissions} hari ini
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Menunggu App</p>
                  <p className="text-3xl font-bold mt-2">{stats.pending}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 text-sm opacity-90">
                <span>Perlu review admin</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Disetujui</p>
                  <p className="text-3xl font-bold mt-2">{stats.approved}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 text-sm opacity-90">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-4 h-4" />
                  Akses aktif
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Ditolak</p>
                  <p className="text-3xl font-bold mt-2">{stats.rejected}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <XCircle className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 text-sm opacity-90">
                <span>Tidak memenuhi syarat</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Diproses</p>
                  <p className="text-3xl font-bold mt-2">{stats.processing}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <RefreshCw className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 text-sm opacity-90">
                <span>Dalam verifikasi</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">ARO Menunggu</p>
                  <p className="text-3xl font-bold mt-2">{stats.aroPending}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Layers className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 text-sm opacity-90">
                <span>Penambahan ARO</span>
              </div>
            </div>
          </div>

          {/* Tabel Pengajuan */}
          <div className="bg-white rounded-2xl border border-red-200 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Daftar Pengajuan Hak Akses</h2>
                  <p className="text-sm text-gray-600">
                    {filteredSubmissions.length} dari {submissions.length} pengajuan ditemukan
                  </p>
                </div>
                <button
                  onClick={() => {
                    const dataToExport = filteredSubmissions.map(sub => ({
                      'ID Tracking': sub.trackingId,
                      'Nama Pemohon': sub.dataUmum?.nama || 'N/A',
                      'Instansi': sub.dataUmum?.institusi || 'N/A',
                      'Email': sub.dataUmum?.email || 'N/A',
                      'Aplikasi': sub.app?.toUpperCase() || 'N/A',
                      'Status': sub.status,
                      'Tanggal Pengajuan': formatDate(sub.submittedAt || sub.timestamp),
                      'ARO Pending': sub.aros ? sub.aros.filter(a => a.status === 'pending').length : 0
                    }));
                    
                    const csvContent = "data:text/csv;charset=utf-8," 
                      + "ID Tracking,Nama Pemohon,Instansi,Email,Aplikasi,Status,Tanggal Pengajuan,ARO Pending\n"
                      + dataToExport.map(row => Object.values(row).join(',')).join('\n');
                    
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", `hak_akses_${new Date().toISOString().split('T')[0]}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 border border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                <p className="mt-4 text-gray-600">Memuat data pengajuan...</p>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada pengajuan</h3>
                <p className="text-gray-600">Tidak ada data yang sesuai dengan filter pencarian</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-red-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-800 uppercase tracking-wider">
                        ID Tracking
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-800 uppercase tracking-wider">
                        Pemohon & Instansi
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-800 uppercase tracking-wider">
                        Aplikasi & ARO
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-800 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-800 uppercase tracking-wider">
                        Tanggal Pengajuan
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-red-800 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubmissions.map((submission) => {
                      const pendingAROs = submission.aros ? submission.aros.filter(a => a.status === 'pending') : [];
                      
                      return (
                        <tr key={submission.id} className="hover:bg-red-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-mono font-bold text-gray-900">
                              {submission.trackingId}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {submission.app?.toUpperCase()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                {submission.dataUmum?.nama?.charAt(0) || '?'}
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-gray-900 truncate">
                                  {submission.dataUmum?.nama || 'N/A'}
                                </div>
                                <div className="text-sm text-gray-600 truncate">
                                  {submission.dataUmum?.email || 'N/A'}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                  {submission.dataUmum?.institusi || 'N/A'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col gap-2">
                              {getAppBadge(submission.app)}
                              {pendingAROs.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <Layers className="w-3 h-3 text-yellow-600" />
                                  <span className="text-xs text-yellow-700 font-bold">
                                    {pendingAROs.length} ARO menunggu
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(submission.status)}
                            {submission.approvedAt && (
                              <div className="text-xs text-gray-500 mt-1">
                                Oleh: {submission.approvedBy || 'System'}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(submission.submittedAt || submission.timestamp)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedSubmission(submission);
                                  setShowDetailModal(true);
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Lihat Detail"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              
                              {submission.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleApprove(submission.id)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Setujui Aplikasi"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  
                                  <button
                                    onClick={() => handleReject(submission.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colutors"
                                    title="Tolak Aplikasi"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            
            {filteredSubmissions.length > 0 && (
              <div className="px-6 py-4 border-t border-red-100 bg-red-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Menampilkan <span className="font-bold">{filteredSubmissions.length}</span> pengajuan
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-bold">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {showDetailModal && selectedSubmission && (
        <DetailModal 
          submission={selectedSubmission}
          onClose={() => setShowDetailModal(false)}
          onApprove={() => {
            setShowDetailModal(false);
            handleApprove(selectedSubmission.id);
          }}
          onReject={() => {
            setShowDetailModal(false);
            handleReject(selectedSubmission.id);
          }}
          onUpdateAROs={handleUpdateAROs}
          getStatusBadge={getStatusBadge}
          getAppBadge={getAppBadge}
          formatDate={formatDate}
        />
      )}

      {/* Modal Approve */}
      {showApproveModal && (
        <ActionModal
          type="approve"
          title="Setujui Pengajuan"
          icon={CheckCircle}
          note={approvalNote}
          setNote={setApprovalNote}
          onConfirm={confirmApprove}
          onCancel={resetModals}
          color="green"
        />
      )}

      {/* Modal Reject */}
      {showRejectModal && (
        <ActionModal
          type="reject"
          title="Tolak Pengajuan"
          icon={XCircle}
          note={approvalNote}
          setNote={setApprovalNote}
          onConfirm={confirmReject}
          onCancel={resetModals}
          color="red"
          requireNote={true}
        />
      )}
    </div>
  );
};

// Komponen Modal Detail dengan kontrol ARO penuh
const DetailModal = ({ submission, onClose, onApprove, onReject, onUpdateAROs, getStatusBadge, getAppBadge, formatDate }) => {
  const [editingAROs, setEditingAROs] = useState(false);
  const [availableAROs, setAvailableAROs] = useState([]);
  const [selectedAROs, setSelectedAROs] = useState([]);
  const [showAddAROModal, setShowAddAROModal] = useState(false);
  const [documentLoading, setDocumentLoading] = useState(false);
  
  // Semua ARO yang tersedia untuk APOLO
  const allAvailableAROs = [
    { id: 'apolo-aro-1', nama: 'APOLO-ARO-MODULE-1', jenis: 'Modul APOLO', deskripsi: 'Hak akses modul Strategi Anti Fraud', module: 'Strategi Anti Fraud' },
    { id: 'apolo-aro-2', nama: 'APOLO-ARO-MODULE-2', jenis: 'Modul APOLO', deskripsi: 'Hak akses modul AP/KAP', module: 'AP/KAP' },
    { id: 'apolo-aro-3', nama: 'APOLO-ARO-MODULE-3', jenis: 'Modul APOLO', deskripsi: 'Hak akses modul TPPU/TPPT/PPSPM', module: 'TPPU/TPPT/PPSPM' },
    { id: 'apolo-aro-4', nama: 'APOLO-ARO-MODULE-4', jenis: 'Modul APOLO', deskripsi: 'Hak akses modul Risk Management', module: 'Risk Management' },
    { id: 'apolo-aro-5', nama: 'APOLO-ARO-MODULE-5', jenis: 'Modul APOLO', deskripsi: 'Hak akses modul Compliance', module: 'Compliance' }
  ];
  
  // Inisialisasi ARO
  useEffect(() => {
    // Filter ARO yang belum dipilih
    const existingAROIds = submission.aros ? submission.aros.map(aro => aro.id) : [];
    const filteredAROs = allAvailableAROs.filter(aro => !existingAROIds.includes(aro.id));
    
    setAvailableAROs(filteredAROs);
    setSelectedAROs(submission.aros || []);
  }, [submission]);
  
  // Handle download dokumen
  const handleDownloadDocument = (documentType, documentData) => {
    setDocumentLoading(true);
    
    try {
      // Simulasi proses download dokumen
      const formData = submission.data || {};
      const dataUmum = submission.dataUmum || {};
      
      // Generate dokumen berdasarkan jenis
      let docContent = '';
      let fileName = '';
      
      switch(documentType) {
        case 'all':
          docContent = `
DOkUMEN PENGAJUAN HAK AKSES LENGKAP
====================================

INFORMASI UMUM:
---------------
ID Tracking: ${submission.trackingId}
Aplikasi: ${submission.app.toUpperCase()}
Status: ${submission.status}
Tanggal Pengajuan: ${formatDate(submission.submittedAt || submission.timestamp)}
Tanggal Disetujui: ${submission.approvedAt ? formatDate(submission.approvedAt) : 'Belum disetujui'}
Disetujui Oleh: ${submission.approvedBy || 'Belum disetujui'}

DATA PEMOHON:
-------------
Nama Lengkap: ${dataUmum?.nama || 'N/A'}
Email: ${dataUmum?.email || 'N/A'}
Telepon: ${dataUmum?.telepon || 'N/A'}
Instansi: ${dataUmum?.institusi || 'N/A'}

DATA APLIKASI ${submission.app.toUpperCase()}:
---------------------------
${JSON.stringify(formData, null, 2)}

DATA ARO (AREA OF RESPONSIBILITY):
-----------------------------------
${submission.aros && submission.aros.length > 0 
  ? submission.aros.map((aro, idx) => `
  ARO ${idx + 1}:
    Nama: ${aro.nama}
    Status: ${aro.status}
    Deskripsi: ${aro.deskripsi || aro.module}
    Tanggal Diajukan: ${aro.tanggalDiajukan ? formatDate(aro.tanggalDiajukan) : 'N/A'}
    Disetujui Oleh: ${aro.approvedBy || 'Belum disetujui'}
  `).join('\n')
  : 'Tidak ada ARO'}

LOG AKTIVITAS:
--------------
${submission.log && submission.log.length > 0 
  ? submission.log.map((log, idx) => `
  Log ${idx + 1}:
    Waktu: ${formatDate(log.timestamp)}
    Aksi: ${log.action}
    Deskripsi: ${log.description}
    Admin: ${log.admin || 'System'}
  `).join('\n')
  : 'Tidak ada log aktivitas'}

Dokumen ini di-generate otomatis oleh sistem IRS.
Tanggal: ${new Date().toLocaleDateString('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
          `;
          fileName = `laporan_pengajuan_${submission.trackingId}_lengkap.txt`;
          break;
          
        case 'sipina':
          docContent = `
SURAT PERMOHONAN AKSES SIPINA
==============================

ID Tracking: ${submission.trackingId}
Tanggal: ${formatDate(submission.submittedAt || submission.timestamp)}

DATA PEMOHON:
Nama: ${dataUmum?.nama || 'N/A'}
Instansi: ${dataUmum?.institusi || 'N/A'}
Email: ${dataUmum?.email || 'N/A'}

DATA SIPINA:
Nama LJK: ${formData.namaLJK || '-'}
Kode SIPO: ${formData.kodeSIPO || '-'}
NPWP Perusahaan: ${formData.npwpPerusahaan || '-'}
Nama RO: ${formData.namaRO || '-'}
Password Transfer File: ${formData.passwordTransferFile || '-'}

STATUS: ${submission.status.toUpperCase()}
          `;
          fileName = `surat_permohonan_sipina_${submission.trackingId}.txt`;
          break;
          
        case 'apolo':
          docContent = `
SURAT PERMOHONAN AKSES APOLO
=============================

ID Tracking: ${submission.trackingId}
Tanggal: ${formatDate(submission.submittedAt || submission.timestamp)}

DATA PEMOHON:
Nama: ${dataUmum?.nama || 'N/A'}
Instansi: ${dataUmum?.institusi || 'N/A'}
Email: ${dataUmum?.email || 'N/A'}

DATA APOLO:
Nomor Surat: ${formData.nomorSurat || '-'}
Perihal: ${formData.perihal || '-'}
Keterangan: ${formData.keterangan || '-'}

ARO YANG DIAJUKAN:
${submission.aros && submission.aros.length > 0 
  ? submission.aros.map((aro, idx) => `  ${idx + 1}. ${aro.nama} - ${aro.status}`).join('\n')
  : 'Tidak ada ARO'}

STATUS: ${submission.status.toUpperCase()}
          `;
          fileName = `surat_permohonan_apolo_${submission.trackingId}.txt`;
          break;
          
        case 'ereporting':
          docContent = `
FORMULIR PENDAFTARAN E-REPORTING
=================================

ID Tracking: ${submission.trackingId}
Tanggal: ${formatDate(submission.submittedAt || submission.timestamp)}

DATA PEMOHON:
Nama: ${dataUmum?.nama || 'N/A'}
Instansi: ${dataUmum?.institusi || 'N/A'}
Email: ${dataUmum?.email || 'N/A'}

DATA E-REPORTING:
NPWP/Token: ${formData.npwpToken || '-'}
Jenis Usaha: ${formData.jenisUsaha || '-'}
User ID SIPO: ${formData.userIdSIPO || '-'}

STATUS: ${submission.status.toUpperCase()}
          `;
          fileName = `formulir_ereporting_${submission.trackingId}.txt`;
          break;
      }
      
      const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
      
      alert(`✅ Dokumen berhasil didownload: ${fileName}`);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('❌ Gagal mendownload dokumen');
    } finally {
      setDocumentLoading(false);
    }
  };
  
  // Handle tambah ARO baru
  const handleAddARO = (aro) => {
    const newARO = {
      ...aro,
      status: 'pending',
      tanggalDiajukan: new Date().toISOString(),
      addedByAdmin: true,
      log: [{
        timestamp: new Date().toISOString(),
        action: 'ARO Ditambahkan oleh Admin',
        description: `ARO ${aro.nama} ditambahkan oleh admin`,
        status: 'pending',
        admin: 'Admin IRS'
      }]
    };
    
    const updatedAROs = [...selectedAROs, newARO];
    setSelectedAROs(updatedAROs);
    setAvailableAROs(availableAROs.filter(a => a.id !== aro.id));
    setShowAddAROModal(false);
  };
  
  // Handle remove ARO
  const handleRemoveARO = (aroId) => {
    const aroToRemove = selectedAROs.find(aro => aro.id === aroId);
    if (!aroToRemove) return;
    
    // Konfirmasi jika ARO sudah approved
    if (aroToRemove.status === 'approved' && !window.confirm(`Yakin ingin menghapus ARO "${aroToRemove.nama}" yang sudah disetujui?`)) {
      return;
    }
    
    const updatedAROs = selectedAROs.filter(aro => aro.id !== aroId);
    setSelectedAROs(updatedAROs);
    
    // Jika ARO dari user (bukan admin), kembalikan ke available
    if (!aroToRemove.addedByAdmin && editingAROs) {
      setAvailableAROs([...availableAROs, aroToRemove]);
    }
  };
  
  // Handle save perubahan ARO - langsung update ke database
  const handleSaveAROs = () => {
    onUpdateAROs(submission.id, selectedAROs);
    setEditingAROs(false);
  };
  
  const handleApproveIndividualARO = (aro) => {
    const adminName = 'Admin IRS';
    const updatedAROs = selectedAROs.map(a => {
      if (a.id === aro.id) {
        return {
          ...a,
          status: 'approved',
          approvedAt: new Date().toISOString(),
          approvedBy: adminName,
          approvalNote: 'Disetujui oleh admin',
          log: [...(a.log || []), {
            timestamp: new Date().toISOString(),
            action: 'ARO Disetujui oleh Admin',
            description: `ARO ${a.nama} disetujui oleh ${adminName}`,
            status: 'approved',
            details: 'ARO disetujui secara individual oleh administrator'
          }]
        };
      }
      return a;
    });
    
    setSelectedAROs(updatedAROs);
    onUpdateAROs(submission.id, updatedAROs);
    
    alert(`✅ ARO "${aro.nama}" berhasil disetujui!`);
  };

  const handleRejectIndividualARO = (aro) => {
    const adminName = 'Admin IRS';
    const rejectionNote = prompt('Masukkan alasan penolakan ARO ini:', 'ARO tidak memenuhi kriteria');
    
    if (!rejectionNote) return;
    
    const updatedAROs = selectedAROs.map(a => {
      if (a.id === aro.id) {
        return {
          ...a,
          status: 'rejected',
          rejectedAt: new Date().toISOString(),
          rejectedBy: adminName,
          rejectionNote: rejectionNote,
          log: [...(a.log || []), {
            timestamp: new Date().toISOString(),
            action: 'ARO Ditolak oleh Admin',
            description: `ARO ${a.nama} ditolak oleh ${adminName}`,
            status: 'rejected',
            details: rejectionNote
          }]
        };
      }
      return a;
    });
    
    setSelectedAROs(updatedAROs);
    onUpdateAROs(submission.id, updatedAROs);
    
    alert(`❌ ARO "${aro.nama}" telah ditolak!`);
  };
  
  const renderFormDetails = () => {
    if (!submission.data && !submission.dataUmum) return null;
    
    const formData = submission.data || {};
    const dataUmum = submission.dataUmum || {};
    
    switch(submission.app) {
      case 'sipina':
        return (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Detail Form SIPINA:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nama LJK</p>
                <p className="font-medium">{formData.namaLJK || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kode SIPO</p>
                <p className="font-medium">{formData.kodeSIPO || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">NPWP Perusahaan</p>
                <p className="font-medium">{formData.npwpPerusahaan || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nama RO</p>
                <p className="font-medium">{formData.namaRO || '-'}</p>
              </div>
              {formData.passwordTransferFile && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Password Transfer File</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                      {formData.passwordTransferFile}
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'apolo':
        return (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Detail Form APOLO:</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nomor Surat</p>
                <p className="font-medium">{formData.nomorSurat || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Perihal</p>
                <p className="font-medium">{formData.perihal || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Keterangan</p>
                <p className="font-medium">{formData.keterangan || '-'}</p>
              </div>
            </div>
          </div>
        );
        
      case 'ereporting':
        return (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Detail Form E-Reporting:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">NPWP / Token</p>
                <p className="font-medium">{formData.npwpToken || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Jenis Usaha</p>
                <p className="font-medium">{formData.jenisUsaha || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">User ID SIPO</p>
                <p className="font-medium">{formData.userIdSIPO || '-'}</p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-red-200 bg-gradient-to-r from-red-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Detail Pengajuan Lengkap</h3>
                <p className="text-gray-600">ID: {submission.trackingId} • {submission.app?.toUpperCase()}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Kolom 1: Data Pemohon & Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Data Pemohon */}
              <div className="border border-red-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-600" />
                  Data Pemohon
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                    <p className="font-bold text-gray-900">{submission.dataUmum?.nama || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-bold text-gray-900">{submission.dataUmum?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Telepon</p>
                    <p className="font-bold text-gray-900">{submission.dataUmum?.telepon || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Instansi</p>
                    <p className="font-bold text-gray-900">{submission.dataUmum?.institusi || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              {/* Data Aplikasi */}
              <div className="border border-red-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-red-600" />
                  Data Aplikasi
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Aplikasi</p>
                      <div className="font-bold">
                        {getAppBadge(submission.app)}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <div className="font-bold">
                        {getStatusBadge(submission.status)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Tanggal Pengajuan</p>
                      <p className="font-bold text-gray-900">
                        {formatDate(submission.submittedAt || submission.timestamp)}
                      </p>
                    </div>
                    {submission.approvedAt && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Tanggal Persetujuan</p>
                        <p className="font-bold text-green-600">
                          {formatDate(submission.approvedAt)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Tombol Download Dokumen */}
              
                
                {/* Detail form spesifik */}
                {renderFormDetails()}
              </div>
              
              {/* ARO untuk APOLO */}
              {submission.app === 'apolo' && (
                <div className="border border-red-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-red-600" />
                      ARO untuk APOLO
                    </h4>
                    
                    {/* TOMBOL EDIT ARO */}
                    {submission.aros && submission.aros.length > 0 && (
                      <div className="flex gap-2">
                        {editingAROs ? (
                          <>
                            <button
                              onClick={() => {
                                setEditingAROs(false);
                                setSelectedAROs(submission.aros || []);
                              }}
                              className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                              Batal
                            </button>
                            <button
                              onClick={handleSaveAROs}
                              className="px-3 py-1 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700"
                            >
                              Simpan Perubahan
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setEditingAROs(true)}
                            className="px-3 py-1 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 flex items-center gap-2"
                          >
                            <Edit className="w-3 h-3" />
                            Edit ARO
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Notifikasi ARO pending */}
                  {submission.aros && submission.aros.length > 0 ? (
                    <>
                      {selectedAROs.some(aro => aro.status === 'pending') && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            <p className="text-sm font-medium text-yellow-700">
                              Ada {selectedAROs.filter(aro => aro.status === 'pending').length} ARO baru yang menunggu approval!
                            </p>
                          </div>
                          <p className="text-xs text-yellow-600">
                            Klik tombol "Edit ARO" untuk mengelola daftar, atau approve/reject langsung dari tombol di bawah.
                          </p>
                        </div>
                      )}
                      
                      {editingAROs ? (
                        // TAMPILAN EDITING ARO
                        <div className="space-y-4">
                          <div className="space-y-3">
                            {selectedAROs.map((aro, idx) => (
                              <div key={idx} className={`border rounded-lg p-4 ${
                                aro.status === 'pending' ? 'border-yellow-300 bg-yellow-25' : ''
                              }`}>
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="font-bold text-gray-900">{aro.nama}</span>
                                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                                        aro.status === 'approved' ? 'bg-green-100 text-green-800' :
                                        aro.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                      }`}>
                                        {aro.status === 'approved' ? '✓ Disetujui' : 
                                         aro.status === 'pending' ? '⏳ Menunggu' : 
                                         '🚫Ditolak'}
                                      </span>
                                      {aro.addedByAdmin && (
                                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                          Ditambahkan Admin
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600">{aro.deskripsi || aro.module}</p>
                                    {aro.tanggalDiajukan && (
                                      <p className="text-xs text-gray-500 mt-2">
                                        Diajukan: {formatDate(aro.tanggalDiajukan)}
                                      </p>
                                    )}
                                    
                                    {/* AKSI APPROVE/REJECT untuk ARO PENDING */}
                                    {aro.status === 'pending' && (
                                      <div className="mt-3 flex gap-2">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleApproveIndividualARO(aro);
                                          }}
                                          className="px-3 py-1 text-xs bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 flex items-center gap-1"
                                        >
                                          <CheckCircle className="w-3 h-3" />
                                          Approve
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleRejectIndividualARO(aro);
                                          }}
                                          className="px-3 py-1 text-xs border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-1"
                                        >
                                          <XCircle className="w-3 h-3" />
                                          Reject
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  {/* TOMBOL HAPUS ARO */}
                                  <button
                                    onClick={() => handleRemoveARO(aro.id)}
                                    className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded ml-2"
                                    title="Hapus ARO"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Tombol Tambah ARO */}
                          <button
                            onClick={() => setShowAddAROModal(true)}
                            className="w-full p-4 border-2 border-dashed border-red-300 rounded-lg text-red-600 hover:bg-red-50 flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Tambah ARO Baru
                          </button>
                          
                          {/* Statistik ARO */}
                          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs text-gray-500">Total ARO</p>
                                <p className="font-bold text-gray-900">{selectedAROs.length}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Approved</p>
                                <p className="font-bold text-green-600">
                                  {selectedAROs.filter(a => a.status === 'approved').length}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Pending</p>
                                <p className="font-bold text-yellow-600">
                                  {selectedAROs.filter(a => a.status === 'pending').length}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Ditambah Admin</p>
                                <p className="font-bold text-blue-600">
                                  {selectedAROs.filter(a => a.addedByAdmin).length}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // TAMPILAN VIEW ARO
                        <div className="space-y-3">
                          {selectedAROs.map((aro, idx) => (
                            <div key={idx} className={`border rounded-lg p-4 ${
                              aro.status === 'pending' ? 'border-yellow-300 bg-yellow-25' : ''
                            }`}>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-bold text-gray-900">{aro.nama}</span>
                                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                                      aro.status === 'approved' ? 'bg-green-100 text-green-800' :
                                      aro.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}>
                                      {aro.status === 'approved' ? '✓ Disetujui' : 
                                       aro.status === 'pending' ? '⏳ Menunggu' : 
                                       '🚫 Ditolak'}
                                    </span>
                                    {aro.addedByAdmin && (
                                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                        Ditambahkan Admin
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">{aro.deskripsi || aro.module}</p>
                                  {aro.tanggalDiajukan && (
                                    <p className="text-xs text-gray-500 mt-2">
                                      Diajukan: {formatDate(aro.tanggalDiajukan)}
                                    </p>
                                  )}
                                  {aro.approvedBy && aro.status === 'approved' && (
                                    <p className="text-xs text-green-600 mt-1">
                                      Disetujui oleh: {aro.approvedBy} ({formatDate(aro.approvedAt)})
                                    </p>
                                  )}
                                  
                                  {/* AKSI APPROVE/REJECT untuk ARO PENDING */}
                                  {aro.status === 'pending' && (
                                    <div className="mt-3 flex gap-2">
                                      <button
                                        onClick={() => handleApproveIndividualARO(aro)}
                                        className="px-3 py-1 text-xs bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 flex items-center gap-1"
                                      >
                                        <CheckCircle className="w-3 h-3" />
                                        Approve ARO ini
                                      </button>
                                      <button
                                        onClick={() => handleRejectIndividualARO(aro)}
                                        className="px-3 py-1 text-xs border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-1"
                                      >
                                        <XCircle className="w-3 h-3" />
                                        Reject ARO ini
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">User belum memiliki ARO</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Setelah pengajuan disetujui, user dapat mengajukan ARO baru melalui dashboard mereka.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Kolom 2: Log & Aksi */}
            <div className="space-y-6">
              {/* Log Aktivitas */}
              {submission.log && submission.log.length > 0 && (
                <div className="border border-red-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-red-600" />
                    Log Aktivitas
                  </h4>
                  <div className="space-y-4">
                    {submission.log.slice(0, 5).map((log, idx) => (
                      <div key={idx} className="border-l-4 border-red-500 pl-4 py-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 text-sm">{log.action}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleDateString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{log.description}</p>
                        {log.details && (
                          <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                        )}
                        {log.admin && (
                          <p className="text-xs text-blue-600 mt-1">Oleh: {log.admin}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Aksi Admin */}
              <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Aksi Admin</h4>
                
                {/* TOMBOL DOWNLOAD DOKUMEN */}
                <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <h5 className="font-bold text-gray-900 mb-2">Dokumen & Laporan</h5>
                  <button
                    onClick={() => handleDownloadDocument('report', submission)}
                    disabled={documentLoading}
                    className="w-full py-2.5 border border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
                  >
                    {documentLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download Dokumen
                      </>
                    )}
                  </button>
                </div>
                
                <div className="space-y-3">
                  {submission.status === 'pending' ? (
                    <>
                      <button
                        onClick={onApprove}
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Setujui Pengajuan
                      </button>
                      <p className="text-xs text-center text-gray-600">
                        Semua ARO akan otomatis disetujui bersama aplikasi
                      </p>
                      
                      <button
                        onClick={onReject}
                        className="w-full py-3 border border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        Tolak Pengajuan
                      </button>
                      <p className="text-xs text-center text-gray-600">
                        Semua ARO akan otomatis ditolak bersama aplikasi
                      </p>
                    </>
                  ) : (
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <p className="text-gray-700">
                        Pengajuan sudah {submission.status === 'approved' ? 'disetujui' : 'ditolak'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Oleh: {submission.approvedBy || submission.rejectedBy || 'System'}
                      </p>
                      {submission.approvalNote && (
                        <p className="text-xs text-gray-500 mt-2">Catatan: {submission.approvalNote}</p>
                      )}
                      {submission.rejectionNote && (
                        <p className="text-xs text-red-500 mt-2">Alasan: {submission.rejectionNote}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-red-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal Tambah ARO */}
      {showAddAROModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-red-200 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Pilih ARO untuk Ditambahkan</h3>
                <button
                  onClick={() => setShowAddAROModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {availableAROs.length === 0 ? (
                <div className="text-center py-8">
                  <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Semua ARO sudah dipilih</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {availableAROs.map((aro) => (
                    <div
                      key={aro.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:bg-red-25 transition-colors cursor-pointer"
                      onClick={() => handleAddARO(aro)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <Layers className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{aro.nama}</h4>
                          <p className="text-sm text-gray-600 mt-1">{aro.deskripsi}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">Modul: {aro.module}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddAROModal(false)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
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

// Modal Action untuk Approve/Reject
const ActionModal = ({ type, title, icon: Icon, note, setNote, onConfirm, onCancel, color, requireNote = false }) => {
  const isApprove = type === 'approve';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className={`p-6 border-b ${isApprove ? 'border-green-200 bg-gradient-to-r from-green-50 to-white' : 'border-red-200 bg-gradient-to-r from-red-50 to-white'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isApprove ? 'bg-green-100' : 'bg-red-100'}`}>
              <Icon className={`w-5 h-5 ${isApprove ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-gray-600">Konfirmasi {isApprove ? 'persetujuan' : 'penolakan'} hak akses</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isApprove ? 'Catatan Persetujuan (Opsional)' : 'Alasan Penolakan'} {requireNote && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows="3"
              placeholder={isApprove ? "Tambahkan catatan atau instruksi..." : "Jelaskan alasan penolakan..."}
              required={requireNote}
            />
          </div>
          
          <div className={`p-4 rounded-lg mb-6 ${isApprove ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`text-sm ${isApprove ? 'text-yellow-700' : 'text-red-700'}`}>
              <span className="font-medium">Perhatian:</span> {isApprove 
                ? 'Semua ARO yang ada akan otomatis disetujui bersama aplikasi. Perubahan ARO oleh admin sudah tersinkronisasi.'
                : 'Semua ARO yang ada akan otomatis ditolak bersama aplikasi.'}
            </p>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              disabled={requireNote && !note.trim()}
              className={`px-6 py-2.5 font-bold rounded-lg ${
                requireNote && !note.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isApprove 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
              }`}
            >
              Ya, {isApprove ? 'Setujui' : 'Tolak'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;