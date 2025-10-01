import { NavLink } from "react-router-dom";
import ButtonRegular from "./ButtonRegular";
import ButtonName from "./ButtonName";

export default function HeaderBarUser() {
  return (
    <nav className="
      fixed top-4 left-1/2 transform -translate-x-1/2
      w-[95%] max-w-7xl py-3 px-6
      bg-gradient-to-r from-[#FFD6D6]/95 to-[#DE9393]/95 
      backdrop-blur-xl
      border border-red-200/60
      flex justify-between items-center 
      shadow-xl shadow-red-200/40
      rounded-3xl
      transition-all duration-300 ease-out
      z-50
      hover:shadow-2xl hover:shadow-red-200/50
      hover:-translate-y-0.5
    ">
      {/* Logo Section */}
      <NavLink 
        to="/user/discover"
        className="group flex items-center"
      >
        <h1 className="
          text-3xl font-bold 
          text-[#521F1F]
          group-hover:text-red-800
          transition-all duration-300
          tracking-tight
        ">
          MasakYo
        </h1>
        <div className="
          w-1.5 h-1.5 bg-red-600 rounded-full 
          ml-2 opacity-0 group-hover:opacity-100
          transition-all duration-300 delay-100
          group-hover:scale-110
        " />
      </NavLink>

      {/* Navigation Links with ButtonRegular */}
      <div className="flex items-center space-x-4">
        <NavLink to="/user/discover">
          {({ isActive }) => (
            <ButtonRegular 
              nama="Discover" 
              onClick={() => {}}
              disabled={false}
            />
          )}
        </NavLink>
        
        <NavLink to="/user/katalog">
          {({ isActive }) => (
            <ButtonRegular 
              nama="Katalog" 
              onClick={() => {}}
              disabled={false}
            />
          )}
        </NavLink>
      </div>

      {/* User Profile Section with ButtonName */}
      <NavLink to="/user/settings">
        <ButtonName 
          nama="User" 
          onClick={() => {}}
          disabled={false}
        />
      </NavLink>
    </nav>
  );
}
