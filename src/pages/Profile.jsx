// Profile.jsx - Page Profile Sederhana dengan Hak Akses
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
  Lock
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
    return 'pengajuan'; // default
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromURL());
  const [submissions, setSubmissions] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Update activeTab ketika URL berubah
  useEffect(() => {
    setActiveTab(getActiveTabFromURL());
  }, [location.pathname]);

  // Load data dari localStorage saat komponen mount
  useEffect(() => {
    const loadData = () => {
      const storedSubs = localStorage.getItem('hakAksesSubmissions');
      if (storedSubs) setSubmissions(JSON.parse(storedSubs));
      
      // Data profil dari "database" (simulasi)
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

  // Status badge dengan warna merah
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Menunggu</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Disetujui</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full flex items-center gap-1"><XCircle className="w-3 h-3" /> Ditolak</span>;
      case 'processing':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Diproses</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">Unknown</span>;
    }
  };

  // Tabs untuk Hak Akses
  const tabs = [
    { id: 'pengajuan', label: 'Pengajuan Hak Akses', icon: FileSpreadsheet, path: '/profile/hak-akses/pengajuan' },
    { id: 'status', label: 'Status & Monitoring', icon: Eye, path: '/profile/hak-akses/status' }
  ];

  // Fungsi untuk handle klik tab
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
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Management Account IRS</h1>
                <p className="text-red-600 text-sm md:text-base font-medium">Sistem pengelolaan hak akses aplikasi pelaporan OJK</p>
              </div>
            </div>
          </div>

          {/* Tabs untuk Hak Akses */}
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

        {/* Content berdasarkan tab */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          {activeTab === 'pengajuan' && (
            <NewAccessSubmissionFlow 
              userProfile={userProfile}
              submissions={submissions}
              setSubmissions={setSubmissions}
            />
          )}
          
          {activeTab === 'status' && (
            <StatusMonitoringTab submissions={submissions} />
          )}
        </div>
      </div>
    </div>
  );
};

// KOMPONEN BARU: Alur Pengajuan Hak Akses
const NewAccessSubmissionFlow = ({ userProfile, submissions, setSubmissions }) => {
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
  
  // State untuk ARO
  const [showAddAROModal, setShowAddAROModal] = useState(false);
  const [selectedAROs, setSelectedAROs] = useState([]);
  const [availableAROs, setAvailableAROs] = useState([]);

  // Cek aplikasi yang sudah diajukan
  const [submittedApps, setSubmittedApps] = useState([]);
  const [submittedAros, setSubmittedAros] = useState([]);

  useEffect(() => {
    const loadSubmittedData = () => {
      const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
      const apps = [];
      const aros = [];
      
      storedSubs.forEach(sub => {
        apps.push(sub.app);
        if (sub.aros) {
          sub.aros.forEach(aro => aros.push(aro.id));
        }
      });
      
      setSubmittedApps(apps);
      setSubmittedAros(aros);
    };
    
    loadSubmittedData();
  }, []);

  // Handle klik tombol + (mulai pengajuan baru)
  const handleStartNewSubmission = () => {
    if (!userProfile) return;
    
    // Set data umum dari userProfile
    setDataUmum({
      nama: userProfile.nama,
      email: userProfile.email,
      telepon: userProfile.telepon,
      institusi: userProfile.institusi
    });
    
    setStep(2); // Pindah ke step data umum
  };

  // Handle selesai Step 2 (Data Umum)
  const handleFinishStep2 = () => {
    setStep(3); // Pindah ke pemilihan aplikasi
  };

  // Handle pilih aplikasi di Step 3
  const handleSelectApp = (app) => {
    // Cek apakah aplikasi sudah diajukan sebelumnya
    if (submittedApps.includes(app)) {
      alert(`Aplikasi ${app.toUpperCase()} sudah pernah diajukan sebelumnya!`);
      return;
    }
    
    if (!selectedApps.includes(app)) {
      setSelectedApps([...selectedApps, app]);
    }
  };

  // Handle hapus aplikasi di Step 3
  const handleRemoveApp = (app) => {
    setSelectedApps(selectedApps.filter(a => a !== app));
    // Reset form data untuk app yang dihapus
    setFormData(prev => ({
      ...prev,
      [app.toLowerCase()]: {}
    }));
  };

  // Handle buka form aplikasi spesifik
  const handleOpenAppForm = (app) => {
    setActiveAppForm(app);
    setStep(4); // Pindah ke form spesifik
  };

  // Handle simpan form aplikasi
  const handleSaveAppForm = (app, data) => {
    // Simpan data form dengan menambahkan data umum
    const completeData = {
      ...data,
      dataUmum: dataUmum // Tambahkan data umum ke data form
    };
    
    setFormData(prev => ({
      ...prev,
      [app]: completeData
    }));

    // Tambahkan ke daftar submissions yang sudah disimpan
    const newSubmission = {
      id: Date.now(),
      app,
      data: completeData,
      status: 'draft',
      timestamp: new Date().toISOString(),
      trackingId: `IRS-${Date.now().toString().slice(-8)}`,
      aros: [] // Array untuk menyimpan ARO yang ditambahkan
    };
    
    setSavedSubmissions([...savedSubmissions, newSubmission]);
    
    // Kembali ke step pemilihan aplikasi
    setActiveAppForm(null);
    setStep(3);
  };

  // Handle submit semua pengajuan
  const handleSubmitAll = () => {
    // Generate random status untuk setiap submission
    const statuses = ['approved', 'processing', 'pending'];
    
    const allSubmissions = savedSubmissions.map(sub => {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        ...sub,
        dataUmum,
        status: randomStatus,
        submittedAt: new Date().toISOString(),
        log: [{
          timestamp: new Date().toISOString(),
          action: 'Diajukan',
          description: 'Pengajuan hak akses baru dibuat',
          status: randomStatus
        }],
        approvalDate: randomStatus === 'approved' ? new Date().toISOString() : null,
        approvedBy: randomStatus === 'approved' ? 'System Auto-Approval' : null
      };
    });

    // Simpan ke localStorage
    const existingSubmissions = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    const updatedSubmissions = [...allSubmissions, ...existingSubmissions];
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubmissions));
    
    // Update submitted apps
    const newSubmittedApps = allSubmissions.map(s => s.app);
    setSubmittedApps([...submittedApps, ...newSubmittedApps]);
    
    setSubmissions(updatedSubmissions);

    // Reset dan kembali ke halaman utama
    setStep(1);
    setSelectedApps([]);
    setSavedSubmissions([]);
    setFormData({
      sipina: {},
      apolo: {},
      ereporting: {}
    });
  };

  // Handle tambah ARO (dipanggil dari tombol di halaman utama)
  const handleOpenAddAROModal = () => {
    // Generate available AROs berdasarkan aplikasi yang sudah diajukan
    const generatedAROs = [];
    
    submittedApps.forEach(app => {
      // Cari submission untuk aplikasi ini
      const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
      const appSubmissions = storedSubs.filter(sub => sub.app === app);
      
      if (appSubmissions.length > 0) {
        // Generate AROs berdasarkan aplikasi
        if (app === 'apolo') {
          const modules = ['Strategi Anti Fraud', 'AP/KAP', 'TPPU/TPPT/PPSPM', 'LK & Laporan Keuangan', 'Monitoring & Evaluasi'];
          modules.forEach((module, index) => {
            generatedAROs.push({
              id: `apolo-aro-${index}`,
              app: 'apolo',
              nama: `APOLO-ARO-MODULE-${index + 1}`,
              jenis: 'Modul APOLO',
              deskripsi: `Hak akses modul ${module}`,
              module: module,
              status: 'available'
            });
          });
        } else if (app === 'sipina') {
          const tipeLaporan = ['CRS', 'FATCA', 'CRS & FATCA'];
          tipeLaporan.forEach((tipe, index) => {
            generatedAROs.push({
              id: `sipina-sipo-${index}`,
              app: 'sipina',
              nama: `SIPINA-SIPO-${index + 1}`,
              jenis: 'SIPO',
              deskripsi: `Hak akses SIPINA untuk pelaporan ${tipe}`,
              tipeLaporan: tipe,
              status: 'available'
            });
          });
        } else if (app === 'ereporting') {
          const jenisUsaha = ['Perbankan', 'Asuransi', 'Fintech', 'Lainnya'];
          jenisUsaha.forEach((jenis, index) => {
            generatedAROs.push({
              id: `ereporting-aro-${index}`,
              app: 'ereporting',
              nama: `EREPORTING-ARO-${index + 1}`,
              jenis: 'User E-Reporting',
              deskripsi: `Hak akses pelaporan elektronik untuk ${jenis}`,
              jenisUsaha: jenis,
              status: 'available'
            });
          });
        }
      }
    });

    // Filter ARO yang sudah dipilih sebelumnya
    const filteredAROs = generatedAROs.filter(aro => !submittedAros.includes(aro.id));
    setAvailableAROs(filteredAROs);
    setShowAddAROModal(true);
  };

  // Handle pilih ARO di modal
  const handleSelectARO = (aroId) => {
    if (selectedAROs.includes(aroId)) {
      setSelectedAROs(selectedAROs.filter(id => id !== aroId));
    } else {
      setSelectedAROs([...selectedAROs, aroId]);
    }
  };

  // Handle submit ARO
  const handleSubmitARO = () => {
    if (selectedAROs.length === 0) {
      alert('Pilih minimal satu ARO untuk ditambahkan');
      return;
    }

    // Ambil data ARO yang dipilih
    const selectedAROData = availableAROs.filter(aro => selectedAROs.includes(aro.id));
    
    // Update submissions dengan ARO baru
    const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
    const updatedSubmissions = [...storedSubs];
    
    selectedAROData.forEach(aro => {
      // Cari submission untuk aplikasi ini
      const appSubmission = updatedSubmissions.find(sub => sub.app === aro.app && sub.status !== 'draft');
      
      if (appSubmission) {
        // Cek apakah ARO sudah ada
        const existingAro = appSubmission.aros?.find(existing => existing.id === aro.id);
        if (!existingAro) {
          const aroWithDetails = {
            ...aro,
            status: 'approved',
            tanggalDiajukan: new Date().toISOString()
          };
          
          if (!appSubmission.aros) {
            appSubmission.aros = [aroWithDetails];
          } else {
            appSubmission.aros.push(aroWithDetails);
          }
        }
      }
    });

    // Simpan ke localStorage
    localStorage.setItem('hakAksesSubmissions', JSON.stringify(updatedSubmissions));
    setSubmissions(updatedSubmissions);
    
    // Update submitted AROs
    const newAroIds = selectedAROData.map(aro => aro.id);
    setSubmittedAros([...submittedAros, ...newAroIds]);
    
    // Reset dan tutup modal
    setSelectedAROs([]);
    setShowAddAROModal(false);
    
    alert(`${selectedAROs.length} ARO berhasil ditambahkan!`);
  };

  // Handle kembali ke awal
  const handleBackToMain = () => {
    setStep(1);
    setSelectedApps([]);
    setSavedSubmissions([]);
    setFormData({
      sipina: {},
      apolo: {},
      ereporting: {}
    });
  };

  // Tampilkan berdasarkan step
  if (step === 1) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pengajuan Hak Akses Aplikasi</h2>
          <p className="text-gray-600">Ajukan hak akses untuk aplikasi SIPINA, APOLO, atau E-Reporting</p>
        </div>

        {/* Tombol Utama */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Tombol Tambah Pengajuan */}
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

          {/* Tombol Tambah ARO */}
          <button
            onClick={handleOpenAddAROModal}
            disabled={submittedApps.length === 0}
            className={`
              w-full md:w-1/2 p-8 border-2 rounded-xl text-center transition-all duration-300
              ${submittedApps.length === 0
                ? 'border-gray-300 bg-gray-100 cursor-not-allowed' 
                : 'border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400'
              }
            `}
          >
            <div className="flex flex-col items-center justify-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                submittedApps.length === 0 ? 'bg-gray-300' : 'bg-gradient-to-r from-blue-500 to-blue-600'
              }`}>
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tambah ARO</h3>
              <p className="text-sm text-gray-600 mb-4">
                Tambah Additional Request Object ke aplikasi yang sudah diajukan
              </p>
              {submittedApps.length === 0 && (
                <p className="text-xs text-red-600 font-medium">
                  Belum ada aplikasi yang diajukan
                </p>
              )}
            </div>
          </button>
        </div>

        {/* Daftar Aplikasi yang Sudah Diajukan */}
        {submittedApps.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Aplikasi yang Sudah Diajukan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {submittedApps.map((app, index) => {
                // PERBAIKAN: Definisikan appInfo di luar untuk menghindari error
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
                
                const storedSubs = JSON.parse(localStorage.getItem('hakAksesSubmissions') || '[]');
                const appSubmission = storedSubs.find(sub => sub.app === app);
                const aroCount = appSubmission?.aros?.length || 0;
                const maxARO = app === 'apolo' ? 3 : 1;
                
                return (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${appInfo.color} flex items-center justify-center`}>
                        <Database className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{appInfo.label}</h4>
                        <p className="text-sm text-gray-600">Sudah diajukan</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${
                          appSubmission?.status === 'approved' ? 'text-green-600' :
                          appSubmission?.status === 'processing' ? 'text-blue-600' :
                          'text-yellow-600'
                        }`}>
                          {appSubmission?.status === 'approved' ? 'Disetujui' :
                           appSubmission?.status === 'processing' ? 'Diproses' :
                           'Menunggu'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Jumlah ARO:</span>
                        <span className="font-medium text-gray-900">
                          {aroCount} / {maxARO}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ID:</span>
                        <span className="font-mono text-gray-900 text-xs">
                          {appSubmission?.trackingId}
                        </span>
                      </div>
                    </div>
                    
                    {appSubmission?.aros && appSubmission.aros.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-700 mb-2">ARO yang sudah ditambahkan:</p>
                        <div className="space-y-1">
                          {appSubmission.aros.slice(0, 2).map((aro, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <p className="text-xs text-gray-600 truncate">{aro.nama}</p>
                              <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                {aro.status}
                              </span>
                            </div>
                          ))}
                          {appSubmission.aros.length > 2 && (
                            <p className="text-xs text-gray-500">+{appSubmission.aros.length - 2} lainnya</p>
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

        {/* Modal Tambah ARO */}
        {showAddAROModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Tambah ARO</h3>
                  <button
                    onClick={() => setShowAddAROModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">Pilih ARO untuk aplikasi yang sudah diajukan</p>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {availableAROs.length === 0 ? (
                  <div className="text-center py-8">
                    <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Tidak ada ARO yang tersedia untuk ditambahkan</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Semua ARO untuk aplikasi yang sudah diajukan telah dipilih
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {availableAROs.map((aro) => {
                      const appLabel = {
                        'sipina': 'SIPINA',
                        'apolo': 'APOLO',
                        'ereporting': 'E-Reporting'
                      }[aro.app];
                      
                      return (
                        <div
                          key={aro.id}
                          onClick={() => handleSelectARO(aro.id)}
                          className={`
                            border rounded-lg p-4 cursor-pointer transition-all duration-200
                            ${selectedAROs.includes(aro.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                            }
                          `}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              selectedAROs.includes(aro.id) 
                                ? 'bg-blue-500' 
                                : 'bg-gray-100'
                            }`}>
                              {selectedAROs.includes(aro.id) ? (
                                <CheckCircle className="w-4 h-4 text-white" />
                              ) : (
                                <Layers className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{aro.nama}</h4>
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                                  {appLabel}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{aro.deskripsi}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-gray-500">Jenis: {aro.jenis}</span>
                                {aro.module && (
                                  <span className="text-xs text-blue-600">Modul: {aro.module}</span>
                                )}
                                {aro.tipeLaporan && (
                                  <span className="text-xs text-blue-600">Laporan: {aro.tipeLaporan}</span>
                                )}
                                {aro.jenisUsaha && (
                                  <span className="text-xs text-blue-600">Usaha: {aro.jenisUsaha}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {selectedAROs.length} ARO dipilih
                    </p>
                    <p className="text-xs text-gray-500">
                      ARO yang sudah dipilih tidak dapat dipilih lagi
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowAddAROModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSubmitARO}
                      disabled={selectedAROs.length === 0}
                      className={`
                        px-6 py-2 font-medium rounded-lg
                        ${selectedAROs.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                        }
                      `}
                    >
                      Tambah ARO
                    </button>
                  </div>
                </div>
              </div>
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

  if (step === 4 && activeAppForm) {
    const formProps = {
      dataUmum,
      initialData: formData[activeAppForm] || {},
      onSave: (data) => handleSaveAppForm(activeAppForm, data),
      onCancel: () => {
        setActiveAppForm(null);
        setStep(3);
      }
    };

    switch(activeAppForm) {
      case 'sipina':
        return <SipinaForm {...formProps} />;
      case 'apolo':
        return <ApoloForm {...formProps} />;
      case 'ereporting':
        return <EReportingForm {...formProps} />;
      default:
        return null;
    }
  }

  return null;
};

// Step 2: Data Umum (Read-only)
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
            <p className="text-sm text-red-600 mt-2">⚠️ Data ini hanya ditampilkan sekali dan tidak akan muncul lagi di form aplikasi</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Nama Pengguna
              </label>
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
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email
              </label>
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
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Nomor Telepon
              </label>
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
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Instansi
              </label>
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

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
            <p className="text-sm text-yellow-700">
              <span className="font-medium">Informasi:</span> Data diambil dari database Pelaporan.id. 
              Data ini akan digunakan untuk semua pengajuan aplikasi dan tidak akan ditampilkan lagi di form aplikasi spesifik.
            </p>
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

// Step 3: Pilih Aplikasi (dengan pengecekan submittedApps)
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

      {/* Tombol Tambah Aplikasi */}
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
                    : 'border-dashed border-gray-300 hover:border-red-300 hover:bg-red-25'
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
                  {isSubmitted ? (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      Sudah diajukan
                    </span>
                  ) : isSelected ? (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Sudah dipilih
                    </span>
                  ) : null}
                </div>
                <h3 className="font-bold text-gray-900">{app.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{app.description}</p>
                {isSubmitted && (
                  <p className="text-xs text-red-600 mt-2">Tidak dapat dipilih lagi</p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daftar Aplikasi yang Dipilih */}
      {selectedApps.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Aplikasi yang Dipilih</h3>
          <div className="space-y-4">
            {selectedApps.map(appId => {
              const app = apps.find(a => a.id === appId);
              const savedSubmission = savedSubmissions.find(s => s.app === appId);
              
              return (
                <div key={appId} className="border border-gray-200 rounded-lg p-4">
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
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Status: <span className="font-medium text-yellow-600">Menunggu submit semua</span></p>
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

      {/* Tabel Pengajuan yang Sudah Disimpan */}
      {savedSubmissions.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Daftar Pengajuan Siap Submit</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aplikasi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tracking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {savedSubmissions.map(sub => (
                  <tr key={sub.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">
                        {sub.app.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {sub.trackingId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        Draft
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(sub.timestamp).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenAppForm(sub.app)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            const newSubmissions = savedSubmissions.filter(s => s.id !== sub.id);
                            // Perbaikan: Menambahkan fungsi setSavedSubmissions yang hilang
                            // Kita perlu mengimpor useState atau menggunakan prop
                          }}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tombol Aksi */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-600">
            {selectedApps.length} aplikasi dipilih • {savedSubmissions.length} form sudah diisi
          </p>
          {submittedApps.length > 0 && (
            <p className="text-xs text-red-600 mt-1">
              {submittedApps.length} aplikasi sudah pernah diajukan sebelumnya
            </p>
          )}
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

// Form SIPINA yang diperbarui sesuai deskripsi
const SipinaForm = ({ dataUmum, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    // Informasi Umum dari Header (tidak perlu diisi ulang)
    // ... akan ditampilkan di header form

    // 1. Data dari SIPO
    kodeSIPO: initialData.kodeSIPO || '',
    namaLJK: initialData.namaLJK || '',
    
    // 2. Data tambahan yang harus diisi user
    namaSebutanLJK: initialData.namaSebutanLJK || '',
    sektor: initialData.sektor || '',
    subSektor: initialData.subSektor || '',
    tipePelapor: initialData.tipePelapor || '',
    gin: initialData.gin || '',
    npwpPerusahaan: initialData.npwpPerusahaan || '',
    npwpValidated: initialData.npwpValidated || false,
    
    // 3. Data Penanggung Jawab (RO)
    namaRO: initialData.namaRO || dataUmum?.nama || '',
    emailRO: initialData.emailRO || dataUmum?.email || '',
    jabatanRO: initialData.jabatanRO || '',
    teleponRO: initialData.teleponRO || dataUmum?.telepon || '',
    alamatRO: initialData.alamatRO || '',
    
    // 4. Data Pelaksana
    namaPelaksana: initialData.namaPelaksana || '',
    emailPelaksana: initialData.emailPelaksana || '',
    jabatanPelaksana: initialData.jabatanPelaksana || '',
    teleponPelaksana: initialData.teleponPelaksana || '',
    alamatPelaksana: initialData.alamatPelaksana || '',
    
    // 5. Password Transfer File
    passwordTransferFile: initialData.passwordTransferFile || '',
    
    // 6. Upload Surat Permohonan
    suratPermohonan: initialData.suratPermohonan || null
  });

  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const [isValidatingNPWP, setIsValidatingNPWP] = useState(false);

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
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
          <p className="text-sm text-yellow-700">
            <span className="font-medium">Catatan:</span> Data di atas otomatis diambil dari sistem Pelaporan.id
          </p>
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
            
            {/* Tipe Pelapor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Pelapor <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.tipePelapor}
                onChange={(e) => setFormData({...formData, tipePelapor: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Pilih Tipe Pelapor</option>
                <option value="FATCA">FATCA</option>
                <option value="CRS">CRS</option>
                <option value="FATCA_CRS">FATCA & CRS</option>
              </select>
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
            <p className="text-sm text-gray-600 mt-3">
              Sistem akan melakukan validasi file (format dan keberadaan file) sebelum proses registrasi dapat dilanjutkan.
            </p>
          </div>
        </div>

        {/* Informasi setelah registrasi */}
        <div className="border border-yellow-200 rounded-xl p-6 bg-yellow-50">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-yellow-100 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            Informasi Setelah Registrasi
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>1. Surat permohonan pendaftaran dalam bentuk fisik wajib dikirimkan ke satuan kerja pengelola SiPINA di OJK sesuai dengan sektor LJK.</p>
            <p>2. Setelah akun diverifikasi dan diaktivasi oleh OJK, sistem akan mengirimkan email pemberitahuan aktivasi akun ke email RO yang telah didaftarkan.</p>
            <p>3. RO selanjutnya meneruskan email pemberitahuan tersebut kepada Pelaksana, agar Pelaksana dapat mengetahui status aktivasi dan melakukan login ke dalam sistem SiPINA.</p>
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

// Form APOLO (disingkat untuk fokus pada SIPINA)
const ApoloForm = ({ dataUmum, initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    sumberData: 'Pelaporan.id',
    nomorSurat: initialData.nomorSurat || '',
    tanggalSurat: initialData.tanggalSurat || '',
    keterangan: initialData.keterangan || '',
    suratPermohonan: initialData.suratPermohonan || null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Form Pengajuan Hak Akses APOLO</h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Form APOLO yang disederhanakan */}
        <div className="border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-red-100">
            Informasi Pengajuan APOLO
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Surat (Opsional)
              </label>
              <input
                type="text"
                value={formData.nomorSurat}
                onChange={(e) => setFormData({...formData, nomorSurat: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Opsional"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Surat
              </label>
              <input
                type="date"
                value={formData.tanggalSurat}
                onChange={(e) => setFormData({...formData, tanggalSurat: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keterangan (Opsional)
              </label>
              <textarea
                value={formData.keterangan}
                onChange={(e) => setFormData({...formData, keterangan: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="3"
                placeholder="Keterangan tambahan"
              />
            </div>
          </div>
        </div>

        {/* Upload Surat Permohonan */}
        <div className="border border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-red-100">
            Upload Surat Permohonan
          </h3>
          
          <div className="border-2 border-dashed border-red-300 rounded-xl p-8 text-center">
            <input
              type="file"
              id="apoloSurat"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, 'suratPermohonan')}
              className="hidden"
              required
            />
            <label htmlFor="apoloSurat" className="cursor-pointer">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-gray-700 font-medium mb-2">
                {formData.suratPermohonan
                  ? `File: ${formData.suratPermohonan.name}`
                  : 'Upload Surat Permohonan APOLO'
                }
              </p>
              <p className="text-sm text-gray-500 mb-1">Format: PDF (maks. 5MB)</p>
              <p className="text-xs text-red-500">*Wajib diunggah</p>
            </label>
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
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700"
            disabled={!formData.suratPermohonan}
          >
            Simpan Form APOLO
          </button>
        </div>
      </form>
    </div>
  );
};

// Form E-Reporting yang diperbarui sesuai deskripsi
const EReportingForm = ({ dataUmum, initialData, onSave, onCancel }) => {
  const [step, setStep] = useState(1); // 1: Validasi Identitas, 2-5: Wizard steps
  const [formData, setFormData] = useState({
    // Step 1: Validasi Identitas Perusahaan
    npwpToken: initialData.npwpToken || '',
    namaPerusahaan: initialData.namaPerusahaan || '',
    alamat: initialData.alamat || '',
    jenisUsaha: initialData.jenisUsaha || '',
    
    // Step 2: Validasi User SIPO
    userIdSIPO: initialData.userIdSIPO || '',
    passwordSIPO: initialData.passwordSIPO || '',
    sipoValidated: initialData.sipoValidated || false,
    
    // Step 3: Input Email (User ID Aplikasi)
    email: initialData.email || dataUmum?.email || '',
    
    // Upload Surat Permohonan
    suratPermohonan: initialData.suratPermohonan || null
  });

  const [isValidatingSIPO, setIsValidatingSIPO] = useState(false);
  const [sipoValidationMessage, setSipoValidationMessage] = useState('');
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Auto-load data perusahaan berdasarkan NPWP
  useEffect(() => {
    if (formData.npwpToken && formData.npwpToken.length >= 8 && step === 1) {
      const simulatedData = {
        '1123133': {
          namaPerusahaan: 'PT. Contoh Perusahaan Indonesia',
          alamat: 'Gedung Contoh Lt. 5, Jl. Sudirman No. 123, Jakarta Pusat'
        },
        '1234567': {
          namaPerusahaan: 'PT. Asuransi Jaya Sejahtera',
          alamat: 'Jl. Gatot Subroto No. 45, Jakarta Selatan'
        }
      };
      
      const data = simulatedData[formData.npwpToken];
      if (data) {
        setFormData(prev => ({
          ...prev,
          namaPerusahaan: data.namaPerusahaan,
          alamat: data.alamat
        }));
      }
    }
  }, [formData.npwpToken, step]);

  // Validasi email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle submit Step 1
  const handleStep1Submit = (e) => {
    e.preventDefault();
    
    if (!formData.npwpToken) {
      alert('Harap masukkan NPWP / Token!');
      return;
    }
    
    if (!formData.jenisUsaha) {
      alert('Harap pilih Jenis Usaha!');
      return;
    }
    
    setStep(2); // Lanjut ke validasi SIPO
  };

  // Handle validasi SIPO
  const handleValidateSIPO = () => {
    if (!formData.userIdSIPO || !formData.passwordSIPO) {
      setSipoValidationMessage('User ID dan Password SIPO harus diisi!');
      return;
    }
    
    setIsValidatingSIPO(true);
    setSipoValidationMessage('');
    
    // Simulasi validasi SIPO
    setTimeout(() => {
      // Simulasi validasi berhasil jika user ID dan password tidak kosong
      if (formData.userIdSIPO && formData.passwordSIPO) {
        setFormData(prev => ({ ...prev, sipoValidated: true }));
        setSipoValidationMessage('Validasi User & Password SIPO berhasil.');
      } else {
        setSipoValidationMessage('Validasi gagal. Periksa kembali User ID dan Password.');
      }
      setIsValidatingSIPO(false);
    }, 1500);
  };

  // Handle submit Step 2
  const handleStep2Submit = () => {
    if (!formData.sipoValidated) {
      alert('Harap validasi User ID dan Password SIPO terlebih dahulu!');
      return;
    }
    
    setStep(3); // Lanjut ke input email
  };

  // Handle submit Step 3
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
    setStep(4); // Lanjut ke konfirmasi jenis usaha
  };

  // Handle submit Step 4
  const handleStep4Submit = () => {
    // Validasi surat permohonan
    if (!formData.suratPermohonan) {
      alert('Harap unggah surat permohonan!');
      return;
    }
    
    setStep(5); // Lanjut ke selesai
  };

  // Handle final registration
  const handleFinalRegistration = () => {
    // Simpan data dan tampilkan konfirmasi
    const completeData = {
      ...formData,
      dataUmum: dataUmum,
      registrationDate: new Date().toISOString(),
      activationEmailSent: true
    };
    
    onSave(completeData);
    setRegistrationSuccess(true);
    
    // Auto-reset setelah 3 detik
    setTimeout(() => {
      onCancel();
    }, 3000);
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

  // Render berdasarkan step
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

  // Step 1: Validasi Identitas Perusahaan
  const renderStep1 = () => (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b border-red-100 flex items-center gap-2">
        <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
        Validasi Identitas Perusahaan
      </h3>
      
      <form onSubmit={handleStep1Submit} className="space-y-6">
        <div className="space-y-6">
          {/* NPWP / Token */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NPWP / Token <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.npwpToken}
              onChange={(e) => setFormData({...formData, npwpToken: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
              placeholder="Masukkan NPWP untuk auto-load data perusahaan"
            />
            {formData.npwpToken && (
              <p className="text-xs text-green-600 mt-1">
                ✓ Data perusahaan akan otomatis terisi
              </p>
            )}
          </div>
          
          {/* Nama Perusahaan (Auto-filled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Perusahaan
            </label>
            <input
              type="text"
              value={formData.namaPerusahaan}
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">Otomatis terisi berdasarkan NPWP</p>
          </div>
          
          {/* Alamat (Auto-filled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <textarea
              value={formData.alamat}
              readOnly
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
              rows="3"
            />
            <p className="text-xs text-gray-500 mt-1">Otomatis terisi berdasarkan NPWP</p>
          </div>
          
          {/* Jenis Usaha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Usaha <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.jenisUsaha}
              onChange={(e) => setFormData({...formData, jenisUsaha: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="">Pilih Jenis Usaha</option>
              <option value="Perusahaan Asuransi Umum">Perusahaan Asuransi Umum</option>
              <option value="Perusahaan Asuransi Jiwa">Perusahaan Asuransi Jiwa</option>
              <option value="Perusahaan Reasuransi">Perusahaan Reasuransi</option>
              <option value="Perbankan">Perbankan</option>
              <option value="Fintech">Fintech</option>
              <option value="Dana Pensiun">Dana Pensiun</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700"
          >
            Registrasi
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Klik "Registrasi" untuk melanjutkan ke validasi sistem
          </p>
        </div>
      </form>
    </div>
  );

  // Step 2: Validasi User SIPO
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
          <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
          Validasi User SIPO
        </h3>
      </div>
      
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            Masukkan User ID dan Password SIPO yang valid untuk melanjutkan pendaftaran.
          </p>
        </div>
        
        <div className="space-y-4">
          {/* User ID SIPO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID SIPO <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.userIdSIPO}
              onChange={(e) => {
                setFormData({...formData, userIdSIPO: e.target.value, sipoValidated: false});
                setSipoValidationMessage('');
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Masukkan User ID SIPO"
              required
            />
          </div>
          
          {/* Password SIPO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password SIPO <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.passwordSIPO}
                onChange={(e) => {
                  setFormData({...formData, passwordSIPO: e.target.value, sipoValidated: false});
                  setSipoValidationMessage('');
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                placeholder="Masukkan Password SIPO"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Tombol Validasi */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleValidateSIPO}
              disabled={isValidatingSIPO || !formData.userIdSIPO || !formData.passwordSIPO}
              className={`w-full py-3 font-bold rounded-lg flex items-center justify-center gap-2 ${
                formData.sipoValidated
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-600 text-white hover:bg-red-700'
              } ${(isValidatingSIPO || !formData.userIdSIPO || !formData.passwordSIPO) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isValidatingSIPO ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memvalidasi...
                </>
              ) : formData.sipoValidated ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Tervalidasi
                </>
              ) : (
                'Validasi'
              )}
            </button>
          </div>
          
          {/* Pesan Validasi */}
          {sipoValidationMessage && (
            <div className={`p-3 rounded-lg ${formData.sipoValidated ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`text-sm ${formData.sipoValidated ? 'text-green-700' : 'text-red-700'} flex items-center gap-2`}>
                {formData.sipoValidated ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {sipoValidationMessage}
              </p>
            </div>
          )}
          
          {/* Tombol Berikut */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleStep2Submit}
              disabled={!formData.sipoValidated}
              className={`w-full py-3 font-bold rounded-lg ${
                formData.sipoValidated
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Berikut
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Tombol "Berikut" hanya aktif setelah validasi sukses
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 3: Input Email (User ID Aplikasi)
  const renderStep3 = () => (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setStep(2)}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
          Input Email (User ID Aplikasi)
        </h3>
      </div>
      
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            Email ini akan digunakan sebagai identitas login utama aplikasi dan tujuan pengiriman link aktivasi.
          </p>
        </div>
        
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  setEmailValidationMessage('');
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                placeholder="contoh@perusahaan.co.id"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            {formData.email && validateEmail(formData.email) && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Format email valid
              </p>
            )}
          </div>
          
          {/* Informasi Email */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Informasi:</span> Pastikan email yang dimasukkan aktif dan dapat diakses. Link aktivasi akan dikirimkan ke email ini.
            </p>
          </div>
          
          {/* Pesan Validasi */}
          {emailValidationMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {emailValidationMessage}
              </p>
            </div>
          )}
          
          {/* Tombol Berikut */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleStep3Submit}
              disabled={!formData.email || !validateEmail(formData.email)}
              className={`w-full py-3 font-bold rounded-lg ${
                formData.email && validateEmail(formData.email)
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Berikut
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Format email harus benar (@ dan domain valid)
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 4: Konfirmasi Jenis Usaha & Upload Surat
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
          <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
          Konfirmasi Jenis Usaha & Upload Surat
        </h3>
      </div>
      
      <div className="space-y-6">
        {/* Ringkasan Data */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="font-bold text-gray-900 mb-4">Ringkasan Data Pendaftaran</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Nama Perusahaan</p>
                <p className="font-medium text-gray-900">{formData.namaPerusahaan}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">NPWP</p>
                <p className="font-medium text-gray-900">{formData.npwpToken}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-500 mb-1">Alamat</p>
                <p className="font-medium text-gray-900">{formData.alamat}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Jenis Usaha</p>
                <p className="font-medium text-gray-900">{formData.jenisUsaha}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-900">{formData.email}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upload Surat Permohonan */}
        <div>
          <h4 className="text-md font-bold text-gray-900 mb-4">Upload Surat Permohonan <span className="text-red-500">*</span></h4>
          <div className="border-2 border-dashed border-red-300 rounded-xl p-8 text-center bg-red-50 hover:bg-red-100 transition-colors">
            <input
              type="file"
              id="ereportingSurat"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, 'suratPermohonan')}
              className="hidden"
              required
            />
            <label htmlFor="ereportingSurat" className="cursor-pointer">
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
                  : 'Upload Surat Permohonan E-Reporting'
                }
              </p>
              <p className="text-sm text-gray-500 mb-1">Format: PDF (maks. 5MB)</p>
              <p className="text-xs text-red-500">*Wajib diunggah</p>
            </label>
          </div>
        </div>
        
        {/* Tombol Berikut */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleStep4Submit}
            disabled={!formData.suratPermohonan}
            className={`w-full py-3 font-bold rounded-lg ${
              formData.suratPermohonan
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proses Pendaftaran
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Klik untuk memproses pengiriman data ke sistem
          </p>
        </div>
      </div>
    </div>
  );

  // Step 5: Selesai & Aktivasi
  const renderStep5 = () => (
    <div className="text-center">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setStep(4)}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-red-100 text-red-800 w-6 h-6 rounded-full flex items-center justify-center text-sm">5</span>
          Selesai & Aktivasi
        </h3>
      </div>
      
      <div className="space-y-8">
        {/* Ikon Sukses */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        
        {/* Pesan Sukses */}
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-gray-900">Pendaftaran Berhasil!</h4>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-lg text-green-700 font-medium">
              Email sudah sukses terkirim ke:
            </p>
            <p className="text-xl font-bold text-gray-900 mt-2">{formData.email}</p>
          </div>
          <p className="text-gray-600">
            Silakan periksa kotak masuk email Anda untuk melakukan aktivasi akun.
          </p>
        </div>
        
        {/* Instruksi Aktivasi */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
          <h5 className="font-bold text-gray-900 mb-3">Instruksi Aktivasi:</h5>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
            <li>Buka email yang telah dikirim ke <strong>{formData.email}</strong></li>
            <li>Cari email dengan subjek: "Aktivasi Akun E-Reporting OJK"</li>
            <li>Klik link aktivasi yang terdapat dalam email</li>
            <li>Ikuti petunjuk untuk menyelesaikan aktivasi akun</li>
            <li>Setelah aktivasi, Anda dapat login menggunakan email ini</li>
          </ol>
        </div>
        
        {/* Tombol Selesai */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleFinalRegistration}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700"
          >
            Selesai
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Klik "Selesai" untuk menutup form ini
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header dengan informasi umum */}
      <div className="mb-8 bg-gradient-to-r from-red-50 to-white border-l-4 border-red-500 p-6 rounded-r-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Pendaftaran E-Reporting</h2>
            <p className="text-gray-600">Form registrasi akun pelaporan elektronik OJK</p>
            <div className="flex items-center gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step === stepNum 
                      ? 'bg-red-600 text-white' 
                      : step > stepNum 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
                  </div>
                  {stepNum < 5 && (
                    <div className={`w-12 h-1 ${step > stepNum ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
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
            <p className="text-xs text-gray-500 mb-1">Instansi</p>
            <p className="font-medium text-gray-900">{dataUmum?.institusi}</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
          <p className="text-sm text-yellow-700">
            <span className="font-medium">Catatan:</span> Field bertanda <span className="text-red-500">*</span> bersifat Mandatory (Wajib diisi)
          </p>
        </div>
      </div>

      {/* Step Content */}
      {renderStep()}
      
      {/* Registration Success Modal */}
      {registrationSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Registrasi Berhasil!</h3>
              <p className="text-gray-600 mb-4">
                Data pendaftaran E-Reporting telah disimpan. Link aktivasi telah dikirim ke email Anda.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-700">
                  Email aktivasi dikirim ke: <strong>{formData.email}</strong>
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Form akan ditutup otomatis dalam 3 detik...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Komponen Status & Monitoring Tab
const StatusMonitoringTab = ({ submissions }) => {
  const [activeSection, setActiveSection] = useState('monitoring');
  
  // Filter submissions yang sudah diajukan (bukan draft)
  const submittedSubmissions = submissions.filter(s => s.status !== 'draft');
  
  const getRandomStatusBadge = (status) => {
    if (status === 'approved') {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Disetujui</span>;
    } else if (status === 'processing') {
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Diproses</span>;
    } else {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Menunggu</span>;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Eye className="w-5 h-5 text-red-600" />
          Status & Monitoring Pengajuan
        </h2>
        <p className="text-sm text-gray-600 mt-1">Pantau status pengajuan dan riwayat aktivitas</p>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveSection('monitoring')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeSection === 'monitoring'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Monitoring Status
        </button>
        <button
          onClick={() => setActiveSection('log')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeSection === 'log'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
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
            {submittedSubmissions.map((submission) => (
              <div key={submission.id} className="bg-gradient-to-r from-red-50 to-white border border-red-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-gray-900">{submission.trackingId}</span>
                      {getRandomStatusBadge(submission.status)}
                    </div>
                    <p className="text-sm text-gray-600">
                      Diajukan pada {new Date(submission.submittedAt || submission.timestamp).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {submission.status === 'approved' ? '✓ Disetujui' : 
                     submission.status === 'processing' ? '⏳ Diproses' : 
                     '🕐 Menunggu'}
                  </div>
                </div>
                
                <div className="border-t border-red-100 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Aplikasi</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                          {submission.app?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Pemohon</p>
                      <p className="font-medium text-gray-900">{submission.dataUmum?.nama}</p>
                      <p className="text-xs text-gray-600">{submission.dataUmum?.institusi}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Jumlah ARO</p>
                      <p className="font-medium text-gray-900">{submission.aros?.length || 0} ARO</p>
                    </div>
                  </div>
                </div>
                
                {submission.log && submission.log.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-red-100">
                    <p className="text-xs text-gray-500 mb-2">Aktivitas Terakhir</p>
                    <div className="text-sm text-gray-700">
                      {submission.log[0].action} - {new Date(submission.log[0].timestamp).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        /* Log Aktivitas Section */
        <div className="space-y-4">
          {submittedSubmissions.flatMap(submission => 
            (submission.log || []).map((log, index) => (
              <div key={`${submission.id}-${index}`} className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow bg-white">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-gray-900">{submission.trackingId}</span>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                          {submission.app?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-gray-900">{log.action}</p>
                    <p className="text-sm text-gray-600 mt-1">{log.description}</p>
                    
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span>Oleh: {submission.dataUmum?.nama}</span>
                      <span>•</span>
                      <span>{submission.dataUmum?.institusi}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {new Date(log.timestamp).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className={`w-2 h-2 rounded-full ${
                      log.status === 'approved' ? 'bg-green-500' :
                      log.status === 'rejected' ? 'bg-red-500' :
                      log.status === 'processing' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="capitalize">{log.status || 'pending'}</span>
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