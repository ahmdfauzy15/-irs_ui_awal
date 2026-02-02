import React from 'react';
import { Filter, RotateCcw, Search } from 'lucide-react';

const FilterSection = ({ filters, setFilters, searchTerm, setSearchTerm, onReset }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Filter Laporan</h3>
          </div>
          <button
            onClick={onReset}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center space-x-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Bersihkan Filter</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Jenis Laporan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Laporan
            </label>
            <select
              value={filters.jenis}
              onChange={(e) => handleFilterChange('jenis', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Jenis</option>
              <option value="keuangan">Laporan Keuangan</option>
              <option value="kinerja">Laporan Kinerja</option>
              <option value="audit">Laporan Audit</option>
              <option value="kepatuhan">Laporan Kepatuhan</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="berhasil">Berhasil</option>
              <option value="terlambat">Terlambat</option>
              <option value="tidak-berhasil">Tidak Berhasil</option>
            </select>
          </div>

          {/* Periode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periode
            </label>
            <select
              value={filters.periode}
              onChange={(e) => handleFilterChange('periode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Periode</option>
              <option value="q1">Q1 2023</option>
              <option value="q2">Q2 2023</option>
              <option value="q3">Q3 2023</option>
              <option value="q4">Q4 2023</option>
              <option value="2022">Tahun 2022</option>
            </select>
          </div>

          {/* Tanggal Submit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Submit
            </label>
            <input
              type="date"
              value={filters.tanggal}
              onChange={(e) => handleFilterChange('tanggal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Search Box */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari laporan APOLO..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button className="btn-primary px-6">
            Terapkan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;