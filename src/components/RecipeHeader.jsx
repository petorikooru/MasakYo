import { Clock, Users, Star, ArrowLeft, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RecipeHeader({ recipe }) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    // Here you can add logic to save/remove bookmark from database
    console.log(`Recipe ${recipe.id} ${isBookmarked ? 'removed from' : 'added to'} bookmarks`);
  };

  return (
    <div className="bg-neutral-800/50 from-neutral-800 to-neutral-900 rounded-3xl p-8 border border-neutral-700/50 shadow-2xl mb-8 backdrop-blur-sm">
      {/* Header with Back Button and Bookmark */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 px-4 py-2 bg-red-400/20 hover:bg-red-400/30 border border-red-400/30 rounded-xl text-red-400 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Kembali</span>
        </button>
        
        <button
          onClick={handleBookmarkClick}
          className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-all duration-200 ${
            isBookmarked 
              ? "bg-yellow-400/20 border-yellow-400/30 text-yellow-400" 
              : "bg-neutral-700/50 border-neutral-600/50 text-gray-400 hover:bg-yellow-400/10 hover:border-yellow-400/20 hover:text-yellow-400"
          }`}
        >
          <Bookmark 
            size={20} 
            fill={isBookmarked ? "currentColor" : "none"}
          />
          <span className="font-semibold">
            {isBookmarked ? "Disimpan" : "Simpan"}
          </span>
        </button>
      </div>

      <div className="flex items-start gap-8">
        {/* Recipe Info - Now on the left */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              {recipe.name}
            </h1>
            <div className="inline-flex items-center px-4 py-2 bg-red-400/20 rounded-full border border-red-400/30 mb-4">
              <span className="text-red-400 font-semibold text-sm text-xl">
                {recipe.category}
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {recipe.description}
            </p>
          </div>

          {/* Recipe Stats */}
          <div className="grid grid-cols-4 gap-6">
            <RecipeStat 
              icon={<Clock size={24} className="text-red-400" />}
              label="Waktu"
              value={recipe.cookTime}
            />
            
            <RecipeStat 
              icon={<Users size={24} className="text-red-400" />}
              label="Porsi"
              value={`${recipe.servings} orang`}
            />
            
            <RecipeStat 
              icon={<Star size={24} className="text-red-400" />}
              label="Rating"
              value={`${recipe.rating}/5`}
            />
            
            <RecipeStat 
              icon={
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-6 rounded-sm ${
                        index < recipe.difficulty ? "bg-red-400" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              }
              label="Kesulitan"
              value={getDifficultyText(recipe.difficulty)}
            />
          </div>
        </div>

        {/* Recipe Image - Now on the right */}
        <div className="w-96 h-80 rounded-2xl overflow-hidden flex-shrink-0">
          <img 
            src={recipe.imgUrl} 
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function RecipeStat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-red-400/20 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-white font-semibold">{label}</div>
        <div className="text-gray-400 text-sm">{value}</div>
      </div>
    </div>
  );
}

function getDifficultyText(difficulty) {
  switch(difficulty) {
    case 1: return "Mudah";
    case 2: return "Sedang";
    case 3: return "Cukup Sulit";
    case 4: return "Sulit";
    case 5: return "Sangat Sulit";
    default: return "Sedang";
  }
}
