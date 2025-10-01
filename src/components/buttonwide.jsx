export default function Buttonwide({ nama }){
return (    
<button className="w-full px-6 py-3 text-[15px] rounded-full bg-gradient-to-b from-[#FFD6D6] to-[#DE9393] text-[#521F1F] font-semibold shadow-md  hover:bg-[#BB5B5B] hover:text-[#521F1F] active:bg-[#BB5B5B] active:text-[#FFE3E3] transition-colors duration-200">
  {nama}
</button>
 );
}
