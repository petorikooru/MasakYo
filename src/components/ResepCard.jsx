export default function ResepCard({ title, category, description, imgUrl, difficulty, taste }) {
  return (
    <button className="
            flex 
            bg-black/70 text-white 
            rounded-[40px] p-[40px] mb-4 
            border
            shadow-lg backdrop-blur-md
            hover:bg-[#4F4F4F]/50
            active:bg-[#A31212]/10
            transition-colors duration-200
            ">
      <div className="flex-1 pr-4">
        <h2 className="text-justify text-[48px] font-bold">{title}</h2>
        <p className="text-justify text-[30px] text-red-400 font-semibold">{category}</p>
        <p className="text-justify text-[16px] text-sm mt-2">{description}</p>

        <div className="flex space-x-4 mt-3 text-[24px] text-sm text-gray-300">
          <p>Kesulitan : {"⭐".repeat(difficulty)}{"☆".repeat(5 - difficulty)}</p>
          <p>Kelezatan : {"⭐".repeat(taste)}{"☆".repeat(5 - taste)}</p>
        </div>
      </div>

      <div className="w-[40%] h-[100%] rounded-xl overflow-hidden">
        <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
      </div>
    </button>
  );
}
