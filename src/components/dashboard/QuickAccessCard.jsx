// src/components/dashboard/QuickAccessCard.jsx
import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';

const QuickAccessCard = ({ title, description, reports, color, link }) => {
  // Mapping untuk warna dan logo
  const config = {
    apolo: {
      gradient: 'bg-gradient-to-br from-white to-slate-100',
      text: 'text-pink-600',
      bg: 'bg-pink-50 border-pink-100 hover:bg-pink-100',
      logo: "/apolo-logo.png" 
    },
    ereporting: {
      gradient: 'bg-gradient-to-br from-white to-slate-100',
      text: 'text-green-600',
      bg: 'bg-green-50 border-green-100 hover:bg-green-100',
      logo: '/ereporting-logo.png'
    },
    sipina: {
      gradient: 'bg-gradient-to-br from-white to-slate-100',
      text: 'text-blue-600',      
      bg: 'bg-blue-50 border-blue-100 hover:bg-blue-100',
      logo: '/sipina-logo.png'
    }
  };

  const currentConfig = config[color] || config.apolo;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 ${currentConfig.gradient} rounded-xl flex items-center justify-center`}>
            {/* Logo gambar */}
            <img 
              src={currentConfig.logo} 
              alt={`${title} logo`}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                // Fallback ke inisial jika gambar tidak ditemukan
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<span class="text-white font-bold text-lg">${title.charAt(0)}</span>`;
              }}
            />
          </div>
          <span className={`text-xs font-semibold ${currentConfig.text} px-3 py-1 rounded-full border ${currentConfig.bg.replace('hover:bg', 'bg').replace('50', '100')}`}>
            {title}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-500">
            <FileText className="w-4 h-4" />
            <span className="text-sm">{reports} Laporan</span>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${currentConfig.text} hover:opacity-80 font-medium text-sm flex items-center space-x-1 transition-colors`}
          >
            <span>Akses</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessCard;