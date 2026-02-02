import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

const WelcomeBanner = () => {
  return (
    <div className="sticky top-0 z-30 bg-gradient-to-r from-red-600 to-red-700 border-b border-red-500 shadow-lg">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-6 md:mb-0 md:mr-8 flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Selamat datang di Sistem Pelaporan Terpusat</h2>
            <p className="text-blue-100 mb-6">
              Kelola dan pantau semua laporan APOLO, E-Reporting, dan SIPINA dalam satu dashboard yang terintegrasi
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Dashboard Real-time</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="font-medium">24/7 Monitoring</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <BarChart3 className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;