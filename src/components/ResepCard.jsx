export default function ResepCard({ title, category, description, imgUrl, difficulty, taste }) {
  return (
    <div className="flex bg-black/70 text-white rounded-2xl p-4 mb-4 shadow-lg backdrop-blur-md">
      <div className="flex-1 pr-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-red-400 font-semibold">{category}</p>
        <p className="text-sm mt-2">{description}</p>

        <div className="flex space-x-4 mt-3 text-sm text-gray-300">
          <p>Kesulitan : {"⭐".repeat(difficulty)}{"☆".repeat(5 - difficulty)}</p>
          <p>Kelezatan : {"⭐".repeat(taste)}{"☆".repeat(5 - taste)}</p>
        </div>
      </div>

      <div className="w-40 h-28 rounded-xl overflow-hidden">
        <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
