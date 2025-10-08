import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReusableModal = ({ 
  isOpen, 
  onClose, 
  onSave,
  title,
  headerData = [],
  children,
  saveButtonText = "Guardar",
  showSaveButton = true,
  showAddButton = false,
  addButtonText = "Adicionar",
  onAdd,
  navigateTo = null,
  maxWidth = "max-w-4xl",
  className = ""
}) => {
  const navigate = useNavigate();

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    
    // Only close and navigate if navigateTo is specified
    if (navigateTo) {
      onClose();
      navigate(navigateTo);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-xl shadow-xl w-full ${maxWidth} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        {headerData.length > 0 && (
          <>
            <div className="bg-primary-500 text-white px-3 sm:px-4 py-3 sm:py-4 rounded-t-xl mt-6 sm:mt-10 mx-3 sm:mx-6">
              <div className={`grid grid-cols-${headerData.length} gap-2 sm:gap-4 text-xs sm:text-sm font-semibold`}>
                {headerData.map((header, index) => (
                  <div key={index} className={header.align === 'right' ? 'text-right' : ''}>
                    {header.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="px-3 sm:px-4 py-2 sm:py-3 bg-white border-b border-gray-200 mx-3 sm:mx-6">
              <div className={`grid grid-cols-${headerData.length} gap-2 sm:gap-4 text-xs sm:text-sm text-gray-110`}>
                {headerData.map((header, index) => (
                  <div key={index} className={header.align === 'right' ? 'text-right' : ''}>
                    {header.value}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Body */}
        <div className="p-4 sm:p-8">
          {/* Title */}
          {title && (
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
              {title}
            </h3>
          )}
          
          {/* Content */}
          {children}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 mt-6 sm:mt-8">
            {showAddButton && (
              <button
                onClick={onAdd}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base order-2 sm:order-1"
              >
                {addButtonText}
              </button>
            )}
            
            {showSaveButton && (
              <button
                onClick={handleSave}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base order-1 sm:order-2"
              >
                {saveButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
