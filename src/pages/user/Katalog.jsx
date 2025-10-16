import HeaderbarUser from "../../components/HeaderbarUser";
import Sidebar from "../../components/sidebar";
import ResepCard from "../../components/ResepCard";
import Pagination from "../../components/Pagination";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Bookmark, Star, Trash2 } from "lucide-react";

import sample_image from "../../assets/images/food_sample.png";
import recipesData from "../../data/recipes.json";
import user_image from "../../assets/images/user_image.jpg";

export default function UserKatalog() {
  const [activeCategory, setActiveCategory] = useState("History");
  const [activeFilters, setActiveFilters] = useState(["Nusantara", "Beverages", "Western"]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 3;
  
  const navigate = useNavigate();

  // Mock data for user activity (without timestamps for now)
  const [userActivity, setUserActivity] = useState({
    history: [1, 2, 3], // Just recipe IDs
    bookmarks: [1, 3, 5],
    reviews: [1, 4] // Just recipe IDs that have been reviewed
  });

  const menuData = [
    { 
      title: "History", 
      active: activeCategory === "History",
      icon: <Clock size={18} />,
      description: "Resep yang pernah Anda lihat"
    },
    { 
      title: "Bookmarks", 
      active: activeCategory === "Bookmarks",
      icon: <Bookmark size={18} />,
      description: "Resep yang Anda simpan"
    },
    { 
      title: "Reviews", 
      active: activeCategory === "Reviews",
      icon: <Star size={18} />,
      description: "Resep yang Anda beri rating"
    },
  ];

  // Use useMemo to prevent recreation on every render
  const allRecipes = useMemo(() => {
    return recipesData.recipes.map(recipe => ({
      ...recipe,
      imgUrl: sample_image
    }));
  }, []);

  // Get recipes based on active category
  const getRecipesByCategory = useMemo(() => {
    return () => {
      switch (activeCategory) {
        case "History":
          return userActivity.history.map(recipeId => 
            allRecipes.find(recipe => recipe.id === recipeId)
          ).filter(Boolean);
        
        case "Bookmarks":
          return userActivity.bookmarks.map(recipeId => 
            allRecipes.find(recipe => recipe.id === recipeId)
          ).filter(Boolean);
        
        case "Reviews":
          return userActivity.reviews.map(recipeId => 
            allRecipes.find(recipe => recipe.id === recipeId)
          ).filter(Boolean);
        
        default:
          return [];
      }
    };
  }, [activeCategory, userActivity, allRecipes]);

  // Filter recipes based on active filters
  useEffect(() => {
    let recipes = getRecipesByCategory();

    if (activeFilters.length >= 0) {
      recipes = recipes.filter(recipe => {
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

    setFilteredRecipes(recipes);
    setCurrentPage(1);
  }, [activeFilters, getRecipesByCategory]);

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
    // Add to history when clicking a recipe
    const newHistory = [
      recipe.id,
      ...userActivity.history.filter(id => id !== recipe.id)
    ].slice(0, 50); // Keep only last 50 items
    
    setUserActivity(prev => ({
      ...prev,
      history: newHistory
    }));
    
    navigate(`/user/recipe/${recipe.id}`, { state: { recipe } });
  };

  const handleClearHistory = () => {
    setUserActivity(prev => ({
      ...prev,
      history: []
    }));
  };

  const handleRemoveBookmark = (recipeId) => {
    setUserActivity(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.filter(id => id !== recipeId)
    }));
  };

  const getActivityInfo = (recipe) => {
    switch (activeCategory) {
      case "History":
        return {
          icon: <Clock size={16} className="text-blue-400" />,
          text: "Dilihat sebelumnya",
          color: "blue"
        };
      
      case "Bookmarks":
        return {
          icon: <Bookmark size={16} className="text-green-400" />,
          text: "Disimpan dalam bookmark",
          color: "green"
        };
      
      case "Reviews":
        return {
          icon: <Star size={16} className="text-yellow-400" />,
          text: "Telah diberi rating",
          color: "yellow"
        };
      
      default:
        return { icon: null, text: "", color: "gray" };
    }
  };

  const getCategoryStats = () => {
    const recipes = getRecipesByCategory();
    return {
      total: recipes.length,
      filtered: filteredRecipes.length,
      description: menuData.find(menu => menu.title === activeCategory)?.description || ""
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
          <div className="col-span-4">
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
          <div className="col-span-8">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-400/10 to-blue-600/10 rounded-3xl p-8 border border-blue-400/20 backdrop-blur-sm mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Aktivitas Anda 📚
                  </h1>
                  <p className="text-blue-200 text-lg">
                    {activeFilters.length > 0 
                      ? `Menampilkan ${stats.filtered} resep dengan filter aktif` 
                      : stats.description
                    }
                  </p>
                  
                  {/* Category-specific actions */}
                  <div className="flex gap-4 mt-4">
                    {activeCategory === "History" && userActivity.history.length > 0 && (
                      <button
                        onClick={handleClearHistory}
                        className="flex items-center gap-2 px-4 py-2 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-400/30 transition-colors text-sm"
                      >
                        <Trash2 size={16} />
                        Hapus Riwayat
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Stats */}
                <div className="text-right">
                  <div className="text-blue-300 text-sm font-semibold">
                    Total {activeCategory.toLowerCase()}
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stats.total}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-4 text-sm text-blue-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>{stats.filtered} resep tersedia • {Math.min(recipesPerPage, currentRecipes.length)} resep per halaman</span>
                </div>
                {activeFilters.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>{activeFilters.length} filter aktif</span>
                  </div>
                )}
              </div>
            </div>

            {/* Recipe Cards with Activity Info */}
            {currentRecipes.length > 0 ? (
              <>
                {currentRecipes.map((recipe) => {
                  const activityInfo = getActivityInfo(recipe);
                  return (
                    <div key={recipe.id} className="relative mb-6">
                      <ResepCard
                        title={recipe.name}
                        category={recipe.category}
                        description={recipe.description}
                        imgUrl={recipe.imgUrl}
                        difficulty={recipe.difficulty}
                        taste={recipe.taste}
                        onClick={() => handleRecipeClick(recipe)}
                      />
                      
                      {/* Activity Info Overlay */}
                      <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-${activityInfo.color}-400/20 border border-${activityInfo.color}-400/30 backdrop-blur-sm`}>
                        {activityInfo.icon}
                        <span className={`text-${activityInfo.color}-300 text-sm font-medium`}>
                          {activityInfo.text}
                        </span>
                        
                        {/* Remove button for bookmarks */}
                        {activeCategory === "Bookmarks" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveBookmark(recipe.id);
                            }}
                            className="ml-2 text-red-300 hover:text-white transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                
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
                <div className="text-blue-300 text-lg font-semibold mb-4">
                  {activeCategory === "History" && "Belum ada riwayat penelusuran"}
                  {activeCategory === "Bookmarks" && "Belum ada resep yang disimpan"}
                  {activeCategory === "Reviews" && "Belum ada resep yang diberi rating"}
                </div>
                <p className="text-blue-200 mb-6">
                  {activeCategory === "History" && "Resep yang Anda lihat akan muncul di sini"}
                  {activeCategory === "Bookmarks" && "Simpan resep favorit Anda untuk akses cepat"}
                  {activeCategory === "Reviews" && "Beri rating pada resep yang Anda coba"}
                </p>
                {activeFilters.length > 0 ? (
                  <button
                    onClick={() => setActiveFilters([])}
                    className="px-6 py-3 bg-blue-400/20 border border-blue-400/30 rounded-xl text-blue-300 hover:bg-blue-400/30 transition-colors"
                  >
                    Reset Filter
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/user/discover')}
                    className="px-6 py-3 bg-blue-400/20 border border-blue-400/30 rounded-xl text-blue-300 hover:bg-blue-400/30 transition-colors"
                  >
                    Jelajahi Resep
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
