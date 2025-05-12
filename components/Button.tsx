import React from 'react'

interface ButtonProps {
    label?: string;
    icon?: React.ReactNode;
    variant?: "default" | "active" | "disabled";
    onClick?: () => void;
    className?: string;
}

const Button:React.FC<ButtonProps> = ({ label, icon, variant, onClick, className }) => {
  const buttonClass = variant === "active" ? "bg-secondary text-primary" : variant === "disabled" ? "bg-inactive text-secondary-foreground" : "text-secondary";
  return (
    <button onClick={onClick} className={`${buttonClass} ${className} flex items-center ${label ? "space-x-2" : ""} border-2 border-secondary-foreground rounded-[5px] p-[7px] ${variant === "disabled" ? "cursor-not-allowed" : "cursor-pointer"} transition-all duration-200 ease-in-out`}>
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

export default Button