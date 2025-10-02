import { CheckCircle } from "lucide-react";

export default function IngredientsCard({ ingredients }) {
  return (
    <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50 backdrop-blur-sm sticky top-32">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <CheckCircle size={24} className="text-red-400" />
        Alat Bahan
      </h2>
      
      <div className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <IngredientItem 
            key={index}
            ingredient={ingredient}
          />
        ))}
      </div>

    </div>
  );
}

function IngredientItem({ ingredient }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
      ingredient.prepared
        ? "bg-green-400/10 border border-green-400/20"
        : "bg-neutral-700/30 border border-neutral-600/30 hover:bg-neutral-700/50"
    }`}>
      <div>
        <div className={`font-medium ${
          ingredient.prepared ? "text-green-400" : "text-white"
        }`}>
          {ingredient.name}
        </div>
        <div className="text-sm text-gray-400">
          {ingredient.amount}
        </div>
      </div>
      {ingredient.prepared && (
        <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
      )}
    </div>
  );
}
