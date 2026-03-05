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
  Edit,
  Info
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
  const [documentLoading, setDocumentLoading] = useState(false);

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
        
        // Auto-approve untuk E-Reporting
        const processedSubs = storedSubs.map(sub => {
          if (sub.app === 'ereporting' && sub.status === 'pending') {
            return {
              ...sub,
              status: 'approved',
              approvedAt: new Date().toISOString(),
              approvedBy: 'System Auto-Approval',
              log: [...(sub.log || []), {
                timestamp: new Date().toISOString(),
                action: 'Auto-Approved',
                description: 'Pendaftaran E-Reporting otomatis disetujui oleh sistem',
                status: 'approved'
              }]
            };
          }
          return sub;
        });
        
        // Simpan kembali jika ada perubahan
        if (JSON.stringify(storedSubs) !== JSON.stringify(processedSubs)) {
          localStorage.setItem('hakAksesSubmissions', JSON.stringify(processedSubs));
        }
        
        const submittedSubs = processedSubs.filter(sub => sub.status !== 'draft');
        
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
        'bg-blue-100 text-blue-800 border-blue-200'
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
    setShowApproveModal(false);
    setShowRejectModal(false);
  };

  // Handle download dokumen
  const handleDownloadDocument = (submission) => {
    setDocumentLoading(true);
    
    try {
      const formData = submission.data || {};
      const dataUmum = submission.dataUmum || {};
      
      let docContent = '';
      let fileName = '';
      
      docContent = `
DOKUMEN PENGAJUAN HAK AKSES
===========================

ID Tracking: ${submission.trackingId}
Aplikasi: ${submission.app.toUpperCase()}
Status: ${submission.status}
Tanggal Pengajuan: ${formatDate(submission.submittedAt || submission.timestamp)}

DATA PEMOHON:
-------------
Nama Lengkap: ${dataUmum?.nama || 'N/A'}
Email: ${dataUmum?.email || 'N/A'}
Telepon: ${dataUmum?.telepon || 'N/A'}
Instansi: ${dataUmum?.institusi || 'N/A'}

DATA APLIKASI ${submission.app.toUpperCase()}:
---------------------------
${JSON.stringify(formData, null, 2)}

${submission.aros && submission.aros.length > 0 ? `
DATA ARO (AREA OF RESPONSIBILITY):
-----------------------------------
${submission.aros.map((aro, idx) => `
ARO ${idx + 1}:
  Nama: ${aro.nama}
  Status: ${aro.status}
  Keterangan: ${aro.keterangan || '-'}
  ${aro.modulDipilih ? `Modul Disetujui: ${aro.modulDipilih}` : ''}
  ${aro.rejectionNote ? `Alasan Ditolak: ${aro.rejectionNote}` : ''}
`).join('\n')}
` : ''}

LOG AKTIVITAS:
--------------
${submission.log && submission.log.length > 0 
  ? submission.log.map((log, idx) => `
Log ${idx + 1}:
  Waktu: ${formatDate(log.timestamp)}
  Aksi: ${log.action}
  Deskripsi: ${log.description}
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
      fileName = `pengajuan_${submission.trackingId}.txt`;
      
      const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('❌ Gagal mendownload dokumen');
    } finally {
      setDocumentLoading(false);
    }
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
                              
                              {/* Tampilkan tombol approve/reject jika status pending ATAU ada ARO pending (untuk kasus APOLO yang sudah approved tapi ARO baru pending) */}
                              {(submission.status === 'pending' || pendingAROs.length > 0) && submission.app !== 'ereporting' && (
                                <>
                                  <button
                                    onClick={() => handleApprove(submission.id)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Setujui"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  
                                  <button
                                    onClick={() => handleReject(submission.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Tolak"
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
          onDownloadDocument={handleDownloadDocument}
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

// Komponen Modal Detail dengan tampilan sederhana dan tombol ACC tunggal
const DetailModal = ({ submission, onClose, onApprove, onReject, onDownloadDocument, getStatusBadge, getAppBadge, formatDate }) => {
  const [selectedModule, setSelectedModule] = useState('');
  const [documentLoading, setDocumentLoading] = useState(false);
  
  // Modul APOLO yang tersedia
  const availableModules = [
    { value: 'Strategi Anti Fraud', label: 'Strategi Anti Fraud' },
    { value: 'AP/KAP', label: 'AP/KAP' },
    { value: 'TPPU/TPPT/PPSPM', label: 'TPPU/TPPT/PPSPM' },
    { value: 'Risk Management', label: 'Risk Management' },
    { value: 'Compliance', label: 'Compliance' }
  ];

  // Cek apakah ada ARO pending
  const hasPendingARO = submission.aros && submission.aros.some(aro => aro.status === 'pending');

  // Handle approve aplikasi + ARO dengan pilihan modul
  const handleApproveWithModule = () => {
    // Jika ada ARO pending dan belum pilih modul, minta pilih modul
    if (hasPendingARO && !selectedModule) {
      alert('Pilih modul yang akan disetujui untuk ARO!');
      return;
    }
    
    const adminName = 'Admin IRS';
    
    const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    const updatedSubs = storedSubs.map(sub => {
      if (sub.id === submission.id) {
        // Approve semua ARO yang pending dengan modul yang dipilih
        const updatedAROs = (sub.aros || []).map(aro => {
          if (aro.status === 'pending') {
            return {
              ...aro,
              status: 'approved',
              approvedAt: new Date().toISOString(),
              approvedBy: adminName,
              modulDipilih: selectedModule || aro.modulDipilih || 'Strategi Anti Fraud',
              log: [...(aro.log || []), {
                timestamp: new Date().toISOString(),
                action: 'ARO Disetujui',
                description: `ARO disetujui dengan modul: ${selectedModule || 'Strategi Anti Fraud'}`,
                status: 'approved'
              }]
            };
          }
          return aro;
        });
        
        // Update status aplikasi hanya jika masih pending
        const newStatus = sub.status === 'pending' ? 'approved' : sub.status;
        
        return {
          ...sub,
          status: newStatus,
          approvedAt: newStatus === 'approved' ? new Date().toISOString() : sub.approvedAt,
          approvedBy: newStatus === 'approved' ? adminName : sub.approvedBy,
          aros: updatedAROs,
          log: [...(sub.log || []), {
            timestamp: new Date().toISOString(),
            action: hasPendingARO ? 'ARO Disetujui' : 'Disetujui oleh Admin',
            description: hasPendingARO 
              ? `ARO baru disetujui oleh ${adminName} dengan modul: ${selectedModule}`
              : `Pengajuan hak akses ${sub.app.toUpperCase()} disetujui oleh ${adminName}`,
            status: 'approved'
          }]
        };
      }
      return sub;
    });
    
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubs));
    alert(hasPendingARO ? '✅ ARO berhasil disetujui!' : '✅ Pengajuan berhasil disetujui!');
    window.location.reload();
  };

  // Handle reject aplikasi + ARO
  const handleRejectWithNote = () => {
    const reason = prompt('Masukkan alasan penolakan:');
    if (!reason) return;
    
    const adminName = 'Admin IRS';
    
    const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    const updatedSubs = storedSubs.map(sub => {
      if (sub.id === submission.id) {
        // Reject semua ARO yang pending
        const updatedAROs = (sub.aros || []).map(aro => {
          if (aro.status === 'pending') {
            return {
              ...aro,
              status: 'rejected',
              rejectedAt: new Date().toISOString(),
              rejectedBy: adminName,
              rejectionNote: reason,
              log: [...(aro.log || []), {
                timestamp: new Date().toISOString(),
                action: 'ARO Ditolak',
                description: `ARO ditolak dengan alasan: ${reason}`,
                status: 'rejected'
              }]
            };
          }
          return aro;
        });
        
        // Update status aplikasi hanya jika masih pending
        const newStatus = sub.status === 'pending' ? 'rejected' : sub.status;
        
        return {
          ...sub,
          status: newStatus,
          rejectedAt: newStatus === 'rejected' ? new Date().toISOString() : sub.rejectedAt,
          rejectedBy: newStatus === 'rejected' ? adminName : sub.rejectedBy,
          rejectionNote: newStatus === 'rejected' ? reason : sub.rejectionNote,
          aros: updatedAROs,
          log: [...(sub.log || []), {
            timestamp: new Date().toISOString(),
            action: hasPendingARO ? 'ARO Ditolak' : 'Ditolak oleh Admin',
            description: hasPendingARO 
              ? `ARO baru ditolak oleh ${adminName} dengan alasan: ${reason}`
              : `Pengajuan hak akses ${sub.app.toUpperCase()} ditolak oleh ${adminName}`,
            status: 'rejected',
            details: reason
          }]
        };
      }
      return sub;
    });
    
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubs));
    alert(hasPendingARO ? '❌ ARO ditolak' : '❌ Pengajuan ditolak');
    window.location.reload();
  };

  const handleDownload = () => {
    setDocumentLoading(true);
    onDownloadDocument(submission);
    setTimeout(() => setDocumentLoading(false), 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header dengan tombol approve/reject tunggal di pojok kanan atas */}
        <div className="p-6 border-b border-red-200 bg-gradient-to-r from-red-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Detail Pengajuan</h3>
                <p className="text-gray-600">ID: {submission.trackingId} • {submission.app?.toUpperCase()}</p>
                {hasPendingARO && submission.status === 'approved' && (
                  <p className="text-xs text-yellow-600 mt-1 flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    Ada {submission.aros.filter(a => a.status === 'pending').length} ARO baru menunggu persetujuan
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Tombol Download Dokumen */}
              <button
                onClick={handleDownload}
                disabled={documentLoading}
                className="px-4 py-2 border border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 flex items-center gap-2"
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
              
              {/* Tampilkan tombol approve/reject jika status pending ATAU ada ARO pending (untuk kasus APOLO yang sudah approved tapi ARO baru pending) */}
              {(submission.status === 'pending' || hasPendingARO) && submission.app !== 'ereporting' && (
                <>
                  <button
                    onClick={handleApproveWithModule}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {hasPendingARO ? 'Setujui ARO' : 'Setujui'}
                  </button>
                  <button
                    onClick={handleRejectWithNote}
                    className="px-4 py-2 border border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    {hasPendingARO ? 'Tolak ARO' : 'Tolak'}
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Informasi Sederhana - Data Pemohon */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-red-600" />
              Data Pemohon
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Nama:</span>
                <span className="ml-2 font-medium text-gray-900">{submission.dataUmum?.nama || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <span className="ml-2 font-medium text-gray-900">{submission.dataUmum?.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500">Instansi:</span>
                <span className="ml-2 font-medium text-gray-900">{submission.dataUmum?.institusi || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-500">Telepon:</span>
                <span className="ml-2 font-medium text-gray-900">{submission.dataUmum?.telepon || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Informasi Aplikasi */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-red-600" />
              Informasi Aplikasi
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Aplikasi:</span>
                <span className="ml-2">{getAppBadge(submission.app)}</span>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <span className="ml-2">{getStatusBadge(submission.status)}</span>
              </div>
              <div>
                <span className="text-gray-500">Tanggal Pengajuan:</span>
                <span className="ml-2 font-medium text-gray-900">{formatDate(submission.submittedAt || submission.timestamp)}</span>
              </div>
              {submission.approvedAt && (
                <div>
                  <span className="text-gray-500">Tanggal Persetujuan:</span>
                  <span className="ml-2 font-medium text-green-600">{formatDate(submission.approvedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* E-Reporting - Auto Approved, hanya tampilkan record */}
          {submission.app === 'ereporting' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Informasi Pendaftaran E-Reporting (Auto-Approved)
              </h4>
              <div className="grid grid-cols-1 gap-2 text-sm bg-white p-3 rounded-lg">
                <div><span className="text-gray-500">Email Pendaftaran:</span> <span className="font-medium">{submission.data?.email || submission.dataUmum?.email}</span></div>
                <div><span className="text-gray-500">Metode:</span> <span className="font-medium">{submission.data?.metode === 'sipo' ? 'Menggunakan SIPO' : 'Non-SIPO'}</span></div>
                {submission.data?.npwp && <div><span className="text-gray-500">NPWP:</span> <span className="font-medium">{submission.data.npwp}</span></div>}
                {submission.data?.namaPerusahaan && <div><span className="text-gray-500">Nama Perusahaan:</span> <span className="font-medium">{submission.data.namaPerusahaan}</span></div>}
              </div>
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Pendaftaran E-Reporting otomatis disetujui oleh sistem
                </p>
              </div>
            </div>
          )}

          {/* ARO untuk APOLO dengan dropdown multiple choice - hanya 1 dropdown untuk semua ARO */}
          {submission.app === 'apolo' && submission.aros && submission.aros.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-600" />
                Daftar ARO
              </h4>
              
              {/* Dropdown untuk memilih modul (hanya muncul jika ada ARO pending) */}
              {hasPendingARO && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Modul untuk ARO Baru:
                  </label>
                  <select
                    value={selectedModule}
                    onChange={(e) => setSelectedModule(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">-- Pilih Modul --</option>
                    {availableModules.map(module => (
                      <option key={module.value} value={module.value}>
                        {module.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Modul yang dipilih akan diterapkan ke semua ARO baru yang disetujui
                  </p>
                </div>
              )}
              
              <div className="space-y-3">
                {submission.aros.map((aro, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${
                    aro.status === 'approved' ? 'bg-green-50 border-green-200' :
                    aro.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">ARO #{idx + 1}</span>
                          <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                            aro.status === 'approved' ? 'bg-green-100 text-green-800' :
                            aro.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {aro.status === 'approved' ? '✓ Disetujui' : 
                             aro.status === 'pending' ? '⏳ Menunggu' : 
                             '✗ Ditolak'}
                          </span>
                          {aro.tanggalDiajukan && aro.status === 'pending' && (
                            <span className="text-xs text-gray-500">
                              (Diajukan: {new Date(aro.tanggalDiajukan).toLocaleDateString('id-ID')})
                            </span>
                          )}
                        </div>
                        
                        {aro.keterangan && (
                          <p className="text-xs text-gray-600 mb-1">
                            <span className="text-gray-500">Keterangan:</span> "{aro.keterangan}"
                          </p>
                        )}
                        
                        {aro.modulDipilih && (
                          <p className="text-xs text-green-600">
                            Modul: {aro.modulDipilih}
                          </p>
                        )}
                        
                        {aro.rejectionNote && (
                          <p className="text-xs text-red-600">
                            Alasan: {aro.rejectionNote}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Log Aktivitas (opsional, bisa dihilangkan jika ingin lebih sederhana) */}
          {submission.log && submission.log.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                <Bell className="w-4 h-4 text-red-600" />
                Log Aktivitas
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {submission.log.slice(0, 3).map((log, idx) => (
                  <div key={idx} className="text-xs border-l-2 border-red-200 pl-2 py-1">
                    <p className="font-medium text-gray-900">{log.action}</p>
                    <p className="text-gray-600">{log.description}</p>
                    <p className="text-gray-400 mt-0.5">{formatDate(log.timestamp)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
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
                ? 'Semua ARO yang ada akan otomatis disetujui bersama aplikasi.'
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