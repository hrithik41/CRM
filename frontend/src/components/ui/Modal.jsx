import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  headerActions, 
  children, 
  footer, 
  widthClass = 'w-full max-w-md' 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className={`bg-white rounded-xl shadow-xl ${widthClass} max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 rounded-t-xl shrink-0">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <div className="flex items-center gap-4">
            {headerActions}
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors bg-white border border-slate-200 shadow-sm shrink-0">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-0 overflow-y-auto flex-1 bg-slate-50/50">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-white rounded-b-xl z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
