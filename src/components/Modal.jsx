import React, { useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  children,
  size = "medium",
  className = "",
  title,
  subtitle,
}) => {
  const sizes = {
    small: "max-w-sm",
    medium: "max-w-md",
    large: "max-w-lg",
    xlarge: "max-w-xl",
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-xl w-full ${sizes[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-1">
          <div className="p-8 max-h-[80vh] overflow-y-auto">
            {title && (
              <h2 className="text-xl font-semibold text-primary mb-1">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// import React, { useEffect } from "react";

// const Modal = ({ isOpen, onClose, children, size = "medium", className = "" }) => {
//   const sizes = {
//     small: "max-w-sm",
//     medium: "max-w-md",
//     large: "max-w-lg",
//     xlarge: "max-w-xl",
//   };

//   // Close on escape key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape" && isOpen) {
//         onClose();
//       }
//     };

//     window.addEventListener("keydown", handleEsc);

//     return () => {
//       window.removeEventListener("keydown", handleEsc);
//     };
//   }, [isOpen, onClose]);

//   // Prevent body scroll when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70' onClick={onClose}>
//       <div className={`bg-white rounded-xl shadow-xl w-full ${sizes[size]} ${className}`} onClick={(e) => e.stopPropagation()}>
//         <div className='p-8'>{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
