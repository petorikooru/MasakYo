interface ButtonHugeProps {
  nama: string;
  className?: string;
}

export default function ButtonHuge({ nama, className = "" }: ButtonHugeProps) {
  return (
    <button className={`w-[155px] h-[60px] rounded-full bg-[#BB5B5B] text-[30px] text-[#FFDFDF] ${className}`}>
      {nama}
    </button>
  );
}
