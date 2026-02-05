// pages/admin/index.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminIndex = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/admin/dashboard');
  }, [navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Mengarahkan ke dashboard admin...</p>
      </div>
    </div>
  );
};

export default AdminIndex;