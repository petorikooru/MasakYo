import { useState } from "react";
import { Star, ThumbsUp, Users } from "lucide-react";
import RatingPopup from "./RatingPopup";

export default function RecipeRating({ recipeId, recipeName, initialRatings = [] }) {
  const [ratings, setRatings] = useState(initialRatings);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Calculate average ratings
  const averageTaste = ratings.length > 0 
    ? ratings.reduce((sum, rating) => sum + rating.taste, 0) / ratings.length 
    : 0;
  
  const averageEase = ratings.length > 0 
    ? ratings.reduce((sum, rating) => sum + rating.ease, 0) / ratings.length 
    : 0;

  const handleRate = (ratingData) => {
    const newRating = {
      id: Date.now(),
      recipeId,
      ...ratingData
    };
    
    setRatings(prev => [...prev, newRating]);
    
    // Here you would typically send to your backend
    console.log("New rating:", newRating);
  };

  const hasUserRated = ratings.some(rating => 
    // In a real app, you'd check against actual user ID
    rating.timestamp > new Date(Date.now() - 1000).toISOString() // Simple demo check
  );

  return (
    <>
      <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <ThumbsUp size={24} className="text-red-400" />
          Rating & Ulasan
        </h2>

        {/* Rating Summary */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <RatingSummary 
            label="Kelezatan"
            average={averageTaste}
            totalRatings={ratings.length}
            color="yellow"
          />
          <RatingSummary 
            label="Kemudahan"
            average={averageEase}
            totalRatings={ratings.length}
            color="green"
          />
        </div>

        {/* Rate Button */}
        {!hasUserRated ? (
          <button
            onClick={() => setIsPopupOpen(true)}
            className="w-full py-4 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 font-semibold hover:bg-red-400/30 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <ThumbsUp size={20} className="group-hover:scale-110 transition-transform duration-300" />
            Beri Rating Resep Ini
          </button>
        ) : (
          <div className="text-center py-4 bg-green-400/10 border border-green-400/20 rounded-xl">
            <div className="text-green-400 font-semibold flex items-center justify-center gap-2">
              <ThumbsUp size={20} />
              Terima kasih atas ratingmu!
            </div>
            <p className="text-green-300 text-sm mt-1">
              Kontribusimu membantu komunitas masak
            </p>
          </div>
        )}

        {/* Recent Ratings */}
        {ratings.length > 0 && (
          <div className="mt-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Users size={16} className="text-red-400" />
              Ulasan Terbaru ({ratings.length})
            </h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {ratings.slice(-3).reverse().map((rating) => (
                <RatingItem key={rating.id} rating={rating} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rating Popup */}
      <RatingPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onRate={handleRate}
        recipeName={recipeName}
      />
    </>
  );
}

function RatingSummary({ label, average, totalRatings, color }) {
  const colorClasses = {
    yellow: "text-yellow-400",
    green: "text-green-400"
  };

  return (
    <div className="text-center p-4 bg-neutral-700/30 rounded-xl border border-neutral-600/30">
      <div className="text-white font-semibold mb-2">{label}</div>
      <div className={`text-3xl font-bold ${colorClasses[color]} mb-2`}>
        {average.toFixed(1)}
      </div>
      <div className="flex justify-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`
              ${star <= Math.round(average) 
                ? `${colorClasses[color]} fill-current` 
                : "text-gray-500"
              }
            `}
          />
        ))}
      </div>
      <div className="text-gray-400 text-sm">
        {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
      </div>
    </div>
  );
}

function RatingItem({ rating }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-neutral-700/30 rounded-xl p-4 border border-neutral-600/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm">{rating.taste}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-green-400 fill-green-400" />
            <span className="text-white text-sm">{rating.ease}</span>
          </div>
        </div>
        <div className="text-gray-400 text-xs">
          {formatDate(rating.timestamp)}
        </div>
      </div>
      {rating.comment && (
        <p className="text-gray-300 text-sm">{rating.comment}</p>
      )}
    </div>
  );
}