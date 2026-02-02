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

// Fungsi untuk memahami intent pengguna
const understandIntent = (query) => {
  const lowerQuery = query.toLowerCase();
  
  const intents = {
    apolo: ['apolo', 'laporan keuangan', 'lembaga jasa keuangan', 'ljk'],
    ereporting: ['e-reporting', 'emiten', 'perusahaan publik', 'saham'],
    sipina: ['sipina', 'nasabah asing', 'valas', 'aml', 'ppsk'],
    deadline: ['deadline', 'jatuh tempo', 'waktu', 'kapan'],
    format: ['format', 'file', 'ekstensi', 'ukuran', 'upload'],
    tutorial: ['cara', 'tutorial', 'panduan', 'step', 'langkah'],
    status: ['status', 'cek', 'tracking', 'riwayat'],
    problem: ['error', 'masalah', 'gagal', 'tidak bisa', 'trouble'],
    contact: ['kontak', 'hubungi', 'helpdesk', 'support', 'telepon']
  };

  const matchedIntents = [];
  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      matchedIntents.push(intent);
    }
  }

  return matchedIntents.length > 0 ? matchedIntents : ['general'];
};

// Fungsi untuk generate response
const generateResponse = (query, intents) => {
  const responses = [];

  const addSection = (title, content) => {
    responses.push(`**${title}**\n${content}`);
  };

  const addList = (title, items) => {
    const list = items.map(item => `• ${item}`).join('\n');
    responses.push(`**${title}**\n${list}`);
  };

  intents.forEach(intent => {
    switch(intent) {
      case 'apolo':
        const apolo = OJK_KNOWLEDGE_BASE.systems.apolo;
        addSection(`📊 **Sistem ${apolo.name}**`, 
          `${apolo.description}\n\n` +
          `**Tujuan:** ${apolo.purpose}\n\n` +
          `**Fitur Utama:**\n` +
          apolo.features.map(f => `• ${f}`).join('\n') + `\n\n` +
          `**⏰ Deadline:**\n` +
          `• **Bulanan:** ${OJK_KNOWLEDGE_BASE.deadlines.apolo.monthly}\n` +
          `• **Triwulanan:** ${OJK_KNOWLEDGE_BASE.deadlines.apolo.quarterly}\n` +
          `• **Tahunan:** ${OJK_KNOWLEDGE_BASE.deadlines.apolo.annual}`
        );
        break;

      case 'ereporting':
        const ereporting = OJK_KNOWLEDGE_BASE.systems.ereporting;
        addSection(`📈 **Sistem ${ereporting.name}**`, 
          `${ereporting.description}\n\n` +
          `**Tujuan:** ${ereporting.purpose}\n\n` +
          `**Fitur Utama:**\n` +
          ereporting.features.map(f => `• ${f}`).join('\n') + `\n\n` +
          `**⏰ Deadline:**\n` +
          `• **Triwulanan:** ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.quarterly}\n` +
          `• **Tahunan:** ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.annual}\n` +
          `• **Material:** ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.material}`
        );
        break;

      case 'sipina':
        const sipina = OJK_KNOWLEDGE_BASE.systems.sipina;
        addSection(`🌍 **Sistem ${sipina.name}**`, 
          `${sipina.description}\n\n` +
          `**Tujuan:** ${sipina.purpose}\n\n` +
          `**Fitur Utama:**\n` +
          sipina.features.map(f => `• ${f}`).join('\n') + `\n\n` +
          `**⏰ Deadline:**\n` +
          `• **Bulanan:** ${OJK_KNOWLEDGE_BASE.deadlines.sipina.monthly}\n` +
          `• **Triwulanan:** ${OJK_KNOWLEDGE_BASE.deadlines.sipina.quarterly}`
        );
        break;

      case 'deadline':
        addSection('📅 **Deadline Pelaporan IRS OJK**',
          `**APOLO:**\n` +
          `• 🗓️ **Bulanan:** ${OJK_KNOWLEDGE_BASE.deadlines.apolo.monthly}\n` +
          `• 🗓️ **Triwulanan:** ${OJK_KNOWLEDGE_BASE.deadlines.apolo.quarterly}\n` +
          `• 🗓️ **Tahunan:** ${OJK_KNOWLEDGE_BASE.deadlines.apolo.annual}\n\n` +
          
          `**E-REPORTING:**\n` +
          `• 🗓️ **Triwulanan:** ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.quarterly}\n` +
          `• 🗓️ **Tahunan:** ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.annual}\n` +
          `• ⚡ **Material:** ${OJK_KNOWLEDGE_BASE.deadlines.ereporting.material}\n\n` +
          
          `**SIPINA:**\n` +
          `• 🗓️ **Bulanan:** ${OJK_KNOWLEDGE_BASE.deadlines.sipina.monthly}\n` +
          `• 🗓️ **Triwulanan:** ${OJK_KNOWLEDGE_BASE.deadlines.sipina.quarterly}\n\n` +
          
          `⚠️ **Penting:**\n` +
          `• Submit minimal 3 hari sebelum deadline\n` +
          `• Hari libur tidak memperpanjang deadline\n` +
          `• Keterlambatan dikenakan sanksi administratif`
        );
        break;

      case 'format':
        addSection('📎 **Format File yang Diterima**',
          `✅ **DITERIMA:**\n` +
          OJK_KNOWLEDGE_BASE.formats.accepted.map(f => 
            `• **${f.type}** (maks ${f.maxSize}) - ${f.notes}`
          ).join('\n') + `\n\n` +
          
          `❌ **DITOLAK:**\n` +
          OJK_KNOWLEDGE_BASE.formats.rejected.map(f => `• ${f}`).join('\n') + `\n\n` +
          
          `💡 **Tips Upload:**\n` +
          `• Pastikan file tidak corrupt\n` +
          `• Cek ukuran sebelum upload\n` +
          `• Gunakan format standar\n` +
          `• Backup file sebelum submit`
        );
        break;

      case 'tutorial':
        addSection('🎯 **Panduan Pelaporan IRS**',
          `**📋 Langkah-langkah:**\n` +
          `1. **Login** ke portal IRS OJK\n` +
          `2. **Pilih** sistem yang sesuai\n` +
          `3. **Buat** laporan baru\n` +
          `4. **Isi** data periode dan informasi\n` +
          `5. **Upload** dokumen pendukung\n` +
          `6. **Review** dan verifikasi data\n` +
          `7. **Submit** laporan\n` +
          `8. **Simpan** nomor ticket/refrensi\n\n` +
          
          `**🏆 Best Practices:**\n` +
          `• Siapkan data sebelum login\n` +
          `• Gunakan koneksi internet stabil\n` +
          `• Simpan draft secara berkala\n` +
          `• Cek preview sebelum submit\n` +
          `• Download bukti submit`
        );
        break;

      case 'status':
        addSection('🔍 **Cek Status Laporan**',
          `**📍 Cara Cek:**\n` +
          `1. Login ke dashboard IRS\n` +
          `2. Buka menu "Riwayat Laporan"\n` +
          `3. Cari berdasarkan periode/nomor\n` +
          `4. Klik detail untuk info lengkap\n\n` +
          
          `**📊 Kode Status:**\n` +
          `🟢 **Draft** - Belum disubmit\n` +
          `🟡 **Dalam Review** - Sedang diproses\n` +
          `🔵 **Perlu Revisi** - Ada koreksi\n` +
          `🟠 **Pending** - Menunggu verifikasi\n` +
          `✅ **Approved** - Diterima\n` +
          `❌ **Rejected** - Ditolak\n\n` +
          
          `**⏳ Jika Tertunda:**\n` +
          `• Tunggu 1-2 hari kerja\n` +
          `• Cek email untuk notifikasi\n` +
          `• Hubungi helpdesk jika >3 hari`
        );
        break;

      case 'problem':
        addList('🔧 **Troubleshooting**', 
          OJK_KNOWLEDGE_BASE.commonIssues.map(issue => 
            `**${issue.problem}:** ${issue.solution}`
          )
        );
        break;

      case 'contact':
        addSection('📞 **Kontak Support IRS OJK**',
          `**📞 Helpdesk:** ${OJK_KNOWLEDGE_BASE.contacts.helpdesk}\n` +
          `**📧 Email:** ${OJK_KNOWLEDGE_BASE.contacts.email}\n` +
          `**🌐 Website:** ${OJK_KNOWLEDGE_BASE.contacts.website}\n` +
          `**⏰ Jam Operasi:** ${OJK_KNOWLEDGE_BASE.contacts.workingHours}\n\n` +
          
          `**🛠️ Layanan:**\n` +
          `• Bantuan teknis sistem\n` +
          `• Reset password\n` +
          `• Konsultasi pelaporan\n` +
          `• Pengaduan sistem`
        );
        break;

      default:
        responses.push(
          `🤖 **IRS AI Assistant**\n\n` +
          `Saya siap membantu Anda dengan sistem pelaporan OJK:\n\n` +
          `📋 **Sistem yang Didukung:**\n` +
          `• 📊 **APOLO** - Laporan Lembaga Jasa Keuangan\n` +
          `• 📈 **E-Reporting** - Laporan Emiten\n` +
          `• 🌍 **SIPINA** - Laporan Nasabah Asing\n\n` +
          
          `❓ **Apa yang bisa saya bantu:**\n` +
          `• ⏰ Deadline pelaporan\n` +
          `• 📎 Format file yang diterima\n` +
          `• 🎯 Panduan step-by-step\n` +
          `• 🔍 Cek status laporan\n` +
          `• 🔧 Troubleshooting masalah\n` +
          `• 📞 Kontak helpdesk\n\n` +
          
          `💡 **Contoh pertanyaan:**\n` +
          `"Cara membuat laporan APOLO?"\n` +
          `"Kapan deadline bulan ini?"\n` +
          `"Format file apa yang didukung?"`
        );
        break;
    }
  });

  let finalResponse = responses.join('\n\n---\n\n');

  if (finalResponse.length < 300) {
    finalResponse += `\n\n📌 **Informasi:**\n` +
      `• Berdasarkan knowledge base IRS OJK\n` +
      `• Untuk informasi terbaru, kunjungi ${OJK_KNOWLEDGE_BASE.contacts.website}\n` +
      `• Hubungi helpdesk untuk kasus spesifik`;
  }

  return finalResponse;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: `🤖 **IRS AI Assistant - OJK**\n\n
Selamat datang! Saya asisten AI khusus untuk membantu Anda dengan Sistem Pelaporan Terpusat IRS OJK.\n\n
📋 **Topik yang bisa saya bantu:**\n
• Sistem APOLO, E-Reporting, dan SIPINA\n
• Deadline dan jadwal pelaporan\n
• Format file dan requirements\n
• Panduan lengkap pelaporan\n
• Troubleshooting masalah\n
• Kontak support OJK\n\n
💬 **Tanyakan apa saja tentang sistem IRS OJK!**`, 
      sender: 'ai', 
      timestamp: new Date(),
      source: 'welcome'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const messagesEndRef = useRef(null);

  // Quick suggestions
  const suggestions = [
    { text: "Cara membuat laporan APOLO?", icon: FileText, category: 'tutorial' },
    { text: "Kapan deadline bulan ini?", icon: Calendar, category: 'deadline' },
    { text: "Format file apa yang didukung?", icon: FileCheck, category: 'format' },
    { text: "Masalah login/upload?", icon: AlertTriangle, category: 'problem' },
    { text: "Cek status laporan?", icon: CheckCircle, category: 'status' },
    { text: "Kontak helpdesk OJK?", icon: Phone, category: 'contact' }
  ];

  const systemQuickLinks = [
    { 
      id: 'apolo', 
      name: 'APOLO', 
      icon: Building,
      color: 'bg-gradient-to-r from-red-500 to-red-600'
    },
    { 
      id: 'ereporting', 
      name: 'E-Reporting', 
      icon: FileCheck,
      color: 'bg-gradient-to-r from-amber-500 to-amber-600'
    },
    { 
      id: 'sipina', 
      name: 'SIPINA', 
      icon: Users,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 600));

    const intents = understandIntent(inputMessage);
    const aiResponse = generateResponse(inputMessage, intents);

    const aiMessage = {
      id: Date.now() + 1,
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date(),
      source: 'knowledge-base',
      intents: intents
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'apolo':
        window.open(OJK_KNOWLEDGE_BASE.systems.apolo.url, '_blank');
        break;
      case 'ereporting':
        window.open(OJK_KNOWLEDGE_BASE.systems.ereporting.url, '_blank');
        break;
      case 'sipina':
        window.open(OJK_KNOWLEDGE_BASE.systems.sipina.url, '_blank');
        break;
      case 'website':
        window.open(OJK_KNOWLEDGE_BASE.contacts.website, '_blank');
        break;
      case 'helpdesk':
        window.location.href = `tel:${OJK_KNOWLEDGE_BASE.contacts.helpdesk}`;
        break;
      case 'email':
        window.location.href = `mailto:${OJK_KNOWLEDGE_BASE.contacts.email}`;
        break;
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast('✓ Teks disalin');
  };

  const handleClearChat = () => {
    if (messages.length > 2) {
      setMessages([
        { 
          id: 1, 
          text: "🤖 **IRS AI Assistant**\n\nPercakapan telah dibersihkan. Ada yang bisa saya bantu?", 
          sender: 'ai', 
          timestamp: new Date(),
          source: 'reset'
        }
      ]);
    }
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 right-6 bg-red-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-50 animate-fade-in';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isMobile = windowWidth < 640;
  const modalWidth = isMobile ? '90vw' : windowWidth < 768 ? '380px' : '420px';
  const modalHeight = isMobile ? '85vh' : '600px';

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        aria-label="Buka Asisten AI IRS"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full">
            <div className="w-full h-full bg-green-500 rounded-full animate-ping" />
          </div>
        </div>
        <div className="absolute -top-10 right-0 bg-red-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          🚀 AI Assistant IRS
        </div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-xl shadow-2xl flex flex-col animate-slide-in border border-red-100"
            style={{ 
              width: modalWidth,
              height: modalHeight,
              maxHeight: '90vh'
            }}
          >
            {/* Header */}
            <div className="p-4 border-b border-red-100 bg-gradient-to-r from-red-50 via-white to-red-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg">IRS AI Assistant</h3>
                  <p className="text-xs text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    OJK Knowledge Base
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleClearChat}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Reset percakapan"
                  disabled={messages.length <= 2}
                >
                  <RefreshCw className={`w-4 h-4 ${messages.length <= 2 ? 'opacity-50' : ''}`} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* System Quick Links */}
            <div className="px-4 py-3 border-b border-red-100 bg-gradient-to-r from-red-50/50 to-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Akses Cepat Sistem</span>
                <ChevronRight className="w-4 h-4 text-red-500" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {systemQuickLinks.map((system) => (
                  <button
                    key={system.id}
                    onClick={() => handleQuickAction(system.id)}
                    className={`${system.color} text-white px-3 py-2 rounded-lg transition-all hover:scale-[1.02] hover:shadow-md flex flex-col items-center justify-center`}
                  >
                    <system.icon className="w-4 h-4 mb-1" />
                    <span className="text-xs font-semibold">{system.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/30 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-[85%] rounded-xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-br-none shadow-lg'
                      : 'bg-white border border-red-100 rounded-bl-none shadow-lg'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {message.sender === 'ai' && (
                        <div className={`p-2 rounded-lg flex-shrink-0 ${
                          message.source === 'welcome' 
                            ? 'bg-gradient-to-r from-red-100 to-red-200' 
                            : 'bg-red-50'
                        }`}>
                          {message.source === 'welcome' ? (
                            <Sparkles className="w-4 h-4 text-red-600" />
                          ) : (
                            <Database className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.text.split('**').map((part, index) => 
                            index % 2 === 1 ? (
                              <strong 
                                key={index} 
                                className={`font-bold ${
                                  message.sender === 'ai' ? 'text-red-700' : 'text-white'
                                }`}
                              >
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </div>
                        <div className={`mt-3 flex items-center justify-between ${
                          message.sender === 'user' ? 'text-red-200' : 'text-gray-500'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs">{formatTime(message.timestamp)}</span>
                            {message.sender === 'ai' && message.intents && (
                              <div className="flex items-center space-x-2">
                                {message.intents.map(intent => (
                                  <span 
                                    key={intent} 
                                    className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium"
                                  >
                                    #{intent}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          {message.sender === 'ai' && (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleCopy(message.text)}
                                className="hover:opacity-80 transition-opacity p-1"
                                title="Salin teks"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {message.sender === 'user' && (
                        <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white border border-red-100 rounded-xl rounded-bl-none p-4 shadow-lg max-w-[85%]">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                        <Sparkles className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-700 font-medium">Mencari informasi IRS...</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-75" />
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-150" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-3 border-t border-red-100 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700">💡 Pertanyaan Populer</span>
                <Search className="w-4 h-4 text-red-500" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(suggestion.text)}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-100 text-gray-700 hover:text-red-700 border border-gray-200 hover:border-red-200 px-3 py-2 rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center text-xs"
                  >
                    <suggestion.icon className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    <span className="truncate">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-red-100 bg-gradient-to-r from-red-50/30 to-white">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder="Tanya tentang sistem IRS OJK..."
                    className="w-full border border-red-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                    disabled={isTyping}
                  />
                  {isTyping && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Loader className="w-4 h-4 text-red-500 animate-spin" />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSend}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  aria-label="Kirim pesan"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuickAction('helpdesk')}
                    className="text-xs text-red-600 hover:text-red-800 flex items-center font-medium"
                    title="Telepon helpdesk"
                  >
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    Helpdesk
                  </button>
                  <button
                    onClick={() => handleQuickAction('email')}
                    className="text-xs text-red-600 hover:text-red-800 flex items-center font-medium"
                    title="Kirim email"
                  >
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    Email
                  </button>
                </div>
                <p className="text-xs text-gray-500 flex items-center">
                  <Shield className="w-3.5 h-3.5 mr-1.5 text-green-500" />
                  OJK Certified
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-fade-out {
          animation: fade-out 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default AIAssistant;