import React from 'react';

/**
 * Card component for consistent content containers
 * @param {Object} props
 * @param {'default'|'bordered'|'elevated'} props.variant - Card style variant
 * @param {string} props.padding - Custom padding (default: 'default')
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 */
const Card = ({ 
  variant = 'default', 
  padding = 'default',
  children, 
  className = '',
  hover = false,
  ...props 
}) => {
  const baseStyles = `
    bg-white rounded-lg transition-all
  `.replace(/\s+/g, ' ').trim();

  const variants = {
    default: 'border border-[var(--color-border)]',
    bordered: 'border-2 border-[var(--color-border)]',
    elevated: 'shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  const hoverEffect = hover ? 'hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-md)] cursor-pointer' : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverEffect}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

