import React from 'react';

/**
 * Button component with multiple variants
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'} props.variant - Button style variant
 * @param {'sm'|'md'|'lg'} props.size - Button size
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  children, 
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium transition-all
    border focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim();

  const variants = {
    primary: `
      bg-[var(--color-primary)] text-white border-transparent
      hover:bg-[var(--color-primary-hover)] 
      focus:ring-[var(--color-primary)]
      active:scale-[0.98]
    `,
    secondary: `
      bg-[var(--color-secondary)] text-white border-transparent
      hover:bg-[#334155] 
      focus:ring-[var(--color-secondary)]
      active:scale-[0.98]
    `,
    outline: `
      bg-transparent text-[var(--color-primary)] border-[var(--color-border)]
      hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-primary)]
      focus:ring-[var(--color-primary)]
    `,
    ghost: `
      bg-transparent text-[var(--color-text-secondary)] border-transparent
      hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]
      focus:ring-[var(--color-primary)]
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2.5 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

