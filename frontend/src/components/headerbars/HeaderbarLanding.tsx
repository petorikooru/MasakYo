import { NavLink } from "react-router-dom";
import ButtonRegular from "../buttons/ButtonRegular";

export default function HeaderbarLanding() {
  return (
    <nav className="
      fixed top-4 left-1/2 transform -translate-x-1/2
      w-[95%] max-w-7xl py-2 px-4
      bg-gradient-to-r from-[#FFD6D6]/95 to-[#DE9393]/95 
      backdrop-blur-xl
      border border-red-200/60
      flex justify-between items-center 
      shadow-md shadow-red-200/40
      rounded-[40px]
      transition-all duration-300 ease-out
      z-50
      hover:shadow-2xl hover:shadow-red-200/50
      hover:-translate-y-0.5
    ">
      {/* Logo Section */}
      <NavLink 
        to="/"
        className="group flex items-center"
      >
        <h1 className="
          ml-[20px]
          text-[36px] font-bold 
          text-[#521F1F]
          group-hover:text-red-800
          transition-all duration-300
          tracking-tight
        ">
          MasakYo
        </h1>
      </NavLink>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-[18px] text-[#521F1F] font-medium">
        <a 
          href="#home"
          className="hover:text-[#A75A5A] transition-colors duration-200"
        >
          Home
        </a>

        <a 
          href="#about"
          className="hover:text-[#A75A5A] transition-colors duration-200"
        >
          About
        </a>
        
        <NavLink to="/login">
          <ButtonRegular nama="Login" />
        </NavLink>
      </div>
    </nav>
  );
}