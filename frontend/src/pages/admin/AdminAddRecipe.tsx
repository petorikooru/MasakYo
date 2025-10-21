import HeaderbarAdmin from "@components/headerbars/HeaderbarAdmin";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useState } from "react";

interface AdminAddRecipeProps {
  onClose: () => void;
  onSave: (newRecipe: any) => void;
}

interface RecipeFormData {
  name: string;
  category: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: number;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  videoUrl: string;
}

export default function AdminAddRecipe({ onClose, onSave }: AdminAddRecipeProps) {
  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    category: "",
    description: "",
    cookTime: "",
    servings: 4,
    difficulty: 1,
    ingredients: [{ name: "", amount: "" }],
    steps: [""],
    videoUrl: ""
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIngredientChange = (index: number, field: string, value: string) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", amount: "" }]
    }));
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
    }
  };

  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = value;
    setFormData(prev => ({ ...prev, steps: updatedSteps }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, ""]
    }));
  };

  const removeStep = (index: number) => {
    if (formData.steps.length > 1) {
      const updatedSteps = formData.steps.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, steps: updatedSteps }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert form data to match the Recipe interface structure
    const newRecipe = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      difficulty: formData.difficulty,
      taste: 4,
      rating: 4.5,
      imgUrl: "/images/placeholder-recipe.jpg",
      cookTime: formData.cookTime,
      servings: formData.servings,
      ingredients: formData.ingredients.map(ing => `${ing.amount} ${ing.name}`),
      tags: [],
      steps: formData.steps.map((step, index) => ({
        step: index + 1,
        title: `Step ${index + 1}`,
        description: step,
        duration: ""
      })),
      videoUrl: formData.videoUrl
    };
    
    onSave(newRecipe);
    onClose();
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Remove HeaderbarAdmin since it's already in the main layout */}
      
      {/* Main Content - Added margin top to avoid header */}
      <div className="max-w-7xl mx-auto px-6 py-8 mt-16"> {/* Added mt-16 for header spacing */}
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-500/30 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Create New Recipe</h1>
              <p className="text-red-200 mt-1">Add a new recipe to your collection</p>
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
          >
            <Save size={20} />
            Save Recipe
          </button>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Upload */}
            <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Recipe Image</h3>
              <div className="border-2 border-dashed border-neutral-600 rounded-xl p-8 text-center hover:border-red-400/50 transition-colors cursor-pointer">
                <Upload className="mx-auto text-neutral-400 mb-3" size={40} />
                <p className="text-neutral-400 text-sm">Click to upload or drag and drop</p>
                <p className="text-neutral-500 text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Recipe Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50"
                    placeholder="Enter recipe name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-400/50"
                  >
                    <option value="">Select category</option>
                    <option value="Nusantara">Nusantara</option>
                    <option value="Western">Western</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cook Time</label>
                  <input
                    type="text"
                    value={formData.cookTime}
                    onChange={(e) => handleInputChange('cookTime', e.target.value)}
                    className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50"
                    placeholder="e.g., 30 minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Servings</label>
                  <input
                    type="number"
                    value={formData.servings}
                    onChange={(e) => handleInputChange('servings', parseInt(e.target.value))}
                    className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-400/50"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', parseInt(e.target.value))}
                    className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-400/50"
                  >
                    <option value={1}>Easy</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Hard</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Description, Ingredients & Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50"
                placeholder="Describe your recipe..."
              />
            </div>

            {/* Ingredients */}
            <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Ingredients</h3>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-xl text-green-300 hover:bg-green-500/30 transition-colors text-sm"
                >
                  Add Ingredient
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      className="flex-1 bg-neutral-700/50 border border-neutral-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50"
                      placeholder="Ingredient name"
                    />
                    <input
                      type="text"
                      value={ingredient.amount}
                      onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                      className="flex-1 bg-neutral-700/50 border border-neutral-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50"
                      placeholder="Amount"
                    />
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="px-4 py-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-500/30 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Cooking Steps</h3>
                <button
                  type="button"
                  onClick={addStep}
                  className="px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-xl text-green-300 hover:bg-green-500/30 transition-colors text-sm"
                >
                  Add Step
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <textarea
                      value={step}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      rows={2}
                      className="flex-1 bg-neutral-700/50 border border-neutral-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50"
                      placeholder={`Step ${index + 1}...`}
                    />
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="px-4 py-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 hover:bg-red-500/30 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Video URL */}
            <div className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Video Tutorial (Optional)</h3>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                className="w-full bg-neutral-700/50 border border-neutral-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}