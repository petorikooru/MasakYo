import React, { useState } from "react";

const Editrecipe = ({ onClose }) => {
    const [category, setCategory] = useState("Nusantara");

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="bg-black/80 p-6 rounded-2xl w-11/12 md:w-5/6 lg:w-4/5 text-white shadow-xl overflow-y-auto max-h-[95vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            Go back
          </button>
          <input
            type="text"
            defaultValue="Rendang"
            className="text-3xl font-bold bg-transparent border-b border-gray-500 focus:outline-none"
          />
        </div>

        {/* Kategori */}
        <div className="flex gap-3 mb-6">
          {["Nusantara", "Western", "Beverages"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full transition ${
                category === cat
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Deskripsi + Cover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <textarea
            rows={4}
            defaultValue="Rendang adalah hidangan khas Minangkabau..."
            className="w-full p-3 rounded-lg bg-black/50 border border-gray-600"
          />
          <div className="flex items-center justify-center h-40 rounded-xl bg-black/50 border border-gray-600">
            <p className="text-gray-400">Upload Cover Resep</p>
          </div>
        </div>

        {/* Alat & Bahan + Langkah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Alat & Bahan */}
          <textarea
            rows={8}
            defaultValue={`Alat yang dibutuhkan:\n- Panci\n- Blender\n- Wajan\n- Spatula\n\nBahan yang dibutuhkan:\n- 500 gram daging sapi/kambing\n- 1 liter santan kental\n- 2 sdm bumbu rendang\n- Kecap manis secukupnya`}
            className="w-full p-3 rounded-lg bg-black/50 border border-gray-600"
          />
          {/* Langkah */}
          <textarea
            rows={8}
            defaultValue={`Langkah-langkah Pembuatan:\n1. Rebus daging, kurang lebih 30 menit lalu angkat dan iris tipis.\n2. Blender semua bumbu halus.\n3. Tumis sampai harum, masukkan bumbu ke santan.\n4. Masukkan daging, masak hingga santan menyusut.\n5. Angkat dan sajikan.`}
            className="w-full p-3 rounded-lg bg-black/50 border border-gray-600"
          />
        </div>

        {/* Estimasi Waktu */}
        <div className="mb-6">
          <label className="block text-red-400 font-semibold mb-2">Estimasi Waktu :</label>
          <input
            type="text"
            defaultValue="1 jam 30 menit"
            className="w-full p-3 rounded-lg bg-black/50 border border-gray-600"
          />
        </div>

        {/* Tombol Simpan */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-semibold"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editrecipe;