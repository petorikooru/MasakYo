import type { ButtonHTMLAttributes } from "react";

interface ButtonRegularProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  nama: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isActive?: boolean; // Add this line
}

export default function ButtonRegular({ 
  nama, 
  onClick,
  className = "",
  disabled = false, 
  isActive = false,
  ...props }: ButtonRegularProps) {
    return (
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`px-5 py-2 rounded-full bg-[#521F1F] text-base text-white font-medium hover:bg-[#A75A5A] active:bg-[#D28B8B] ${className}`}
        {...props}
      >
        {nama}
      </button>
  );
}