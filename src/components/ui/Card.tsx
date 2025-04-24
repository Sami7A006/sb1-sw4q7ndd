import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outlined';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
}) => {
  const baseClasses = 'rounded-xl p-6';
  
  const variantClasses = {
    default: 'bg-white shadow-md',
    glass: 'backdrop-blur-md bg-white/30 border border-white/20',
    outlined: 'border border-gray-200 bg-white',
  };
  
  const hoverClasses = hover
    ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
    : '';
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${hoverClasses}
    ${className}
  `;
  
  return <div className={classes}>{children}</div>;
};

export default Card;