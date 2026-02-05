// Sidebar.js - Update untuk user baru tanpa hak akses lengkap
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard,
  FileText,
  Download,
  Info,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  BarChart3,
  FileSignature,
  Gavel,
  Mail,
  Bell,
  Megaphone,
  LogOut,
  ChevronLeft,
  UserCog,
  User,
  Key,
  FileSpreadsheet,
  Clock,
  AlertCircle,
  BackpackIcon
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PiFunctionThin } from 'react-icons/pi';
import { MdSystemSecurityUpdate } from 'react-icons/md';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reportsOpen, setReportsOpen] = useState(false);
  const [correspondenceOpen, setCorrespondenceOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sidebarRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // State untuk menandai apakah user baru
  const [isNewUser, setIsNewUser] = useState(true);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      if (newWidth >= 1024 && !isSidebarOpen) {
        toggleSidebar();
      }
      
      if (newWidth < 1280 && newWidth >= 1024) {
        setCollapsed(true);
      } else if (newWidth >= 1280) {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen, toggleSidebar]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (windowWidth < 1024 && isSidebarOpen && sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          !event.target.closest('.mobile-toggle-btn')) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen, windowWidth, toggleSidebar]);

  // Menu items untuk user baru (hanya dashboard dan pengaturan dasar)
  const menuItemsNewUser = [
    { 
      id: 'home',
      path: '/', 
      icon: LayoutDashboard, 
      label: 'Dashboard',
      exact: true 
    },
  ];

  // Menu Pengaturan untuk user baru
  const settingsMenuNewUser = {
    id: 'settings',
    type: 'dropdown',
    icon: UserCog,
    label: 'Pengaturan Akun',
    open: settingsOpen,
    toggle: () => setSettingsOpen(!settingsOpen),
    subItems: [
      { 
        path: '/accessmanagement', 
        icon: User, 
        label: 'Lihat Profil',
        exact: true 
      },
      { 
        path: '/profile/hak-akses/pengajuan', 
        icon: FileSpreadsheet, 
        label: 'Ajukan Hak Akses',
        badge: "Baru"
      },
      { 
        path: '/profile/hak-akses/status', 
        icon: Clock, 
        label: 'Status Pengajuan' 
      },
    ]
  };

  const bottomMenuItems = [
    { 
      id: 'about',
      path: '/about', 
      icon: Info, 
      label: 'Tentang Kami' 
    },
    { 
      id: 'faq',
      path: '/faq', 
      icon: HelpCircle, 
      label: 'FAQ' 
    },
    { 
      id: 'logout',
      path: '/admin/dashboard', 
      icon: LogOut, 
      label: 'Keluar' 
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
      if (window.confirm('Apakah Anda yakin ingin keluar?')) {
        alert('Anda telah logout');
        navigate('/');
      }
      return;
    }
    
    navigate(path);
    
    if (windowWidth < 1024) {
      toggleSidebar();
    }
  };

  const handleToggleCollapse = () => {
    if (windowWidth >= 1024) {
      setCollapsed(!collapsed);
    }
  };

  const renderActiveIndicator = (isActive) => {
    if (!isActive) return null;
    
    return (
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r-full"></div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && windowWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div 
        ref={sidebarRef}
        className={`
          fixed lg:sticky lg:top-0
          top-0 left-0 h-screen
          z-40
          transition-all duration-300 ease-in-out
          ${windowWidth >= 1024 
            ? collapsed 
              ? 'lg:w-16' 
              : 'lg:w-64'
            : isSidebarOpen 
              ? 'translate-x-0 w-72' 
              : '-translate-x-full w-72'
          }
          bg-white
          border-r border-red-200
          shadow-xl lg:shadow-md
          flex flex-col
          overflow-hidden
        `}
      >
        {/* Sidebar Header dengan status user baru */}
        <div className={`
          p-4 border-b border-red-100 flex-shrink-0
          ${collapsed && windowWidth >= 1024 ? 'px-3' : 'px-6'}
        `}>
          <div className={`flex items-center ${collapsed && windowWidth >= 1024 ? 'justify-center' : 'justify-between'}`}>
            <div className={`flex items-center ${collapsed && windowWidth >= 1024 ? '' : 'space-x-3'}`}>
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-red-600 flex-shrink-0">
                <img 
                  src="/irs-logos.png" 
                  alt="Logo IRS" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {(!collapsed || windowWidth < 1024) && (
                <div className="min-w-0">
                  <h1 className="text-lg font-bold text-gray-900">IRS OJK</h1>
                  <p className="text-xs text-gray-500">Sistem Terpusat</p>
                  {isNewUser && (
                    <div className="mt-1">
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        User Baru
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items - Scrollable Area */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className={collapsed && windowWidth >= 1024 ? 'px-2' : 'px-4'}>
            <div className="space-y-1">
              {/* Menu untuk User Baru */}
              {isNewUser ? (
                <>
                  {/* Dashboard Menu */}
                  {menuItemsNewUser.map((item) => {
                    const active = isActive(item.path, item.exact);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuItemClick(item.path)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`
                          w-full flex items-center ${collapsed && windowWidth >= 1024 ? 'justify-center' : 'justify-between'} 
                          ${collapsed && windowWidth >= 1024 ? 'px-3' : 'px-3'} py-3 rounded-lg
                          transition-all duration-200
                          hover:bg-red-50
                          relative
                          ${active 
                            ? 'bg-red-50 text-red-700' 
                            : 'text-gray-700 hover:text-red-700'
                          }
                        `}
                      >
                        {renderActiveIndicator(active)}
                        
                        <div className={`flex items-center ${collapsed && windowWidth >= 1024 ? '' : 'space-x-3'}`}>
                          <item.icon className={`w-5 h-5 ${active ? 'text-red-600' : 'text-gray-600 group-hover:text-red-600'}`} />
                          {(!collapsed || windowWidth < 1024) && (
                            <span className="font-medium">{item.label}</span>
                          )}
                        </div>

                        {/* Tooltip for collapsed mode */}
                        {collapsed && windowWidth >= 1024 && (
                          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                            {item.label}
                            <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}

                  {/* Menu Pengaturan Akun untuk User Baru */}
                  {!collapsed || windowWidth < 1024 ? (
                    <div className="mb-1">
                      <button
                        onClick={settingsMenuNewUser.toggle}
                        onMouseEnter={() => setHoveredItem(settingsMenuNewUser.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`
                          w-full flex items-center ${collapsed && windowWidth >= 1024 ? 'justify-center' : 'justify-between'} 
                          ${collapsed && windowWidth >= 1024 ? 'px-3' : 'px-3'} py-3 rounded-lg
                          transition-all duration-200
                          hover:bg-red-50
                          relative
                          ${settingsMenuNewUser.open 
                            ? 'bg-red-50 text-red-700' 
                            : 'text-gray-700 hover:text-red-700'
                          }
                        `}
                      >
                        <div className={`flex items-center ${collapsed && windowWidth >= 1024 ? '' : 'space-x-3'}`}>
                          <settingsMenuNewUser.icon className={`w-5 h-5 ${settingsMenuNewUser.open ? 'text-red-600' : 'text-gray-600 group-hover:text-red-600'}`} />
                          {(!collapsed || windowWidth < 1024) && (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{settingsMenuNewUser.label}</span>
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                                Baru
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {(!collapsed || windowWidth < 1024) && (
                          settingsMenuNewUser.open ? (
                            <ChevronDown className="w-4 h-4 text-red-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                          )
                        )}

                        {/* Tooltip for collapsed mode */}
                        {collapsed && windowWidth >= 1024 && (
                          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                            {settingsMenuNewUser.label}
                            <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                          </div>
                        )}
                      </button>
                      
                      {settingsMenuNewUser.open && (!collapsed || windowWidth < 1024) && (
                        <div className="mt-1 ml-4 space-y-1">
                          {settingsMenuNewUser.subItems.map((subItem) => {
                            const active = isActive(subItem.path, subItem.exact);
                            return (
                              <button
                                key={subItem.label}
                                onClick={() => handleMenuItemClick(subItem.path)}
                                onMouseEnter={() => setHoveredItem(subItem.label)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`
                                  w-full flex items-center space-x-3 
                                  px-3 py-2.5 rounded-lg
                                  transition-all duration-200
                                  hover:bg-red-50
                                  relative
                                  ${active 
                                    ? 'bg-red-50 text-red-700' 
                                    : 'text-gray-600 hover:text-red-700'
                                  }
                                `}
                              >
                                {renderActiveIndicator(active)}
                                <subItem.icon className={`w-4 h-4 ${active ? 'text-red-600' : 'text-gray-500 group-hover:text-red-600'}`} />
                                <div className="flex items-center justify-between flex-1">
                                  <span className="text-sm">{subItem.label}</span>
                                  {subItem.badge && (
                                    <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded ml-2">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : null}
                </>
              ) : (
                // Menu untuk user biasa (original code)
                // ... (kode original untuk user dengan hak akses lengkap)
                null
              )}
            </div>

            {/* Informasi untuk User Baru */}
            {isNewUser && (!collapsed || windowWidth < 1024) && (
              <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">Status Akun Baru</p>
                    <p className="text-xs text-red-600 mt-1">
                      Lengkapi profil dan ajukan hak akses untuk menggunakan fitur lengkap sistem.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Menu */}
            <div className={`${collapsed && windowWidth >= 1024 ? 'mt-4' : 'mt-8 pt-6 border-t border-red-50'}`}>
              <div className="space-y-1">
                {bottomMenuItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.path)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`
                        w-full flex items-center ${collapsed && windowWidth >= 1024 ? 'justify-center' : ''} 
                        ${collapsed && windowWidth >= 1024 ? 'px-3' : 'px-3'} py-3 rounded-lg
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
                      
                      <div className={`flex items-center ${collapsed && windowWidth >= 1024 ? '' : 'space-x-3'}`}>
                        <item.icon className={`w-5 h-5 ${active ? 'text-red-600' : item.id === 'logout' ? 'text-red-500' : 'text-gray-600 group-hover:text-red-600'}`} />
                        {(!collapsed || windowWidth < 1024) && (
                          <span className="font-medium">{item.label}</span>
                        )}
                      </div>

                      {/* Tooltip for collapsed mode */}
                      {collapsed && windowWidth >= 1024 && (
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                          {item.label}
                          <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className={`
          p-4 border-t border-red-50 flex-shrink-0
          ${collapsed && windowWidth >= 1024 ? 'px-3 text-center' : ''}
        `}>
          {collapsed && windowWidth >= 1024 ? (
            <button
              onClick={handleToggleCollapse}
              className="w-full p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
              title="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4 mx-auto" />
            </button>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <p>v1.0.0 • © 2025</p>
                {isNewUser && (
                  <p className="text-red-600 font-medium mt-1">Status: Menunggu Akses</p>
                )}
              </div>
              {windowWidth >= 1024 && (
                <button
                  onClick={handleToggleCollapse}
                  className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;


