import React, { useState, useEffect } from 'react';
import {
  Settings,
  Shield,
  Database,
  Layers,
  Eye,
  Save,
  RefreshCw,
  Key,
  Bell,
  Mail,
  Lock,
  Globe,
  Clock,
  Calendar,
  AlertCircle,
  FileText,
  CheckCircle,
  XCircle,
  Info,
  Plus,
  Trash2,
  Edit,
  MessageSquare
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('report-config');
  const [reportConfigs, setReportConfigs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    namaLaporan: '',
    jenisLJK: '',
    bidangLJK: '',
    deadlineRule: 'calendar', // calendar or working_days
    deadlineDays: 15,
    isActive: true,
    note: ''
  });

  // Load data dari localStorage
  useEffect(() => {
    const savedConfigs = localStorage.getItem('irs_report_configs');
    if (savedConfigs) {
      setReportConfigs(JSON.parse(savedConfigs));
    } else {
      // Data default
      const defaultConfigs = [
        {
          id: 'LAP001',
          namaLaporan: 'LCR Individual',
          jenisLJK: 'Bank Umum',
          bidangLJK: 'Bank Umum Konvensional',
          deadlineRule: 'calendar',
          deadlineDays: 15,
          isActive: true,
          note: 'Laporan bulanan LCR Individual'
        },
        {
          id: 'LAP002',
          namaLaporan: 'LCR Konsolidasi',
          jenisLJK: 'Bank Umum',
          bidangLJK: 'Bank Umum Konvensional',
          deadlineRule: 'calendar',
          deadlineDays: 15,
          isActive: true,
          note: 'Laporan bulanan LCR Konsolidasi'
        },
        {
          id: 'LAP003',
          namaLaporan: 'GWM Individual',
          jenisLJK: 'Bank Umum',
          bidangLJK: 'Bank Umum Konvensional',
          deadlineRule: 'working_days',
          deadlineDays: 10,
          isActive: true,
          note: 'Laporan GWM dengan deadline 10 hari kerja'
        },
        {
          id: 'LAP004',
          namaLaporan: 'GWM Konsolidasi',
          jenisLJK: 'Bank Umum',
          bidangLJK: 'Bank Umum Konvensional',
          deadlineRule: 'working_days',
          deadlineDays: 10,
          isActive: true,
          note: 'Laporan GWM Konsolidasi'
        },
        {
          id: 'LAP005',
          namaLaporan: 'Laporan Kualitas Aset',
          jenisLJK: 'Bank Umum',
          bidangLJK: 'Bank Umum Konvensional',
          deadlineRule: 'calendar',
          deadlineDays: 20,
          isActive: true,
          note: 'Laporan bulanan Kualitas Aset'
        },
        {
          id: 'LAP006',
          namaLaporan: 'Laporan Pengawasan Internal',
          jenisLJK: 'Bank Umum',
          bidangLJK: 'Bank Umum Konvensional',
          deadlineRule: 'calendar',
          deadlineDays: 30,
          isActive: true,
          note: 'Laporan triwulanan'
        },
        {
          id: 'LAP007',
          namaLaporan: 'Laporan Kepatuhan BPR',
          jenisLJK: 'BPR / BPRS',
          bidangLJK: 'Bank Perkreditan Rakyat',
          deadlineRule: 'calendar',
          deadlineDays: 15,
          isActive: true,
          note: 'Laporan bulanan BPR'
        },
        {
          id: 'LAP008',
          namaLaporan: 'Laporan Pengawasan Syariah',
          jenisLJK: 'Bank Syariah',
          bidangLJK: 'Bank Umum Syariah',
          deadlineRule: 'working_days',
          deadlineDays: 14,
          isActive: true,
          note: 'Laporan bulanan dengan deadline 14 hari kerja'
        }
      ];
      setReportConfigs(defaultConfigs);
      localStorage.setItem('irs_report_configs', JSON.stringify(defaultConfigs));
    }
  }, []);

  // Save ke localStorage setiap ada perubahan
  useEffect(() => {
    if (reportConfigs.length > 0) {
      localStorage.setItem('irs_report_configs', JSON.stringify(reportConfigs));
    }
  }, [reportConfigs]);

  const tabs = [
    { id: 'report-config', label: 'Konfigurasi Laporan', icon: FileText, badge: "Master" },
    { id: 'dispute-config', label: 'Konfigurasi Sanggahan', icon: MessageSquare },
    { id: 'system-config', label: 'Sistem', icon: Settings },
  ];

  const handleAddConfig = () => {
    const newId = `LAP${String(reportConfigs.length + 1).padStart(3, '0')}`;
    const newConfig = {
      ...formData,
      id: newId
    };
    setReportConfigs([...reportConfigs, newConfig]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditConfig = (config) => {
    setEditingConfig(config);
    setFormData({
      id: config.id,
      namaLaporan: config.namaLaporan,
      jenisLJK: config.jenisLJK,
      bidangLJK: config.bidangLJK,
      deadlineRule: config.deadlineRule,
      deadlineDays: config.deadlineDays,
      isActive: config.isActive,
      note: config.note || ''
    });
    setShowAddModal(true);
  };

  const handleUpdateConfig = () => {
    const updatedConfigs = reportConfigs.map(config => 
      config.id === editingConfig.id ? { ...formData, id: config.id } : config
    );
    setReportConfigs(updatedConfigs);
    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteConfig = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus konfigurasi laporan ini?')) {
      const filteredConfigs = reportConfigs.filter(config => config.id !== id);
      setReportConfigs(filteredConfigs);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      namaLaporan: '',
      jenisLJK: '',
      bidangLJK: '',
      deadlineRule: 'calendar',
      deadlineDays: 15,
      isActive: true,
      note: ''
    });
    setEditingConfig(null);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'report-config':
        return <ReportConfig 
          reportConfigs={reportConfigs}
          onAdd={() => {
            resetForm();
            setShowAddModal(true);
          }}
          onEdit={handleEditConfig}
          onDelete={handleDeleteConfig}
        />;
      case 'dispute-config':
        return <DisputeConfig />;
      case 'system-config':
        return <SystemConfig />;
      default:
        return <ReportConfig 
          reportConfigs={reportConfigs}
          onAdd={() => {
            resetForm();
            setShowAddModal(true);
          }}
          onEdit={handleEditConfig}
          onDelete={handleDeleteConfig}
        />;
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-red-900">Pengaturan Admin IRS</h1>
        <p className="text-gray-600">Konfigurasi sistem monitoring absensi IRS</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-50 to-white p-4 border-b border-red-100">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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
                  {tab.badge && (
                    <span className="px-1.5 py-0.5 bg-white/20 text-white text-xs rounded">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-red-900">
                    {editingConfig ? 'Edit Konfigurasi Laporan' : 'Tambah Konfigurasi Laporan'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Laporan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.namaLaporan}
                    onChange={(e) => setFormData({...formData, namaLaporan: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Contoh: LCR Individual"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis LJK
                  </label>
                  <select
                    value={formData.jenisLJK}
                    onChange={(e) => setFormData({...formData, jenisLJK: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="Bank Umum">Bank Umum</option>
                    <option value="Bank Syariah">Bank Syariah</option>
                    <option value="BPR / BPRS">BPR / BPRS</option>
                    <option value="Lembaga Keuangan">Lembaga Keuangan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bidang LJK
                  </label>
                  <input
                    type="text"
                    value={formData.bidangLJK}
                    onChange={(e) => setFormData({...formData, bidangLJK: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Contoh: Bank Umum Konvensional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aturan Deadline
                  </label>
                  <select
                    value={formData.deadlineRule}
                    onChange={(e) => setFormData({...formData, deadlineRule: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="calendar">Hari Kalender</option>
                    <option value="working_days">Hari Kerja (Senin-Jumat)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jumlah Hari Deadline
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={formData.deadlineDays}
                    onChange={(e) => setFormData({...formData, deadlineDays: parseInt(e.target.value) || 15})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.deadlineRule === 'calendar' ? 'Jumlah hari kalender dari awal periode' : 'Jumlah hari kerja (Senin-Jumat) dari awal periode'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="flex items-center space-x-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={formData.isActive === true}
                        onChange={() => setFormData({...formData, isActive: true})}
                        className="mr-2 text-red-600"
                      />
                      <span className="text-sm">Aktif</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={formData.isActive === false}
                        onChange={() => setFormData({...formData, isActive: false})}
                        className="mr-2 text-red-600"
                      />
                      <span className="text-sm">Nonaktif</span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catatan / Keterangan
                </label>
                <textarea
                  rows="3"
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Catatan tambahan untuk laporan ini..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={editingConfig ? handleUpdateConfig : handleAddConfig}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingConfig ? 'Update' : 'Simpan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Komponen Konfigurasi Laporan
const ReportConfig = ({ reportConfigs, onAdd, onEdit, onDelete }) => {
  const [filterJenis, setFilterJenis] = useState('all');

  const filteredConfigs = filterJenis === 'all' 
    ? reportConfigs 
    : reportConfigs.filter(c => c.jenisLJK === filterJenis);

  const jenisOptions = ['all', ...new Set(reportConfigs.map(c => c.jenisLJK))];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-red-900">Master Konfigurasi Laporan</h3>
          <p className="text-sm text-gray-600 mt-1">
            Atur jenis laporan, deadline, dan aturan keterlambatan sesuai ketentuan
          </p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Laporan</span>
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6 flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700">Filter Jenis LJK:</label>
        <select
          value={filterJenis}
          onChange={(e) => setFilterJenis(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
        >
          {jenisOptions.map(option => (
            <option key={option} value={option}>
              {option === 'all' ? 'Semua' : option}
            </option>
          ))}
        </select>
      </div>

      {/* Tabel Konfigurasi */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Nama Laporan</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Jenis LJK</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Bidang LJK</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Aturan Deadline</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Jml Hari</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredConfigs.map((config) => (
              <tr key={config.id} className="hover:bg-red-50/30 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{config.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{config.namaLaporan}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{config.jenisLJK}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{config.bidangLJK}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    config.deadlineRule === 'calendar' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {config.deadlineRule === 'calendar' ? 'Hari Kalender' : 'Hari Kerja'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{config.deadlineDays} Hari</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    config.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {config.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(config)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(config.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
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

      {filteredConfigs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Belum ada konfigurasi laporan</p>
          <button
            onClick={onAdd}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            + Tambah Laporan
          </button>
        </div>
      )}
    </div>
  );
};

// Komponen Konfigurasi Sanggahan
const DisputeConfig = () => {
  const [disputeSettings, setDisputeSettings] = useState(() => {
    const saved = localStorage.getItem('irs_dispute_settings');
    return saved ? JSON.parse(saved) : {
      maxWorkingDays: 5,
      autoRejectAfterExpiry: true,
      requireSignedDocument: true,
      notificationEmail: true,
      supervisorApprovalRequired: true
    };
  });

  useEffect(() => {
    localStorage.setItem('irs_dispute_settings', JSON.stringify(disputeSettings));
  }, [disputeSettings]);

  const handleSave = () => {
    localStorage.setItem('irs_dispute_settings', JSON.stringify(disputeSettings));
    alert('Pengaturan sanggahan berhasil disimpan!');
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-red-900 mb-4">Konfigurasi Sanggahan Keterlambatan</h3>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="text-sm text-red-800">
            <p className="font-medium">Ketentuan Sanggahan:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>LJK dapat melakukan sanggahan dengan menyampaikan surat dan dokumen pendukung maksimal 5 hari kerja</li>
              <li>Jika melebihi 5 hari kerja tanpa mengisi form dan upload surat, status akan menjadi Negative Confirmation</li>
              <li>Pengawas akan melakukan approval terhadap sanggahan yang masuk</li>
              <li>Sanggahan yang diterima dapat dilakukan adjustment jumlah hari terlambat</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batas Waktu Sanggahan (Hari Kerja)
            </label>
            <input
              type="number"
              min="1"
              max="14"
              value={disputeSettings.maxWorkingDays}
              onChange={(e) => setDisputeSettings({...disputeSettings, maxWorkingDays: parseInt(e.target.value)})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Jumlah hari kerja (Senin-Jumat) untuk mengajukan sanggahan</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              &nbsp;
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={disputeSettings.autoRejectAfterExpiry}
                onChange={(e) => setDisputeSettings({...disputeSettings, autoRejectAfterExpiry: e.target.checked})}
                className="rounded text-red-600 mr-2"
              />
              <span className="text-sm">Auto Reject / Negative Confirmation jika melebihi batas waktu</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Persyaratan Dokumen
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={disputeSettings.requireSignedDocument}
                onChange={(e) => setDisputeSettings({...disputeSettings, requireSignedDocument: e.target.checked})}
                className="rounded text-red-600 mr-2"
              />
              <span className="text-sm">Wajib upload surat pendukung yang ditandatangani Direksi</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notifikasi
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={disputeSettings.notificationEmail}
                onChange={(e) => setDisputeSettings({...disputeSettings, notificationEmail: e.target.checked})}
                className="rounded text-red-600 mr-2"
              />
              <span className="text-sm">Kirim notifikasi email ke pengawas saat ada sanggahan baru</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Pengaturan Sanggahan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen Sistem
const SystemConfig = () => {
  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('irs_system_settings');
    return saved ? JSON.parse(saved) : {
      sessionTimeout: 60,
      enableAuditLog: true,
      logRetentionDays: 90,
      timezone: 'Asia/Jakarta',
      dateFormat: 'DD/MM/YYYY'
    };
  });

  useEffect(() => {
    localStorage.setItem('irs_system_settings', JSON.stringify(systemSettings));
  }, [systemSettings]);

  const handleSave = () => {
    localStorage.setItem('irs_system_settings', JSON.stringify(systemSettings));
    alert('Pengaturan sistem berhasil disimpan!');
  };

  const handleRestart = () => {
    if (window.confirm('Restart sistem akan memerlukan reload halaman. Lanjutkan?')) {
      window.location.reload();
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-red-900 mb-4">Pengaturan Sistem</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Session Timeout (menit)
            </label>
            <input
              type="number"
              min="5"
              max="240"
              value={systemSettings.sessionTimeout}
              onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: parseInt(e.target.value)})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Zona Waktu
            </label>
            <select
              value={systemSettings.timezone}
              onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
              <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
              <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retensi Log Audit (hari)
            </label>
            <select
              value={systemSettings.logRetentionDays}
              onChange={(e) => setSystemSettings({...systemSettings, logRetentionDays: parseInt(e.target.value)})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="30">30 Hari</option>
              <option value="90">90 Hari</option>
              <option value="180">180 Hari</option>
              <option value="365">1 Tahun</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format Tanggal
            </label>
            <select
              value={systemSettings.dateFormat}
              onChange={(e) => setSystemSettings({...systemSettings, dateFormat: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="DD-MMM-YYYY">DD-MMM-YYYY</option>
            </select>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={systemSettings.enableAuditLog}
              onChange={(e) => setSystemSettings({...systemSettings, enableAuditLog: e.target.checked})}
              className="rounded text-red-600 mr-2"
            />
            <span className="font-medium">Aktifkan Log Audit</span>
          </label>
          <p className="text-xs text-gray-500 ml-6">Mencatat semua aktivitas user untuk keperluan audit</p>
        </div>

        <div className="pt-4 border-t border-gray-200 flex space-x-4">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
          <button
            onClick={handleRestart}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restart Sistem</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">* Restart diperlukan untuk menerapkan perubahan session timeout</p>
      </div>
    </div>
  );
};

export default AdminSettings;