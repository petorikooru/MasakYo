import HeaderbarUser from "../../components/HeaderbarUser";
import RecipeHeader from "../../components/RecipeHeader";
import IngredientsCard from "../../components/IngredientsCard";
import HowToCard from "../../components/HowToCard";
import RecipeRating from "../../components/RecipeRating";
import { useLocation, useNavigate } from "react-router-dom";

import user_image from "../../assets/images/user_image.jpg";

export default function UserRecipe() {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  // If no recipe data, redirect back to discover page
  if (!recipe) {
    navigate('/user/discover');
    return null;
  }

  // Prepare ingredients data for IngredientsCard
  const ingredients = recipe.ingredients.map(ingredient => ({
    name: typeof ingredient === 'string' ? ingredient : ingredient.name,
    amount: typeof ingredient === 'string' ? 'Secukupnya' : ingredient.amount,
    prepared: false
  }));

  return (
    <div className="min-h-screen bg-neutral-900">
      <HeaderbarUser />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        <RecipeHeader recipe={recipe} />
        
        {/* Ingredients and How-to Section */}
        <div className="flex gap-8 mb-8">
          {/* Ingredients Card - 20% width */}
          <div className="w-1/5">
            <IngredientsCard ingredients={ingredients} />
          </div>

          {/* How-to Card - 80% width */}
          <div className="w-4/5">
            <HowToCard 
              steps={recipe.steps || []}
              videoUrl={recipe.videoUrl}
            />
          </div>
        </div>

        {/* Rating Section */}
        <div className="flex gap-8">
          {/* Spacer for alignment with ingredients card */}
          <div className="w-1/5"></div>
          
          {/* Rating Card - 80% width */}
          <div className="w-4/5">
            <RecipeRating 
              recipeId={recipe.id}
              recipeName={recipe.name}
              initialRatings={recipe.ratings || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}