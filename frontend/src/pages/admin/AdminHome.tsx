import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, Users, BarChart3, Plus, Shield, Menu, X, Trash2 } from "lucide-react";
import HeaderbarAdmin from '@components/headerbars/HeaderbarAdmin';
import SidebarAdmin from '@components/sidebars/SidebarAdmin';
import CardRecipe from "@components/cards/CardRecipe";
import Pagination from "@components/miscellaneous/Pagination";
import AdminAddRecipe from '@pages/admin/AdminAddRecipe';
import recipesData from '@/data/recipes.json';

import CoverAdmin from '@public/images/CoverAdmin.jpg';

interface RecipeStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

interface Recipe {
  id: number;
  name: string;
  category: string;
  description: string;
  difficulty: number;
  taste: number;
  rating: number;
  imgUrl: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  tags: string[];
  steps: RecipeStep[];
  videoUrl: string;
  createdAt?: string;
}

interface MenuItem {
  title: string;
  active: boolean;
  icon: React.ReactNode;
  description: string;
}

export default function AdminRecipes() {
  const [activeCategory, setActiveCategory] = useState<string>("All Recipes");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Nusantara", "Beverages", "Western"]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [recipes, setRecipeList] = useState<Recipe[]>([]);
  const recipesPerPage = 3;
  const navigate = useNavigate();

  const menuData: MenuItem[] = [
    { 
      title: "All Recipes", 
      active: activeCategory === "All Recipes",
      icon: <BarChart3 size={18} />,
      description: "Kelola semua resep yang tersedia"
    },
    { 
      title: "Currently Trending", 
      active: activeCategory === "Currently Trending",
      icon: <Flame size={18} />,
      description: "Resep yang sedang populer dan tinggi rating"
    },
    { 
      title: "Add New Recipe", 
      active: activeCategory === "Add New Recipe",
      icon: <Plus size={18} />,
      description: "Tambah resep baru ke sistem"
    },
  ];

  // Initialize recipes from JSON data
  useEffect(() => {
    const initialRecipes: Recipe[] = recipesData.recipes.map(recipe => ({
      ...recipe,
      createdAt: new Date().toISOString(),
    }));
    setRecipeList(initialRecipes);
  }, []);

  // Use useMemo to prevent recreation on every render
  const allRecipes = useMemo((): Recipe[] => {
    return recipes;
  }, [recipes]);

  // Filter recipes based on active filters AND category
  useEffect(() => {
    let filtered = [...allRecipes];

    // Apply category filter
    switch (activeCategory) {
      case "Currently Trending":
        filtered = filtered
          .filter(recipe => recipe.rating >= 4.5)
          .sort((a, b) => b.rating - a.rating);
        break;
      case "All Recipes":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "User Management":
      case "Add New Recipe":
        // For admin pages that don't show recipes, keep empty
        filtered = [];
        break;
      default:
        filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    // Apply category filters
    if (activeFilters.length > 0 && filtered.length > 0) {
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
  }, [activeFilters, activeCategory, allRecipes]);

  // Calculate current page recipes
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  const handleFiltersChange = (filters: string[]): void => {
    setActiveFilters(filters);
  };

  const handleMenuClick = (menuTitle: string): void => {
    setActiveCategory(menuTitle);
    
    // Handle specific admin actions
    if (menuTitle === "Add New Recipe") {
      setShowAddRecipe(true);
      return; // Important: return early to prevent other logic
    }
    
    // For other menu items, close sidebar on mobile if needed
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleRecipeClick = (recipe: Recipe): void => {
    navigate(`/admin/recipe/edit/${recipe.id}`, { state: { recipe } });
  };

  const handleDelete = (recipeId: number, e: React.MouseEvent): void => {
    e.stopPropagation(); // Prevent navigation when deleting
    setRecipeList(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const handleAddRecipe = (newRecipe: Omit<Recipe, 'id'>) => {
    const recipeWithId: Recipe = {
      ...newRecipe,
      id: Math.max(0, ...recipes.map(r => r.id)) + 1, // Generate new ID
      createdAt: new Date().toISOString()
    };
    setRecipeList(prev => [...prev, recipeWithId]);
    setShowAddRecipe(false);
    setActiveCategory("All Recipes");
  };

  const handleResetFilters = (): void => {
    setActiveFilters([]);
  };

  const getCategoryDescription = (): string => {
    switch (activeCategory) {
      case "All Recipes":
        return "Kelola dan pantau semua resep dalam sistem";
      case "Currently Trending":
        return "Resep dengan rating tertinggi dan paling populer";
      case "User Management":
        return "Kelola pengguna, roles, dan permissions";
      case "Add New Recipe":
        return "Tambah resep baru ke dalam katalog";
      default:
        return "Dashboard administrasi sistem resep";
    }
  };

  const getAdminStats = () => {
    const totalRecipes = allRecipes.length;
    const trendingRecipes = allRecipes.filter(recipe => recipe.rating >= 4.5).length;
    const averageRating = totalRecipes > 0 
      ? allRecipes.reduce((acc, recipe) => acc + recipe.rating, 0) / totalRecipes 
      : 0;

    return {
      total: totalRecipes,
      filtered: filteredRecipes.length,
      trending: trendingRecipes,
      averageRating: averageRating.toFixed(1),
      description: getCategoryDescription()
    };
  };

  const stats = getAdminStats();

  const renderAdminContent = () => {
    switch (activeCategory) {
      case "User Management":
        return (
          <div className="text-center py-12">
            <Shield className="mx-auto mb-4 text-red-400" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">User Management</h3>
            <p className="text-red-200 mb-6">
              Redirecting to user management system...
            </p>
          </div>
        );

      case "Add New Recipe":
        return (
          <div className="text-center py-12">
            <Plus className="mx-auto mb-4 text-red-400" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Add New Recipe</h3>
            <p className="text-red-200 mb-6">
              Redirecting to recipe creation form...
            </p>
          </div>
        );

      default:
        return (
          <>
            {/* Recipe Cards with Admin Actions */}
            {currentRecipes.length > 0 ? (
              <>
                <div className="space-y-6">
                  {currentRecipes.map((recipe) => (
                    <div key={recipe.id} className="relative group cursor-pointer">
                      <CardRecipe
                        title={recipe.name}
                        category={recipe.category}
                        description={recipe.description}
                        imgUrl={recipe.imgUrl}
                        difficulty={recipe.difficulty}
                        taste={recipe.taste}
                        onClick={() => handleRecipeClick(recipe)}
                      />
                      {/* Delete Button Only */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => handleDelete(recipe.id, e)}
                          className="p-2 bg-red-500/80 backdrop-blur-sm rounded-lg text-white hover:bg-red-600 transition-colors"
                          title="Delete Recipe"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
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
                    onClick={() => setActiveCategory("All Recipes")}
                    className="px-6 py-3 bg-red-400/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-400/30 transition-colors"
                  >
                    Lihat Semua Resep
                  </button>
                )}
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen relative bg-neutral-900">
      {/* Background Overlay */}
    <div 
      className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
      style={{ backgroundImage: `url(${CoverAdmin})` }}
    />
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-red-500/80 backdrop-blur-sm rounded-full text-white shadow-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Content Container */}
      <div className="relative lg:px-8 lg:py-6 px-4 py-24">
        <HeaderbarAdmin />
        
        {/* Main Content Layout */}
        <div className="flex gap-8 mt-7 lg:mt-25">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0 mr-10">
            <SidebarAdmin
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
            <div className="bg-gradient-to-r from-red-400/10 to-red-600/10 rounded-3xl p-6 lg:p-8 border border-red-400/20 backdrop-blur-sm mb-6">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="text-red-400" size={28} />
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">
                      Recipe Management 👑
                    </h1>
                  </div>
                  <p className="text-red-200 text-base lg:text-lg">
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
                <div className="text-left lg:text-right">
                  <div className="text-red-300 text-sm font-semibold">
                    Total Recipes
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">
                    {stats.total}
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-4 text-sm text-red-300">
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

            {/* Dynamic Content */}
            {renderAdminContent()}
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
              <SidebarAdmin
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

      {/* Add Recipe Overlay */}
      {showAddRecipe && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            // Close when clicking the backdrop (outside the content)
            if (e.target === e.currentTarget) {
              setShowAddRecipe(false);
            }
          }}
        >
          <div className="min-h-full py-8">
            <AdminAddRecipe 
              onClose={() => setShowAddRecipe(false)}
              onSave={handleAddRecipe}
            />
          </div>
        </div>
      )}
    </div>
  );
}