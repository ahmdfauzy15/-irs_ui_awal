import React, { useState, useEffect } from 'react';
import { XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

const AntiGratificationBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // SELALU tampilkan banner setiap refresh
    const showBanner = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 50);
    };

    // Tampilkan banner dengan sedikit delay untuk animasi
    const timer = setTimeout(showBanner, 300);
    
    // Cleanup timeout
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleAgree = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 200);
  };

  // Jangan render apa-apa jika tidak visible
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="relative min-h-screen flex items-center justify-center p-3">
        <div className={`relative w-full max-w-md mx-auto transform transition-all duration-300 ease-out ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95'}`}>
          
          {/* Close Button */}
          <button
            onClick={handleAgree}
            className="absolute -top-2 -right-2 z-50 p-1.5 bg-white text-red-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 border border-red-200"
            aria-label="Tutup banner"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>

          {/* Main Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-600 to-red-700 border-2 border-white/20 shadow-2xl">
            
            {/* Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <ShieldCheckIcon className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-bold text-white text-center tracking-tight">
                  STOP GRATIFIKASI
                </h1>
              </div>
              <p className="text-white/90 text-sm text-center mt-1">Otoritas Jasa Keuangan</p>
            </div>

            {/* Content */}
            <div className="p-5 bg-gradient-to-b from-white/10 to-transparent">
              
              {/* Main Message */}
              <div className="mb-4">
                <h2 className="text-white font-bold text-base mb-2">
                  OJK Tegas Menolak Gratifikasi
                </h2>
                <p className="text-white/90 text-sm leading-relaxed">
                  Dalam mewujudkan tata kelola yang bersih dan bebas korupsi, OJK dengan tegas menolak segala bentuk gratifikasi untuk menjaga independensi dan objektivitas.
                </p>
              </div>

              {/* Key Points */}
              <div className="space-y-2 mb-5">
                {[
                  "Tolak semua bentuk pemberian tidak wajar",
                  "Transparan dalam setiap layanan publik",
                  "Akuntabel dan dapat dipertanggungjawabkan"
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <p className="text-white/80 text-xs flex-1">{point}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="font-bold text-white text-xs">0%</div>
                    <div className="text-white/70 text-[10px]">Toleransi</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="font-bold text-white text-xs">100%</div>
                    <div className="text-white/70 text-[10px]">Integritas</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="font-bold text-white text-xs">24/7</div>
                    <div className="text-white/70 text-[10px]">Pengawasan</div>
                  </div>
                </div>
              </div>

              {/* Single Agree Button */}
              <div className="text-center">
                <button
                  onClick={handleAgree}
                  className="bg-white hover:bg-gray-100 text-red-600 font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 text-sm w-full shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  SETUJU & LANJUTKAN
                </button>
                <p className="text-white/60 text-xs mt-2">
                  Dengan menekan tombol ini, Anda mendukung program Anti Gratifikasi OJK
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 py-2 px-4">
              <div className="flex items-center justify-between">
                <p className="text-white/70 text-[10px]">Bersih • Transparan • Akuntabel</p>
                <p className="text-white/70 text-[10px]">© 2024 OJK RI</p>
              </div>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-red-600/10 to-red-500/20 rounded-xl blur-md -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default AntiGratificationBanner;