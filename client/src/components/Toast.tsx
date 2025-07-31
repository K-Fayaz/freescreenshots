import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, duration = 5000, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match the exit animation duration
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-rose-500" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/30 border-green-500/40 backdrop-blur-sm';
      case 'error':
        return 'bg-red-500/10 border-red-500/20 backdrop-blur-sm';
      default:
        return 'bg-slate-500/10 border-slate-500/20 backdrop-blur-sm';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-emerald-700';
      case 'error':
        return 'text-rose-700';
      default:
        return 'text-slate-700';
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border shadow-xl ${getBackgroundColor()} ${getTextColor()} min-w-[320px] max-w-[420px] ${isExiting ? 'animate-toast-exit' : 'animate-toast-enter'}`}
    >
      <div className="flex items-center space-x-3">
        {getIcon()}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={handleClose}
        className="text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1 rounded-full hover:bg-slate-100/50"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast; 