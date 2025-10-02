import { X } from "lucide-react";

export default function PopupModal({ isOpen, onClose, title, children, size = "md" }) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg", 
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className={`
        bg-neutral-900 rounded-2xl shadow-2xl border border-red-900/50 w-full ${sizeClasses[size]}
        animate-in zoom-in duration-200
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-800/30">
          <h2 className="text-xl font-bold text-red-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-900/30 rounded-full transition-colors duration-200"
          >
            <X size={20} className="text-red-400" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
