import { useState } from "react";
import Menubar from "../component/manubar";
import { ChevronLeft, ChevronRight } from "lucide-react"; // ikon panah


const Carousel = ({ data, isAdmin = false, onDelete }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleData = data.slice(start, end);

  const handleNext = () => {
    if (end < data.length) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

return (
    <div className="w-full relative">
      {/* Tombol navigasi */}
      {/* Card list */}
        <div className="space-y-4">
            {visibleData.map((item, idx) => (
            <Menubar key={idx} {...item} isAdmin={isAdmin} onDelete={onDelete} />
            ))}
        </div>

        <div className="flex justify-center items-center mb-4 gap-20 border border-gray-400 rounded-full px-4 py-2 bg-black/50 backdrop-blur-md shadow-lg mt-6 w-fit mx-auto">
            <button
                onClick={handlePrev}
                disabled={page === 0}
                className="p-2 rounded-full bg-pink-500 text-white shadow-md hover:bg-pink-600 disabled:opacity-40 transition"
            >
                <ChevronLeft size={20} />
            </button>
            <button
            onClick={handleNext}
            disabled={end >= data.length}
            className="p-2 rounded-full bg-pink-500 text-white shadow-md hover:bg-pink-600 disabled:opacity-40 transition"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    </div>
);
};

export default Carousel;