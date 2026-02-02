// src/components/dashboard/StatsCard.jsx
import React from 'react';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  TrendingDown,
  XCircle
} from 'lucide-react';

const StatsCard = ({ number, label, icon, color }) => {
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'FileText':
        return <FileText className="w-6 h-6 text-white" />;
      case 'CheckCircle':
        return <CheckCircle className="w-6 h-6 text-white" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-white" />;
      case 'XCircle':
        return <XCircle className="w-6 h-6 text-white" />;
      default:
        return <FileText className="w-6 h-6 text-white" />;
    }
  };

 

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className={`p-6 ${color} bg-gradient-to-br`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-white">{number}</div>
            <div className="text-white/90 text-sm mt-1">{label}</div>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            {getIcon(icon)}
          </div>
        </div>
{/*         
        <div className="flex items-center space-x-2 mt-4">
          {getTrendIcon(trend)}
          <span className="text-white/80 text-sm">
            {trend === 'up' ? '+12%' : '-5%'} dari bulan lalu
          </span>
        </div> */}
      </div>
      
      
    </div>
  );
};

export default StatsCard;