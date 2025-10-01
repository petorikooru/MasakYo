export default function ButtonRegular({ nama }) {
  return (
    <button className="
            w-[200px]
            h-[60px]
            px-15 
            rounded-full 
            bg-[#521F1F] 
            text-[36px] 
            text-white 
            font-bold
            hover:bg-[#A75A5A] 
            active:bg-[#D28B8B]
            flex              /* Add flexbox */
            items-center      /* Vertical center */
            justify-center    /* Horizontal center */
    ">
      {nama}
    </button>
  );
}
