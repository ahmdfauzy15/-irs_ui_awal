// App.jsx - Update dengan import yang benar
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import ApoloReports from './pages/ApoloReports';
import EReporting from './pages/EReporting';
import SIPINA from './pages/SIPINA';
import Notifications from './pages/Notifications';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DownloadCenter from './components/dashboard/DownloadCenter';
import AIAssistant from './components/common/AIAssistant';
import Korespondensi from './pages/Korespondensi';
import AntiGratificationBanner from './components/common/AntiGratificationBanner';
import AccessManagement from './pages/AccessManagement';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminHeader from './components/layout/AdminHeader';
import AdminSidebar from './components/layout/AdminSidebar';
import AboutAdmin from './pages/admin/AboutAdmin';
import FAQAdmin from './pages/admin/FAQAdmin';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      if (width >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Layout khusus untuk halaman admin
  const AdminLayout = ({ children }) => {
    return (
      <div className="flex min-h-screen">
        <div className="flex-shrink-0">
          <AdminSidebar 
            isSidebarOpen={sidebarOpen} 
            toggleSidebar={toggleSidebar} 
          />
        </div>
        
        <div className={`
          flex-1 flex flex-col min-w-0
          ${windowWidth >= 1024 ? 'lg:ml-0' : ''}
          transition-all duration-300 ease-in-out
        `}>
          <AdminHeader 
            toggleSidebar={toggleSidebar} 
            sidebarOpen={sidebarOpen} 
          />
          
          <main className="flex-1 overflow-y-auto bg-transparent">
            {children}
          </main>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <Routes>
          {/* Rute Admin */}
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="about" element={<AboutAdmin />} />
                <Route path="faq" element={<FAQAdmin />} />
                {/* Tambahkan route admin lainnya di sini */}
              </Routes>
            </AdminLayout>
          } />
          {/* Rute User biasa menggunakan layout normal */}
          <Route path="/*" element={
            <div className="flex min-h-screen">
              <div className="flex-shrink-0">
                <Sidebar 
                  isSidebarOpen={sidebarOpen} 
                  toggleSidebar={toggleSidebar} 
                />
              </div>
              
              <div className={`
                flex-1 flex flex-col min-w-0
                ${windowWidth >= 1024 ? 'lg:ml-0' : ''}
                transition-all duration-300 ease-in-out
              `}>
                <Header 
                  toggleSidebar={toggleSidebar} 
                  sidebarOpen={sidebarOpen} 
                />
                
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-transparent">
                  <div className="max-w-full mx-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/apolo" element={<ApoloReports />} />
                      <Route path="/ereporting" element={<EReporting />} />
                      <Route path="/sipina" element={<SIPINA />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/AccessManagement" element={<AccessManagement />} />
                      <Route path="/profile/hak-akses" element={<Profile />} />
                      <Route path="/profile/hak-akses/pengajuan" element={<Profile />} />
                      <Route path="/profile/hak-akses/status" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/download" element={<DownloadCenter />} />
                      <Route path="/korespondensi/notifikasi" element={<Korespondensi />} />
                      <Route path="/korespondensi/pengumuman" element={<Korespondensi />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;