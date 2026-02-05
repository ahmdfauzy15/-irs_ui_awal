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
  User
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
    status: 'all',
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

  // Load data dari localStorage user
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

  // Filter submissions berdasarkan kriteria
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

  // Status badge yang konsisten dengan user side
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

  // App badge
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

  // Format tanggal
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

  // Handle approve aplikasi
  const handleApprove = (id) => {
    const submission = submissions.find(s => s.id === id);
    if (!submission) return;
    
    setSelectedActionId(id);
    setActionType('app');
    setShowApproveModal(true);
  };

  // Handle reject aplikasi
  const handleReject = (id) => {
    const submission = submissions.find(s => s.id === id);
    if (!submission) return;
    
    setSelectedActionId(id);
    setActionType('app');
    setShowRejectModal(true);
  };

  // Handle approve ARO
  const handleApproveARO = (submissionId, aro) => {
    setSelectedActionId(submissionId);
    setSelectedARO(aro);
    setAroAction('approve');
    setApprovalNote('');
    setShowAROActionModal(true);
  };

  // Handle reject ARO
  const handleRejectARO = (submissionId, aro) => {
    setSelectedActionId(submissionId);
    setSelectedARO(aro);
    setAroAction('reject');
    setApprovalNote('');
    setShowAROActionModal(true);
  };

  // Confirm approve aplikasi
  const confirmApprove = () => {
    if (!selectedActionId) return;
    
    const adminName = 'Admin IRS';
    
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === selectedActionId) {
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
          log: updatedLog
        };
      }
      return sub;
    });
    
    updateLocalStorage(updatedSubmissions);
    resetModals();
    alert('✅ Pengajuan berhasil disetujui!');
  };

  // Confirm reject aplikasi
  const confirmReject = () => {
    if (!selectedActionId) return;
    
    const adminName = 'Admin IRS';
    
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === selectedActionId) {
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
          log: updatedLog
        };
      }
      return sub;
    });
    
    updateLocalStorage(updatedSubmissions);
    resetModals();
    alert('❌ Pengajuan berhasil ditolak!');
  };

  // Confirm ARO action
  const confirmAROAction = () => {
    if (!selectedActionId || !selectedARO) return;
    
    const adminName = 'Admin IRS';
    
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === selectedActionId && sub.aros) {
        const updatedAROs = sub.aros.map(aro => {
          if (aro.id === selectedARO.id) {
            const actionText = aroAction === 'approve' ? 'Disetujui' : 'Ditolak';
            const logEntry = {
              timestamp: new Date().toISOString(),
              action: `ARO ${actionText} oleh Admin`,
              description: `${aro.nama} ${aroAction === 'approve' ? 'disetujui' : 'ditolak'} oleh ${adminName}`,
              status: aroAction === 'approve' ? 'approved' : 'rejected',
              details: approvalNote || `ARO ${actionText.toLowerCase()}`,
              admin: adminName
            };
            
            const updatedAro = {
              ...aro,
              status: aroAction === 'approve' ? 'approved' : 'rejected',
              [aroAction === 'approve' ? 'approvedAt' : 'rejectedAt']: new Date().toISOString(),
              [aroAction === 'approve' ? 'approvedBy' : 'rejectedBy']: adminName,
              [aroAction === 'approve' ? 'approvalNote' : 'rejectionNote']: approvalNote,
              log: [...(aro.log || []), logEntry]
            };
            
            return updatedAro;
          }
          return aro;
        });
        
        const updatedLog = [...(sub.log || []), {
          timestamp: new Date().toISOString(),
          action: `ARO ${selectedARO.nama} ${aroAction === 'approve' ? 'Disetujui' : 'Ditolak'}`,
          description: `Permohonan ARO ${aroAction === 'approve' ? 'disetujui' : 'ditolak'} oleh admin`,
          status: aroAction === 'approve' ? 'approved' : 'rejected',
          details: approvalNote
        }];
        
        return {
          ...sub,
          aros: updatedAROs,
          log: updatedLog
        };
      }
      return sub;
    });
    
    updateLocalStorage(updatedSubmissions);
    resetModals();
    alert(`✅ ARO berhasil ${aroAction === 'approve' ? 'disetujui' : 'ditolak'}!`);
  };

  // Update localStorage dan state
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

  // View dokumen
  const viewDocumentFile = (submission, type = 'app') => {
    setViewDocument(submission);
    setDocumentType(type);
    setDocumentViewerOpen(true);
  };

  // Generate PDF content untuk preview
  const generateDocumentPreview = (submission, type) => {
    const docType = type === 'aro' ? 'Surat Permohonan ARO' : 'Surat Permohonan Hak Akses';
    const aro = type === 'aro' ? selectedARO : null;
    
    const content = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
          ${docType}
        </h1>
        
        <div style="margin: 20px 0;">
          <p><strong>ID Pengajuan:</strong> ${submission.trackingId}</p>
          <p><strong>Nama Pemohon:</strong> ${submission.dataUmum?.nama || 'N/A'}</p>
          <p><strong>Instansi:</strong> ${submission.dataUmum?.institusi || 'N/A'}</p>
          <p><strong>Email:</strong> ${submission.dataUmum?.email || 'N/A'}</p>
          <p><strong>Aplikasi:</strong> ${submission.app?.toUpperCase() || 'N/A'}</p>
          ${aro ? `
            <p><strong>Nama ARO:</strong> ${aro.nama}</p>
            <p><strong>Modul:</strong> ${aro.module}</p>
            <p><strong>Deskripsi:</strong> ${aro.deskripsi}</p>
          ` : ''}
          <p><strong>Tanggal Pengajuan:</strong> ${formatDate(submission.submittedAt || submission.timestamp)}</p>
          <p><strong>Status:</strong> ${submission.status}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <h3 style="color: #374151;">Keterangan:</h3>
          <p>${submission.data?.keterangan || 'Surat permohonan resmi untuk pengajuan hak akses aplikasi.'}</p>
        </div>
        
        <div style="margin-top: 40px; text-align: center; color: #6b7280;">
          <p>Dokumen ini dihasilkan oleh sistem IRS OJK</p>
          <p>${new Date().toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </div>
    `;
    
    return content;
  };

  // Download PDF
  const downloadPDF = (submission, type) => {
    const docType = type === 'aro' ? 'Surat Permohonan ARO' : 'Surat Permohonan Hak Akses';
    const aro = type === 'aro' ? selectedARO : null;
    
    const content = `
      Surat Permohonan Hak Akses
      ============================
      
      ID Pengajuan: ${submission.trackingId}
      Nama Pemohon: ${submission.dataUmum?.nama || 'N/A'}
      Instansi: ${submission.dataUmum?.institusi || 'N/A'}
      Email: ${submission.dataUmum?.email || 'N/A'}
      Aplikasi: ${submission.app?.toUpperCase() || 'N/A'}
      ${aro ? `
      Nama ARO: ${aro.nama}
      Modul: ${aro.module}
      Deskripsi: ${aro.deskripsi}
      ` : ''}
      Tanggal Pengajuan: ${formatDate(submission.submittedAt || submission.timestamp)}
      Status: ${submission.status}
      
      Keterangan:
      ${submission.data?.keterangan || 'Surat permohonan resmi untuk pengajuan hak akses aplikasi.'}
      
      ---
      Dokumen ini dihasilkan oleh sistem IRS OJK
      ${new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    `;
    
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docType}_${submission.trackingId}_${new Date().getTime()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert(`✅ ${docType} berhasil didownload!`);
  };

  // Navigasi ke profil user
  const navigateToUserProfile = (submission) => {
    // Simulasi navigasi ke profil user
    alert(`Membuka profil user: ${submission.dataUmum?.nama}\nEmail: ${submission.dataUmum?.email}\nAkan diarahkan ke halaman profil user...`);
    
    // Dalam aplikasi React Router, kita bisa menggunakan:
    // navigate(`/admin/users/${submission.dataUmum?.email}`);
    
    // Untuk sekarang kita buka di tab baru (simulasi)
    window.open('#', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Konten Dashboard saja */}
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
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
                  <option value="all">Semua Status</option>
                  <option value="pending">Menunggu</option>
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
                        Tanggal
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
                        <React.Fragment key={submission.id}>
                          {/* Row utama */}
                          <tr className="hover:bg-red-50 transition-colors">
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
                                  
                                  {/* Tautan ke Profil User */}
                                  <button
                                    onClick={() => navigateToUserProfile(submission)}
                                    className="mt-1 flex items-center gap-1 text-xs text-red-600 hover:text-red-800 hover:underline"
                                  >
                                    <User className="w-3 h-3" />
                                    Lihat Profil User
                                  </button>
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
                                {/* Tombol Lihat Detail */}
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
                                
                                {/* Tombol Lihat/Download Dokumen */}
                                <div className="relative group">
                                  <button
                                    onClick={() => viewDocumentFile(submission, 'app')}
                                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                    title="Lihat Dokumen"
                                  >
                                    <FileText className="w-4 h-4" />
                                  </button>
                                  
                                  {/* Dropdown untuk Download PDF */}
                                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                    <button
                                      onClick={() => viewDocumentFile(submission, 'app')}
                                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                      <Eye className="w-4 h-4" />
                                      Lihat Dokumen
                                    </button>
                                    <button
                                      onClick={() => downloadPDF(submission, 'app')}
                                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                      <Download className="w-4 h-4" />
                                      Download PDF
                                    </button>
                                  </div>
                                </div>
                                
                                {/* Tombol Approve/Reject untuk pending */}
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
                          
                          {/* Row untuk ARO pending */}
                          {pendingAROs.length > 0 && (
                            <tr className="bg-yellow-50">
                              <td colSpan="6" className="px-6 py-4">
                                <div className="ml-10">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Layers className="w-4 h-4 text-yellow-600" />
                                    <span className="text-sm font-bold text-yellow-800">
                                      ARO Menunggu Approval
                                    </span>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {pendingAROs.map((aro) => (
                                      <div key={aro.id} className="bg-white border border-yellow-200 rounded-lg p-3">
                                        <div className="flex items-start justify-between">
                                          <div>
                                            <p className="font-medium text-gray-900 text-sm">{aro.nama}</p>
                                            <p className="text-xs text-gray-500">{aro.module}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                              Diajukan: {formatDate(aro.tanggalDiajukan)}
                                            </p>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            {/* Tombol Dokumen ARO */}
                                            <div className="relative group">
                                              {aro.suratPermohonan && (
                                                <button
                                                  onClick={() => {
                                                    setSelectedARO(aro);
                                                    viewDocumentFile(submission, 'aro');
                                                  }}
                                                  className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                                                  title="Lihat Dokumen ARO"
                                                >
                                                  <FileText className="w-3 h-3" />
                                                </button>
                                              )}
                                              
                                              {/* Dropdown untuk ARO Document */}
                                              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                                <button
                                                  onClick={() => {
                                                    setSelectedARO(aro);
                                                    viewDocumentFile(submission, 'aro');
                                                  }}
                                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-1 text-xs"
                                                >
                                                  <Eye className="w-3 h-3" />
                                                  Lihat Dokumen
                                                </button>
                                                <button
                                                  onClick={() => {
                                                    setSelectedARO(aro);
                                                    downloadPDF(submission, 'aro');
                                                  }}
                                                  className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-1 text-xs"
                                                >
                                                  <Download className="w-3 h-3" />
                                                  Download PDF
                                                </button>
                                              </div>
                                            </div>
                                            
                                            <button
                                              onClick={() => handleApproveARO(submission.id, aro)}
                                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                                              title="Setujui ARO"
                                            >
                                              <Check className="w-3 h-3" />
                                            </button>
                                            <button
                                              onClick={() => handleRejectARO(submission.id, aro)}
                                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                                              title="Tolak ARO"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Pagination */}
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
          onViewDocument={() => viewDocumentFile(selectedSubmission, 'app')}
          onDownloadPDF={() => downloadPDF(selectedSubmission, 'app')}
          onNavigateToProfile={() => navigateToUserProfile(selectedSubmission)}
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

      {/* Modal ARO Action */}
      {showAROActionModal && selectedARO && (
        <AROActionModal
          aro={selectedARO}
          action={aroAction}
          note={approvalNote}
          setNote={setApprovalNote}
          onConfirm={confirmAROAction}
          onCancel={resetModals}
          onViewDocument={() => {
            setShowAROActionModal(false);
            setTimeout(() => {
              viewDocumentFile(
                submissions.find(s => s.id === selectedActionId),
                'aro'
              );
            }, 100);
          }}
          onDownloadPDF={() => {
            setShowAROActionModal(false);
            setTimeout(() => {
              downloadPDF(
                submissions.find(s => s.id === selectedActionId),
                'aro'
              );
            }, 100);
          }}
        />
      )}

      {/* Document Viewer Modal */}
      {documentViewerOpen && viewDocument && (
        <DocumentViewerModal
          submission={viewDocument}
          documentType={documentType}
          selectedARO={selectedARO}
          formatDate={formatDate}
          onClose={() => setDocumentViewerOpen(false)}
          onDownloadPDF={() => {
            setDocumentViewerOpen(false);
            setTimeout(() => {
              downloadPDF(viewDocument, documentType);
            }, 100);
          }}
        />
      )}
    </div>
  );
};

// Komponen Modal Detail - DITAMBAH TOMBOL PROFIL & PDF
const DetailModal = ({ submission, onClose, onApprove, onReject, onViewDocument, onDownloadPDF, onNavigateToProfile, getStatusBadge, getAppBadge, formatDate }) => {
  
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
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-600" />
                    Data Pemohon
                  </h4>
                  <button
                    onClick={onNavigateToProfile}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <User className="w-4 h-4" />
                    Lihat Profil User
                  </button>
                </div>
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
                
                {/* Detail form spesifik */}
                {renderFormDetails()}
              </div>
              
              {/* ARO untuk APOLO */}
              {submission.app === 'apolo' && submission.aros && submission.aros.length > 0 && (
                <div className="border border-red-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-red-600" />
                    ARO yang Diajukan
                  </h4>
                  <div className="space-y-3">
                    {submission.aros.map((aro, idx) => (
                      <div key={idx} className={`border rounded-lg p-4 ${aro.status === 'pending' ? 'border-yellow-200 bg-yellow-50' : aro.status === 'approved' ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
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
                                 '? Unknown'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{aro.deskripsi || aro.module}</p>
                            {aro.tanggalDiajukan && (
                              <p className="text-xs text-gray-500 mt-2">
                                Diajukan: {formatDate(aro.tanggalDiajukan)}
                              </p>
                            )}
                            {aro.approvedBy && (
                              <p className="text-xs text-green-600 mt-1">
                                Disetujui oleh: {aro.approvedBy} ({formatDate(aro.approvedAt)})
                              </p>
                            )}
                            {aro.rejectedBy && (
                              <p className="text-xs text-red-600 mt-1">
                                Ditolak oleh: {aro.rejectedBy} ({formatDate(aro.rejectedAt)})
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Kolom 2: Dokumen, Log & Aksi */}
            <div className="space-y-6">
              {/* Dokumen */}
              <div className="border border-red-200 rounded-xl p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-600" />
              Dokumen
            </h4>
            <div className="space-y-3">
              <button
                onClick={onViewDocument}
                className="w-full p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Surat Permohonan</p>
                    <p className="text-xs text-gray-500">Lihat dokumen online</p>
                  </div>
                </div>
                <Eye className="w-4 h-4 text-gray-400" />
              </button>
              
              <button
                onClick={onDownloadPDF}
                className="w-full p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <File className="w-5 h-5 text-red-600" /> {/* Ganti dengan File */}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Download PDF</p>
                    <p className="text-xs text-gray-500">Download dalam format PDF</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
              
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Aksi Admin */}
              <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Aksi Admin</h4>
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
                      <button
                        onClick={onReject}
                        className="w-full py-3 border border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        Tolak Pengajuan
                      </button>
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
                  
                  <button
                    onClick={() => alert(`Kirim email ke ${submission.dataUmum?.email}`)}
                    className="w-full py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Notifikasi Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-red-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onDownloadPDF}
              className="px-4 py-2.5 border border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
            >
              Tutup
            </button>
          </div>
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
                ? 'Setelah disetujui, sistem akan otomatis mengirimkan email notifikasi ke pemohon.'
                : 'Penolakan akan dikirimkan ke pemohon melalui email. Pastikan alasan penolakan jelas dan profesional.'}
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

// Modal khusus untuk ARO Action
const AROActionModal = ({ aro, action, note, setNote, onConfirm, onCancel, onViewDocument, onDownloadPDF }) => {
  const isApprove = action === 'approve';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className={`p-6 border-b ${isApprove ? 'border-green-200 bg-gradient-to-r from-green-50 to-white' : 'border-red-200 bg-gradient-to-r from-red-50 to-white'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isApprove ? 'bg-green-100' : 'bg-red-100'}`}>
              {isApprove ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {isApprove ? 'Setujui ARO' : 'Tolak ARO'}
              </h3>
              <p className="text-gray-600">{aro.nama}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm font-medium text-gray-900">Modul: {aro.module}</p>
            <p className="text-sm text-gray-600 mt-1">{aro.deskripsi}</p>
            {aro.suratPermohonan && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={onViewDocument}
                    className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
                  >
                    <FileText className="w-4 h-4" />
                    Lihat dokumen
                  </button>
                  <span className="text-gray-400">|</span>
                  <button
                    onClick={onDownloadPDF}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isApprove ? 'Catatan (Opsional)' : 'Alasan Penolakan'} {!isApprove && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows="3"
              placeholder={isApprove ? "Catatan untuk pemohon..." : "Jelaskan mengapa ARO ditolak..."}
              required={!isApprove}
            />
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
              disabled={!isApprove && !note.trim()}
              className={`px-6 py-2.5 font-bold rounded-lg ${
                !isApprove && !note.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isApprove 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
              }`}
            >
              Ya, {isApprove ? 'Setujui ARO' : 'Tolak ARO'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Document Viewer Modal untuk melihat dokumen
const DocumentViewerModal = ({ submission, documentType, selectedARO, formatDate, onClose, onDownloadPDF }) => {
  const docTitle = documentType === 'aro' 
    ? `Surat Permohonan ARO - ${selectedARO?.nama || ''}`
    : `Surat Permohonan Hak Akses - ${submission.app?.toUpperCase()}`;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-red-200 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                  <File className="w-6 h-6 text-white" /> {/* Ganti dengan File */}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{docTitle}</h3>
                  <p className="text-gray-600">ID: {submission.trackingId}</p>
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
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Preview Dokumen</h4>
            
            {/* Preview konten dokumen */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 min-h-[400px]">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-red-600 border-b-2 border-red-600 pb-2 inline-block">
                  {documentType === 'aro' ? 'SURAT PERMOHONAN ARO' : 'SURAT PERMOHONAN HAK AKSES'}
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">ID Pengajuan</p>
                    <p className="font-bold">{submission.trackingId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tanggal</p>
                    <p className="font-bold">{formatDate(new Date())}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600">Nama Pemohon</p>
                  <p className="font-bold text-lg">{submission.dataUmum?.nama || 'N/A'}</p>
                  <p className="text-gray-600">{submission.dataUmum?.institusi || 'N/A'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-bold">{submission.dataUmum?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Telepon</p>
                    <p className="font-bold">{submission.dataUmum?.telepon || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600">Aplikasi yang Diajukan</p>
                  <p className="font-bold text-lg">{submission.app?.toUpperCase()}</p>
                </div>
                
                {documentType === 'aro' && selectedARO && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <h5 className="font-bold text-gray-900 mb-2">Detail ARO:</h5>
                    <p className="font-medium">{selectedARO.nama}</p>
                    <p className="text-gray-600">{selectedARO.module}</p>
                    <p className="text-sm text-gray-500 mt-2">{selectedARO.deskripsi}</p>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <p className="text-sm text-gray-600">Keterangan</p>
                  <p className="italic">
                    {submission.data?.keterangan || 
                     (documentType === 'aro' 
                       ? 'Permohonan penambahan Additional Responsible Officer (ARO) untuk akses modul tambahan.'
                       : 'Permohonan hak akses aplikasi untuk keperluan pelaporan sesuai regulasi OJK.')}
                  </p>
                </div>
                
                {/* Signature area */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-center text-gray-600">Pemohon</p>
                      <div className="h-16"></div>
                      <p className="text-center font-bold">{submission.dataUmum?.nama || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-center text-gray-600">Mengetahui,</p>
                      <div className="h-16"></div>
                      <p className="text-center font-bold">Administrator IRS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center text-gray-500 text-sm">
              <p>Dokumen ini adalah preview. File PDF akan berisi informasi lengkap.</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-red-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onDownloadPDF}
              className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
            >
              Tutup Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;