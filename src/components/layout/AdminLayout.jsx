// AdminLayout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Shield,
  Database,
  Layers,
  Settings,
  LogOut,
  HelpCircle,
  Home,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Filter,
  Eye,
  XCircle,
  MoreVertical,
  Bell,
  Search,
  Menu,
  X,
  Mail,
  Key,
  UserCog,
  TrendingUp
} from 'lucide-react';
import Header from './Header';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Handle window resize
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

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (windowWidth < 1024 && sidebarOpen && sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          !event.target.closest('.mobile-toggle-btn')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, windowWidth]);

  // Menu khusus untuk admin
  const adminMenuItems = [
    { 
      id: 'dashboard',
      path: '/admin/dashboard', 
      icon: LayoutDashboard, 
      label: 'Dashboard Admin',
      exact: true 
    },
    // { 
    //   id: 'pengajuan',
    //   path: '/admin/pengajuan', 
    //   icon: FileText, 
    //   label: 'Kelola Pengajuan',
    //   exact: false
    // },
    // { 
    //   id: 'users',
    //   path: '/admin/users', 
    //   icon: Users, 
    //   label: 'Manajemen User' 
    // },
    // { 
    //   id: 'reports',
    //   path: '/admin/reports', 
    //   icon: BarChart3, 
    //   label: 'Laporan Sistem' 
    // },
  ];

  const adminSettingsMenu = {
    id: 'settings',
    type: 'dropdown',
    icon: Settings,
    label: 'Pengaturan Admin',
    open: managementOpen,
    toggle: () => setManagementOpen(!managementOpen),
    subItems: [
    //   { 
    //     path: '/admin/settings/access', 
    //     icon: Shield, 
    //     label: 'Hak Akses',
    //     badge: "Master"
    //   },
    //   { 
    //     path: '/admin/settings/apps', 
    //     icon: Database, 
    //     label: 'Aplikasi' 
    //   },
    //   { 
    //     path: '/admin/settings/aro', 
    //     icon: Layers, 
    //     label: 'Master ARO' 
    //   },
    //   { 
    //     path: '/admin/settings/audit', 
    //     icon: Eye, 
    //     label: 'Log Audit' 
    //   },
    ]
  };

  const bottomMenuItems = [
    // { 
    //   id: 'back-to-user',
    //   path: '/', 
    //   icon: Home, 
    //   label: 'Mode User' 
    // },
     { 
      id: 'users',
      path: '/admin/users', 
      icon: Users, 
      label: 'FAQ' 
    },
    { 
      id: 'logout',
      path: '/logout', 
      icon: LogOut, 
      label: 'Keluar Admin' 
    },

  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleMenuItemClick = (path) => {
    if (path === '/logout') {
      if (window.confirm('Apakah Anda yakin ingin keluar dari mode admin?')) {
        alert('Anda telah logout dari admin mode');
        navigate('/');
      }
      return;
    }
    
    if (path === '/') {
      if (window.confirm('Kembali ke mode user?')) {
        navigate('/');
      }
      return;
    }
    
    navigate(path);
    
    if (windowWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const renderActiveIndicator = (isActive) => {
    if (!isActive) return null;
    
    return (
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r-full"></div>
    );
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && windowWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar Admin */}
        <div 
          ref={sidebarRef}
          className={`
            fixed lg:sticky lg:top-0
            top-0 left-0 h-screen
            z-40
            transition-all duration-300 ease-in-out
            ${windowWidth >= 1024 
              ? 'lg:w-72'
              : sidebarOpen 
                ? 'translate-x-0 w-72' 
                : '-translate-x-full w-72'
            }
            bg-gradient-to-b from-white to-red-50
            border-r border-red-200
            shadow-xl lg:shadow-lg
            flex flex-col
            overflow-hidden
          `}
        >
          {/* Sidebar Header Admin */}
          <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-600 to-red-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white flex-shrink-0">
                <img 
                  src="/irs-logos.png" 
                  alt="Logo IRS" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-white">IRS Admin Panel</h1>
                <p className="text-xs text-red-200">Sistem Administrator</p>
                <div className="mt-1">
                  <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-medium rounded-full">
                    Super Admin
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items - Scrollable Area */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4">
              <div className="space-y-1">
                {/* Admin Menu */}
                {adminMenuItems.map((item) => {
                  const active = isActive(item.path, item.exact);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.path)}
                      className={`
                        w-full flex items-center justify-between 
                        px-3 py-3 rounded-lg
                        transition-all duration-200
                        hover:bg-red-50
                        relative
                        group
                        ${active 
                          ? 'bg-red-50 text-red-700' 
                          : 'text-gray-700 hover:text-red-700'
                        }
                      `}
                    >
                      {renderActiveIndicator(active)}
                      
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          active ? 'bg-red-100' : 'bg-gray-100 group-hover:bg-red-100'
                        }`}>
                          <item.icon className={`w-4 h-4 ${active ? 'text-red-600' : 'text-gray-600 group-hover:text-red-600'}`} />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Pengaturan Admin */}
              
              </div>

              {/* Admin Stats */}
              <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">Status Sistem</p>
                    <p className="text-xs text-red-600 mt-1">
                      Semua sistem berjalan normal
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white p-2 rounded border">
                    <p className="text-xs text-gray-500">Pengajuan</p>
                    <p className="text-lg font-bold text-red-600">24</p>
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <p className="text-xs text-gray-500">ARO Pending</p>
                    <p className="text-lg font-bold text-yellow-600">8</p>
                  </div>
                </div>
              </div>

              {/* Bottom Menu */}
              <div className="mt-8 pt-6 border-t border-red-100">
                <div className="space-y-1">
                  {bottomMenuItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuItemClick(item.path)}
                        className={`
                          w-full flex items-center space-x-3 
                          px-3 py-3 rounded-lg
                          transition-all duration-200
                          hover:bg-red-50
                          relative
                          ${active 
                            ? 'bg-red-50 text-red-700' 
                            : 'text-gray-700 hover:text-red-700'
                          }
                          ${item.id === 'logout' ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : ''}
                        `}
                      >
                        {renderActiveIndicator(active)}
                        
                        <div className="flex items-center space-x-3">
                          <item.icon className={`w-5 h-5 ${active ? 'text-red-600' : item.id === 'logout' ? 'text-red-500' : 'text-gray-600 group-hover:text-red-600'}`} />
                          <span className="font-medium">{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-red-100">
            <div className="text-xs text-gray-500">
              <p>Admin Panel v1.0.0 • © 2025</p>
              <p className="text-red-600 font-medium mt-1">Mode: Administrator</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`
          flex-1 flex flex-col min-w-0
          ${windowWidth >= 1024 ? 'lg:ml-0' : ''}
          transition-all duration-300 ease-in-out
        `}>
          {/* Header Khusus Admin */}
          

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-transparent">
            <div className="max-w-full mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;