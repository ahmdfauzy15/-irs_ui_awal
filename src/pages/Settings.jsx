import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Save,
  RotateCcw,
  Globe,
  Clock,
  Lock,
  Mail,
  Smartphone,
  Volume2,
  Calendar,
  UserCheck,
  LogOut,
  Eye
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      language: 'id',
      timezone: 'Asia/Jakarta',
      dateFormat: 'DD/MM/YYYY',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      soundEnabled: true,
      reportReminders: true,
      deadlineAlerts: true,
      systemUpdates: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginAlerts: true,
      autoLogout: true,
    }
  });

  const [tempSettings, setTempSettings] = useState({ ...settings });

  const tabs = [
    { id: 'general', label: 'Umum', icon: SettingsIcon, color: 'text-red-600' },
    { id: 'notifications', label: 'Notifikasi', icon: Bell, color: 'text-red-600' },
    { id: 'security', label: 'Keamanan', icon: Shield, color: 'text-red-600' },
  ];

  const handleSettingChange = (category, key, value) => {
    setTempSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    setSettings({ ...tempSettings });
  };

  const handleReset = () => {
    setTempSettings({ ...settings });
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-red-800 mb-2">
            <div className="flex items-center space-x-2 mb-1">
              <Globe className="w-4 h-4" />
              <span>Bahasa</span>
            </div>
          </label>
          <select
            value={tempSettings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="w-full px-4 py-2.5 border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
          >
            <option value="id">🇮🇩 Bahasa Indonesia</option>
            <option value="en">🇺🇸 English</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-red-800 mb-2">
            <div className="flex items-center space-x-2 mb-1">
              <Clock className="w-4 h-4" />
              <span>Zona Waktu</span>
            </div>
          </label>
          <select
            value={tempSettings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-4 py-2.5 border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
          >
            <option value="Asia/Jakarta">WIB (Jakarta)</option>
            <option value="Asia/Makassar">WITA (Makassar)</option>
            <option value="Asia/Jayapura">WIT (Jayapura)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-red-800 mb-2">
            <div className="flex items-center space-x-2 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Format Tanggal</span>
            </div>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].map((format) => (
              <button
                key={format}
                onClick={() => handleSettingChange('general', 'dateFormat', format)}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  tempSettings.general.dateFormat === format
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 shadow-md'
                    : 'bg-gradient-to-r from-red-50 to-white text-red-700 border-red-200 hover:border-red-300'
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      {[
        { key: 'emailNotifications', label: 'Notifikasi Email', description: 'Kirim notifikasi ke email Anda', icon: Mail },
        { key: 'pushNotifications', label: 'Notifikasi Push', description: 'Notifikasi real-time di browser', icon: Smartphone },
        { key: 'soundEnabled', label: 'Suara Notifikasi', description: 'Mainkan suara saat ada notifikasi', icon: Volume2 },
        { key: 'reportReminders', label: 'Pengingat Laporan', description: 'Pengingat untuk laporan yang belum dikirim', icon: Bell },
        { key: 'deadlineAlerts', label: 'Alert Deadline', description: 'Alert untuk deadline yang mendekati', icon: Calendar },
        { key: 'systemUpdates', label: 'Update Sistem', description: 'Informasi update sistem', icon: SettingsIcon },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-red-50 to-white border border-red-100 hover:border-red-200 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg border border-red-200">
                <Icon className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-red-900">{item.label}</p>
                <p className="text-sm text-red-600 mt-1">{item.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', item.key, !tempSettings.notifications[item.key])}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                tempSettings.notifications[item.key] ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-red-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ${
                  tempSettings.notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-white border border-red-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg border border-red-200">
              <UserCheck className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="font-bold text-red-900">Two-Factor Authentication</p>
              <p className="text-sm text-red-600">Tambah keamanan ekstra dengan 2FA</p>
            </div>
          </div>
          <button
            onClick={() => handleSettingChange('security', 'twoFactorAuth', !tempSettings.security.twoFactorAuth)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              tempSettings.security.twoFactorAuth ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-red-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ${
                tempSettings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {tempSettings.security.twoFactorAuth && (
          <div className="mt-4 p-3 bg-gradient-to-r from-red-100 to-white rounded-lg border border-red-200">
            <p className="text-sm text-red-800">
              ⚠️ Aktifkan 2FA untuk keamanan maksimal. Anda akan memerlukan kode dari aplikasi authenticator setiap kali login.
            </p>
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-white border border-red-100">
        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-white rounded-lg border border-red-200">
              <Clock className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="font-bold text-red-900">Timeout Sesi</p>
              <p className="text-sm text-red-600">Waktu tunggu sebelum auto logout</p>
            </div>
          </div>
          <select
            value={tempSettings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-4 py-2.5 border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900"
          >
            <option value={15}>15 menit</option>
            <option value={30}>30 menit</option>
            <option value={60}>1 jam</option>
            <option value={120}>2 jam</option>
          </select>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-white border border-red-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg border border-red-200">
              <Eye className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="font-bold text-red-900">Alert Login Baru</p>
              <p className="text-sm text-red-600">Kirim notifikasi saat login dari device baru</p>
            </div>
          </div>
          <button
            onClick={() => handleSettingChange('security', 'loginAlerts', !tempSettings.security.loginAlerts)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              tempSettings.security.loginAlerts ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-red-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ${
                tempSettings.security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-white border border-red-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg border border-red-200">
              <Lock className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="font-bold text-red-900">Auto Logout</p>
              <p className="text-sm text-red-600">Otomatis logout saat idle</p>
            </div>
          </div>
          <button
            onClick={() => handleSettingChange('security', 'autoLogout', !tempSettings.security.autoLogout)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              tempSettings.security.autoLogout ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-red-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ${
                tempSettings.security.autoLogout ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white p-4 lg:p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-red-900">Pengaturan</h1>
              <p className="text-red-600">Kelola pengaturan akun dan preferensi sistem</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-50 to-white text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg font-medium"
            >
              <Save className="w-4 h-4" />
              <span>Simpan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-white to-red-50/50 rounded-2xl border border-red-100 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
              <h3 className="text-lg font-bold text-red-900">Menu Pengaturan</h3>
            </div>
            <div className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                      : 'text-red-700 hover:bg-red-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
              
              {/* Logout Button */}
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg mt-4 text-red-600 hover:bg-red-50 transition-colors border-t border-red-100 pt-4">
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Keluar Akun</span>
              </button>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-gradient-to-br from-white to-red-50/50 rounded-2xl border border-red-100 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
              <h2 className="text-xl font-bold text-red-900">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-red-600 mt-1">
                {activeTab === 'general' && 'Pengaturan umum sistem dan bahasa'}
                {activeTab === 'notifications' && 'Kelola preferensi notifikasi'}
                {activeTab === 'security' && 'Pengaturan keamanan akun'}
              </p>
            </div>
            
            <div className="p-6">
              {activeTab === 'general' && renderGeneralSettings()}
              {activeTab === 'notifications' && renderNotificationSettings()}
              {activeTab === 'security' && renderSecuritySettings()}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-white to-red-50/50 p-4 rounded-xl border border-red-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-900">5</p>
                  <p className="text-sm text-red-600 font-medium">Pengaturan Umum</p>
                </div>
                <SettingsIcon className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-red-50/50 p-4 rounded-xl border border-red-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-900">6</p>
                  <p className="text-sm text-red-600 font-medium">Notifikasi</p>
                </div>
                <Bell className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-red-50/50 p-4 rounded-xl border border-red-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-900">4</p>
                  <p className="text-sm text-red-600 font-medium">Fitur Keamanan</p>
                </div>
                <Shield className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-red-50/50 p-4 rounded-xl border border-red-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-900">30</p>
                  <p className="text-sm text-red-600 font-medium">Menit Sesi</p>
                </div>
                <Clock className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;