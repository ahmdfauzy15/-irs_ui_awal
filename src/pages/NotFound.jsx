import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-red-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">
            Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="block w-full py-3 px-6 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors duration-200"
          >
            Kembali ke Dashboard
          </Link>
          
          <Link
            to="/"
            className="block w-full py-3 px-6 bg-white text-gray-800 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            Beranda
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Jika masalah berlanjut, hubungi tim dukungan teknis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;