import HeaderBarUser from "../components/headerbarUser";
import Sidebar from "../components/sidebar";
import ResepCard from "../components/ResepCard";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";

import sample_image from "../assets/images/food_sample.png";
import user_image from "../assets/images/user_image.jpg";

export default function MenuUser() {
  const [activeCategory, setActiveCategory] = useState("For You");
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 3;

  const menuData = [
    { title: "For You", active: activeCategory === "For You" },
    { title: "Currently Trending", active: activeCategory === "Currently Trending" },
    { title: "Nusantara", active: activeCategory === "Nusantara" },
    { title: "Western", active: activeCategory === "Western" },
    { title: "Desserts", active: activeCategory === "Desserts" },
    { title: "Beverages", active: activeCategory === "Beverages" },
  ];

  const allRecipes = [
    {
      name: "Rendang",
      category: "Nusantara",
      description: "Rendang adalah hidangan lauk pauk yang berasal dari Minangkabau, Indonesia dengan bahan dasar daging sapi yang dimasak dalam suhu rendah dalam waktu lama dengan menggunakan aneka rempah-rempah dan santan.",
      ingredients: ["daging sapi", "santan", "bawang merah", "bawang putih", "cabe merah", "kemiri", "kunyit", "jahe", "sereh", "daun jeruk"],
      tags: ["nusantara", "daging", "pedas", "tradisional"],
      cookTime: "4 jam",
      difficulty: 4,
      taste: 5,
      imgUrl: sample_image
    },
    {
      name: "Sate Ayam",
      category: "Nusantara", 
      description: "Sate ayam adalah makanan khas Indonesia yang berupa daging ayam yang dipotong kecil-kecil lalu ditusuk dan dipanggang dengan bumbu kacang yang khas.",
      ingredients: ["daging ayam", "kacang tanah", "kecap manis", "bawang merah", "bawang putih", "cabe", "gula merah"],
      tags: ["nusantara", "ayam", "panggang", "street food"],
      cookTime: "45 menit",
      difficulty: 3,
      taste: 5,
      imgUrl: sample_image
    },
    {
      name: "Es Teh Manis",
      category: "Beverages",
      description: "Minuman penyegar tradisional Indonesia yang cocok dinikmati kapan saja.",
      ingredients: ["teh", "gula", "es batu", "air"],
      tags: ["beverages", "minuman", "penyegar", "tradisional"],
      cookTime: "5 menit",
      difficulty: 1,
      taste: 4,
      imgUrl: sample_image
    },
    {
      name: "Gado-gado",
      category: "Nusantara",
      description: "Gado-gado adalah salah satu makanan khas Indonesia yang berisi berbagai jenis sayuran yang direbus dan disajikan dengan saus kacang yang lezat.",
      ingredients: ["sayuran campur", "kacang tanah", "tahu", "tempe", "telur", "lontong"],
      tags: ["nusantara", "vegetarian", "sehat", "sayuran"],
      cookTime: "30 menit", 
      difficulty: 2,
      taste: 4,
      imgUrl: sample_image
    },
    {
      name: "Salad Buah",
      category: "Desserts",
      description: "Hidangan penutup yang segar dan sehat dengan campuran berbagai buah-buahan.",
      ingredients: ["apel", "anggur", "jeruk", "melon", "yogurt", "madu"],
      tags: ["desserts", "vegetarian", "sehat", "buah"],
      cookTime: "15 menit",
      difficulty: 1,
      taste: 4,
      imgUrl: sample_image
    },
    {
      name: "Nasi Goreng Spesial",
      category: "Nusantara",
      description: "Nasi goreng dengan bumbu rempah khas Indonesia yang menggugah selera.",
      ingredients: ["nasi", "bawang merah", "bawang putih", "kecap manis", "telur", "ayam"],
      tags: ["nusantara", "ayam", "nasional", "populer"],
      cookTime: "25 menit",
      difficulty: 2,
      taste: 5,
      imgUrl: sample_image
    },
    {
      name: "Soto Ayam",
      category: "Nusantara",
      description: "Sup ayam tradisional Indonesia dengan kuah kuning yang gurih.",
      ingredients: ["ayam", "soun", "kol", "seledri", "bawang goreng", "kunyit"],
      tags: ["nusantara", "ayam", "sup", "tradisional"],
      cookTime: "40 menit",
      difficulty: 3,
      taste: 4,
      imgUrl: sample_image
    }
  ];

  // Filter recipes based on active filters
  useEffect(() => {
    let filtered = [...allRecipes];

    if (activeFilters.length > 0) {
      filtered = filtered.filter(recipe => {
        // Check each active filter
        return activeFilters.every(filter => {
          switch (filter) {
            case "Nusantara Only":
              return recipe.category === "Nusantara";
            case "Beverages Only":
              return recipe.category === "Beverages";
            case "Vegetarian":
              return recipe.tags?.includes("vegetarian") || 
                     !recipe.ingredients?.some(ing => ing.includes("daging") || ing.includes("ayam"));
            default:
              return true;
          }
        });
      });
    }

    setFilteredRecipes(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters]);

  // Calculate current page recipes
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleMenuClick = (menuTitle) => {
    setActiveCategory(menuTitle);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen relative bg-neutral-900 ">
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${user_image})` }}
      />
      
      {/* Content Container */}
      <div className="relative p-[100px]">
        <HeaderBarUser />
        
            <div className="grid grid-cols-12 m-10">

                {/* Sidebar */}
                <div className="col-span-3">
                  <div className="fixed flex-shrink-0">
                    <Sidebar
                      menuData={menuData}
                      recipes={allRecipes}
                      onFiltersChange={handleFiltersChange}
                      onMenuClick={handleMenuClick}
                    />
                  </div>
                </div>

                {/* Recipe Grid */}
                <div className="col-span-9">

                    {/* Welcome Header */}
                    <div className="bg-gradient-to-r from-red-400/10 to-red-600/10 rounded-3xl p-8 border border-red-400/20 backdrop-blur-sm mb-5">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Selamat Datang, User! 👋
                        </h1>
                        <p className="text-red-200 text-lg">
                            {activeFilters.length > 0 
                            ? `Menampilkan ${filteredRecipes.length} resep dengan filter aktif` 
                            : "Temukan resep masakan terbaik dari seluruh Nusantara"
                            }
                        </p>
                        <div className="flex gap-4 mt-4 text-sm text-red-300">
                            <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                            <span>{filteredRecipes.length} resep tersedia • {Math.min(recipesPerPage, currentRecipes.length)} resep per halaman</span>
                            </div>
                            {activeFilters.length > 0 && (
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>{activeFilters.length} filter aktif</span>
                            </div>
                            )}
                        </div>
                    </div>
                    {currentRecipes.map((recipe, index) => (
                        <ResepCard
                        key={index}
                        title={recipe.name}
                        category={recipe.category}
                        description={recipe.description}
                        imgUrl={recipe.imgUrl}
                        difficulty={recipe.difficulty}
                        taste={recipe.taste}
                        onClick={() => console.log("Selected recipe:", recipe.name)}
                        />
                    ))}
                    {/* No Results Message */}
                    {filteredRecipes.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-red-300 text-lg font-semibold mb-2">
                        Tidak ada resep yang sesuai dengan filter
                        </div>
                        <button
                        onClick={() => setActiveFilters([])}
                        className="px-6 py-3 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-400/30 transition-colors"
                        >
                        Reset Filter
                        </button>
                    </div>
                    )}
                    {/* Pagination Section */}
                    {filteredRecipes.length > 0 && (
                    <Pagination
                        totalItems={filteredRecipes.length}
                        itemsPerPage={recipesPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        maxVisiblePages={5}
                    />
                    )}
                </div>
                
            </div>
      </div>
    </div>
  );
}
