// components/layout/AdminHeader.jsx
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  ChevronDown, 
  Menu, 
  X,
  Settings,
  LogOut
} from 'lucide-react';

const AdminHeader = ({ toggleSidebar, sidebarOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Mencari admin: ${searchQuery}`);
      setSearchQuery('');
      setShowMobileSearch(false);
    }
  };

  const handleMobileSearchToggle = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const isMobile = windowWidth < 768;

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-red-600 to-red-700 border-b border-red-500 shadow-lg">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
            {isMobile && !sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-red-700 transition-colors flex-shrink-0"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            )}

            {/* Page Title */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                  Admin Dashboard - Hak Akses IRS
                </h1>
                {!isMobile && (
                  <div className="hidden md:flex items-center space-x-1 text-sm text-red-100">
                    <span className='font-bold text-white'>Admin</span>
                    <ChevronDown className="w-3 h-3 rotate-[-90deg] mx-1 text-red-200" />
                    <span className='font-bold text-white'>Approval Pengajuan</span>
                  </div>
                )}
              </div>
              {isMobile && !showMobileSearch && (
                <div className="flex items-center space-x-1 text-xs text-red-200 mt-1">
                  <span className='font-bold text-white'>Admin</span>
                  <ChevronDown className="w-2 h-2 rotate-[-90deg] mx-1 text-red-200" />
                  <span className='font-bold text-white'>Approval</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isMobile && sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-red-700 transition-colors flex-shrink-0"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            )}

            {/* Desktop Search */}
            {!isMobile && (
              <div className="hidden md:flex items-center">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-red-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari pengajuan, pemohon..."
                    className="pl-10 pr-4 py-2 bg-red-100/20 backdrop-blur-sm border border-red-300/30 rounded-lg outline-none text-sm w-48 lg:w-56 text-white placeholder-red-200 focus:bg-red-100/30 focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            )}

            {/* Mobile Search Toggle */}
            {isMobile && !sidebarOpen && (
              <button 
                onClick={handleMobileSearchToggle}
                className="p-2 rounded-lg hover:bg-red-700 transition-colors"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            )}

            {/* Notifications */}
            {(!isMobile || (isMobile && !sidebarOpen)) && (
              <button 
                onClick={() => alert('Notifikasi Admin')}
                className="relative p-2 rounded-lg hover:bg-red-700 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-red-600 text-xs rounded-full flex items-center justify-center animate-pulse font-bold">
                  3
                </span>
              </button>
            )}

            {/* User Profile */}
            {(!isMobile || (isMobile && !sidebarOpen)) && (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1 sm:p-2 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
                  aria-label="User menu"
                  aria-expanded={showUserMenu}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-white to-red-200 rounded-full flex items-center justify-center text-red-700 font-bold flex-shrink-0 border-2 border-white shadow-lg">
                    AD
                  </div>
                  {!isMobile && (
                    <div className="hidden sm:block text-left min-w-0">
                      <p className="text-sm font-bold text-white truncate max-w-[120px]">Admin IRS</p>
                      <p className="text-xs text-red-200 truncate max-w-[120px]">Administrator</p>
                    </div>
                  )}
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl border border-red-200 z-50 py-1 animate-fade-in">
                      <div className="px-4 py-3 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
                        <p className="text-sm font-bold text-red-800">Admin IRS</p>
                        <p className="text-xs text-red-600 truncate">admin@irs-ojk.go.id</p>
                      </div>
                      <button 
                        onClick={() => {
                          alert('Profil Admin');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                      >
                        <User className="w-4 h-4 mr-3 text-red-600" />
                        <span>Profil Admin</span>
                      </button>
                      <button 
                        onClick={() => {
                          alert('Pengaturan Admin');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3 text-red-600" />
                        <span>Pengaturan</span>
                      </button>
                      <div className="border-t border-red-100">
                        <button 
                          onClick={() => {
                            alert('Logout Admin');
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors font-medium"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          <span>Keluar</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && isMobile && (
          <div className="mt-3 animate-slide-in">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-red-400" />
              </div>
              <input
                type="text"
                placeholder="Cari pengajuan, pemohon..."
                className="w-full pl-10 pr-4 py-2 bg-red-100/20 backdrop-blur-sm border border-red-300/30 rounded-lg outline-none text-sm text-white placeholder-red-200 focus:bg-red-100/30 focus:ring-2 focus:ring-white focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowMobileSearch(false)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
