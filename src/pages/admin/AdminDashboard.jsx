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
  Info,
  Package,
  FolderTree
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
    todaySubmissions: 0,
    apoloWithAro: 0 // Pengajuan APOLO yang menyertakan ARO
  });
  const [filters, setFilters] = useState({
    status: 'pending',
    app: 'all',
    startDate: '',
    endDate: '',
    type: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showForumModal, setShowForumModal] = useState(false);
  const [forumMessage, setForumMessage] = useState('');
  const [approvalNote, setApprovalNote] = useState('');
  const [selectedActionId, setSelectedActionId] = useState(null);
  const [actionType, setActionType] = useState('');
  const [documentLoading, setDocumentLoading] = useState(false);
  const [expandedAro, setExpandedAro] = useState(null);

  // Fungsi untuk mendapatkan batasan tanggal (real-time)
  const getDateLimits = () => {
    const today = new Date(); // Tanggal real-time saat ini
    
    // 1 tahun kebelakang dari hari ini
    const minDate = new Date(today);
    minDate.setFullYear(today.getFullYear() - 1);
    
    // 1 tahun kedepan dari hari ini
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() + 1);
    
    return {
      minDate: minDate.toISOString().split('T')[0],
      maxDate: maxDate.toISOString().split('T')[0],
      today: today.toISOString().split('T')[0]
    };
  };

  // Set default date range ke 1 tahun kebelakang dari 16 Maret 2026
  useEffect(() => {
    // Base date: 16 Maret 2026
    const baseDate = new Date('2026-03-16');
    
    // 1 tahun kebelakang dari base date
    const oneYearAgo = new Date(baseDate);
    oneYearAgo.setFullYear(baseDate.getFullYear() - 1);
    
    // 1 tahun kedepan dari base date
    const oneYearAhead = new Date(baseDate);
    oneYearAhead.setFullYear(baseDate.getFullYear() + 1);
    
    setFilters(prev => ({
      ...prev,
      startDate: oneYearAgo.toISOString().split('T')[0],
      endDate: oneYearAhead.toISOString().split('T')[0]
    }));
  }, []);

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
        let apoloWithAroCount = 0;
        
        submittedSubs.forEach(sub => {
          const subDate = new Date(sub.submittedAt || sub.timestamp).toDateString();
          if (subDate === today) todaySubmissionsCount++;
          
          // Hitung ARO pending (ARO terpisah - untuk pengajuan setelah APOLO disetujui)
          if (sub.isARO && sub.status === 'pending') {
            aroPendingCount++;
          }
          
          // Hitung APOLO yang mengajukan ARO (pengajuan pertama)
          if (sub.app === 'apolo' && !sub.isARO && sub.aroData) {
            apoloWithAroCount++;
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
          todaySubmissions: todaySubmissionsCount,
          apoloWithAro: apoloWithAroCount
        };
        
        setStats(statsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
      setLoading(false);
    }, 500);
  };

  // FILTER PERIODE DENGAN RANGE TANGGAL
  const filteredSubmissions = submissions.filter(sub => {
    if (filters.status !== 'all' && sub.status !== filters.status) {
      return false;
    }
    
    if (filters.app !== 'all' && sub.app !== filters.app) {
      return false;
    }
    
    if (filters.type === 'aro') {
      // Untuk filter ARO, tampilkan hanya ARO terpisah (bukan yang menyertai APOLO pertama)
      return sub.isARO === true;
    } else if (filters.type === 'app') {
      // Untuk filter aplikasi, tampilkan semua pengajuan aplikasi termasuk APOLO dengan ARO-nya
      return sub.isARO !== true;
    } else if (filters.type === 'apolo-with-aro') {
      // Filter khusus untuk melihat APOLO yang mengajukan ARO
      return sub.app === 'apolo' && !sub.isARO && sub.aroData;
    }
    
    // FILTER RANGE TANGGAL
    if (filters.startDate && filters.endDate) {
      const submissionDate = new Date(sub.submittedAt || sub.timestamp);
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);
      
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      
      if (submissionDate < startDate || submissionDate > endDate) {
        return false;
      }
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchable = [
        sub.dataUmum?.nama || '',
        sub.dataUmum?.institusi || '',
        sub.app || '',
        sub.trackingId || '',
        sub.dataUmum?.email || '',
        sub.aroData?.keterangan || '' 
      ].join(' ').toLowerCase();
      
      return searchable.includes(query);
    }
    
    return true;
  });

  // FUNGSI KIRIM PESAN FORUM
  const handleSendForumMessage = () => {
    if (!forumMessage.trim() || !selectedSubmission) return;
    
    const adminName = 'Admin IRS';
    
    const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    const updatedSubs = storedSubs.map(sub => {
      if (sub.id === selectedSubmission.id) {
        const forum = sub.forum || [];
        
        return {
          ...sub,
          forum: [...forum, {
            id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            sender: 'admin',
            senderName: adminName,
            message: forumMessage,
            timestamp: new Date().toISOString(),
            read: false
          }]
        };
      }
      return sub;
    });
    
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubs));
    setForumMessage('');
    
    loadData();
    const updated = updatedSubs.find(s => s.id === selectedSubmission.id);
    setSelectedSubmission(updated);
  };

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

  const getAppBadge = (app, isARO = false, hasAro = false) => {
    const appNames = {
      'sipina': 'SIPINA',
      'apolo': 'APOLO',
      'ereporting': 'E-Reporting'
    };
    
    if (isARO) {
      return (
        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full border border-purple-200 flex items-center gap-1">
          <Layers className="w-3 h-3" />
          ARO
        </span>
      );
    }
    
    if (app === 'apolo' && hasAro) {
      return (
        <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-purple-600 text-white text-xs font-bold rounded-full border border-red-300 flex items-center gap-1">
          <Package className="w-3 h-3" />
          APOLO + ARO
        </span>
      );
    }
    
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

  const formatDateOnly = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleApprove = (id, note) => {
    const adminName = 'Admin IRS';
    
    const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    const updatedSubs = storedSubs.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          status: 'approved',
          approvedAt: new Date().toISOString(),
          approvedBy: adminName,
          approvalNote: note,
          log: [...(sub.log || []), {
            timestamp: new Date().toISOString(),
            action: 'Disetujui oleh Admin',
            description: `Pengajuan ${sub.app === 'apolo' && sub.aroData ? 'APOLO beserta ARO' : (sub.isARO ? 'ARO' : 'hak akses ' + sub.app.toUpperCase())} disetujui oleh ${adminName}`,
            status: 'approved',
            details: note || 'Pengajuan telah disetujui oleh administrator',
            admin: adminName
          }]
        };
      }
      return sub;
    });
    
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubs));
    loadData();
    alert('✅ Pengajuan berhasil disetujui!');
  };

  const handleReject = (id, note) => {
    const adminName = 'Admin IRS';
    
    const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    const updatedSubs = storedSubs.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          status: 'rejected',
          rejectedAt: new Date().toISOString(),
          rejectedBy: adminName,
          rejectionNote: note,
          log: [...(sub.log || []), {
            timestamp: new Date().toISOString(),
            action: 'Ditolak oleh Admin',
            description: `Pengajuan ${sub.app === 'apolo' && sub.aroData ? 'APOLO beserta ARO' : (sub.isARO ? 'ARO' : 'hak akses ' + sub.app.toUpperCase())} ditolak oleh ${adminName}`,
            status: 'rejected',
            details: note,
            admin: adminName
          }]
        };
      }
      return sub;
    });
    
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubs));
    loadData();
    alert('❌ Pengajuan berhasil ditolak!');
  };

  // Handle download dokumen
  const handleDownloadDocument = (submission) => {
    setDocumentLoading(true);
    
    try {
      const formData = submission.data || {};
      const dataUmum = submission.dataUmum || {};
      const aroData = submission.aroData || {};
      
      let docContent = '';
      let fileName = '';
      
      docContent = `
DOKUMEN PENGAJUAN HAK AKSES
===========================

ID Tracking: ${submission.trackingId}
Aplikasi: ${submission.app.toUpperCase()}
Jenis: ${submission.isARO ? 'Permohonan ARO (Terpisah)' : (submission.aroData ? 'Pengajuan APOLO dengan ARO (Pengajuan Pertama)' : 'Pengajuan Aplikasi')}
Status: ${submission.status}
Tanggal Pengajuan: ${formatDate(submission.submittedAt || submission.timestamp)}

DATA PEMOHON:
-------------
Nama Lengkap: ${dataUmum?.nama || 'N/A'}
Email: ${dataUmum?.email || 'N/A'}
Telepon: ${dataUmum?.telepon || 'N/A'}
Instansi: ${dataUmum?.institusi || 'N/A'}

DATA PENGAJUAN:
---------------------------
${submission.isARO ? `
PERMOHONAN ARO (TERPISAH):
Keterangan: ${submission.aroKeterangan || '-'}
Surat Permohonan: ${submission.aroSuratPermohonan?.name || '-'}
` : submission.aroData ? `
DATA APLIKASI APOLO:
Nomor Surat: ${formData.nomorSurat || '-'}
Tanggal Surat: ${formData.tanggalSurat || '-'}
Perihal: ${formData.perihal || '-'}

DATA ARO (MENYERTAI PENGAJUAN PERTAMA):
Keterangan ARO: ${aroData.keterangan || '-'}
Surat Permohonan ARO: ${aroData.suratPermohonan?.name || '-'}
` : `
DATA APLIKASI ${submission.app.toUpperCase()}:
${JSON.stringify(formData, null, 2)}
`}

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
                    placeholder="Cari berdasarkan nama, instansi, ID tracking, atau keterangan ARO..."
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Jenis Pengajuan
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">Semua Jenis</option>
                  <option value="app">Pengajuan Aplikasi</option>
                  <option value="aro">Permohonan ARO (Terpisah)</option>
                  <option value="apolo-with-aro">APOLO + ARO (Pengajuan Pertama)</option>
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
                  Dari Tanggal
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                  max={filters.endDate}
                  min={getDateLimits().minDate}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
             
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Sampai Tanggal
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                  min={filters.startDate}
                  max={getDateLimits().maxDate}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-8">
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
                  <p className="text-sm opacity-90">Menunggu</p>
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

            <div className="bg-gradient-to-br from-red-700 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">APOLO + ARO</p>
                  <p className="text-3xl font-bold mt-2">{stats.apoloWithAro}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Package className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 text-sm opacity-90">
                <span>Pengajuan pertama dengan ARO</span>
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
                      'Jenis': sub.isARO ? 'ARO Terpisah' : (sub.aroData ? 'APOLO + ARO' : 'Aplikasi'),
                      'Status': sub.status,
                      'Tanggal Pengajuan': formatDate(sub.submittedAt || sub.timestamp)
                    }));
                    
                    const csvContent = "data:text/csv;charset=utf-8," 
                      + "ID Tracking,Nama Pemohon,Instansi,Email,Aplikasi,Jenis,Status,Tanggal Pengajuan\n"
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
                        Aplikasi & Jenis
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
                      const hasAro = submission.app === 'apolo' && submission.aroData && !submission.isARO;
                      
                      return (
                        <tr key={submission.id} className="hover:bg-red-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-mono font-bold text-gray-900">
                              {submission.trackingId}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {submission.app?.toUpperCase()}
                              {submission.isARO && <span className="ml-1 text-purple-600">(ARO Terpisah)</span>}
                              {hasAro && <span className="ml-1 text-purple-600">(dengan ARO)</span>}
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
                              {getAppBadge(submission.app, submission.isARO, hasAro)}
                              {hasAro && (
                                <button
                                  onClick={() => setExpandedAro(expandedAro === submission.id ? null : submission.id)}
                                  className="text-xs text-left text-purple-600 hover:text-purple-800 flex items-center gap-1"
                                >
                                  <FolderTree className="w-3 h-3" />
                                  Lihat detail ARO
                                </button>
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail dengan Tombol Aksi di Bawah */}
      {showDetailModal && selectedSubmission && (
        <DetailModal 
          submission={selectedSubmission}
          onClose={() => setShowDetailModal(false)}
          onApprove={(id, note) => {
            handleApprove(id, note);
            setShowDetailModal(false);
          }}
          onReject={(id, note) => {
            handleReject(id, note);
            setShowDetailModal(false);
          }}
          onOpenForum={() => {
            setShowDetailModal(false);
            setShowForumModal(true);
          }}
          onDownloadDocument={handleDownloadDocument}
          getStatusBadge={getStatusBadge}
          getAppBadge={getAppBadge}
          formatDate={formatDate}
          formatDateOnly={formatDateOnly}
        />
      )}

      {/* MODAL FORUM */}
      {showForumModal && selectedSubmission && (
        <ForumModal
          submission={selectedSubmission}
          onClose={() => {
            setShowForumModal(false);
            setForumMessage('');
          }}
          onSendMessage={handleSendForumMessage}
          message={forumMessage}
          setMessage={setForumMessage}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

// Komponen Modal Detail dengan Tombol Aksi di Bawah
const DetailModal = ({ submission, onClose, onApprove, onReject, onOpenForum, onDownloadDocument, getStatusBadge, getAppBadge, formatDate, formatDateOnly }) => {
  const [documentLoading, setDocumentLoading] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [approveNote, setApproveNote] = useState('');
  const [rejectNote, setRejectNote] = useState('');
  const [activeTab, setActiveTab] = useState('main'); // 'main', 'aro'

  // Hitung pesan user yang belum dibaca
  const unreadUserMessages = submission.forum ? submission.forum.filter(m => m.sender === 'user' && !m.read).length : 0;
  
  const hasAro = submission.app === 'apolo' && submission.aroData && !submission.isARO;

  const handleDownload = () => {
    setDocumentLoading(true);
    onDownloadDocument(submission);
    setTimeout(() => setDocumentLoading(false), 1000);
  };

  const handleApproveClick = () => {
    setShowApproveConfirm(true);
  };

  const handleRejectClick = () => {
    setShowRejectConfirm(true);
  };

  const confirmApprove = () => {
    onApprove(submission.id, approveNote);
    setShowApproveConfirm(false);
    setApproveNote('');
  };

  const confirmReject = () => {
    onReject(submission.id, rejectNote);
    setShowRejectConfirm(false);
    setRejectNote('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-red-200 bg-gradient-to-r from-red-50 to-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Detail Pengajuan</h3>
                <p className="text-gray-600">
                  ID: {submission.trackingId} • {submission.app?.toUpperCase()}
                  {submission.isARO && <span className="ml-2 text-purple-600">(ARO Terpisah)</span>}
                  {hasAro && <span className="ml-2 text-purple-600">(dengan ARO)</span>}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Tab Navigation untuk APOLO dengan ARO */}
          {hasAro && (
            <div className="flex gap-2 mt-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('main')}
                className={`px-4 py-2 font-medium text-sm border-b-2 ${
                  activeTab === 'main' 
                    ? 'border-red-600 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Data APOLO
              </button>
              <button
                onClick={() => setActiveTab('aro')}
                className={`px-4 py-2 font-medium text-sm border-b-2 ${
                  activeTab === 'aro' 
                    ? 'border-purple-600 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Data ARO (Menyertai)
              </button>
            </div>
          )}
        </div>
        
        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
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
              Informasi Pengajuan
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Aplikasi:</span>
                <span className="ml-2">{getAppBadge(submission.app, submission.isARO, hasAro)}</span>
              </div>
              <div>
                <span className="text-gray-500">Jenis:</span>
                <span className={`ml-2 px-2 py-1 text-xs font-bold rounded-full ${
                  submission.isARO ? 'bg-purple-100 text-purple-800' : 
                  hasAro ? 'bg-gradient-to-r from-red-100 to-purple-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {submission.isARO ? 'Permohonan ARO (Terpisah)' : 
                   hasAro ? 'APOLO + ARO (Pengajuan Pertama)' : 
                   'Pengajuan Aplikasi'}
                </span>
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
              {submission.rejectedAt && (
                <div>
                  <span className="text-gray-500">Tanggal Penolakan:</span>
                  <span className="ml-2 font-medium text-red-600">{formatDate(submission.rejectedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* E-Reporting - Auto Approved */}
          {submission.app === 'ereporting' && !submission.isARO && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Informasi Pendaftaran E-Reporting 
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

          {/* Data APOLO (Pengajuan Pertama dengan ARO) */}
          {activeTab === 'main' && hasAro && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-600" />
                Data Pengajuan APOLO (Pengajuan Pertama)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Nomor Surat:</span> <span className="ml-2 font-medium">{submission.data?.nomorSurat || '-'}</span></div>
                <div><span className="text-gray-500">Tanggal Surat:</span> <span className="ml-2 font-medium">{submission.data?.tanggalSurat ? formatDateOnly(submission.data.tanggalSurat) : '-'}</span></div>
                <div className="md:col-span-2"><span className="text-gray-500">Perihal:</span> <span className="ml-2 font-medium">{submission.data?.perihal || '-'}</span></div>
              </div>
            </div>
          )}

          {/* Data ARO - Untuk APOLO yang menyertai pengajuan pertama */}
          {activeTab === 'aro' && hasAro && (
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-purple-600" />
                Data ARO (Menyertai Pengajuan APOLO)
              </h4>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-500 mb-2">Keterangan ARO:</p>
                  <p className="text-gray-900 font-medium">{submission.aroData?.keterangan || '-'}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-500 mb-2">Surat Permohonan:</p>
                  {submission.aroData?.suratPermohonan ? (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-900">{submission.aroData.suratPermohonan.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(submission.aroData.suratPermohonan.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500">Tidak ada file</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Data Aplikasi Lainnya - Bukan APOLO dengan ARO */}
          {!hasAro && !submission.isARO && submission.app !== 'ereporting' && (
            <>
              {submission.app === 'sipina' && submission.data && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-600" />
                    Data Pendaftaran SIPINA
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Kode SIPO:</span> <span className="ml-2 font-medium">{submission.data.kodeSIPO || '-'}</span></div>
                    <div><span className="text-gray-500">NPWP:</span> <span className="ml-2 font-medium">{submission.data.npwpPerusahaan || '-'}</span></div>
                    <div><span className="text-gray-500">Nama LJK:</span> <span className="ml-2 font-medium">{submission.data.namaLJK || '-'}</span></div>
                    <div><span className="text-gray-500">Email Pelaksana:</span> <span className="ml-2 font-medium">{submission.data.emailPelaksana || '-'}</span></div>
                  </div>
                </div>
              )}

              {submission.app === 'apolo' && submission.data && !submission.isARO && !hasAro && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-600" />
                    Data Pengajuan APOLO (Tanpa ARO)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Nomor Surat:</span> <span className="ml-2 font-medium">{submission.data.nomorSurat || '-'}</span></div>
                    <div><span className="text-gray-500">Tanggal Surat:</span> <span className="ml-2 font-medium">{submission.data.tanggalSurat ? formatDateOnly(submission.data.tanggalSurat) : '-'}</span></div>
                    <div className="md:col-span-2"><span className="text-gray-500">Perihal:</span> <span className="ml-2 font-medium">{submission.data.perihal || '-'}</span></div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Data ARO Terpisah */}
          {submission.isARO && (
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" />
                Data Permohonan ARO (Terpisah)
              </h4>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-500 mb-2">Keterangan ARO:</p>
                  <p className="text-gray-900 font-medium">{submission.aroKeterangan || '-'}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-500 mb-2">Surat Permohonan:</p>
                  {submission.aroSuratPermohonan ? (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-900">{submission.aroSuratPermohonan.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(submission.aroSuratPermohonan.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500">Tidak ada file</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Log Aktivitas */}
          {submission.log && submission.log.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                <Bell className="w-4 h-4 text-red-600" />
                Log Aktivitas
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {submission.log.map((log, idx) => (
                  <div key={idx} className="text-xs border-l-2 border-red-200 pl-2 py-1">
                    <p className="font-medium text-gray-900">{log.action}</p>
                    <p className="text-gray-600">{log.description}</p>
                    <p className="text-gray-400 mt-0.5">{formatDate(log.timestamp)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Konfirmasi */}
          {submission.forum && submission.forum.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                Konfirmasi
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {submission.forum.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        msg.sender === 'admin'
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-xs">
                        <span className="font-bold">
                          {msg.sender === 'admin' ? 'Admin' : msg.senderName || 'Pemohon'}
                        </span>
                        <span className={msg.sender === 'admin' ? 'text-red-200' : 'text-gray-500'}>
                          • {formatDate(msg.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approval Notes */}
          {submission.approvalNote && (
            <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Catatan Persetujuan
              </h4>
              <p className="text-sm text-gray-700">{submission.approvalNote}</p>
            </div>
          )}

          {submission.rejectionNote && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <XCircle className="w-4 h-4 text-red-600" />
                Alasan Penolakan
              </h4>
              <p className="text-sm text-gray-700">{submission.rejectionNote}</p>
            </div>
          )}
        </div>

        {/* Footer dengan Tombol Aksi - Fixed di Bawah */}
        <div className="p-6 border-t border-red-200 bg-gradient-to-r from-red-50 to-white flex-shrink-0">
          <div className="flex flex-wrap items-center justify-end gap-3">
            {/* Tombol Konfirmasi */}
            <button
              onClick={onOpenForum}
              className={`px-4 py-2.5 border rounded-lg flex items-center gap-2 relative ${
                unreadUserMessages > 0
                  ? 'border-blue-300 bg-blue-50 text-blue-600 font-bold'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Mail className="w-4 h-4" />
              Konfirmasi
              {unreadUserMessages > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                  {unreadUserMessages}
                </span>
              )}
            </button>

            {/* Tombol Download Dokumen */}
            <button
              onClick={handleDownload}
              disabled={documentLoading}
              className="px-4 py-2.5 border border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 flex items-center gap-2"
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
            
            {/* Tombol Setujui dan Tolak - Hanya tampil jika status pending */}
            {submission.status === 'pending' && submission.app !== 'ereporting' && (
              <>
                <button
                  onClick={handleApproveClick}
                  className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Setujui 
                </button>
                
                <button
                  onClick={handleRejectClick}
                  className="px-6 py-2.5 border border-red-300 text-red-600 font-bold rounded-lg hover:bg-red-50 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Tolak
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Setujui */}
      {showApproveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-green-200 bg-gradient-to-r from-green-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Setujui Pengajuan</h3>
                  <p className="text-gray-600">
                    {hasAro ? 'APOLO beserta ARO akan disetujui' : 'Konfirmasi persetujuan'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan Persetujuan (Opsional)
                </label>
                <textarea
                  value={approveNote}
                  onChange={(e) => setApproveNote(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="3"
                  placeholder="Tambahkan catatan atau instruksi..."
                />
              </div>
              
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 mb-6">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Perhatian:</span> {hasAro 
                    ? 'Pengajuan APOLO beserta ARO-nya akan disetujui. Pastikan semua data sudah valid.' 
                    : 'Pengajuan ini akan disetujui.'}
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowApproveConfirm(false);
                    setApproveNote('');
                  }}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={confirmApprove}
                  className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700"
                >
                  Ya
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Tolak */}
      {showRejectConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-red-200 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Tolak Pengajuan</h3>
                  <p className="text-gray-600">
                    {hasAro ? 'APOLO beserta ARO akan ditolak' : 'Konfirmasi penolakan'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alasan Penolakan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="3"
                  placeholder="Jelaskan alasan penolakan..."
                  required
                />
              </div>
              
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 mb-6">
                <p className="text-sm text-red-700">
                  <span className="font-medium">Perhatian:</span> {hasAro 
                    ? 'Pengajuan APOLO beserta ARO-nya akan ditolak. Pastikan alasan penolakan jelas.' 
                    : 'Pengajuan ini akan ditolak.'}
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectConfirm(false);
                    setRejectNote('');
                  }}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={confirmReject}
                  disabled={!rejectNote.trim()}
                  className={`px-6 py-2.5 font-bold rounded-lg ${
                    !rejectNote.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                  }`}
                >
                  Ya, Tolak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// KOMPONEN FORUM MODAL UNTUK ADMIN
const ForumModal = ({ submission, onClose, onSendMessage, message, setMessage, formatDate }) => {
  const handleSend = () => {
    onSendMessage();
  };

  // Tandai pesan user sebagai sudah dibaca saat modal dibuka
  React.useEffect(() => {
    const markMessagesAsRead = () => {
      const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
      let updated = false;
      
      const updatedSubs = storedSubs.map(sub => {
        if (sub.id === submission.id && sub.forum) {
          const hasUnread = sub.forum.some(m => m.sender === 'user' && !m.read);
          if (hasUnread) {
            updated = true;
            return {
              ...sub,
              forum: sub.forum.map(m => ({
                ...m,
                read: m.sender === 'user' ? true : m.read
              }))
            };
          }
        }
        return sub;
      });
      
      if (updated) {
        localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubs));
      }
    };
    
    markMessagesAsRead();
  }, [submission.id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-red-200 bg-gradient-to-r from-red-50 to-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Konfirmasi</h3>
                <p className="text-sm text-gray-600">
                  ID: {submission.trackingId} • {submission.app?.toUpperCase()}
                  {submission.isARO && <span className="ml-2 text-purple-600">(ARO)</span>}
                  {submission.aroData && !submission.isARO && <span className="ml-2 text-purple-600">(dengan ARO)</span>}
                </p>
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
        
        {/* Daftar Pesan - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {(!submission.forum || submission.forum.length === 0) ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Belum ada pesan dalam Konfirmasi</p>
              <p className="text-sm text-gray-400 mt-2">Kirim pesan pertama untuk berkomunikasi dengan pemohon</p>
            </div>
          ) : (
            submission.forum.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${
                    msg.sender === 'admin'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 text-xs">
                    <span className="font-bold">
                      {msg.sender === 'admin' ? 'Admin' : msg.senderName || 'Pemohon'}
                    </span>
                    <span className={msg.sender === 'admin' ? 'text-red-200' : 'text-gray-500'}>
                      • {formatDate(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Input Pesan */}
        <div className="p-6 border-t border-red-200 bg-gray-50 flex-shrink-0">
          <div className="flex gap-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan untuk pemohon..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows="2"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`px-6 py-3 font-bold rounded-lg flex items-center gap-2 ${
                message.trim()
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              Kirim
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Pesan akan terlihat oleh pemohon di halaman Status & Monitoring mereka
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;