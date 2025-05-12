import React from 'react'

interface ButtonProps {
    label?: string;
    icon?: React.ReactNode;
    variant?: "default" | "active";
    onClick?: () => void;
    className?: string;
}

const Button:React.FC<ButtonProps> = ({ label, icon, variant, onClick, className }) => {
  const buttonClass = variant === "active" ? "bg-secondary text-primary " : "text-secondary";
  return (
    <button onClick={onClick} className={`${buttonClass} ${className} flex items-center ${label ? "space-x-2" : ""} border-2 border-secondary-foreground rounded-[5px] p-[7px] cursor-pointer`}>
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

export default Button