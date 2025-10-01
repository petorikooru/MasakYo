import HeaderbarUser from "@components/HeaderbarUser";
import Sidebar from "@components/sidebar";
import ResepCard from "@components/ResepCard";
import Pagination from "@components/Pagination";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, User } from "lucide-react";

import sample_image from "@assets/images/food_sample.png";
import recipesData from "@data/recipes.json";
import user_image from "@assets/images/user_image.jpg";

export default function UserDiscover() {
  const [activeCategory, setActiveCategory] = useState("For You");
  const [activeFilters, setActiveFilters] = useState(["Nusantara", "Beverages", "Western"]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 3;
  
  const navigate = useNavigate();

  const menuData = [
    { 
      title: "For You", 
      active: activeCategory === "For You",
      icon: <User size={18} />,
      description: "Rekomendasi personal untuk Anda"
    },
    { 
      title: "Currently Trending", 
      active: activeCategory === "Currently Trending",
      icon: <Flame size={18} />,
      description: "Resep yang sedang populer"
    },
  ];

  // Use useMemo to prevent recreation on every render
  const allRecipes = useMemo(() => {
    return recipesData.recipes.map(recipe => ({
      ...recipe,
      imgUrl: sample_image
    }));
  }, []); // Empty dependency array means this only runs once

  // Filter recipes based on active filters AND category
  useEffect(() => {
    let filtered = [...allRecipes];

    // Apply category filter first
    if (activeCategory === "Currently Trending") {
      // For trending, show recipes with highest ratings
      filtered = filtered
        .filter(recipe => recipe.rating >= 4.5)
        .sort((a, b) => b.rating - a.rating);
    } else {
      // For "For You", show all recipes or personalized recommendations
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    if (activeFilters.length >= 0) {
      filtered = filtered.filter(recipe => {
        return activeFilters.some(filter => {
          switch (filter) {
            case "Nusantara":
              return recipe.category === "Nusantara";
            case "Western":
              return recipe.category === "Western";
            case "Beverages":
              return recipe.category === "Beverages";
            default:
              return false;
          }
        });
      });
    }

    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [activeFilters, activeCategory, allRecipes]); // allRecipes is now stable

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

  const handleRecipeClick = (recipe) => {
    navigate(`/user/recipe/${recipe.id}`, { state: { recipe } });
  };

  const handleResetFilters = () => {
    setActiveFilters([]);
  };

  const getCategoryDescription = () => {
    switch (activeCategory) {
      case "For You":
        return "Rekomendasi personal berdasarkan preferensi Anda";
      case "Currently Trending":
        return "Resep dengan rating tertinggi dan paling populer";
      default:
        return "Temukan resep masakan terbaik dari seluruh Nusantara";
    }
  };

  const getCategoryStats = () => {
    return {
      total: allRecipes.length,
      filtered: filteredRecipes.length,
      description: getCategoryDescription()
    };
  };

  const stats = getCategoryStats();

  return (
    <div className="min-h-screen relative bg-neutral-900">
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${user_image})` }}
      />
      
      {/* Content Container */}
      <div className="relative p-[100px]">
        <HeaderbarUser />
        
        <div className="grid grid-cols-12 m-10">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="fixed flex-shrink-0">
              <Sidebar
                menuData={menuData}
                recipes={allRecipes}
                onFiltersChange={handleFiltersChange}
                onMenuClick={handleMenuClick}
                activeFilters={activeFilters}
                activeMenu={activeCategory}
              />
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="col-span-9">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-red-400/10 to-red-600/10 rounded-3xl p-8 border border-red-400/20 backdrop-blur-sm mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Selamat Datang, User! 👋
                  </h1>
                  <p className="text-red-200 text-lg">
                    {activeFilters.length > 0 
                      ? `Menampilkan ${stats.filtered} resep dengan filter aktif` 
                      : stats.description
                    }
                  </p>
                  
                  {/* Active Filters Display */}
                  {activeFilters.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {activeFilters.map((filter, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-red-500/30 border border-red-400/50 rounded-full text-red-200 text-sm flex items-center gap-2"
                          >
                            {filter}
                            <button 
                              onClick={() => {
                                const newFilters = activeFilters.filter((_, i) => i !== index);
                                setActiveFilters(newFilters);
                              }}
                              className="text-red-300 hover:text-white ml-1"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={handleResetFilters}
                        className="px-4 py-2 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-400/30 transition-colors text-sm"
                      >
                        Reset Semua Filter
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Stats */}
                <div className="text-right">
                  <div className="text-red-300 text-sm font-semibold">
                    {activeCategory === "Currently Trending" ? "Trending Recipes" : "Total Recipes"}
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stats.filtered}
                  </div>
                  {activeCategory === "Currently Trending" && (
                    <div className="text-xs text-red-300 mt-1">
                      Rating ≥ 4.5
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-4 text-sm text-red-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span>{stats.filtered} resep tersedia • {Math.min(recipesPerPage, currentRecipes.length)} resep per halaman</span>
                </div>
                {activeFilters.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>{activeFilters.length} filter aktif</span>
                  </div>
                )}
                {activeCategory === "Currently Trending" && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Sedang Trending</span>
                  </div>
                )}
              </div>
            </div>

            {/* Recipe Cards */}
            {currentRecipes.length > 0 ? (
              <>
                {currentRecipes.map((recipe) => (
                  <ResepCard
                    key={recipe.id}
                    title={recipe.name}
                    category={recipe.category}
                    description={recipe.description}
                    imgUrl={recipe.imgUrl}
                    difficulty={recipe.difficulty}
                    taste={recipe.taste}
                    onClick={() => handleRecipeClick(recipe)}
                  />
                ))}
                
                {/* Pagination Section */}
                <Pagination
                  totalItems={filteredRecipes.length}
                  itemsPerPage={recipesPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  maxVisiblePages={5}
                />
              </>
            ) : (
              /* No Results Message */
              <div className="text-center py-12">
                <div className="text-red-300 text-lg font-semibold mb-4">
                  Tidak ada resep yang sesuai
                </div>
                <p className="text-red-200 mb-6">
                  {activeCategory === "Currently Trending" 
                    ? "Tidak ada resep trending yang sesuai dengan filter Anda" 
                    : "Coba ubah filter atau reset filter untuk melihat lebih banyak resep"
                  }
                </p>
                {activeFilters.length > 0 ? (
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-3 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-400/30 transition-colors"
                  >
                    Reset Filter
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveCategory("For You")}
                    className="px-6 py-3 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-400/30 transition-colors"
                  >
                    Lihat Semua Resep
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
