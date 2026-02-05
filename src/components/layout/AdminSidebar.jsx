// components/layout/AdminSidebar.jsx
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  Info,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Shield,
  CheckCircle,
  Users,
  FileText,
  BarChart3
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  
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

  // Menu Admin SEDERHANA: Hanya 3 menu utama
  const adminMenuItems = [
    { 
      id: 'dashboard',
      path: '/admin/dashboard', 
      icon: LayoutDashboard, 
      label: 'Dashboard Admin',
      exact: true 
    },
    // { 
    //   id: 'approval',
    //   path: '/admin/approval', 
    //   icon: CheckCircle, 
    //   label: 'Approval Hak Akses',
    //   exact: true 
    // },
  ];

  const bottomMenuItems = [
    { 
      id: 'about',
      path: '/admin/about', 
      icon: Info, 
      label: 'Tentang Kami' 
    },
    { 
      id: 'faq',
      path: '/admin/faq', 
      icon: HelpCircle, 
      label: 'FAQ' 
    },
    { 
      id: 'logout',
      path: '/logout', 
      icon: LogOut, 
      label: 'Keluar' 
    },
  ];

  const handleMenuItemClick = (id, path) => {
    setActiveItem(id);
    if (path === '/logout') {
      if (window.confirm('Apakah Anda yakin ingin keluar?')) {
        alert('Anda telah logout dari admin panel');
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
        {/* Sidebar Header */}
        <div className={`
          p-4 border-b border-red-100 flex-shrink-0
          ${collapsed && windowWidth >= 1024 ? 'px-3' : 'px-6'}
        `}>
          <div className={`flex items-center ${collapsed && windowWidth >= 1024 ? 'justify-center' : 'justify-between'}`}>
            <div className={`flex items-center ${collapsed && windowWidth >= 1024 ? '' : 'space-x-3'}`}>
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-red-600 flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {(!collapsed || windowWidth < 1024) && (
                <div className="min-w-0">
                  <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-xs text-gray-500">Sistem Hak Akses</p>
                  <div className="mt-1">
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      Administrator
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className={collapsed && windowWidth >= 1024 ? 'px-2' : 'px-4'}>
            <div className="space-y-1">
              {/* Menu Admin Sederhana */}
              {adminMenuItems.map((item) => {
                const active = activeItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuItemClick(item.id, item.path)}
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
            </div>

            {/* Bottom Menu */}
            <div className={`${collapsed && windowWidth >= 1024 ? 'mt-4' : 'mt-8 pt-6 border-t border-red-50'}`}>
              <div className="space-y-1">
                {bottomMenuItems.map((item) => {
                  const active = activeItem === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.id, item.path)}
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
                <p className="text-red-600 font-medium mt-1">Status: Admin Aktif</p>
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

export default AdminSidebar;