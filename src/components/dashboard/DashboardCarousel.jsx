import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  TrendingUp, 
  Shield,
  Bell
} from 'lucide-react';

const DashboardCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Deadline Pelaporan Q1 2024',
      description: 'Batas waktu pengiriman laporan keuangan Q1 2024 adalah 30 April 2024.',
      icon: AlertTriangle,
      color: 'bg-gradient-to-r from-red-600 to-red-700',
      link: '/apolo'
    },
    {
      id: 2,
      title: 'Performa Sistem Optimal',
      description: 'Laporan diproses 30% lebih cepat dari rata-rata bulan lalu.',
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      link: '/dashboard'
    },
    {
      id: 3,
      title: 'Keamanan Sistem Terbaru',
      description: 'Sistem telah diperbarui dengan enkripsi end-to-end terbaru.',
      icon: Shield,
      color: 'bg-gradient-to-r from-red-700 to-red-800',
      link: '/about'
    },
    {
      id: 4,
      title: 'Notifikasi Penting',
      description: 'Ada 3 laporan yang memerlukan perhatian segera.',
      icon: Bell,
      color: 'bg-gradient-to-r from-red-600 to-red-700',
      link: '/notifications'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="bg-gradient-to-b from-white to-red-50/30 rounded-xl shadow-sm border border-red-100 overflow-hidden">
        <div className="relative h-56 md:h-48">
          {slides.map((slide, index) => {
            const Icon = slide.icon;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                {/* Header dengan gradient merah */}
                <div className={`${slide.color} h-24 md:h-20 relative`}>
                  <div className="p-4 md:p-6 h-full flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {slide.title}
                      </h3>
                    </div>
                  </div>
                </div>
                
                {/* Konten */}
                <div className="p-4 md:p-6 bg-white">
                  <p className="text-red-800 text-sm md:text-base">
                    {slide.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 md:p-2 rounded-full shadow-md border border-red-200 transition-colors"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-red-700" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 md:p-2 rounded-full shadow-md border border-red-200 transition-colors"
          aria-label="Slide selanjutnya"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-red-700" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-red-600 w-6 md:w-8' 
                  : 'bg-red-300 hover:bg-red-400'
              }`}
              aria-label={`Pergi ke slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCarousel;