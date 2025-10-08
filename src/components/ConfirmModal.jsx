import React from "react";
import { AiOutlineWarning, AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const ICONS = {
    warning: <AiOutlineWarning className="text-yellow-500 w-10 h-10 mb-2" />,
    success: <AiOutlineCheckCircle className="text-green-500 w-10 h-10 mb-2" />,
    error: <AiOutlineCloseCircle className="text-red-500 w-10 h-10 mb-2" />,
};

const ConfirmModal = ({
    open,
    onClose,
    onConfirm,
    loading,
    title,
    message,
    icon = "warning",
    confirmText = "Yes, delete it!",
    cancelText = "Cancel",
    confirmColor = "bg-red-600",
    cancelColor = "bg-gray-200",
    confirmTextColor = "text-white",
    cancelTextColor = "text-gray-700",
}) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                <div className="flex flex-col items-center">
                    {ICONS[icon]}
                    <h2 className="text-lg font-semibold mb-2">{title}</h2>
                    <p className="mb-4">{message}</p>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    <button
                        className={`px-4 py-2 rounded ${cancelColor} ${cancelTextColor}`}
                        onClick={onClose}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>
                    <button
                        className={`px-4 py-2 rounded flex items-center gap-2 ${confirmColor} ${confirmTextColor}`}
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? "Deleting..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;