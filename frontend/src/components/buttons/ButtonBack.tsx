interface ButtonBackProps {
  nama: string;
  className?: string;
}

export default function ButtonBack({ nama, className = "" }: ButtonBackProps) {
  return (
    <button className={`w-[140px] h-[50px] rounded-full bg-red-500/20 border border-red-400/30 text-[20px] hover:bg-red-500/30 text-red-200 transition-colors ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {nama}
      </div>
    </button>
  );
}