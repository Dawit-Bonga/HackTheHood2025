import React from 'react';

/**
 * Input component with label and helper text
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.helperText - Helper text below input
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether input is required
 * @param {string} props.className - Additional CSS classes for input
 */
export const Input = ({ 
  label, 
  helperText, 
  error, 
  required = false,
  className = '',
  id,
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
        >
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-2.5 
          border rounded-lg
          text-[var(--color-text-primary)]
          placeholder:text-[var(--color-text-muted)]
          transition-all
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
          disabled:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed
          ${error ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : 'border-[var(--color-border)]'}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        required={required}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{helperText}</p>
      )}
      {error && (
        <p className="mt-1.5 text-sm text-[var(--color-error)]">{error}</p>
      )}
    </div>
  );
};

/**
 * Textarea component with label and helper text
 */
export const Textarea = ({ 
  label, 
  helperText, 
  error, 
  required = false,
  className = '',
  id,
  rows = 4,
  ...props 
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={textareaId}
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
        >
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`
          w-full px-4 py-2.5 
          border rounded-lg
          text-[var(--color-text-primary)]
          placeholder:text-[var(--color-text-muted)]
          transition-all
          resize-vertical
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
          disabled:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed
          ${error ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : 'border-[var(--color-border)]'}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        required={required}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{helperText}</p>
      )}
      {error && (
        <p className="mt-1.5 text-sm text-[var(--color-error)]">{error}</p>
      )}
    </div>
  );
};

/**
 * Select component with label and helper text
 */
export const Select = ({ 
  label, 
  helperText, 
  error, 
  required = false,
  className = '',
  id,
  children,
  ...props 
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
        >
          {label}
          {required && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`
          w-full px-4 py-2.5 
          border rounded-lg
          text-[var(--color-text-primary)]
          bg-white
          transition-all
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
          disabled:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed
          ${error ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : 'border-[var(--color-border)]'}
          ${className}
        `.replace(/\s+/g, ' ').trim()}
        required={required}
        {...props}
      >
        {children}
      </select>
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{helperText}</p>
      )}
      {error && (
        <p className="mt-1.5 text-sm text-[var(--color-error)]">{error}</p>
      )}
    </div>
  );
};

export default Input;

