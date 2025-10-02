import Apel from './Apel.jpg'
import SearchBar from '../component/searchbar';
import {recipes as initialRecipes} from '../assets/recipe';
import Carousel from '../component/carousel';
import Addmenu from '../assets/addmenu';
import { useState } from "react";

const Resep = () => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [recipes, setRecipeList] = useState(initialRecipes);
  const handleDelete = (title) => {
    setRecipeList((prev) => prev.filter((r) => r.title !== title));
  };
    return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background blur */}
      
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{
          backgroundImage: `url(${Apel})`,
        }}
      />
      {/* Container untuk SearchBar dan Menubar */}
      <div className="relative z-10 flex items-start justify-start pl-12 pt-35 gap-20">
        {/* Bungkus SearchBar */}
        <div>
          <SearchBar Admin = {true} onAddClick={() => setShowAddMenu(true)} />
        </div>

        {/* Bungkus Menubar */}
        <div className="w-3/4 h-screen overflow-y-auto p-6 pb-40">
        <Carousel data={recipes} isAdmin = {true} onDelete={handleDelete} />
      </div>

        {/* Overlay Addmenu */}
      {showAddMenu && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="w-11/12 h-[90%] overflow-y-auto bg-black/60 rounded-2xl p-6">
            <Addmenu onClose={() => setShowAddMenu(false)} />
          </div>
        </div>
      )}

      </div>
    </div>
    );
}

export default Resep