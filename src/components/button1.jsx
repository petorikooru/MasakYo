export default function Button1({ nama }) {
  return (
    <button className="px-5 py-2 rounded-full bg-[#521F1F] text-base text-white font-medium hover:bg-[#A75A5A] active:bg-[#D28B8B]">
      {nama}
    </button>
  );
}
