import HeaderbarUser from "@components/headerbars/HeaderbarUser";
import SidebarUser from "@/components/sidebars/SidebarUser";
import CardRecipe from "@components/cards/CardRecipe";
import Pagination from "@components/miscellaneous/Pagination";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Bookmark, Star, Trash2, Menu, X } from "lucide-react";
import { type ReactNode } from "react";

import sample_image from "@assets/images/food_sample.png";
import recipesData from "@/data/recipes.json";
import user_image from "@assets/images/user_image.jpg";

interface Recipe {
  id: number;
  name: string;
  category: string;
  description: string;
  difficulty: number;
  taste: number;
  imgUrl: string;
}

interface UserActivity {
  history: number[];
  bookmarks: number[];
  reviews: number[];
}

interface MenuItem {
  title: string;
  active: boolean;
  icon: ReactNode;
  description: string;
}

interface ActivityInfo {
  icon: ReactNode;
  text: string;
  color: "blue" | "green" | "yellow" | "gray";
}

export default function UserKatalog() {
  const [activeCategory, setActiveCategory] = useState<string>("History");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Nusantara", "Beverages", "Western"]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const recipesPerPage = 3;
  
  const navigate = useNavigate();

  // Mock data for user activity
  const [userActivity, setUserActivity] = useState<UserActivity>({
    history: [1, 2, 3],
    bookmarks: [1, 3, 5],
    reviews: [1, 4]
  });

  const menuData: MenuItem[] = [
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
  const allRecipes = useMemo((): Recipe[] => {
    return recipesData.recipes.map(recipe => ({
      ...recipe,
      imgUrl: sample_image
    }));
  }, []);

  // Get recipes based on active category
  const getRecipesByCategory = useMemo(() => {
    return (): Recipe[] => {
      switch (activeCategory) {
        case "History":
          return userActivity.history.map(recipeId => 
            allRecipes.find(recipe => recipe.id === recipeId)
          ).filter((recipe): recipe is Recipe => recipe !== undefined);
        
        case "Bookmarks":
          return userActivity.bookmarks.map(recipeId => 
            allRecipes.find(recipe => recipe.id === recipeId)
          ).filter((recipe): recipe is Recipe => recipe !== undefined);
        
        case "Reviews":
          return userActivity.reviews.map(recipeId => 
            allRecipes.find(recipe => recipe.id === recipeId)
          ).filter((recipe): recipe is Recipe => recipe !== undefined);
        
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

  const handleFiltersChange = (filters: string[]): void => {
    setActiveFilters(filters);
  };

  const handleMenuClick = (menuTitle: string): void => {
    setActiveCategory(menuTitle);
    // Close sidebar on mobile after menu click
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleRecipeClick = (recipe: Recipe): void => {
    // Add to history when clicking a recipe
    const newHistory = [
      recipe.id,
      ...userActivity.history.filter(id => id !== recipe.id)
    ].slice(0, 50);
    
    setUserActivity(prev => ({
      ...prev,
      history: newHistory
    }));
    
    navigate(`/user/recipe/${recipe.id}`, { state: { recipe } });
  };

  const handleClearHistory = (): void => {
    setUserActivity(prev => ({
      ...prev,
      history: []
    }));
  };

  const handleRemoveBookmark = (recipeId: number): void => {
    setUserActivity(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.filter(id => id !== recipeId)
    }));
  };

  const handleResetFilters = (): void => {
    setActiveFilters([]);
  };

  const getActivityInfo = (recipe: Recipe): ActivityInfo => {
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
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-blue-500/80 backdrop-blur-sm rounded-full text-white shadow-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Content Container */}
      <div className="relative lg:px-8 lg:py-6 px-4 py-24">
        <HeaderbarUser />
        
        {/* Main Content Layout */}
        <div className="flex gap-8 mt-7 lg:mt-25">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0 mr-10">
            <SidebarUser
              menuData={menuData}
              recipes={allRecipes}
              onFiltersChange={handleFiltersChange}
              onMenuClick={handleMenuClick}
              activeFilters={activeFilters}
              activeMenu={activeCategory}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 lg:mr-10">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-400/10 to-blue-600/10 rounded-3xl p-6 lg:p-8 border border-blue-400/20 backdrop-blur-sm mb-6">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    Aktivitas Anda 📚
                  </h1>
                  <p className="text-blue-200 text-base lg:text-lg">
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
                            className="px-3 py-1 bg-blue-500/30 border border-blue-400/50 rounded-full text-blue-200 text-sm flex items-center gap-2"
                          >
                            {filter}
                            <button 
                              onClick={() => {
                                const newFilters = activeFilters.filter((_, i) => i !== index);
                                setActiveFilters(newFilters);
                              }}
                              className="text-blue-300 hover:text-white ml-1"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={handleResetFilters}
                        className="px-4 py-2 bg-blue-400/20 border border-blue-400/30 rounded-xl text-blue-300 hover:bg-blue-400/30 transition-colors text-sm"
                      >
                        Reset Semua Filter
                      </button>
                    </div>
                  )}
                  
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
                <div className="text-left lg:text-right">
                  <div className="text-blue-300 text-sm font-semibold">
                    Total {activeCategory.toLowerCase()}
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">
                    {stats.total}
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-4 text-sm text-blue-300">
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
                <div className="space-y-6">
                  {currentRecipes.map((recipe) => {
                    const activityInfo = getActivityInfo(recipe);
                    return (
                      <div key={recipe.id} className="relative">
                        <CardRecipe
                          title={recipe.name}
                          category={recipe.category}
                          description={recipe.description}
                          imgUrl={recipe.imgUrl}
                          difficulty={recipe.difficulty}
                          taste={recipe.taste}
                          onClick={() => handleRecipeClick(recipe)}
                        />
                        
                        {/* Activity Info Overlay */}
                        <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full ${
                          activityInfo.color === 'blue' ? 'bg-blue-400/20 border-blue-400/30' :
                          activityInfo.color === 'green' ? 'bg-green-400/20 border-green-400/30' :
                          activityInfo.color === 'yellow' ? 'bg-yellow-400/20 border-yellow-400/30' :
                          'bg-gray-400/20 border-gray-400/30'
                        } border backdrop-blur-sm`}>
                          {activityInfo.icon}
                          <span className={`text-${
                            activityInfo.color === 'blue' ? 'blue' :
                            activityInfo.color === 'green' ? 'green' :
                            activityInfo.color === 'yellow' ? 'yellow' : 'gray'
                          }-300 text-sm font-medium`}>
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
                </div>
                
                {/* Pagination Section */}
                <div className="mt-8">
                  <Pagination
                    totalItems={filteredRecipes.length}
                    itemsPerPage={recipesPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    maxVisiblePages={3}
                  />
                </div>
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
                    onClick={handleResetFilters}
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

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="lg:hidden fixed inset-y-0 left-0 z-40 w-4/5 max-w-sm bg-neutral-900/95 backdrop-blur-sm overflow-y-auto">
            <div className="pt-40">
              <SidebarUser
                menuData={menuData}
                recipes={allRecipes}
                onFiltersChange={handleFiltersChange}
                onMenuClick={handleMenuClick}
                activeFilters={activeFilters}
                activeMenu={activeCategory}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}