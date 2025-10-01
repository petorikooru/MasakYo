import SettingsIcon from "./SettingsIcon";

export default function ButtonName({ 
  nama, 
  onClick, 
  disabled = false,
  showUserProfile = false,
  userInitial = "U",
  userName = "User",
  userRole = "Profile",
  avatarContent = null,
  avatarBg = "bg-gradient-to-br from-red-500 to-red-600"
}) {
  if (showUserProfile) {
    return (
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`
          group
          flex items-center gap-2
          px-3 py-2
          rounded-xl
          border
          transition-all duration-300 ease-out
          relative
          ${disabled 
            ? 'bg-gray-400/40 border-gray-300/50 cursor-not-allowed opacity-60' 
            : `
              bg-red-200/40 border-red-300/50 
              hover:bg-red-200/60 hover:border-red-400/60 hover:shadow-md
              active:scale-95
            `
          }
        `}
      >
        {/* Active indicator for settings */}
        <div className={`
          absolute -top-1 -right-1
          w-2 h-2 bg-red-600 rounded-full
          transition-all duration-300
          ${disabled ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
        `} />
        
        {/* Customizable Avatar */}
        <div className={`
          w-8 h-8
          rounded-full
          flex items-center justify-center
          text-white font-bold text-sm
          shadow-inner
          transition-transform duration-300
          ${disabled ? '' : 'group-hover:scale-110'}
          ${avatarBg}
        `}>
          {avatarContent || userInitial}
        </div>
        
        {/* User Info */}
        <div className="flex flex-col items-start">
            <span className={`
                font-semibold text-sm
                transition-colors duration-300
                ${disabled 
                    ? 'text-gray-600' 
                    : 'text-red-800 group-hover:text-red-900'
                }
                `}>
                {userName}
            </span>
            <span className={`
                text-xs
                transition-colors duration-300
                ${disabled 
                    ? 'text-gray-500/70' 
                    : 'text-red-600/70 group-hover:text-red-700/80'
                }
                `}>
                {userRole}
            </span>
        </div>

        {/* Settings Icon */}
        <div className={`
          transition-all duration-500
          ml-1
          ${disabled 
            ? 'text-gray-500/40' 
            : 'text-red-500/60 group-hover:text-red-600 group-hover:rotate-90'
          }
        `}>
          <SettingsIcon size={14} />
        </div>
      </button>
    );
  }

  // Original button style
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="
        min-w-[155px]
        h-[59px]
        px-6
        rounded-full 
        bg-gradient-to-br from-[#BB5B5B] to-[#C86A6A]
        text-[#FFDFDF]
        font-bold
        text-[30px]
        shadow-lg
        border border-red-400/30
        hover:from-[#D28B8B] hover:to-[#DC9B9B]
        hover:shadow-xl
        hover:scale-105
        hover:-translate-y-0.5
        active:from-[#E8B5B5] active:to-[#F0C5C5]
        active:scale-100
        active:translate-y-0
        active:shadow-lg
        disabled:from-gray-400 disabled:to-gray-500
        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:scale-100
        disabled:translate-y-0
        transition-all
        duration-300
        ease-out
        flex
        items-center
        justify-center
        relative
        overflow-hidden
        group
      "
    >
      {/* Shine effect on hover */}
      <div className="
        absolute 
        inset-0 
        bg-gradient-to-r from-transparent via-[#FFDFDF]/20 to-transparent 
        -translate-x-full 
        group-hover:translate-x-full 
        transition-transform 
        duration-1000
        ease-out
      " />
      
      {/* Text with transition */}
      <span className="
        relative
        z-10
        transition-all
        duration-300
        group-hover:tracking-wide
      ">
        {nama}
      </span>

      {/* Optional loading state indicator */}
      {disabled && (
        <div className="
          absolute
          right-4
          w-4 h-4
          border-2 border-[#FFDFDF] border-t-transparent
          rounded-full
          animate-spin
        " />
      )}
    </button>
  );
}
