// src/components/dashboard/ActivityList.jsx
import React from 'react';
import { CheckCircle, Clock, XCircle, AlertCircle, Info } from 'lucide-react';

const ActivityList = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'danger':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSystemBadge = (system) => {
    const styles = {
      APOLO: 'bg-blue-100 text-blue-800 border-blue-200',
      'E-REPORTING': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Ereporting': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      SIPINA: 'bg-purple-100 text-purple-800 border-purple-200',
      SiPina: 'bg-purple-100 text-purple-800 border-purple-200',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[system] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {system}
      </span>
    );
  };

  const getActivityStyle = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-4 border-l-green-500 bg-green-50/50';
      case 'warning':
        return 'border-l-4 border-l-yellow-500 bg-yellow-50/50';
      case 'danger':
        return 'border-l-4 border-l-red-500 bg-red-50/50';
      default:
        return 'border-l-4 border-l-blue-500 bg-blue-50/50';
    }
  };

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Info className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600">Tidak ada aktivitas terbaru</p>
        </div>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-center justify-between p-4 rounded-lg hover:shadow-md transition-all duration-200 ${getActivityStyle(activity.type)}`}
          >
            <div className="flex items-start space-x-4 flex-1">
              <div className="p-2 bg-white rounded-lg shadow-sm border mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <span className="text-gray-300">•</span>
                  <div className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border">
                    ID: {activity.id}
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-4">
              {getSystemBadge(activity.system)}
            </div>
          </div>
        ))
      )}
      
      {/* Info Tambahan */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="p-1.5 bg-gray-100 rounded">
            <Info className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Informasi Aktivitas</p>
            <p className="text-xs text-gray-600 mt-1">
              Aktivitas menampilkan update terbaru dari sistem pelaporan. Refresh halaman untuk update real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityList;