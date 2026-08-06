import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  description: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  description,
  onClose,
  className = ''
}) => {
  const configs = {
    success: {
      bg: 'bg-green-50 border-green-200 text-green-800',
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      titleColor: 'text-green-900'
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      titleColor: 'text-amber-900'
    },
    error: {
      bg: 'bg-red-50 border-red-200 text-red-800',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      titleColor: 'text-red-900'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-500" />,
      titleColor: 'text-blue-900'
    }
  };

  const config = configs[type];

  return (
    <div className={`flex items-start p-4 border rounded-xl ${config.bg} ${className}`} role="alert">
      <div className="shrink-0 mr-3 mt-0.5">{config.icon}</div>
      <div className="flex-1">
        {title && (
          <h4 className={`text-sm font-bold ${config.titleColor} mb-1 font-heading`}>
            {title}
          </h4>
        )}
        <p className="text-sm font-medium">{description}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 ml-3 p-0.5 hover:bg-black/5 rounded-md transition-colors cursor-pointer"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
