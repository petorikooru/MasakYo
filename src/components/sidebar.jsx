import { useState } from "react";
import { Search, ChevronDown, Check, X, Filter } from "lucide-react";

export default function Sidebar({ menuData, recipes = [], onFiltersChange, onMenuClick, activeFilters = [], activeMenu }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const toggleFilter = (filter) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    onFiltersChange(newFilters);
  };

  const handleMenuClick = (menuTitle) => {
    if (onMenuClick) {
      onMenuClick(menuTitle);
    }
  };

  // Global recipe search function
  const handleRecipeSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    const results = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients?.some(ingredient => 
        ingredient.toLowerCase().includes(query.toLowerCase())
      ) ||
      recipe.tags?.some(tag => 
        tag.toLowerCase().includes(query.toLowerCase())
      )
    );

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
    setSearchResults([]);
  };

  // Filter menu items based on search query
  const filteredMenuData = menuData.filter(menu => {
    if (searchQuery.trim() === "") return true;
    return menu.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filterOptions = [
    "Nusantara",
    "Western",
    "Beverages", 
  ];

  return (
    <aside className="ml-5 p-6 w-[350px] bg-neutral-900/90 backdrop-blur-xl text-white rounded-2xl border border-neutral-700/50 shadow-2xl">
      {/* Global Recipe Search Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Cari Resep</h2>
        <div className="relative">
          <div className="flex items-center bg-neutral-800/60 rounded-xl px-4 py-3 border border-neutral-700/50 transition-all duration-300 focus-within:border-red-400/50 focus-within:bg-neutral-800/80">
            <Search size={20} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Cari resep, bahan, atau tag..."
              value={searchQuery}
              onChange={(e) => handleRecipeSearch(e.target.value)}
              className="bg-transparent w-full text-sm text-white placeholder-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-800/95 backdrop-blur-xl rounded-xl border border-neutral-700/50 shadow-2xl z-10 max-h-80 overflow-y-auto animate-in fade-in duration-300">
              {searchResults.length > 0 ? (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 border-b border-neutral-700/50">
                    HASIL PENCARIAN ({searchResults.length})
                  </div>
                  {searchResults.map((recipe, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-neutral-700/50 rounded-lg cursor-pointer transition-all duration-200 border-b border-neutral-700/30 last:border-b-0 animate-in slide-in-from-top-1 duration-300"
                      onClick={() => {
                        console.log("Selected recipe:", recipe);
                        setShowSearchResults(false);
                      }}
                    >
                      <div className="font-semibold text-white text-sm mb-1">
                        {recipe.name}
                      </div>
                      {recipe.description && (
                        <div className="text-xs text-gray-300 mb-2 line-clamp-2">
                          {recipe.description}
                        </div>
                      )}
                      {recipe.tags && (
                        <div className="flex flex-wrap gap-1">
                          {recipe.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-red-400/20 text-red-400 text-xs rounded-full transition-all duration-200 hover:scale-105"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-400 text-sm animate-in fade-in duration-300">
                  Tidak ada resep ditemukan
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filter Section - Dropdown */}
      <div className="mb-6">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center justify-between w-full p-3 bg-neutral-800/60 rounded-xl border border-neutral-700/50 hover:bg-neutral-800/80 transition-all duration-300"
        >
          <div className="flex items-center">
            <Filter size={16} className="mr-2 text-gray-300" />
            <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
              Filters {activeFilters.length > 0 && `(${activeFilters.length}/3)`}
            </span>
          </div>
          <ChevronDown 
            size={16} 
            className={`text-gray-400 transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Filters Dropdown Content */}
        {filtersOpen && (
          <div className="mt-3 p-3 bg-neutral-800/40 rounded-xl border border-neutral-700/30 animate-in fade-in duration-300">
            <div className="space-y-2">
              {filterOptions.map((filter, index) => (
                <div
                  key={index}
                  onClick={() => toggleFilter(filter)}
                  className={`flex items-center py-2 px-3 rounded-lg transition-all duration-300 cursor-pointer group ${
                    activeFilters.includes(filter)
                      ? "bg-red-400/20 text-red-400 border border-red-400/30 scale-[1.02]"
                      : "bg-neutral-800/40 text-gray-300 hover:bg-neutral-800/60 hover:text-white border border-transparent hover:scale-[1.02]"
                  }`}
                >
                  <div className={`flex items-center justify-center w-4 h-4 rounded border mr-3 transition-all duration-300 ${
                    activeFilters.includes(filter)
                      ? "bg-red-400 border-red-400 scale-110"
                      : "border-gray-500 group-hover:border-gray-400"
                  }`}>
                    {activeFilters.includes(filter) && (
                      <Check size={12} className="text-white animate-in zoom-in duration-300" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{filter}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Menu Section - With active selection indicator */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
          Kategori Menu
        </h3>
        
        {!showSearchResults && filteredMenuData.length > 0 ? (
          filteredMenuData.map((menu, idx) => (
            <div
              key={idx}
              onClick={() => handleMenuClick(menu.title)}
              className={`text-base font-semibold py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
                activeMenu === menu.title
                  ? "text-red-400 bg-red-400/10 border-l-4 border-red-400 shadow-lg shadow-red-400/10"
                  : "text-gray-200 hover:text-red-400 hover:bg-neutral-800/60 border-l-4 border-transparent"
              }`}
            >
              <div className="flex items-center">
                {menu.icon && <span className="mr-3">{menu.icon}</span>}
                <div className="flex-1">
                  <span className="transition-all duration-300 block">
                    {menu.title}
                  </span>
                  {menu.description && (
                    <span className="text-xs text-gray-400 mt-1 block">
                      {menu.description}
                    </span>
                  )}
                </div>
                {activeMenu === menu.title && (
                  <div className="ml-2 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))
        ) : !showSearchResults && (
          <div className="text-center py-4 text-gray-400 text-sm animate-in fade-in duration-300">
            Tidak ada kategori ditemukan
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t border-neutral-700/50 animate-in fade-in duration-500">
        <div className="text-xs text-gray-400 text-center">
          {recipes.length} resep tersedia
          {activeFilters.length > 0 && ` • ${activeFilters.length} filter aktif`}
        </div>
      </div>
    </aside>
  );
}
