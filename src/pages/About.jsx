import React from 'react';
import { 
  Info, 
  Users, 
  Shield, 
  RefreshCw, 
  BarChart, 
  Target, 
  Globe,
  Award,
  Mail,
  Phone,
  Clock
} from 'lucide-react';

const About = () => {
  const features = [
    { icon: Shield, title: 'Keamanan Terjamin', description: 'Enkripsi end-to-end dan autentikasi multi-faktor untuk perlindungan data.' },
    { icon: RefreshCw, title: 'Integrasi Lengkap', description: 'Terhubung dengan APOLO, E-Reporting, dan SIPINA dalam satu platform.' },
    { icon: BarChart, title: 'Analitik', description: 'Dashboard dengan visualisasi data untuk pengambilan keputusan yang cepat.' },
    { icon: Users, title: 'Akses Responsif', description: 'Akses melalui perangkat apa saja dengan tampilan yang disesuaikan.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white p-4 lg:p-6 animate-fade-in">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-12 max-w-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Info className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Tentang IRS
                  </h1>
                </div>
                <p className="text-red-100 text-lg mb-8">
                  Gerbang Tunggal Integrated Reporting System (IRS) merupakan bagian dari roadmap Arsitektur Pelaporan Terintegrasi atau Integrated Reporting Architecture (IRA) untuk mengintegrasikan sistem pelaporan.
                </p>
              </div>
              
              <div className="hidden lg:block">
                <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Globe className="w-32 h-32 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-white to-red-50/50 rounded-2xl border border-red-100 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-900">Fitur Unggulan</h2>
                <p className="text-sm text-red-600">Kelebihan sistem yang kami tawarkan</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-red-50 to-white border border-red-100 hover:border-red-200 transition-colors">
                    <div className="p-3 bg-white rounded-lg border border-red-200 flex-shrink-0">
                      <Icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-red-900 mb-1">{feature.title}</h3>
                      <p className="text-red-700 text-sm">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Hubungi Kami</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <div className="font-medium mb-1">Email</div>
              <p className="text-red-100">support@irs-ojk.go.id</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <div className="font-medium mb-1">Telepon</div>
              <p className="text-red-100">021-1234-5678</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <div className="font-medium mb-1">Jam Operasional</div>
              <p className="text-red-100">Senin - Jumat, 08:00 - 17:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;