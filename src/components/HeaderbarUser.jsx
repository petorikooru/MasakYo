import { NavLink, useNavigate } from "react-router-dom";
import ButtonRegular from "./ButtonRegular";
import ButtonName from "./ButtonName";
import { useState, useRef, useEffect } from "react";
import { LogOut, User, Mail, Lock, Shield, HelpCircle, Trash2, Camera } from "lucide-react";

import user_pfp from "@assets/images/pfp.png"

import ChangeProfilePicturePopup from "./ChangeProfilePicturePopup";
import ChangeEmailPopup from "./ChangeEmailPopup";
import ChangePasswordPopup from "./ChangePasswordPopup";
import ChangeUsernamePopup from "./ChangeUsernamePopup";
import CustomerServicePopup from "./CustomerServicePopup";
import DeleteAccountPopup from "./DeleteAccountPopup";

export default function HeaderbarUser() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleMenuItemClick = (action) => {
    setIsSettingsOpen(false);
    setActivePopup(action);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const menuItems = [
    { icon: Camera, label: "Change Profile Picture", action: "profilePicture" },
    { icon: Mail, label: "Change Email", action: "email" },
    { icon: Lock, label: "Change Password", action: "password" },
    { icon: User, label: "Change UserName", action: "username" },
    { icon: HelpCircle, label: "Customer Service", action: "customerService" },
    { icon: Trash2, label: "Delete Account", action: "deleteAccount", destructive: true },
    { icon: LogOut, label: "Log Out", action: "logout" },
  ];

  return (
    <>
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
        to="/user/discover"
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

      {/* Navigation Links with improved active states */}
      <div className="flex items-center space-x-3">
        <NavLink to="/user/discover">
          {({ isActive }) => (
            <div className="relative">
              <ButtonRegular 
                nama="Discover" 
                onClick={() => {}}
                disabled={false}
                isActive={isActive}
              />
            </div>
          )}
        </NavLink>
        
        <NavLink to="/user/katalog">
          {({ isActive }) => (
            <div className="relative">
              <ButtonRegular 
                nama="Katalog" 
                onClick={() => {}}
                disabled={false}
                isActive={isActive}
              />
            </div>
          )}
        </NavLink>
      </div>

        {/* User Profile Section with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={handleSettingsClick} className="outline-none">
            <ButtonName
              nama="Settings" 
              onClick={() => {}}
              showUserProfile={true}
              userInitial="A"
              userName="Alice Liddel"
              userRole="User"
              avatarContent={
                <img
                  src={user_pfp}      
                  className="w-8 h-8 rounded-full object-cover"
                />
              }
            />
          </button>

          {/* Dropdown Menu */}
          {isSettingsOpen && (
            <div className="
              absolute 
              top-full 
              right-0 
              mt-2 
              w-64 
              bg-red-50 
              rounded-2xl 
              shadow-2xl 
              border 
              border-red-200 
              py-2 
              z-50
              animate-in 
              fade-in 
              duration-200
              overflow-hidden
            ">
              {/* Menu Items */}
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (item.action === "logout") {
                        handleLogout();
                      } else {
                        handleMenuItemClick(item.action);
                      }
                    }}
                    className={`
                      w-full 
                      px-4 
                      py-3 
                      text-left 
                      flex 
                      items-center 
                      gap-3 
                      transition-all 
                      duration-200 
                      hover:bg-red-100 
                      active:bg-red-200
                      ${item.destructive ? 'text-red-700 hover:text-red-800' : 'text-red-900 hover:text-red-950'}
                    `}
                  >
                    <IconComponent size={18} className={item.destructive ? 'text-red-600' : 'text-red-700'} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Popup Modals */}
      <ChangeProfilePicturePopup 
        isOpen={activePopup === "profilePicture"} 
        onClose={() => setActivePopup(null)} 
      />
      <ChangeEmailPopup 
        isOpen={activePopup === "email"} 
        onClose={() => setActivePopup(null)} 
      />
      <ChangePasswordPopup 
        isOpen={activePopup === "password"} 
        onClose={() => setActivePopup(null)} 
      />
      <ChangeUsernamePopup 
        isOpen={activePopup === "username"} 
        onClose={() => setActivePopup(null)} 
      />
      <CustomerServicePopup 
        isOpen={activePopup === "customerService"} 
        onClose={() => setActivePopup(null)} 
      />
      <DeleteAccountPopup 
        isOpen={activePopup === "deleteAccount"} 
        onClose={() => setActivePopup(null)} 
      />
    </>
  );
}
