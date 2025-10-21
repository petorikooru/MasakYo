import { useState } from "react";
import { X, Star, ThumbsUp, MessageCircle } from "lucide-react";

export default function RatingPopup({ isOpen, onClose, onRate, recipeName }) {
  const [tasteRating, setTasteRating] = useState(0);
  const [easeRating, setEaseRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (tasteRating === 0 || easeRating === 0) {
      alert("Harap beri rating untuk kelezatan dan kemudahan terlebih dahulu!");
      return;
    }

    onRate({
      taste: tasteRating,
      ease: easeRating,
      comment: comment.trim() || null,
      timestamp: new Date().toISOString()
    });

    // Reset form
    setTasteRating(0);
    setEaseRating(0);
    setComment("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-800 rounded-3xl border border-neutral-700/50 shadow-2xl max-w-md w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-700/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ThumbsUp size={24} className="text-red-400" />
            Beri Rating Resep
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1 hover:bg-neutral-700 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-white font-semibold text-lg mb-2">
              Bagaimana pengalaman memasak{" "}
              <span className="text-red-400">{recipeName}</span>?
            </h3>
            <p className="text-gray-400 text-sm">
              Bantu orang lain dengan berbagi pengalamanmu
            </p>
          </div>

          {/* Taste Rating */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-3">
              Seberapa lezat hasil masakanmu?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setTasteRating(star)}
                  className="p-2 transition-all duration-200 hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`
                      ${star <= tasteRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-500"
                      }
                      transition-colors duration-200
                    `}
                  />
                </button>
              ))}
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-400 text-sm">
                {tasteRating === 0 && "Pilih rating"}
                {tasteRating === 1 && "Tidak Lezat"}
                {tasteRating === 2 && "Kurang Lezat"}
                {tasteRating === 3 && "Cukup Lezat"}
                {tasteRating === 4 && "Lezat"}
                {tasteRating === 5 && "Sangat Lezat"}
              </span>
            </div>
          </div>

          {/* Ease Rating */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-3">
              Seberapa mudah mengikuti resepnya?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setEaseRating(star)}
                  className="p-2 transition-all duration-200 hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`
                      ${star <= easeRating
                        ? "text-green-400 fill-green-400"
                        : "text-gray-500"
                      }
                      transition-colors duration-200
                    `}
                  />
                </button>
              ))}
            </div>
            <div className="text-center mt-2">
              <span className="text-gray-400 text-sm">
                {easeRating === 0 && "Pilih rating"}
                {easeRating === 1 && "Sangat Sulit"}
                {easeRating === 2 && "Sulit"}
                {easeRating === 3 && "Cukup Mudah"}
                {easeRating === 4 && "Mudah"}
                {easeRating === 5 && "Sangat Mudah"}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-white font-medium mb-3 flex items-center gap-2">
              <MessageCircle size={16} className="text-red-400" />
              Komentar (opsional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bagikan tips atau pengalaman memasakmu..."
              className="w-full bg-neutral-700/50 border border-neutral-600/50 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50 transition-colors duration-200 resize-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-neutral-700/50 border border-neutral-600/50 rounded-xl text-gray-300 font-semibold hover:bg-neutral-700 hover:text-white transition-all duration-300"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 font-semibold hover:bg-red-400/30 hover:text-white transition-all duration-300"
            >
              Kirim Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}