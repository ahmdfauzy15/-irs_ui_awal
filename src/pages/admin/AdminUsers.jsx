import React, { useState } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp, Mail, Filter, BookOpen, FileText, Download } from 'lucide-react';

const AFAQ = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'general', label: 'Umum' },
    { id: 'apolo', label: 'APOLO' },
    { id: 'ereporting', label: 'E-Reporting' },
    { id: 'sipina', label: 'SIPINA' },
    { id: 'technical', label: 'Teknis' },
  ];

  const faqData = [
    {
      id: 1,
      category: 'general',
      question: 'Apa itu Sistem Pelaporan Terpusat IRS?',
      answer: 'Sistem Pelaporan Terpusat IRS adalah platform terintegrasi untuk mengelola berbagai laporan keuangan dan operasional dalam satu sistem. Termasuk modul APOLO, E-Reporting, dan SIPINA.'
    },
    {
      id: 2,
      category: 'apolo',
      question: 'Bagaimana cara mengirim laporan APOLO?',
      answer: '1. Masuk ke halaman Laporan APOLO\n2. Klik tombol "Tambah Laporan"\n3. Isi formulir dengan data yang diperlukan\n4. Unggah dokumen pendukung\n5. Klik "Kirim" untuk mengajukan laporan'
    },
    {
      id: 3,
      category: 'ereporting',
      question: 'Kapan deadline pelaporan E-Reporting?',
      answer: 'Deadline pelaporan E-Reporting adalah setiap tanggal 10 bulan berikutnya. Pastikan laporan disampaikan tepat waktu untuk menghindari sanksi.'
    },
    {
      id: 4,
      category: 'sipina',
      question: 'Apa yang harus dilakukan jika laporan SIPINA ditolak?',
      answer: 'Periksa notifikasi penolakan, perbaiki data sesuai arahan, dan kirim ulang laporan. Sistem akan memberikan petunjuk revisi yang diperlukan.'
    },
    {
      id: 5,
      category: 'technical',
      question: 'Bagaimana cara reset password?',
      answer: 'Klik "Lupa Password" di halaman login, masukkan email terdaftar, dan ikuti instruksi yang dikirim ke email Anda.'
    },
    {
      id: 6,
      category: 'general',
      question: 'Apakah sistem IRS tersedia 24/7?',
      answer: 'Ya, sistem IRS dapat diakses 24/7 untuk pelaporan. Dukungan teknis tersedia pada jam kerja Senin-Jumat 08:00-17:00.'
    },
  ];

  const documentations = [
    {
      id: 1,
      title: 'Panduan Pengguna IRS',
      description: 'Panduan lengkap penggunaan sistem IRS untuk semua pengguna',
      category: 'Umum',
      size: '2.5 MB',
      format: 'PDF',
      icon: BookOpen
    },
    {
      id: 2,
      title: 'Manual APOLO',
      description: 'Dokumentasi lengkap modul APOLO dan cara penggunaannya',
      category: 'APOLO',
      size: '1.8 MB',
      format: 'PDF',
      icon: FileText
    },
    {
      id: 3,
      title: 'Petunjuk E-Reporting',
      description: 'Panduan teknis untuk pelaporan elektronik',
      category: 'E-Reporting',
      size: '1.2 MB',
      format: 'PDF',
      icon: FileText
    },
    {
      id: 4,
      title: 'Dokumentasi SIPINA',
      description: 'Manual penggunaan sistem pelaporan SIPINA',
      category: 'SIPINA',
      size: '1.5 MB',
      format: 'PDF',
      icon: FileText
    },
    {
      id: 5,
      title: 'API Documentation',
      description: 'Dokumentasi API untuk integrasi sistem',
      category: 'Teknis',
      size: '800 KB',
      format: 'PDF',
      icon: BookOpen
    },
    {
      id: 6,
      title: 'Troubleshooting Guide',
      description: 'Panduan mengatasi masalah umum pada sistem',
      category: 'Teknis',
      size: '1.1 MB',
      format: 'PDF',
      icon: BookOpen
    },
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredDocs = documentations.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.category.toLowerCase().includes(activeCategory);
    const matchesSearch = searchTerm === '' || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-900">IRS Help Center</h1>
              <p className="text-sm sm:text-base text-red-600">Integrated Reporting System</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl border border-red-100 shadow-lg p-2 mb-6">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'faq'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">FAQ</span>
              </button>
              <button
                onClick={() => setActiveTab('docs')}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'docs'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Dokumentasi</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-xl border border-red-100 shadow-lg p-4 sm:p-6 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
              </div>
              <input
                type="text"
                placeholder="Cari pertanyaan, dokumentasi, atau kata kunci..."
                className="pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 w-full border border-red-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-900 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-red-100 to-white rounded-lg border border-red-200">
                <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-900">Filter Kategori</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm lg:text-base ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                      : 'bg-gradient-to-r from-red-50 to-white text-red-700 border border-red-200 hover:border-red-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        {activeTab === 'faq' && (
          <div className="space-y-3 sm:space-y-4 mb-8">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-red-100 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-4 sm:p-6 text-left flex items-start justify-between hover:bg-red-50/30 transition-colors"
                  >
                    <div className="flex-1 pr-3 sm:pr-4">
                      <div className="flex flex-col gap-2 mb-2">
                        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-900 leading-snug">{faq.question}</h3>
                        <span className="text-xs px-2 py-1 bg-gradient-to-r from-red-100 to-white text-red-700 rounded-full border border-red-200 w-fit">
                          {categories.find(c => c.id === faq.category)?.label}
                        </span>
                      </div>
                    </div>
                    <div className={`p-1.5 sm:p-2 rounded-lg border flex-shrink-0 ${openItems.includes(faq.id) ? 'border-red-200 bg-red-50' : 'border-red-100'}`}>
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="w-4 h-4 text-red-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </button>
                  
                  {openItems.includes(faq.id) && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-red-100">
                      <div className="p-3 sm:p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                        <p className="text-xs sm:text-sm lg:text-base text-red-700 whitespace-pre-line leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12 bg-white rounded-2xl border border-red-100 shadow-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-100 to-white rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-red-900 mb-2">Tidak ditemukan</h3>
                <p className="text-red-600 max-w-md mx-auto text-sm sm:text-base px-4">
                  Tidak ada FAQ yang sesuai dengan pencarian Anda. Coba kata kunci lain.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Documentation Content */}
        {activeTab === 'docs' && (
          <div className="space-y-4 sm:space-y-6 mb-8">
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 sm:p-6 text-white">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Dokumentasi Sistem IRS</h2>
              <p className="text-red-100 text-xs sm:text-sm lg:text-base">
                Unduh panduan lengkap dan dokumentasi teknis untuk sistem Integrated Reporting System
              </p>
            </div>

            {filteredDocs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredDocs.map((doc) => {
                  const Icon = doc.icon;
                  return (
                    <div
                      key={doc.id}
                      className="bg-white rounded-xl border border-red-100 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-red-300"
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="p-2 sm:p-3 bg-gradient-to-br from-red-100 to-red-50 rounded-lg border border-red-200">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                          </div>
                          <span className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
                            {doc.category}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-900 mb-2">{doc.title}</h3>
                        <p className="text-xs sm:text-sm text-red-600 mb-3 sm:mb-4 line-clamp-2">{doc.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-red-500">
                            <span className="px-2 py-1 bg-red-50 rounded border border-red-200">{doc.format}</span>
                            <span className="hidden sm:inline">{doc.size}</span>
                          </div>
                          <button className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-lg hover:shadow-lg transition-all text-xs sm:text-sm">
                            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>Unduh</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 bg-white rounded-2xl border border-red-100 shadow-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-100 to-white rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-red-900 mb-2">Tidak ditemukan</h3>
                <p className="text-red-600 max-w-md mx-auto text-sm sm:text-base px-4">
                  Tidak ada dokumentasi yang sesuai dengan pencarian Anda.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Contact Support Card */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 text-center text-white">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2">Masih ada pertanyaan?</h3>
            <p className="text-red-100 mb-6 max-w-md mx-auto text-xs sm:text-sm lg:text-base px-4">
              Tim dukungan kami siap membantu Anda dengan pertanyaan lebih lanjut
            </p>
            <button className="bg-white text-red-700 hover:bg-red-50 font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all shadow-md hover:shadow-lg text-sm sm:text-base">
              Hubungi Dukungan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AFAQ;