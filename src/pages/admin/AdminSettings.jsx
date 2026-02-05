// src/pages/admin/AdminSettings.jsx
import React, { useState } from 'react';
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
  Clock
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AdminSettings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/').pop() || 'access');
  
  const tabs = [
    { id: 'access', label: 'Hak Akses', icon: Shield, badge: "Master" },
    { id: 'apps', label: 'Aplikasi', icon: Database },
    { id: 'aro', label: 'Master ARO', icon: Layers },
    { id: 'audit', label: 'Log Audit', icon: Eye },
    { id: 'system', label: 'Sistem', icon: Settings },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'access':
        return <AccessSettings />;
      case 'apps':
        return <AppSettings />;
      case 'aro':
        return <AROSettings />;
      case 'audit':
        return <AuditSettings />;
      case 'system':
        return <SystemSettings />;
      default:
        return <AccessSettings />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Admin</h1>
        <p className="text-gray-600">Konfigurasi sistem administrator IRS</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-lg p-6 mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
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

        {/* Content */}
        <div className="border-t border-red-100 pt-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Sub Components
const AccessSettings = () => (
  <div>
    <h3 className="text-lg font-bold text-gray-900 mb-4">Master Hak Akses</h3>
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Level Akses Default</label>
          <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
            <option>Level 1 - Basic User</option>
            <option>Level 2 - Standard User</option>
            <option>Level 3 - Advanced User</option>
            <option>Level 4 - Manager</option>
            <option>Level 5 - Administrator</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Durasi Sesi (menit)</label>
          <input
            type="number"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            defaultValue="60"
          />
        </div>
      </div>
      <button className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700">
        <Save className="w-4 h-4 inline mr-2" />
        Simpan Perubahan
      </button>
    </div>
  </div>
);

const AppSettings = () => (
  <div>
    <h3 className="text-lg font-bold text-gray-900 mb-4">Pengaturan Aplikasi</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
        <div>
          <p className="font-medium text-red-900">SIPINA Integration</p>
          <p className="text-sm text-red-600">Status: Aktif</p>
        </div>
        <button className="px-3 py-1 bg-white border border-red-300 text-red-700 text-sm rounded hover:bg-red-50">
          Konfigurasi
        </button>
      </div>
      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
        <div>
          <p className="font-medium text-red-900">APOLO API</p>
          <p className="text-sm text-red-600">Status: Aktif</p>
        </div>
        <button className="px-3 py-1 bg-white border border-red-300 text-red-700 text-sm rounded hover:bg-red-50">
          Konfigurasi
        </button>
      </div>
    </div>
  </div>
);

const AROSettings = () => (
  <div>
    <h3 className="text-lg font-bold text-gray-900 mb-4">Master Data ARO</h3>
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700 mb-3">Daftar modul ARO yang tersedia:</p>
        <ul className="space-y-2">
          <li className="flex items-center justify-between p-2 bg-white rounded border">
            <span>APOLO-ARO-MODULE-1</span>
            <span className="text-sm text-gray-600">Strategi Anti Fraud</span>
          </li>
          <li className="flex items-center justify-between p-2 bg-white rounded border">
            <span>APOLO-ARO-MODULE-2</span>
            <span className="text-sm text-gray-600">AP/KAP</span>
          </li>
          <li className="flex items-center justify-between p-2 bg-white rounded border">
            <span>APOLO-ARO-MODULE-3</span>
            <span className="text-sm text-gray-600">TPPU/TPPT/PPSPM</span>
          </li>
        </ul>
      </div>
      <button className="px-4 py-2 border border-red-300 text-red-700 font-medium rounded-lg hover:bg-red-50">
        + Tambah Modul ARO
      </button>
    </div>
  </div>
);

const AuditSettings = () => (
  <div>
    <h3 className="text-lg font-bold text-gray-900 mb-4">Log Audit Sistem</h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">Retensi Log</p>
          <p className="text-sm text-gray-600">Durasi penyimpanan log audit</p>
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg">
          <option>30 Hari</option>
          <option>90 Hari</option>
          <option>1 Tahun</option>
          <option>Selamanya</option>
        </select>
      </div>
      <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700">
        <Eye className="w-4 h-4 inline mr-2" />
        Lihat Log Terbaru
      </button>
    </div>
  </div>
);

const SystemSettings = () => (
  <div>
    <h3 className="text-lg font-bold text-gray-900 mb-4">Pengaturan Sistem</h3>
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifikasi Email
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-red-600 mr-2" defaultChecked />
              <span className="text-sm">Pengajuan baru</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-red-600 mr-2" defaultChecked />
              <span className="text-sm">Approval/Rejection</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-red-600 mr-2" />
              <span className="text-sm">Laporan bulanan</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Keamanan
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-red-600 mr-2" defaultChecked />
              <span className="text-sm">Wajib 2FA untuk admin</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-red-600 mr-2" />
              <span className="text-sm">Log IP address</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-red-600 mr-2" defaultChecked />
              <span className="text-sm">Session timeout</span>
            </label>
          </div>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-200">
        <button className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700">
          <RefreshCw className="w-4 h-4 inline mr-2" />
          Restart Sistem
        </button>
        <p className="text-xs text-gray-500 mt-2">* Restart diperlukan untuk menerapkan perubahan sistem</p>
      </div>
    </div>
  </div>
);

export default AdminSettings;