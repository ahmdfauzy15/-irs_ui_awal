import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Loader,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  AlertCircle,
  Globe,
  Shield,
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Download,
  Info,
  Clock,
  FileCheck,
  Users,
  Building,
  Database,
  Search,
  Zap
} from 'lucide-react';

// Knowledge Base untuk IRS OJK
const OJK_KNOWLEDGE_BASE = {
  systems: {
    apolo: {
      name: "APOLO",
      fullName: "Aplikasi Pelaporan Online",
      description: "Sistem pelaporan online OJK untuk Lembaga Jasa Keuangan",
      purpose: "Menyampaikan laporan keuangan, kinerja, dan kepatuhan LJK",
      features: [
        "Laporan keuangan bulanan/triwulan/tahunan",
        "Laporan GCG (Good Corporate Governance)",
        "Laporan risiko dan manajemen",
        "Laporan transaksi dan operasional"
      ],
      url: "https://apolo.ojk.go.id",
      color: "red",
      icon: Building
    },
    ereporting: {
      name: "E-Reporting",
      fullName: "Electronic Reporting",
      description: "Sistem pelaporan elektronik untuk emiten dan perusahaan publik",
      purpose: "Menyampaikan laporan keuangan dan informasi material",
      features: [
        "Laporan keuangan emiten",
        "Laporan informasi material",
        "Laporan kepemilikan saham",
        "Laporan corporate action"
      ],
      url: "https://ereporting.ojk.go.id",
      color: "amber",
      icon: FileCheck
    },
    sipina: {
      name: "SIPINA",
      fullName: "Sistem Informasi Nasabah Asing",
      description: "Sistem pelaporan informasi nasabah asing",
      purpose: "Pelaporan transaksi nasabah asing untuk kepatuhan PPSK",
      features: [
        "Laporan nasabah asing individu/korporasi",
        "Laporan transaksi valas",
        "Laporan sumber dana asing",
        "Laporan kepatuhan AML/CFT"
      ],
      url: "https://sipina.ojk.go.id",
      color: "purple",
      icon: Users
    }
  },

  deadlines: {
    apolo: {
      monthly: "Tanggal 30 setiap bulan",
      quarterly: "Tanggal 30 bulan setelah triwulan berakhir",
      annual: "Tanggal 30 April tahun berikutnya"
    },
    ereporting: {
      quarterly: "Tanggal 45 hari setelah triwulan berakhir",
      annual: "Tanggal 90 hari setelah tahun berakhir",
      material: "Segera setelah terjadi peristiwa material"
    },
    sipina: {
      monthly: "Tanggal 10 bulan berikutnya",
      quarterly: "Tanggal 15 bulan setelah triwulan berakhir"
    }
  },

  formats: {
    accepted: [
      { type: "PDF", maxSize: "50MB", notes: "Tidak terproteksi, teks selectable" },
      { type: "Excel (.xlsx, .xls)", maxSize: "50MB", notes: "Tanpa macro, format standar" },
      { type: "CSV (.csv)", maxSize: "50MB", notes: "Encoding UTF-8, separator koma" },
      { type: "ZIP (.zip)", maxSize: "100MB", notes: "Untuk multiple files, tidak ada executable" }
    ],
    rejected: [
      "File terproteksi password",
      "File corrupted/rusak",
      "File dengan ekstensi tidak dikenal",
      "File executable (.exe, .bat, etc)"
    ]
  },

  commonIssues: [
    {
      problem: "Login gagal",
      solution: "Reset password melalui link 'Lupa Password' atau hubungi helpdesk"
    },
    {
      problem: "Upload file gagal",
      solution: "Periksa ukuran file, format, dan koneksi internet"
    },
    {
      problem: "Submit error",
      solution: "Coba refresh halaman, clear cache, atau gunakan browser lain"
    },
    {
      problem: "Status pending terlalu lama",
      solution: "Hubungi helpdesk dengan nomor ticket yang diberikan"
    }
  ],

  contacts: {
    helpdesk: "(021) 2960-0000",
    email: "helpdesk@ojk.go.id",
    website: "https://www.ojk.go.id",
    workingHours: "Senin - Jumat, 08:00 - 16:00 WIB"
  }
};

// Komponen Banner Anti Gratifikasi
const AntiGratificationBanner = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-2xl w-full mx-4 animate-slide-in">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-red-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Konten Banner Anti Gratifikasi */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-white" />
              <h2 className="text-xl font-bold text-white">Anti Gratifikasi OJK</h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Otoritas Jasa Keuangan (OJK) berkomitmen untuk mewujudkan tata kelola yang baik 
              dan bebas dari praktik gratifikasi, korupsi, kolusi, dan nepotisme.
            </p>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-red-800 flex items-center mb-2">
                <AlertCircle className="w-5 h-5 mr-2" />
                Larangan Gratifikasi
              </h3>
              <p className="text-sm text-red-700">
                Seluruh pegawai OJK dan pemangku kepentingan dilarang memberikan atau menerima 
                gratifikasi yang berhubungan dengan jabatan dan berlawanan dengan kewajiban 
                atau tugasnya.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 flex items-center mb-3">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Cara Melaporkan
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Laporkan melalui UPG (Unit Pengendalian Gratifikasi) OJK</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Email: <strong className="text-red-600">upg@ojk.go.id</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Telepon: <strong className="text-red-600">(021) 2960-0000</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Website: <strong className="text-red-600">https://www.ojk.go.id</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 flex items-center mb-2">
                <Info className="w-5 h-5 mr-2 text-blue-600" />
                Sanksi
              </h3>
              <p className="text-sm text-gray-700">
                Berdasarkan Undang-Undang Nomor 20 Tahun 2001 tentang Pemberantasan Tindak Pidana Korupsi, 
                penerima gratifikasi dapat dipidana dengan pidana penjara seumur hidup atau pidana penjara 
                minimal 4 tahun dan maksimal 20 tahun, serta denda minimal Rp200 juta dan maksimal Rp1 miliar.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIAssistant = () => {
  const [showAntiGratifikasi, setShowAntiGratifikasi] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoClick = () => {
    setShowAntiGratifikasi(true);
  };

  const handleCloseBanner = () => {
    setShowAntiGratifikasi(false);
  };

  const isMobile = windowWidth < 640;

  return (
    <>
      {/* Floating Button - Logo Chat AI */}
      <button
        onClick={handleLogoClick}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        aria-label="Informasi Anti Gratifikasi"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full">
            <div className="w-full h-full bg-green-500 rounded-full animate-ping" />
          </div>
        </div>
        <div className="absolute -top-10 right-0 bg-red-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          🛡️ Anti Gratifikasi OJK
        </div>
      </button>

      {/* Banner Anti Gratifikasi Modal */}
      {showAntiGratifikasi && (
        <AntiGratificationBanner onClose={handleCloseBanner} />
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        
        .animate-fade-out {
          animation: fade-out 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default AIAssistant;