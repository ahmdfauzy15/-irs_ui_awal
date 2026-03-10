// Profile.jsx - Page Profile Sederhana dengan Hak Akses (MODIFIKASI APOLO)
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Shield,
  Key,
  FileText,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  History,
  ChevronRight,
  ChevronDown,
  Cpu,
  HardDrive,
  Database,
  FileSpreadsheet,
  Plus,
  Trash2,
  Edit,
  X,
  Search,
  Layers,
  ChevronLeft,
  UploadCloud,
  FileCheck,
  KeyIcon,
  Lock,
  FolderOpen,
  FilePlus,
  Info,
  ArrowRight,
  ChevronUp,
  Download,
  ExternalLink,
  Send,
  Package, // <-- TAMBAHKAN INI
  FolderTree // <-- TAMBAHKAN INI
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Tentukan tab aktif berdasarkan URL
  const getActiveTabFromURL = () => {
    const path = location.pathname;
    if (path === '/profile' || path === '/profile/hak-akses/pengajuan') return 'pengajuan';
    if (path === '/profile/hak-akses' || path === '/profile/hak-akses/status') return 'status';
    return 'pengajuan';
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromURL());
  const [submissions, setSubmissions] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForumModal, setShowForumModal] = useState(false);
  const [selectedForumSubmission, setSelectedForumSubmission] = useState(null);
  const [forumMessage, setForumMessage] = useState('');
  const [showAddAROModal, setShowAddAROModal] = useState(false);
  const [aroKeterangan, setAroKeterangan] = useState('');
  const [aroSuratPermohonan, setAroSuratPermohonan] = useState(null);
  const [aroModalStep, setAroModalStep] = useState(1);

  useEffect(() => {
    setActiveTab(getActiveTabFromURL());
  }, [location.pathname]);

  useEffect(() => {
    const loadData = () => {
      const storedSubs = localStorage.getItem('hakAksesSubmissions');
      if (storedSubs) setSubmissions(JSON.parse(storedSubs));
      
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
    
    loadData();
  }, []);

  // FUNGSI TANDAI PESAN SUDAH DIBACA
  useEffect(() => {
    if (activeTab === 'status') {
      const markMessagesAsRead = () => {
        const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
        let updated = false;
        
        const updatedSubs = storedSubs.map(sub => {
          if (sub.forum) {
            const hasUnread = sub.forum.some(m => m.sender === 'admin' && !m.read);
            if (hasUnread) {
              updated = true;
              return {
                ...sub,
                forum: sub.forum.map(m => ({
                  ...m,
                  read: m.sender === 'admin' ? true : m.read
                }))
              };
            }
          }
          return sub;
        });
        
        if (updated) {
          localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubs));
          setSubmissions(updatedSubs);
        }
      };
      
      markMessagesAsRead();
    }
  }, [activeTab, submissions]);

  // FUNGSI KIRIM PESAN FORUM
  const handleSendForumMessage = () => {
    if (!forumMessage.trim() || !selectedForumSubmission) return;
    
    const userName = userProfile?.nama || 'Pemohon';
    
    const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    const updatedSubs = storedSubs.map(sub => {
      if (sub.id === selectedForumSubmission.id) {
        const forum = sub.forum || [];
        
        return {
          ...sub,
          forum: [...forum, {
            id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            sender: 'user',
            senderName: userName,
            message: forumMessage,
            timestamp: new Date().toISOString(),
            read: false
          }]
        };
      }
      return sub;
    });
    
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubs));
    setSubmissions(updatedSubs);
    setForumMessage('');
    
    const updated = updatedSubs.find(s => s.id === selectedForumSubmission.id);
    setSelectedForumSubmission(updated);
  };

  // FUNGSI TAMBAH ARO - Membuat submission baru dengan ID tracking baru
  const handleAddARO = () => {
    if (!aroKeterangan) {
      alert('Harap isi keterangan penambahan ARO!');
      return false;
    }

    if (!aroSuratPermohonan) {
      alert('Harap upload surat permohonan!');
      return false;
    }

    // Cek apakah ada APOLO yang sudah disetujui
    const approvedApolo = submissions.find(sub => sub.app === 'apolo' && sub.status === 'approved' && !sub.isARO);
    
    if (!approvedApolo) {
      alert('Harap ajukan APOLO terlebih dahulu dan tunggu persetujuan sebelum menambah ARO!');
      return false;
    }

    // Generate ID tracking baru untuk ARO
    const newTrackingId = `IRS-ARO-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    // Buat submission ARO baru (bukan ARO di dalam submission APOLO)
    const newAROSubmission = {
      id: `aro-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      app: 'apolo',
      isARO: true,
      aroKeterangan: aroKeterangan,
      aroSuratPermohonan: aroSuratPermohonan,
      dataUmum: approvedApolo.dataUmum,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      timestamp: new Date().toISOString(),
      trackingId: newTrackingId,
      parentApoloId: approvedApolo.id,
      log: [{
        timestamp: new Date().toISOString(),
        action: 'ARO Diajukan',
        description: 'Permohonan ARO baru',
        status: 'pending'
      }]
    };

    const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    const updatedSubmissions = [...storedSubs, newAROSubmission];
    
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubmissions));
    setSubmissions(updatedSubmissions);
    
    // Reset state
    setAroKeterangan('');
    setAroSuratPermohonan(null);
    setAroModalStep(1);
    setShowAddAROModal(false);
    
    alert('✅ Permohonan ARO berhasil diajukan! ID Tracking: ' + newTrackingId);
    return true;
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Menunggu</span>;
      case 'approved':
        return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Disetujui</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full flex items-center gap-1"><XCircle className="w-3 h-3" /> Ditolak</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-full">Unknown</span>;
    }
  };

  // MODIFIKASI getAppBadge untuk menangani APOLO dengan ARO
  const getAppBadge = (app, isARO = false, hasAro = false) => {
    const appNames = {
      'sipina': 'SIPINA',
      'apolo': 'APOLO',
      'ereporting': 'E-Reporting'
    };
    
    if (isARO) {
      return (
        <span className="px-3 py-1 bg-purple-100 text-red-800 text-xs font-bold rounded-full border border-purple-200 flex items-center gap-1">
          <Layers className="w-3 h-3" />
          ARO
        </span>
      );
    }
    
    if (app === 'apolo' && hasAro) {
      return (
        <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-purple-600 text-white text-xs font-bold rounded-full border border-purple-300 flex items-center gap-1">
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
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'pengajuan', label: 'Pengajuan Hak Akses', icon: FileSpreadsheet, path: '/profile/hak-akses/pengajuan' },
    { id: 'status', label: 'Status & Monitoring', icon: Eye, path: '/profile/hak-akses/status' }
  ];

  const handleTabClick = (tabId, tabPath) => {
    setActiveTab(tabId);
    navigate(tabPath);
  };

  // Fungsi untuk mengecek apakah APOLO sudah disetujui
  const isApoloApproved = () => {
    return submissions.some(sub => sub.app === 'apolo' && sub.status === 'approved' && !sub.isARO);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Management Account IRS</h1>
                <p className="text-red-600 text-sm md:text-base font-medium">Sistem pengelolaan hak akses</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Hak Akses Aplikasi</h3>
            <div className="flex flex-wrap gap-2">
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
        </div>

        <div className="bg-white rounded-2xl border border-red-200 shadow-lg overflow-hidden">
          {activeTab === 'pengajuan' && (
            <NewAccessSubmissionFlow 
              userProfile={userProfile}
              submissions={submissions}
              setSubmissions={setSubmissions}
              onOpenAddARO={() => setShowAddAROModal(true)}
              isApoloApproved={isApoloApproved()}
              getAppBadge={getAppBadge} // <-- TAMBAHKAN INI
            />
          )}
          
          {activeTab === 'status' && (
            <StatusMonitoringTab 
              submissions={submissions}
              getStatusBadge={getStatusBadge}
              getAppBadge={getAppBadge}
              formatDate={formatDate}
              userProfile={userProfile}
              onOpenForum={(submission) => {
                setSelectedForumSubmission(submission);
                setShowForumModal(true);
              }}
            />
          )}
        </div>
      </div>

      {/* MODAL FORUM UNTUK USER */}
      {showForumModal && selectedForumSubmission && (
        <ForumModal
          submission={selectedForumSubmission}
          userProfile={userProfile}
          onClose={() => {
            setShowForumModal(false);
            setSelectedForumSubmission(null);
            setForumMessage('');
          }}
          onSendMessage={handleSendForumMessage}
          message={forumMessage}
          setMessage={setForumMessage}
          formatDate={formatDate}
        />
      )}

      {/* MODAL TAMBAH ARO */}
      {showAddAROModal && (
        <AddAROModal
          onClose={() => {
            setShowAddAROModal(false);
            setAroKeterangan('');
            setAroSuratPermohonan(null);
            setAroModalStep(1);
          }}
          onSubmit={handleAddARO}
          aroKeterangan={aroKeterangan}
          setAroKeterangan={setAroKeterangan}
          aroSuratPermohonan={aroSuratPermohonan}
          setAroSuratPermohonan={setAroSuratPermohonan}
          step={aroModalStep}
          setStep={setAroModalStep}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

// MODAL TAMBAH ARO - MODIFIKASI UNTUK SUBMISSION BARU
const AddAROModal = ({ onClose, onSubmit, aroKeterangan, setAroKeterangan, aroSuratPermohonan, setAroSuratPermohonan, step, setStep }) => {
  const handleNextStep = () => {
    if (!aroKeterangan) {
      alert('Harap isi keterangan penambahan ARO!');
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSuratUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        setAroSuratPermohonan({
          name: file.name,
          size: file.size,
          type: file.type
        });
      } else {
        alert('Ukuran file maksimal 5MB');
      }
    } else if (file) {
      alert('Harap unggah file PDF');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-red-200 bg-gradient-to-r from-red-50 to-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Tambah ARO Baru</h3>
              <p className="text-gray-600 mt-1">
                {step === 1 ? 'Isi keterangan permohonan' : 'Upload surat permohonan'}
              </p>
              <p className="text-xs text-red-600 mt-2">
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-red-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 ? (
            <div className="space-y-4">
             
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keterangan Permohonan ARO <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={aroKeterangan}
                  onChange={(e) => setAroKeterangan(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows="6"
                  placeholder="Contoh: Membutuhkan akses modul Strategi Anti Fraud untuk keperluan pelaporan..."
                  required
                />
                {!aroKeterangan && (
                  <p className="text-xs text-red-600 mt-2">Keterangan wajib diisi</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-700 flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-medium">Perhatian:</span> Upload surat permohonan resmi dengan format PDF (maks. 5MB).
                  </span>
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surat Permohonan ARO <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  aroSuratPermohonan ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50 hover:border-red-400 hover:bg-red-100'
                }`}>
                  <input
                    type="file"
                    id="aroSurat"
                    accept=".pdf"
                    onChange={handleSuratUpload}
                    className="hidden"
                  />
                  <label htmlFor="aroSurat" className="cursor-pointer block">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      aroSuratPermohonan ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {aroSuratPermohonan ? (
                        <FileCheck className="w-10 h-10 text-green-600" />
                      ) : (
                        <UploadCloud className="w-10 h-10 text-red-600" />
                      )}
                    </div>
                    
                    {aroSuratPermohonan ? (
                      <div className="space-y-2">
                        <p className="text-gray-700 font-medium flex items-center justify-center gap-2">
                          <FileText className="w-4 h-4" />
                          {aroSuratPermohonan.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(aroSuratPermohonan.size / 1024).toFixed(2)} KB
                        </p>
                        <p className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          File berhasil diunggah
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700 font-medium mb-2">
                          Klik untuk upload atau drag & drop
                        </p>
                        <p className="text-sm text-gray-500">Format: PDF (maks. 5MB)</p>
                        <p className="text-xs text-red-500 mt-4">*Wajib diunggah</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
              
              {aroKeterangan && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-500" />
                    Ringkasan Permohonan:
                  </p>
                  <p className="text-sm text-gray-600 bg-white p-3 rounded border border-gray-200">
                    "{aroKeterangan}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-red-200 bg-red-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 font-medium">
              {step === 1 ? 'Langkah 1 dari 2' : 'Langkah 2 dari 2'}
            </p>
            <div className="flex gap-3">
              {step === 1 ? (
                <>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!aroKeterangan}
                    className={`
                      px-6 py-2 font-medium rounded-lg transition-all duration-200
                      ${!aroKeterangan
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg'
                      }
                    `}
                  >
                    Lanjut
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => {
                      if (onSubmit()) {
                        // Reset form setelah submit sukses
                        onClose();
                      }
                    }}
                    disabled={!aroSuratPermohonan}
                    className={`
                      px-6 py-2 font-medium rounded-lg transition-all duration-200
                      ${!aroSuratPermohonan
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg'
                      }
                    `}
                  >
                    Ajukan ARO
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// KOMPONEN FORUM MODAL UNTUK USER
const ForumModal = ({ submission, userProfile, onClose, onSendMessage, message, setMessage, formatDate }) => {
  const handleSend = () => {
    onSendMessage();
  };

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
                <h3 className="text-xl font-bold text-gray-900">Forum Diskusi</h3>
                <p className="text-sm text-gray-600">
                  ID: {submission.trackingId} • {submission.app?.toUpperCase()}
                  {submission.isARO && <span className="ml-2 text-red-600">(ARO)</span>}
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
        
        {/* Daftar Pesan */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {(!submission.forum || submission.forum.length === 0) ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Belum ada pesan dalam forum diskusi</p>
              <p className="text-sm text-gray-400 mt-2">Kirim pesan pertama untuk berkomunikasi dengan admin</p>
            </div>
          ) : (
            submission.forum.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 text-xs">
                    <span className="font-bold">
                      {msg.sender === 'user' ? (userProfile?.nama || 'Anda') : 'Admin'}
                    </span>
                    <span className={msg.sender === 'user' ? 'text-red-200' : 'text-gray-500'}>
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
              placeholder="Tulis pesan untuk admin..."
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
            Pesan akan terlihat oleh admin di halaman detail pengajuan
          </p>
        </div>
      </div>
    </div>
  );
};

// KOMPONEN UTAMA: Alur Pengajuan Hak Akses (MODIFIKASI)
const NewAccessSubmissionFlow = ({ userProfile, submissions, setSubmissions, onOpenAddARO, isApoloApproved, getAppBadge }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Halaman utama, 2: Data Umum, 3: Pilih Aplikasi, 4: Form Spesifik
  const [dataUmum, setDataUmum] = useState(null);
  const [selectedApps, setSelectedApps] = useState([]);
  const [activeAppForm, setActiveAppForm] = useState(null);
  const [formData, setFormData] = useState({
    sipina: {},
    apolo: {},
    ereporting: {}
  });
  const [savedSubmissions, setSavedSubmissions] = useState([]);
  
  // State untuk ARO (tidak digunakan lagi, tapi tetap untuk backward compatibility)
  const [aroData, setAroData] = useState({
    keterangan: '',
    suratPermohonan: null
  });
  const [showAroForm, setShowAroForm] = useState(false);

  const [submittedApps, setSubmittedApps] = useState([]);

  // Load data submitted apps
  useEffect(() => {
    const loadSubmittedData = () => {
      const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
      const apps = [];
      
      storedSubs.forEach(sub => {
        if (!sub.isARO) {
          apps.push(sub.app);
        }
      });
      
      setSubmittedApps(apps);
    };
    
    loadSubmittedData();
  }, []);

  // Load data resubmit dari state navigasi
  useEffect(() => {
    if (location.state?.resubmitData) {
      const resubmitData = location.state.resubmitData;
      const app = location.state.app;
      
      setDataUmum(resubmitData.dataUmum);
      setSelectedApps([app]);
      
      const formDataToLoad = resubmitData.data || {};
      
      setFormData(prev => ({
        ...prev,
        [app]: formDataToLoad
      }));
      
      const newSubmission = {
        id: Date.now(),
        app: app,
        data: formDataToLoad,
        status: 'draft',
        timestamp: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingId: `IRS-${Date.now().toString().slice(-8)}-RESUBMIT`,
        isResubmit: true,
        originalSubmissionId: resubmitData.id
      };
      
      setSavedSubmissions([newSubmission]);
      setStep(3);
      
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const handleStartNewSubmission = () => {
    if (!userProfile) return;
    
    setDataUmum({
      nama: userProfile.nama,
      email: userProfile.email,
      telepon: userProfile.telepon,
      institusi: userProfile.institusi
    });
    
    setStep(2);
  };

  const handleFinishStep2 = () => {
    setStep(3);
  };

  const handleSelectApp = (app) => {
    if (submittedApps.includes(app)) {
      alert(`Aplikasi ${app.toUpperCase()} sudah pernah diajukan sebelumnya!`);
      return;
    }
    
    if (!selectedApps.includes(app)) {
      setSelectedApps([...selectedApps, app]);
    }
  };

  const handleRemoveApp = (app) => {
    setSelectedApps(selectedApps.filter(a => a !== app));
    
    setFormData(prev => ({
      ...prev,
      [app.toLowerCase()]: {}
    }));
    
    const newSavedSubmissions = savedSubmissions.filter(s => s.app !== app);
    setSavedSubmissions(newSavedSubmissions);
    
    // Reset ARO data jika app yang dihapus adalah APOLO
    if (app === 'apolo') {
      setAroData({ keterangan: '', suratPermohonan: null });
      setShowAroForm(false);
    }
  };

  const handleOpenAppForm = (app) => {
    const existingSubmission = savedSubmissions.find(s => s.app === app);
    
    if (existingSubmission) {
      setFormData(prev => ({
        ...prev,
        [app]: existingSubmission.data
      }));
    }
    
    setActiveAppForm(app);
    
    // Jika app adalah APOLO, tampilkan form ARO (untuk pengajuan pertama kali)
    if (app === 'apolo') {
      setShowAroForm(true);
    } else {
      setShowAroForm(false);
    }
    
    setStep(4);
  };

  const handleSaveAppForm = (app, data) => {
    const completeData = {
      ...data,
      dataUmum: dataUmum
    };
    
    setFormData(prev => ({
      ...prev,
      [app]: completeData
    }));

    const existingIndex = savedSubmissions.findIndex(s => s.app === app);
    
    let newSubmission;
    if (existingIndex >= 0) {
      newSubmission = {
        ...savedSubmissions[existingIndex],
        data: completeData,
        updatedAt: new Date().toISOString()
      };
      
      const updatedSubmissions = [...savedSubmissions];
      updatedSubmissions[existingIndex] = newSubmission;
      setSavedSubmissions(updatedSubmissions);
    } else {
      // Generate ID tracking baru untuk pengajuan aplikasi
      const newTrackingId = `IRS-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      
      newSubmission = {
        id: Date.now(),
        app,
        data: completeData,
        status: 'draft',
        timestamp: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingId: newTrackingId
      };
      
      setSavedSubmissions([...savedSubmissions, newSubmission]);
    }
    
    setActiveAppForm(null);
    setShowAroForm(false);
    setStep(3);
  };

  // Handle simpan ARO untuk APOLO (pengajuan pertama)
  const handleSaveAro = () => {
    if (!aroData.keterangan) {
      alert('Harap isi keterangan ARO!');
      return false;
    }
    
    if (!aroData.suratPermohonan) {
      alert('Harap upload surat permohonan ARO!');
      return false;
    }
    
    return true;
  };

  // Handle submit semua pengajuan
  const handleSubmitAll = () => {
    if (savedSubmissions.length === 0) {
      alert('Tidak ada pengajuan yang siap dikirim!');
      return;
    }

    // Validasi khusus untuk APOLO: pastikan ARO sudah diisi (untuk pengajuan pertama)
    const apoloSubmission = savedSubmissions.find(s => s.app === 'apolo');
    if (apoloSubmission && (!aroData.keterangan || !aroData.suratPermohonan)) {
      alert('Untuk pengajuan APOLO, Anda harus mengisi data ARO terlebih dahulu!');
      const apoloIndex = savedSubmissions.findIndex(s => s.app === 'apolo');
      if (apoloIndex >= 0) {
        handleOpenAppForm('apolo');
      }
      return;
    }

    const allSubmissions = savedSubmissions.map(sub => {
      // Auto-approve untuk E-Reporting
      let status = 'pending';
      let approvedBy = null;
      let approvedAt = null;
      
      if (sub.app === 'ereporting') {
        status = 'approved';
        approvedBy = 'System Auto-Approval';
        approvedAt = new Date().toISOString();
      }
      
      // Buat log
      const logAction = sub.isResubmit ? 'Diajukan Ulang' : 'Diajukan';
      const logDescription = sub.isResubmit ? 'Pengajuan ulang setelah ditolak' : 'Pengajuan hak akses baru dibuat';
      
      const logEntries = [{
        timestamp: new Date().toISOString(),
        action: logAction,
        description: logDescription,
        status: status,
        details: status === 'approved' ? 'Pengajuan E-Reporting otomatis disetujui' : 'Menunggu persetujuan admin'
      }];
      
      // Untuk APOLO, simpan data ARO sebagai bagian dari submission (pengajuan pertama)
      let aroDataToSave = null;
      if (sub.app === 'apolo') {
        aroDataToSave = {
          keterangan: aroData.keterangan,
          suratPermohonan: aroData.suratPermohonan
        };
      }
      
      const submissionData = {
        ...sub,
        dataUmum,
        aroData: aroDataToSave, // Simpan data ARO untuk pengajuan pertama
        status: status,
        approvedBy: approvedBy,
        approvedAt: approvedAt,
        submittedAt: new Date().toISOString(),
        log: logEntries
      };
      
      return submissionData;
    });

    const existingSubmissions = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    let updatedSubmissions;
    
    if (savedSubmissions.some(s => s.isResubmit)) {
      const filteredSubmissions = existingSubmissions.filter(sub => 
        !savedSubmissions.some(s => 
          s.isResubmit && s.originalSubmissionId === sub.id
        )
      );
      updatedSubmissions = [...allSubmissions, ...filteredSubmissions];
    } else {
      updatedSubmissions = [...allSubmissions, ...existingSubmissions];
    }
    
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubmissions));
    setSubmissions(updatedSubmissions);

    setStep(1);
    setSelectedApps([]);
    setSavedSubmissions([]);
    setFormData({
      sipina: {},
      apolo: {},
      ereporting: {}
    });
    setAroData({ keterangan: '', suratPermohonan: null });
    
    const hasEreporting = allSubmissions.some(s => s.app === 'ereporting');
    alert(hasEreporting 
      ? '✅ Pengajuan E-Reporting berhasil dan otomatis disetujui! Pengajuan lain menunggu persetujuan admin.' 
      : '✅ Pengajuan berhasil dikirim! Menunggu persetujuan admin.');
  };

  const handleBackToMain = () => {
    setStep(1);
    setSelectedApps([]);
    setSavedSubmissions([]);
    setFormData({
      sipina: {},
      apolo: {},
      ereporting: {}
    });
    setAroData({ keterangan: '', suratPermohonan: null });
    setShowAroForm(false);
  };

  if (step === 1) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pengajuan Hak Akses Aplikasi</h2>
          <p className="text-gray-600">Ajukan hak akses untuk aplikasi SIPINA, APOLO, atau E-Reporting</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <button
            onClick={handleStartNewSubmission}
            disabled={submittedApps.length >= 3}
            className={`
              w-full md:w-1/2 p-8 border-2 rounded-xl text-center transition-all duration-300
              ${submittedApps.length >= 3 
                ? 'border-gray-300 bg-gray-100 cursor-not-allowed' 
                : 'border-dashed border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400'
              }
            `}
          >
            <div className="flex flex-col items-center justify-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                submittedApps.length >= 3 ? 'bg-gray-300' : 'bg-gradient-to-r from-red-500 to-red-600'
              }`}>
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tambah Pengajuan</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ajukan hak akses untuk aplikasi baru
              </p>
              {submittedApps.length >= 3 && (
                <p className="text-xs text-red-600 font-medium">
                  Semua aplikasi sudah diajukan
                </p>
              )}
            </div>
          </button>

          <button
            onClick={onOpenAddARO}
            disabled={!isApoloApproved}
            className={`
              w-full md:w-1/2 p-8 border-2 rounded-xl text-center transition-all duration-300
              ${!isApoloApproved
                ? 'border-gray-300 bg-gray-100 cursor-not-allowed' 
                : 'border-dashed border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400'
              }
            `}
          >
            <div className="flex flex-col items-center justify-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                !isApoloApproved ? 'bg-gray-300' : 'bg-gradient-to-r from-red-500 to-red-600'
              }`}>
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tambah ARO</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ajukan permohonan ARO lainya
              </p>
              {!isApoloApproved && (
                <p className="text-xs text-yellow-600 font-medium">
                  Harus memiliki hak akses APOLO
                </p>
              )}
            </div>
          </button>
        </div>

        {submittedApps.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Aplikasi yang Sudah Diajukan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {submittedApps.map((app, index) => {
                let appInfo;
                switch(app) {
                  case 'sipina':
                    appInfo = { label: 'SIPINA', color: 'from-red-500 to-red-600' };
                    break;
                  case 'apolo':
                    appInfo = { label: 'APOLO', color: 'from-red-500 to-red-600' };
                    break;
                  case 'ereporting':
                    appInfo = { label: 'E-Reporting', color: 'from-red-500 to-red-600' };
                    break;
                  default:
                    appInfo = { label: app.toUpperCase(), color: 'from-red-500 to-red-600' };
                }
                
                const appSubmission = submissions.find(sub => sub.app === app && !sub.isARO);
                const hasAro = appSubmission?.aroData && app === 'apolo';
                
                return (
                  <div key={index} className="border border-red-200 rounded-xl p-6 bg-white hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${hasAro ? 'from-red-600 to-purple-600' : appInfo.color} flex items-center justify-center`}>
                        {hasAro ? <Package className="w-6 h-6 text-white" /> : <Database className="w-6 h-6 text-white" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{appInfo.label}</h4>
                        <p className="text-sm text-gray-600">Submitted</p>
                        {hasAro && (
                          <p className="text-xs text-red-600 font-medium mt-1"></p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${
                          appSubmission?.status === 'approved' ? 'text-green-600' :
                          appSubmission?.status === 'pending' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`}>
                          {appSubmission?.status === 'approved' ? 'Disetujui' :
                           appSubmission?.status === 'pending' ? 'Menunggu' :
                           'Draft'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ID:</span>
                        <span className="font-mono text-gray-900 text-xs">
                          {appSubmission?.trackingId}
                        </span>
                      </div>
                    </div>

                    {/* Tampilkan detail ARO untuk APOLO dengan ARO */}
                    {/* {hasAro && appSubmission.aroData && (
                      <div className="mt-4 pt-4 border-t border-purple-200 bg-purple-50 -mx-6 px-6 pb-2 rounded-b-xl">
                        <p className="text-xs font-bold text-red-800 mb-2 flex items-center gap-1">
                          <Package className="w-3 h-3" />
                          Informasi Menyertai:
                        </p>
                        <div className="text-xs space-y-2">
                          <div className="bg-white p-2 rounded border border-purple-200">
                            <p className="text-gray-700 line-clamp-2">
                              {appSubmission.aroData.keterangan}
                            </p>
                            {appSubmission.aroData.suratPermohonan && (
                              <p className="text-ed-600 mt-1 flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {appSubmission.aroData.suratPermohonan.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )} */}

                    {/* Tampilkan daftar ARO yang sudah diajukan (sebagai submission terpisah) */}
                    {app === 'apolo' && appSubmission?.status === 'approved' && !hasAro && (
                      <div className="mt-4 pt-4 border-t border-red-100">
                        <p className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-1">
                          <Info className="w-3 h-3 text-red-500" />
                          Daftar ARO yang Diajukan (Terpisah):
                        </p>
                        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                          {submissions
                            .filter(sub => sub.app === 'apolo' && sub.isARO)
                            .map((aro, idx) => (
                              <div key={idx} className={`p-2 rounded border ${
                                aro.status === 'approved' ? 'bg-green-50 border-green-200' :
                                aro.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                                'bg-red-50 border-red-200'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="text-xs font-medium text-gray-800">
                                        ARO #{idx + 1}
                                      </p>
                                      <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                                        aro.status === 'approved' ? 'bg-green-100 text-green-800' :
                                        aro.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {aro.status === 'approved' ? '✓ Disetujui' : 
                                         aro.status === 'pending' ? '⏳ Menunggu' : 
                                         '✗ Ditolak'}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">
                                      ID: {aro.trackingId}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                      "{aro.aroKeterangan?.substring(0, 50)}..."
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          {submissions.filter(sub => sub.app === 'apolo' && sub.isARO).length === 0 && (
                            <p className="text-xs text-gray-500 italic">Belum ada ARO diajukan</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (step === 2) {
    return (
      <DataUmumStep 
        dataUmum={dataUmum}
        onFinish={handleFinishStep2}
        onBack={handleBackToMain}
      />
    );
  }

  if (step === 3) {
    return (
      <PilihAplikasiStep
        selectedApps={selectedApps}
        savedSubmissions={savedSubmissions}
        submittedApps={submittedApps}
        onSelectApp={handleSelectApp}
        onRemoveApp={handleRemoveApp}
        onOpenAppForm={handleOpenAppForm}
        onSubmitAll={handleSubmitAll}
        onBack={handleBackToMain}
      />
    );
  }

  // Di dalam NewAccessSubmissionFlow, pada bagian step === 4
  if (step === 4 && activeAppForm) {
    const formProps = {
      dataUmum,
      initialData: formData[activeAppForm] || {},
      onSave: (data) => handleSaveAppForm(activeAppForm, data),
      onCancel: () => {
        setActiveAppForm(null);
        setShowAroForm(false);
        setStep(3);
      }
    };

    if (activeAppForm === 'apolo') {
      return (
        <div className="p-6">
          <ApoloFormWithAro 
            {...formProps}
            aroData={aroData}
            setAroData={setAroData}
          />
        </div>
      );
    }

    switch(activeAppForm) {
      case 'sipina':
        return <SipinaForm {...formProps} />;
      case 'ereporting':
        return <EReportingForm {...formProps} />;
      default:
        return null;
    }
  }

  return null;
};

// STEP 2: DATA UMUM
const DataUmumStep = ({ dataUmum, onFinish, onBack }) => {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={onBack}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Umum Pemohon</h2>
            <p className="text-gray-600">Data berikut diambil dari sistem Pelaporan.id</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Nama Pengguna</label>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={dataUmum?.nama || ''}
                  readOnly
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={dataUmum?.email || ''}
                  readOnly
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Nomor Telepon</label>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={dataUmum?.telepon || ''}
                  readOnly
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Instansi</label>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={dataUmum?.institusi || ''}
                  readOnly
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
          >
            Kembali
          </button>
          <button
            onClick={onFinish}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700"
          >
            Lanjutkan ke Pemilihan Aplikasi
          </button>
        </div>
      </div>
    </div>
  );
};

// STEP 3: PILIH APLIKASI
const PilihAplikasiStep = ({ 
  selectedApps, 
  savedSubmissions, 
  submittedApps,
  onSelectApp, 
  onRemoveApp, 
  onOpenAppForm, 
  onSubmitAll, 
  onBack 
}) => {
  const apps = [
    { id: 'sipina', label: 'SIPINA', description: 'Form Aktivasi User SIPINA', color: 'from-red-500 to-red-600' },
    { id: 'apolo', label: 'APOLO', description: 'Form Pengajuan Hak Akses APOLO', color: 'from-red-500 to-red-600' },
    { id: 'ereporting', label: 'E-Reporting', description: 'Form Pengajuan Hak Akses E-Reporting', color: 'from-red-500 to-red-600' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Pilih Aplikasi yang Diajukan</h2>
          <p className="text-sm text-gray-600">Pilih aplikasi yang ingin Anda ajukan. Setiap aplikasi hanya dapat diajukan satu kali.</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {apps.map(app => {
            const isSubmitted = submittedApps.includes(app.id);
            const isSelected = selectedApps.includes(app.id);
            
            return (
              <button
                key={app.id}
                onClick={() => onSelectApp(app.id)}
                disabled={isSubmitted || isSelected}
                className={`
                  relative p-6 border-2 rounded-xl text-left transition-all duration-200
                  ${isSubmitted
                    ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    : isSelected
                    ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                    : 'border-dashed border-red-300 hover:border-red-400 hover:bg-red-25'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${app.color} flex items-center justify-center`}>
                    {isSubmitted ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900">{app.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{app.description}</p>
                {isSubmitted && (
                  <p className="text-xs text-red-600 mt-2">Sudah diajukan</p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedApps.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Aplikasi yang Dipilih</h3>
          <div className="space-y-4">
            {selectedApps.map(appId => {
              const app = apps.find(a => a.id === appId);
              const savedSubmission = savedSubmissions.find(s => s.app === appId);
              
              return (
                <div key={appId} className="border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${app.color} flex items-center justify-center`}>
                        <Database className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{app.label}</h4>
                        <p className="text-sm text-gray-600">{app.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!savedSubmission ? (
                        <button
                          onClick={() => onOpenAppForm(appId)}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700"
                        >
                          Isi Form
                        </button>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          Form sudah diisi
                        </span>
                      )}
                      <button
                        onClick={() => onRemoveApp(appId)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {savedSubmission && (
                    <div className="border-t border-red-100 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Status: <span className="font-medium text-yellow-600">Draft</span></p>
                          <p className="text-xs text-gray-500">ID: {savedSubmission.trackingId}</p>
                        </div>
                        <button
                          onClick={() => onOpenAppForm(appId)}
                          className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Edit Form
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-6 border-t border-red-200">
        <div>
          <p className="text-sm text-gray-600">
            {selectedApps.length} aplikasi dipilih • {savedSubmissions.length} form sudah diisi
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
          >
            Kembali
          </button>
          
          {savedSubmissions.length === selectedApps.length && selectedApps.length > 0 ? (
            <button
              onClick={onSubmitAll}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700"
            >
              Submit Semua Pengajuan
            </button>
          ) : (
            <button
              disabled
              className="px-8 py-3 bg-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed"
            >
              Isi semua form terlebih dahulu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// FORM APOLO DENGAN ARO (UNTUK PENGAJUAN PERTAMA)
const ApoloFormWithAro = ({ dataUmum, initialData, onSave, onCancel, aroData, setAroData }) => {
  const [formData, setFormData] = useState({
    nomorSurat: initialData.nomorSurat || '',
    tanggalSurat: initialData.tanggalSurat || '',
    perihal: initialData.perihal || '',
  });
  const [step, setStep] = useState(1); // 1: Form APOLO, 2: Form ARO

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setAroData(prev => ({
        ...prev,
        suratPermohonan: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      }));
    } else {
      alert('Harap unggah file PDF');
    }
  };

  const handleNextStep = () => {
    // Validasi APOLO
    if (!formData.nomorSurat || !formData.tanggalSurat || !formData.perihal) {
      alert('Semua field APOLO wajib diisi!');
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi ARO
    if (!aroData.keterangan) {
      alert('Harap isi keterangan ARO!');
      return;
    }
    
    if (!aroData.suratPermohonan) {
      alert('Harap unggah surat permohonan ARO!');
      return;
    }
    
    onSave(formData);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Form Pengajuan APOLO</h2>
          <p className="text-sm text-gray-600 mt-1">
            {step === 1 ? 'Langkah 1: Isi data APOLO' : 'Langkah 2: Isi data ARO'}
          </p>
        </div>
        <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center">
          <div className={`flex items-center ${step >= 1 ? 'text-red-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>1</div>
            <span className="ml-2 font-medium">Informasi APOLO</span>
          </div>
          <div className={`w-12 h-0.5 mx-2 ${step >= 2 ? 'bg-red-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-red-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>2</div>
            <span className="ml-2 font-medium">Informasi ARO</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 ? (
          // STEP 1: FORM APOLO
          <div className="border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-red-100">
              Data Pengajuan APOLO
            </h3>
            
            <div className="space-y-6">
              {/* Nomor Surat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Surat <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nomorSurat}
                  onChange={(e) => setFormData({...formData, nomorSurat: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Masukkan nomor surat permohonan"
                  required
                />
              </div>
              
              {/* Tanggal Surat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Surat <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.tanggalSurat}
                  onChange={(e) => setFormData({...formData, tanggalSurat: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              
              {/* Perihal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Perihal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.perihal}
                  onChange={(e) => setFormData({...formData, perihal: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Masukkan perihal surat"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 flex items-center gap-2"
              >
                Lanjut ke Data ARO
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          // STEP 2: FORM ARO
          <div className="border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-red-100">
              Informasi ARO 
            </h3>
            
            <div className="space-y-6">
              {/* Keterangan ARO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keterangan ARO <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={aroData.keterangan}
                  onChange={(e) => setAroData(prev => ({...prev, keterangan: e.target.value}))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  rows="4"
                  placeholder="Jelaskan tujuan dan kebutuhan ARO ini..."
                  required
                />
              </div>

              {/* Upload Surat ARO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Surat Permohonan ARO <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-xl p-6 text-center ${
                  aroData.suratPermohonan ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                }`}>
                  <input
                    type="file"
                    id="aroSurat"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    required
                  />
                  <label htmlFor="aroSurat" className="cursor-pointer">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                      aroData.suratPermohonan ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {aroData.suratPermohonan ? (
                        <FileCheck className="w-8 h-8 text-green-600" />
                      ) : (
                        <UploadCloud className="w-8 h-8 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      {aroData.suratPermohonan
                        ? aroData.suratPermohonan.name
                        : 'Klik untuk upload surat ARO'
                      }
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Format: PDF (maks. 5MB)</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Ringkasan Data APOLO */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Ringkasan Data APOLO:</p>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Nomor Surat:</span> {formData.nomorSurat}</p>
                <p><span className="text-gray-500">Tanggal Surat:</span> {formData.tanggalSurat}</p>
                <p><span className="text-gray-500">Perihal:</span> {formData.perihal}</p>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Kembali
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Submit APOLO & ARO (ID Tracking baru)
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// Form SIPINA (TIDAK BERUBAH)
const SipinaForm = ({ dataUmum, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    kodeSIPO: initialData.kodeSIPO || '',
    namaLJK: initialData.namaLJK || '',
    namaSebutanLJK: initialData.namaSebutanLJK || '',
    sektor: initialData.sektor || '',
    subSektor: initialData.subSektor || '',
    tipePelapor: 'CRS',
    gin: initialData.gin || '',
    npwpPerusahaan: initialData.npwpPerusahaan || '',
    npwpValidated: initialData.npwpValidated || false,
    namaRO: initialData.namaRO || dataUmum?.nama || '',
    emailRO: initialData.emailRO || dataUmum?.email || '',
    jabatanRO: initialData.jabatanRO || '',
    teleponRO: initialData.teleponRO || dataUmum?.telepon || '',
    alamatRO: initialData.alamatRO || '',
    namaPelaksana: initialData.namaPelaksana || '',
    emailPelaksana: initialData.emailPelaksana || '',
    jabatanPelaksana: initialData.jabatanPelaksana || '',
    teleponPelaksana: initialData.teleponPelaksana || '',
    alamatPelaksana: initialData.alamatPelaksana || '',
    passwordTransferFile: initialData.passwordTransferFile || '',
    suratPermohonan: initialData.suratPermohonan || null
  });

  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const [isValidatingNPWP, setIsValidatingNPWP] = useState(false);

  // Auto-set tipePelapor ke CRS
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      tipePelapor: 'CRS'
    }));
  }, []);

  // Pre-fill data jika ada initialData dari resubmit
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi wajib
    if (!formData.suratPermohonan) {
      alert('Harap unggah surat permohonan!');
      return;
    }
    
    if (!formData.passwordTransferFile) {
      alert('Harap isi Password Transfer File!');
      return;
    }
    
    if (!formData.npwpValidated) {
      alert('Harap validasi NPWP terlebih dahulu!');
      return;
    }
    
    // Simpan data
    const completeData = {
      ...formData,
      dataUmum: dataUmum,
      tanggalRegistrasi: new Date().toISOString().split('T')[0],
      tanggalAktivasi: new Date().toISOString().split('T')[0]
    };
    
    onSave(completeData);
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        [type]: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      }));
    } else {
      alert('Harap unggah file PDF');
    }
  };

  const validateNPWP = () => {
    if (!formData.npwpPerusahaan) {
      alert('Harap masukkan NPWP terlebih dahulu');
      return;
    }
    
    // Simulasi validasi NPWP
    setIsValidatingNPWP(true);
    setTimeout(() => {
      // Simulasi validasi berhasil jika NPWP mengandung angka
      const isValid = /^\d+$/.test(formData.npwpPerusahaan.replace(/\D/g, ''));
      
      if (isValid) {
        setFormData(prev => ({
          ...prev,
          npwpValidated: true
        }));
        setShowValidationSuccess(true);
        
        // Simulasi auto-load data perusahaan
        const simulatedData = {
          '1123133': {
            namaLJK: 'PT. Contoh Lembaga Jasa Keuangan',
            namaSebutanLJK: 'Contoh LJK',
            sektor: 'Perbankan',
            subSektor: 'Bank Umum',
            alamatRO: 'Jl. Contoh No. 123, Jakarta',
            alamatPelaksana: 'Jl. Contoh No. 123, Jakarta'
          }
        };
        
        const data = simulatedData[formData.npwpPerusahaan];
        if (data) {
          setFormData(prev => ({
            ...prev,
            namaLJK: data.namaLJK,
            namaSebutanLJK: data.namaSebutanLJK,
            sektor: data.sektor,
            subSektor: data.subSektor,
            alamatRO: data.alamatRO,
            alamatPelaksana: data.alamatPelaksana
          }));
        }
      } else {
        alert('NPWP tidak valid. Harap periksa kembali.');
      }
      
      setIsValidatingNPWP(false);
    }, 1500);
  };

  return (
    <div className="p-6">
      {/* Header dengan informasi umum */}
      <div className="mb-8 bg-gradient-to-r from-red-50 to-white border-l-4 border-red-500 p-6 rounded-r-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Pendaftaran SiPINA</h2>
            <p className="text-gray-600">Form aktivasi user SIPINA berdasarkan data dari SIPO</p>
            <p className="text-sm text-gray-500 mt-1">ID Tracking baru akan dibuat setelah submit</p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Nama Pemohon</p>
            <p className="font-medium text-gray-900">{dataUmum?.nama}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="font-medium text-gray-900">{dataUmum?.email}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Instansi</p>
            <p className="font-medium text-gray-900">{dataUmum?.institusi}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">No. Telepon</p>
            <p className="font-medium text-gray-900">{dataUmum?.telepon}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Detail LJK */}
        <div className="border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-red-100 flex items-center gap-2">
            <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
            Detail LJK
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kode SIPO */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kode SIPO <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.kodeSIPO}
                onChange={(e) => setFormData({...formData, kodeSIPO: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
                placeholder="Masukkan kode SIPO"
              />
            </div>
            
            {/* Nama LJK (SIPO) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama LJK (SIPO)
              </label>
              <input
                type="text"
                value={formData.namaLJK}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-1">Otomatis terisi setelah validasi NPWP</p>
            </div>
            
            {/* Nama Sebutan LJK */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Sebutan LJK <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.namaSebutanLJK}
                onChange={(e) => setFormData({...formData, namaSebutanLJK: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            {/* Sektor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sektor <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sektor}
                onChange={(e) => setFormData({...formData, sektor: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Pilih Sektor</option>
                <option value="Perbankan">Perbankan</option>
                <option value="Asuransi">Asuransi</option>
                <option value="Fintech">Fintech</option>
                <option value="Dana Pensiun">Dana Pensiun</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            
            {/* Sub Sektor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub Sektor <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.subSektor}
                onChange={(e) => setFormData({...formData, subSektor: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Pilih Sub Sektor</option>
                <option value="Bank Umum">Bank Umum</option>
                <option value="Bank Syariah">Bank Syariah</option>
                <option value="BPR">BPR</option>
                <option value="Asuransi Jiwa">Asuransi Jiwa</option>
                <option value="Asuransi Umum">Asuransi Umum</option>
                <option value="Reasuransi">Reasuransi</option>
              </select>
            </div>
            
            {/* Tipe Pelapor (Read-only, selalu CRS) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Pelapor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value="CRS"
                readOnly
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 font-medium"
              />
              <p className="text-xs text-gray-500 mt-1">Modul CRS</p>
            </div>
            
            {/* GIN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GIN (jika diperlukan)
              </label>
              <input
                type="text"
                value={formData.gin}
                onChange={(e) => setFormData({...formData, gin: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Opsional"
              />
            </div>
            
            {/* NPWP Perusahaan dengan Validasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NPWP Perusahaan <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.npwpPerusahaan}
                  onChange={(e) => {
                    setFormData({
                      ...formData, 
                      npwpPerusahaan: e.target.value,
                      npwpValidated: false
                    });
                    setShowValidationSuccess(false);
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Masukkan NPWP Perusahaan"
                  required
                />
                <button
                  type="button"
                  onClick={validateNPWP}
                  disabled={isValidatingNPWP || !formData.npwpPerusahaan}
                  className={`px-4 py-2.5 font-medium rounded-lg flex items-center gap-2 ${
                    formData.npwpValidated
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  } ${isValidatingNPWP ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isValidatingNPWP ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Validasi...
                    </>
                  ) : formData.npwpValidated ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Valid ✓
                    </>
                  ) : (
                    'Validate'
                  )}
                </button>
              </div>
              {showValidationSuccess && (
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  NPWP valid. Data perusahaan telah otomatis terisi.
                </p>
              )}
              {!formData.npwpValidated && formData.npwpPerusahaan && (
                <p className="text-xs text-red-600 mt-2">
                  * Harap klik tombol Validate untuk memverifikasi NPWP
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 2. Penanggung Jawab (RO) */}
        <div className="border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-red-100 flex items-center gap-2">
            <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
            Penanggung Jawab (RO)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.namaRO}
                onChange={(e) => setFormData({...formData, namaRO: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Korporasi <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.emailRO}
                onChange={(e) => setFormData({...formData, emailRO: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jabatan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.jabatanRO}
                onChange={(e) => setFormData({...formData, jabatanRO: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.teleponRO}
                onChange={(e) => setFormData({...formData, teleponRO: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.alamatRO}
                onChange={(e) => setFormData({...formData, alamatRO: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="3"
                required
              />
            </div>
          </div>
        </div>

        {/* 3. Pelaksana */}
        <div className="border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-red-100 flex items-center gap-2">
            <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
            Pelaksana
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.namaPelaksana}
                onChange={(e) => setFormData({...formData, namaPelaksana: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Korporasi (Username) <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.emailPelaksana}
                onChange={(e) => setFormData({...formData, emailPelaksana: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
                placeholder="Email ini akan digunakan sebagai username login"
              />
              <p className="text-xs text-gray-500 mt-1">Email ini akan digunakan sebagai akun login sistem setelah aktivasi</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jabatan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.jabatanPelaksana}
                onChange={(e) => setFormData({...formData, jabatanPelaksana: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.teleponPelaksana}
                onChange={(e) => setFormData({...formData, teleponPelaksana: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.alamatPelaksana}
                onChange={(e) => setFormData({...formData, alamatPelaksana: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="3"
                required
              />
            </div>
          </div>
        </div>

        {/* 4. Password Transfer File */}
        <div className="border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-red-100 flex items-center gap-2">
            <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
            Password Transfer File
          </h3>
          
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Transfer File <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.passwordTransferFile}
                onChange={(e) => setFormData({...formData, passwordTransferFile: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                required
                placeholder="Masukkan password untuk ekstrak file .7z"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <KeyIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Password ini digunakan sistem untuk mengekstrak file .7z pada proses pelaporan dengan metode Upload ZIP
            </p>
            {!formData.passwordTransferFile && (
              <p className="text-xs text-red-600 mt-2">
                * Field ini bersifat mandatory dan tidak boleh kosong
              </p>
            )}
          </div>
        </div>

        {/* 5. Upload Surat Permohonan */}
        <div className="border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-red-100 flex items-center gap-2">
            <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">5</span>
            Upload Surat Permohonan Pendaftaran
          </h3>
          
          <div className="max-w-lg">
            <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              formData.suratPermohonan 
                ? 'border-green-300 bg-green-50' 
                : 'border-red-300 bg-red-50 hover:border-red-400 hover:bg-red-100'
            }`}>
              <input
                type="file"
                id="sipinaSurat"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, 'suratPermohonan')}
                className="hidden"
                required
              />
              <label htmlFor="sipinaSurat" className="cursor-pointer">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  formData.suratPermohonan ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {formData.suratPermohonan ? (
                    <FileCheck className="w-8 h-8 text-green-600" />
                  ) : (
                    <UploadCloud className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <p className="text-gray-700 font-medium mb-2">
                  {formData.suratPermohonan
                    ? `✓ File: ${formData.suratPermohonan.name}`
                    : 'Upload Surat Permohonan Pendaftaran'
                  }
                </p>
                <p className="text-sm text-gray-500 mb-1">Format: PDF (maks. 5MB)</p>
                <p className="text-xs text-red-500 mt-2">*Wajib diunggah</p>
                {formData.suratPermohonan && (
                  <p className="text-xs text-green-600 mt-2">File berhasil diunggah ✓</p>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 flex items-center gap-2"
            disabled={!formData.npwpValidated || !formData.passwordTransferFile || !formData.suratPermohonan}
          >
            <Lock className="w-5 h-5" />
            Register (ID Tracking baru)
          </button>
        </div>
      </form>
    </div>
  );
};

// FORM E-REPORTING - DENGAN AUTO-FILL UNTUK SIPO DAN NON-SIPO
const EReportingForm = ({ dataUmum, initialData, onSave, onCancel }) => {
  const [step, setStep] = useState(1); // 1: Pilih metode, 2: Input data, 3: Validasi jenis usaha, 4: Selesai
  const [metodePendaftaran, setMetodePendaftaran] = useState(null);
  const [formData, setFormData] = useState({
    npwp: initialData.npwp || '',
    namaPerusahaan: initialData.namaPerusahaan || '',
    alamat: initialData.alamat || '',
    jenisUsaha: initialData.jenisUsaha || '',
    userIdSIPO: initialData.userIdSIPO || '',
    passwordSIPO: initialData.passwordSIPO || '',
    sipoValidated: initialData.sipoValidated || false,
    dataSIPO: initialData.dataSIPO || null,
    email: initialData.email || dataUmum?.email || '',
    jenisUsahaValidated: initialData.jenisUsahaValidated || false
  });

  const [isValidatingSIPO, setIsValidatingSIPO] = useState(false);
  const [sipoValidationMessage, setSipoValidationMessage] = useState('');
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isDataFromNPWP, setIsDataFromNPWP] = useState(false);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
      if (initialData.metode) {
        setMetodePendaftaran(initialData.metode);
      }
    }
  }, [initialData]);

  // Auto-load data perusahaan berdasarkan NPWP (nama & alamat tidak bisa diedit, jenis usaha bisa diedit)
  useEffect(() => {
    if (formData.npwp && formData.npwp.length >= 5) {
      const generateDataFromNPWP = (npwp) => {
        const hash = npwp.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        const namaPerusahaanOptions = [
          `PT. Bank ${npwp.substring(0, 4)} Indonesia Tbk`,
          `PT. Asuransi ${npwp.substring(0, 4)} Sejahtera`,
          `PT. Sekuritas ${npwp.substring(0, 4)} Mandiri`,
          `PT. Fintech ${npwp.substring(0, 4)} Nusantara`,
          `PT. Dana Pensiun ${npwp.substring(0, 4)}`
        ];
        
        const alamatOptions = [
          `Gedung ${npwp.substring(0, 4)} Tower, Jl. Sudirman No. ${hash % 100}, Jakarta Pusat`,
          `Plaza ${npwp.substring(0, 4)}, Jl. Thamrin Kav. ${hash % 50}, Jakarta Pusat`,
          `Wisma ${npwp.substring(0, 4)}, Jl. Gatot Subroto No. ${hash % 200}, Jakarta Selatan`
        ];
        
        const namaIndex = hash % namaPerusahaanOptions.length;
        const alamatIndex = (hash + 1) % alamatOptions.length;
        
        return {
          namaPerusahaan: namaPerusahaanOptions[namaIndex],
          alamat: alamatOptions[alamatIndex]
        };
      };
      
      const generatedData = generateDataFromNPWP(formData.npwp);
      
      setFormData(prev => ({
        ...prev,
        namaPerusahaan: generatedData.namaPerusahaan,
        alamat: generatedData.alamat
        // jenisUsaha TIDAK diisi otomatis - bisa diedit oleh user
      }));
      
      setIsDataFromNPWP(true);
    } else {
      setIsDataFromNPWP(false);
    }
  }, [formData.npwp]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePilihMetode = (metode) => {
    setMetodePendaftaran(metode);
    setFormData(prev => ({
      ...prev,
      sipoValidated: false,
      dataSIPO: null
    }));
  };

  const handleStep1Submit = () => {
    if (!formData.npwp || !formData.namaPerusahaan || !formData.alamat || !formData.jenisUsaha) {
      alert('Semua field wajib diisi!');
      return;
    }
    
    if (metodePendaftaran === 'sipo') {
      setStep(2); // Langsung ke validasi SIPO
    } else {
      // Non-SIPO: langsung ke input email
      setStep(3);
    }
  };

  const handleValidateSIPO = () => {
    if (!formData.userIdSIPO || !formData.passwordSIPO) {
      setSipoValidationMessage('User ID dan Password SIPO harus diisi!');
      return;
    }
    
    setIsValidatingSIPO(true);
    setSipoValidationMessage('');
    
    setTimeout(() => {
      if (formData.userIdSIPO && formData.passwordSIPO) {
        const dataSIPO = {
          namaPerusahaan: formData.namaPerusahaan,
          npwp: formData.npwp,
          alamat: formData.alamat,
          userIdSIPO: formData.userIdSIPO,
          timestamp: new Date().toISOString()
        };
        
        setFormData(prev => ({ 
          ...prev, 
          sipoValidated: true,
          dataSIPO: dataSIPO
        }));
        setSipoValidationMessage('Validasi SIPO berhasil. Data perusahaan telah diverifikasi.');
      } else {
        setSipoValidationMessage('Validasi gagal. Periksa kembali User ID dan Password.');
      }
      setIsValidatingSIPO(false);
    }, 1500);
  };

  const handleStep2Submit = () => {
    if (!formData.sipoValidated) {
      alert('Harap validasi User ID dan Password SIPO terlebih dahulu!');
      return;
    }
    setStep(3); // Lanjut ke input email
  };

  const handleStep3Submit = () => {
    if (!formData.email) {
      setEmailValidationMessage('Email harus diisi!');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setEmailValidationMessage('Format email tidak valid!');
      return;
    }
    
    setEmailValidationMessage('');
    setStep(4); // Lanjut ke validasi jenis usaha
  };

  // STEP 4: Validasi Jenis Usaha (tidak bisa diedit lagi)
  const handleValidateJenisUsaha = () => {
    setFormData(prev => ({
      ...prev,
      jenisUsahaValidated: true
    }));
    setStep(5); // Lanjut ke halaman sukses
  };

  const handleFinalRegistration = () => {
    const completeData = {
      ...formData,
      metode: metodePendaftaran,
      dataUmum: dataUmum,
      registrationDate: new Date().toISOString(),
      activationEmailSent: true
    };
    
    onSave(completeData);
    setRegistrationSuccess(true);
    
    // Tampilkan pesan sukses selama 5 detik sebelum kembali
    setTimeout(() => {
      onCancel();
    }, 5000);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  const renderStep1 = () => (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
          Pilih Metode & Input Data Perusahaan
        </h3>
      </div>
      
      <div className="space-y-6">
        {!metodePendaftaran ? (
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-gray-900">Pilih Metode Pendaftaran:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handlePilihMetode('sipo')}
                className="p-6 border-2 border-red-400 rounded-xl text-left hover:border-red-600 hover:bg-red-50 transition-all shadow"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Menggunakan SIPO</h4>
                <p className="text-sm text-gray-600">
                  Input NPWP, lalu lakukan validasi dengan User ID dan Password SIPO.
                </p>
              </button>
              
              <button
                onClick={() => handlePilihMetode('non-sipo')}
                className="p-6 border-2 border-red-400 rounded-xl text-left hover:border-red-600 hover:bg-red-50 transition-all shadow"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Non-SIPO</h4>
                <p className="text-sm text-gray-600">
                  Input NPWP, konfirmasi data, lalu lanjut ke input email.
                </p>
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg shadow">
            <p className="text-sm text-red-700">
              Metode pendaftaran: <span className="font-bold">{metodePendaftaran === 'sipo' ? 'Menggunakan SIPO' : 'Non-SIPO'}</span>
            </p>
          </div>
        )}
        
        {metodePendaftaran && (
          <div className="space-y-4 border border-red-300 rounded-xl p-6 bg-white shadow">
            <h4 className="font-bold text-gray-900 mb-2">Data Perusahaan</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NPWP Perusahaan <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.npwp}
                onChange={(e) => setFormData({...formData, npwp: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Masukkan NPWP"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Perusahaan <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.namaPerusahaan}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
              {isDataFromNPWP && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Data otomatis dari NPWP (tidak dapat diedit)
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat <span className="text-red-600">*</span>
              </label>
              <textarea
                value={formData.alamat}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                rows="3"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Usaha <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.jenisUsaha}
                onChange={(e) => setFormData({...formData, jenisUsaha: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Pilih Jenis Usaha</option>
                <option value="Perusahaan Asuransi Umum">Perusahaan Asuransi Umum</option>
                <option value="Perusahaan Asuransi Jiwa">Perusahaan Asuransi Jiwa</option>
                <option value="Perusahaan Reasuransi">Perusahaan Reasuransi</option>
                <option value="Perbankan">Perbankan</option>
                <option value="Fintech">Fintech</option>
                <option value="Dana Pensiun">Dana Pensiun</option>
              </select>
            
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleStep1Submit}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-900 shadow-md"
              >
                {metodePendaftaran === 'sipo' ? 'Lanjut ke Validasi SIPO' : 'Lanjut ke Input Email'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setStep(1)}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
          Validasi User SIPO
        </h3>
      </div>
      
      <div className="space-y-6 border border-red-300 rounded-xl p-6 bg-white shadow">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            Masukkan User ID dan Password SIPO yang valid untuk memverifikasi data perusahaan.
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User ID SIPO <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={formData.userIdSIPO}
            onChange={(e) => {
              setFormData({...formData, userIdSIPO: e.target.value, sipoValidated: false});
              setSipoValidationMessage('');
            }}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password SIPO <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="password"
              value={formData.passwordSIPO}
              onChange={(e) => {
                setFormData({...formData, passwordSIPO: e.target.value, sipoValidated: false});
                setSipoValidationMessage('');
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 pr-12"
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Lock className="w-5 h-5 text-red-500" />
            </div>
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleValidateSIPO}
          disabled={isValidatingSIPO || !formData.userIdSIPO || !formData.passwordSIPO}
          className={`w-full py-3 font-bold rounded-lg ${
            formData.sipoValidated
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-600 text-white hover:bg-red-700'
          } ${isValidatingSIPO || !formData.userIdSIPO || !formData.passwordSIPO ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isValidatingSIPO ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Memvalidasi...
            </div>
          ) : formData.sipoValidated ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Tervalidasi
            </div>
          ) : (
            'Validasi SIPO'
          )}
        </button>
        
        {sipoValidationMessage && (
          <div className={`p-3 rounded-lg ${formData.sipoValidated ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`text-sm ${formData.sipoValidated ? 'text-green-700' : 'text-red-700'} flex items-center gap-2`}>
              {formData.sipoValidated ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {sipoValidationMessage}
            </p>
          </div>
        )}
        
        {formData.sipoValidated && formData.dataSIPO && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h5 className="font-bold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Hasil Validasi SIPO:
            </h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Nama Perusahaan:</span>
                <span className="font-medium text-gray-900">{formData.dataSIPO.namaPerusahaan}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">NPWP:</span>
                <span className="font-medium text-gray-900">{formData.dataSIPO.npwp}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Alamat:</span>
                <span className="font-medium text-gray-900">{formData.dataSIPO.alamat}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleStep2Submit}
            disabled={!formData.sipoValidated}
            className={`w-full py-3 font-bold rounded-lg ${
              formData.sipoValidated
                ? 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Lanjut ke Input Email
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setStep(metodePendaftaran === 'sipo' ? 2 : 1)}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
            {metodePendaftaran === 'sipo' ? '3' : '2'}
          </span>
          Input Email (User ID Aplikasi)
        </h3>
      </div>
      
      <div className="space-y-6 border border-red-300 rounded-xl p-6 bg-white shadow">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            Email ini akan digunakan sebagai identitas login utama aplikasi.
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alamat Email <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({...formData, email: e.target.value});
                setEmailValidationMessage('');
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 pr-12"
              placeholder="contoh@perusahaan.co.id"
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Mail className="w-5 h-5 text-red-500" />
            </div>
          </div>
          {formData.email && validateEmail(formData.email) && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Format email valid
            </p>
          )}
        </div>
        
        {emailValidationMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {emailValidationMessage}
            </p>
          </div>
        )}
        
        <div className="pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleStep3Submit}
            disabled={!formData.email || !validateEmail(formData.email)}
            className={`w-full py-3 font-bold rounded-lg ${
              formData.email && validateEmail(formData.email)
                ? 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:from-red-700 hover:to-red-900 shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Lanjut ke Validasi Jenis Usaha
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setStep(3)}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
            {metodePendaftaran === 'sipo' ? '4' : '3'}
          </span>
          Validasi Jenis Usaha
        </h3>
      </div>
      
      <div className="space-y-6 border border-red-300 rounded-xl p-6 bg-white shadow">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Tahap Validasi Jenis Usaha
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Pada tahap ini, jenis usaha tidak dapat diubah lagi. Pastikan data sudah benar sebelum melanjutkan.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h4 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Data Perusahaan (Final)</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">NPWP Perusahaan</p>
                <p className="font-medium text-gray-900 bg-white p-2 rounded border border-gray-200">{formData.npwp}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email (User ID)</p>
                <p className="font-medium text-gray-900 bg-white p-2 rounded border border-gray-200">{formData.email}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">Nama Perusahaan</p>
              <p className="font-medium text-gray-900 bg-white p-2 rounded border border-gray-200">{formData.namaPerusahaan}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">Alamat</p>
              <p className="font-medium text-gray-900 bg-white p-2 rounded border border-gray-200">{formData.alamat}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">Jenis Usaha</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="font-bold text-red-800 text-center">{formData.jenisUsaha}</p>
                <p className="text-xs text-red-600 mt-1 text-center">(Tidak dapat diubah pada tahap ini)</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleValidateJenisUsaha}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-900 shadow-md flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Konfirmasi & Selesai
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center justify-center gap-2">
          <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
            ✓
          </span>
          Pendaftaran Berhasil
        </h3>
      </div>
      
      <div className="space-y-8 border-2 border-green-300 rounded-xl p-8 bg-gradient-to-b from-green-50 to-white shadow-lg">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-200">
            <CheckCircle className="w-14 h-14 text-green-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-gray-900">Pendaftaran Berhasil!</h4>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-lg text-red-700 font-medium mb-2">
              Email aktivasi telah dikirim ke:
            </p>
            <p className="text-xl font-bold text-red-800 bg-white p-3 rounded border border-red-200">
              {formData.email}
            </p>
          </div>
          <p className="text-gray-600">
            Silakan periksa kotak masuk email Anda untuk melakukan aktivasi akun.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Jika tidak menerima email, periksa folder spam atau klik tombol di bawah untuk mengirim ulang.
          </p>
        </div>
        
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => {
              alert('Email aktivasi telah dikirim ulang ke: ' + formData.email);
            }}
            className="flex-1 px-6 py-3 border border-red-300 text-red-700 font-medium rounded-lg hover:bg-red-50 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Kirim Ulang Email
          </button>
          <button
            type="button"
            onClick={handleFinalRegistration}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-900 shadow-md flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Selesai
          </button>
        </div>
      </div>
      
      {registrationSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 border-2 border-red-300 shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Registrasi Berhasil!</h3>
              <p className="text-gray-600 mb-4">
                Data pendaftaran E-Reporting telah disimpan.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-700">
                  Email aktivasi dikirim ke: <strong>{formData.email}</strong>
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Mengalihkan kembali ke halaman utama...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8 bg-gradient-to-r from-red-50 to-white border-l-4 border-red-700 p-6 rounded-r-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Pendaftaran E-Reporting</h2>
            <p className="text-gray-600">Form registrasi</p>
          </div>
          <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {renderStep()}
    </div>
  );
};

// TAB STATUS & MONITORING - MODIFIKASI UNTUK MENAMPILKAN ARO PADA PENGAJUAN APOLO PERTAMA
const StatusMonitoringTab = ({ submissions, getStatusBadge, getAppBadge, formatDate, userProfile, onOpenForum }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('monitoring');
  const [expandedCard, setExpandedCard] = useState(null);
  
  const submittedSubmissions = submissions.filter(s => s.status !== 'draft');
  
  const handleResubmit = (submission) => {
    navigate('/profile/hak-akses/pengajuan', { 
      state: { 
        resubmitData: submission,
        app: submission.app 
      }
    });
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getUnreadAdminMessages = (submission) => {
    if (!submission.forum) return 0;
    return submission.forum.filter(m => m.sender === 'admin' && !m.read).length;
  };

  // Cek apakah submission APOLO memiliki ARO (pengajuan pertama)
  const hasAro = (submission) => {
    return submission.app === 'apolo' && submission.aroData && !submission.isARO;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Eye className="w-5 h-5 text-red-600" />
          Status & Monitoring Pengajuan
        </h2>
      </div>

      <div className="flex border-b border-red-200 mb-6">
        <button
          onClick={() => setActiveSection('monitoring')}
          className={`px-4 py-2 font-bold text-sm border-b-2 ${
            activeSection === 'monitoring' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500'
          }`}
        >
          Monitoring Status
        </button>
        <button
          onClick={() => setActiveSection('log')}
          className={`px-4 py-2 font-bold text-sm border-b-2 ${
            activeSection === 'log' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500'
          }`}
        >
          Log Aktivitas
        </button>
      </div>

      {activeSection === 'monitoring' ? (
        submittedSubmissions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada pengajuan</h3>
            <p className="text-gray-600">Belum ada pengajuan hak akses yang dikirim</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submittedSubmissions.map((submission) => {
              const unreadMessages = getUnreadAdminMessages(submission);
              const isApoloWithAro = hasAro(submission);
              
              return (
                <div key={submission.id} className="bg-white border border-red-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Header Card - Always Visible */}
                  <div className={`p-6 bg-gradient-to-r ${
                    isApoloWithAro 
                      ? 'from-red-50 to-purple-50 border-b border-purple-200' 
                      : 'from-red-50 to-white border-b border-red-100'
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-bold text-gray-900 text-lg">{submission.trackingId}</span>
                          {getStatusBadge(submission.status)}
                          
                      
                          
                         
                          {unreadMessages > 0 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {unreadMessages} Pesan
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">{formatDate(submission.submittedAt || submission.timestamp)}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">{submission.dataUmum?.nama}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getAppBadge(submission.app, submission.isARO, isApoloWithAro)}
                        <button
                          onClick={() => onOpenForum(submission)}
                          className={`p-2 rounded-lg transition-colors relative ${
                            unreadMessages > 0 
                              ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                              : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                          title="Forum Diskusi"
                        >
                          <Mail className="w-4 h-4" />
                          {unreadMessages > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                              {unreadMessages}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Info Ringkas */}
                  <div className="px-6 py-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Aplikasi</p>
                        <p className="font-medium text-gray-900">
                          {submission.app?.toUpperCase()}
                          {submission.isARO && <span className="ml-1 text-red-600">(ARO)</span>}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Pemohon</p>
                        <p className="font-medium text-gray-900">{submission.dataUmum?.nama}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Instansi</p>
                        <p className="font-medium text-gray-900 truncate">{submission.dataUmum?.institusi}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        {submission.approvedBy ? (
                          <p className="font-medium text-green-600 text-sm">Disetujui oleh: {submission.approvedBy}</p>
                        ) : submission.rejectedBy ? (
                          <p className="font-medium text-red-600 text-sm">Ditolak oleh: {submission.rejectedBy}</p>
                        ) : (
                          <p className="font-medium text-yellow-600 text-sm">Menunggu Admin</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tampilkan detail ARO untuk APOLO dengan ARO (pengajuan pertama) */}
                  {isApoloWithAro && submission.aroData && (
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-white border-t border-purple-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <Package className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-red-800 mb-2 flex items-center gap-1">
                            Informasi ARO
                          </p>
                          <div className="bg-white p-4 rounded-lg border border-purple-200 shadow-sm">
                            <div className="mb-3">
                              <p className="text-xs text-gray-500 mb-1">Keterangan ARO:</p>
                              <p className="text-sm text-gray-800 font-medium bg-purple-50 p-2 rounded">
                                {submission.aroData.keterangan}
                              </p>
                            </div>
                            {submission.aroData.suratPermohonan && (
                              <div className="flex items-center gap-2 text-sm">
                                <FileText className="w-4 h-4 text-red-600" />
                                <span className="text-gray-700">{submission.aroData.suratPermohonan.name}</span>
                                <span className="text-xs text-gray-500">
                                  ({(submission.aroData.suratPermohonan.size / 1024).toFixed(2)} KB)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Tampilkan detail ARO jika ini adalah submission ARO terpisah */}
                  {submission.isARO && (
                    <div className="px-6 py-4 bg-purple-50 border-t border-purple-200">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Layers className="w-3 h-3 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-red-800 mb-2">Informasi ARO:</p>
                          <div className="bg-white p-3 rounded border border-purple-200">
                            <p className="text-sm text-gray-700 mb-2">{submission.aroKeterangan}</p>
                            {submission.aroSuratPermohonan && (
                              <p className="text-xs text-red-600 flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {submission.aroSuratPermohonan.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Tampilkan pesan admin terakhir */}
                  {submission.forum && submission.forum.filter(m => m.sender === 'admin').length > 0 && (
                    <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Mail className="w-3 h-3 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-red-800 mb-1">Pesan dari Admin:</p>
                          {submission.forum
                            .filter(m => m.sender === 'admin')
                            .slice(-1)
                            .map((msg, idx) => (
                              <div key={idx} className="bg-white p-2 rounded border border-blue-200">
                                <p className="text-sm text-gray-700">{msg.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{formatDate(msg.timestamp)}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Footer Actions untuk yang ditolak */}
                  {submission.status === 'rejected' && (
                    <div className="px-6 py-4 bg-red-50 border-t border-red-200">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-red-600">
                          {isApoloWithAro 
                            ? 'Pengajuan APOLO & ARO ditolak. Silakan perbaiki data.' 
                            : 'Pengajuan ditolak. Silakan perbaiki data.'}
                        </p>
                        <button
                          onClick={() => handleResubmit(submission)}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-lg hover:from-red-600 hover:to-red-700"
                        >
                          Perbarui & Ajukan Kembali
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="space-y-4">
          {submittedSubmissions.flatMap(submission => 
            (submission.log || []).map((log, index) => (
              <div key={`${submission.id}-${index}`} className="border border-red-200 rounded-xl p-6 bg-white">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-gray-900">{submission.trackingId}</span>
                      {getAppBadge(submission.app, submission.isARO, submission.app === 'apolo' && submission.aroData && !submission.isARO)}
                      
                    </div>
                    <p className="text-lg font-bold text-gray-900">{log.action}</p>
                    <p className="text-sm text-gray-600 mt-1">{log.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{formatDate(log.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default Profile;