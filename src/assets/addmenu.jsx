import { useState } from "react";
import { Upload } from "lucide-react";

const Addmenu = ({ onClose }) => {
  const [recipe, setRecipe] = useState({
    name: "Nama Resep",
    category: "Nusantara",
    description: "Deskripsi resep...",
    cover: null,
    ingredients: "Daftar bahan...",
    video: null,
    steps: "Langkah pembuatan...",
    time: "Tuliskan disini."
  });

  // Handler untuk update field
  const handleChange = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const handleSave = () => {
    console.log("Data resep disimpan:", recipe);
    // TODO: kirim ke backend pakai fetch/axios
  };

  return (
    <div className="p-6 text-white space-y-6 bg-black/60 rounded-2xl">
      {/* Header: Go Back + Nama Resep */}
      <div className="flex justify-between items-center">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700"
        >
          Go Back
        </button>
        <input
          type="text"
          value={recipe.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="bg-transparent text-3xl font-bold border-b border-gray-400 focus:outline-none text-center"
        />
      </div>

      {/* Kategori */}
      <div className="flex gap-3 justify-center">
        {["Nusantara", "Western", "Beverages"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleChange("category", cat)}
            className={`px-4 py-2 rounded-full ${
              recipe.category === cat
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Deskripsi & Cover */}
      <div className="grid grid-cols-2 gap-6">
        <textarea
          value={recipe.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="bg-black/50 rounded-lg p-3 w-full h-32"
          placeholder="Deskripsi Resep"
        />
        <div className="flex flex-col justify-center items-center border border-gray-600 rounded-lg p-6">
          {recipe.cover ? (
            <img
              src={recipe.cover}
              alt="cover"
              className="w-40 h-28 object-cover rounded-md"
            />
          ) : (
            <Upload size={40} />
          )}
          <input
            type="file"
            onChange={(e) =>
              handleChange("cover", URL.createObjectURL(e.target.files[0]))
            }
            className="mt-3"
          />
        </div>
      </div>

      {/* Alat & Bahan, Video, Langkah */}
      <div className="grid grid-cols-3 gap-6">
        <textarea
          value={recipe.ingredients}
          onChange={(e) => handleChange("ingredients", e.target.value)}
          className="bg-black/50 rounded-lg p-3 h-32"
          placeholder="Alat dan Bahan"
        />
        <div className="flex flex-col justify-center items-center border border-gray-600 rounded-lg p-6">
          {recipe.video ? (
            <video controls className="w-full h-32 rounded-md">
              <source src={recipe.video} />
            </video>
          ) : (
            <Upload size={40} />
          )}
          <input
            type="file"
            accept="video/*"
            onChange={(e) =>
              handleChange("video", URL.createObjectURL(e.target.files[0]))
            }
            className="mt-3"
          />
        </div>
        <textarea
          value={recipe.steps}
          onChange={(e) => handleChange("steps", e.target.value)}
          className="bg-black/50 rounded-lg p-3 h-32"
          placeholder="Langkah Pembuatan"
        />
      </div>

      {/* Estimasi Waktu */}
      <div>
        <label className="text-red-400 font-semibold">Estimasi Waktu:</label>
        <input
          type="text"
          value={recipe.time}
          onChange={(e) => handleChange("time", e.target.value)}
          className="ml-2 bg-transparent border-b border-gray-400 focus:outline-none"
        />
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 font-bold"
      >
        Tambahkan Resep Baru
      </button>
    </div>
  );
};

export default Addmenu;