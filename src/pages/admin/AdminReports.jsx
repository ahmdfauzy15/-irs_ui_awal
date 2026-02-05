// src/pages/admin/AdminReports.jsx
import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Database,
  Calendar,
  Download,
  Filter,
  ChevronDown,
  Activity
} from 'lucide-react';

const AdminReports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('all');

  const stats = [
    { label: 'Total Pengajuan', value: '1,234', change: '+12%', icon: FileText, color: 'from-red-500 to-red-600' },
    { label: 'User Aktif', value: '456', change: '+8%', icon: Users, color: 'from-green-500 to-green-600' },
    { label: 'ARO Terdaftar', value: '2,345', change: '+15%', icon: Database, color: 'from-blue-500 to-blue-600' },
    { label: 'Rata-rata Waktu Proses', value: '2.3 Hari', change: '-0.5', icon: Activity, color: 'from-purple-500 to-purple-600' },
  ];

  const topApplications = [
    { name: 'APOLO', count: 567, percentage: 45 },
    { name: 'SIPINA', count: 432, percentage: 35 },
    { name: 'E-Reporting', count: 235, percentage: 19 },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Laporan Sistem</h1>
            <p className="text-gray-600">Analitik dan statistik sistem IRS</p>
          </div>
          <button className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Laporan
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl border border-red-200 shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Periode
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="today">Hari Ini</option>
              <option value="week">Minggu Ini</option>
              <option value="month">Bulan Ini</option>
              <option value="quarter">Kuartal Ini</option>
              <option value="year">Tahun Ini</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Jenis Laporan
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">Semua Laporan</option>
              <option value="applications">Pengajuan Aplikasi</option>
              <option value="users">Pengguna</option>
              <option value="performance">Kinerja Sistem</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Status Sistem
            </label>
            <div className="px-4 py-2.5 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-bold">Semua sistem berjalan normal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 text-sm opacity-90">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {stat.change} dari periode sebelumnya
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Applications */}
        <div className="bg-white rounded-2xl border border-red-200 shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-red-600" />
            Top Aplikasi
          </h3>
          <div className="space-y-4">
            {topApplications.map((app, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{app.name}</span>
                  <span className="text-sm text-gray-600">{app.count} pengajuan</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 h-2.5 rounded-full" 
                    style={{ width: `${app.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-right">{app.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl border border-red-200 shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-600" />
            Status Sistem
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-green-900">APOLO API</span>
              </div>
              <span className="text-green-700 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-green-900">SIPINA Integration</span>
              </div>
              <span className="text-green-700 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-green-900">Database Server</span>
              </div>
              <span className="text-green-700 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import Check icon
import { Check } from 'lucide-react';

export default AdminReports;