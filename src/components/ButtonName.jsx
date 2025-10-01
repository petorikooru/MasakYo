export default function ButtonName({ nama, onClick, disabled = false }) {
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
