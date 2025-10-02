export default function ResepCard({ title, category, description, imgUrl, difficulty, taste, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="
        flex 
        bg-gradient-to-br from-neutral-900/90 to-neutral-800/80 
        text-white 
        rounded-3xl p-8 mb-6 
        border border-neutral-700/50
        shadow-2xl backdrop-blur-xl
        hover:bg-neutral-700/60
        active:bg-red-400/10
        active:border-red-400/30
        active:scale-[0.98]
        transition-all duration-300 ease-out
        hover:shadow-xl
        hover:-translate-y-1
        group
        w-full
        text-left
      "
    >
      {/* ... rest of the ResepCard code remains the same ... */}
      <div className="flex-1 pr-8 flex flex-col min-w-0">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-5xl font-bold leading-tight mb-3 group-hover:text-red-400 transition-colors duration-300">
            {title}
          </h2>
          <div className="inline-flex items-center px-4 py-2 bg-red-400/20 rounded-full border border-red-400/30">
            <span className="text-red-400 text-xl font-semibold">
              {category}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="flex-grow mb-6">
          <p className="text-neutral-300 text-lg leading-relaxed line-clamp-3 group-hover:text-neutral-200 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap gap-6 text-base font-semibold">
          {/* Difficulty */}
          <div className="flex items-center gap-3">
            <span className="text-red-300 whitespace-nowrap">Kesulitan:</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-lg transition-transform duration-300 ${
                    index < difficulty 
                      ? "text-red-400 scale-110" 
                      : "text-neutral-600"
                  } group-hover:scale-105`}
                >
                  {index < difficulty ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>

          {/* Taste */}
          <div className="flex items-center gap-3">
            <span className="text-red-300 whitespace-nowrap">Kelezatan:</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-lg transition-transform duration-300 ${
                    index < taste 
                      ? "text-yellow-400 scale-110" 
                      : "text-neutral-600"
                  } group-hover:scale-105`}
                >
                  {index < taste ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-80 h-64 flex-shrink-0 relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img 
          src={imgUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
          <div className="bg-red-400/90 text-white px-4 py-2 rounded-full text-sm font-semibold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            Lihat Resep →
          </div>
        </div>
      </div>
    </button>
  );
}
