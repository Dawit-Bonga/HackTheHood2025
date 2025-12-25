import React from 'react';
import Button from './Button';
import Card from './Card';

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", loading = false }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card 
          variant="elevated" 
          padding="lg" 
          className="max-w-md w-full animate-[slideDown_0.2s_ease-out]"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {message}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={onConfirm}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Deleting...' : confirmText}
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default ConfirmModal;