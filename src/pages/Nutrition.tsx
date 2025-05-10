
import { useState, useEffect } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { Utensils, Calculator, PlusCircle, Activity } from "lucide-react";
import { nutritionService, MealPlan } from "@/services/nutritionService";
import { toast } from "sonner";

const Nutrition = () => {
  const [activeTab, setActiveTab] = useState<'weight-loss' | 'muscle-gain' | 'athletic-performance'>('weight-loss');
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    age: 30,
    gender: 'Male',
    height: 170,
    weight: 70,
    activityLevel: 'Moderately Active',
    goal: 'Lose Weight'
  });
  const [calorieResult, setCalorieResult] = useState({
    calories: 2340,
    protein: 140,
    carbs: 250,
    fats: 65
  });

  // Fetch meal plans when component mounts or active tab changes
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        setLoading(true);
        const plans = await nutritionService.getMealPlans(activeTab);
        setMealPlans(plans);
      } catch (error) {
        console.error('Failed to fetch meal plans:', error);
        toast.error('Failed to load meal plans');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMealPlans();
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    // Simple BMR calculation (for demo purposes)
    const { age, gender, height, weight, activityLevel, goal } = formData;
    let bmr = 0;
    
    if (gender === 'Male') {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    } else {
      bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
    }
    
    // Apply activity multiplier
    let tdee = bmr;
    switch (activityLevel) {
      case 'Sedentary':
        tdee *= 1.2;
        break;
      case 'Lightly Active':
        tdee *= 1.375;
        break;
      case 'Moderately Active':
        tdee *= 1.55;
        break;
      case 'Very Active':
        tdee *= 1.725;
        break;
      case 'Extremely Active':
        tdee *= 1.9;
        break;
    }
    
    // Adjust for goal
    let finalCalories = tdee;
    switch (goal) {
      case 'Lose Weight':
        finalCalories *= 0.85; // 15% deficit
        break;
      case 'Maintain Weight':
        // No change
        break;
      case 'Gain Weight':
        finalCalories *= 1.15; // 15% surplus
        break;
    }
    
    // Calculate macros
    const protein = Math.round((finalCalories * 0.25) / 4); // 25% of calories, 4 calories per gram
    const fats = Math.round((finalCalories * 0.25) / 9); // 25% of calories, 9 calories per gram
    const carbs = Math.round((finalCalories * 0.5) / 4); // 50% of calories, 4 calories per gram
    
    setCalorieResult({
      calories: Math.round(finalCalories),
      protein,
      carbs,
      fats
    });
    
    toast.success("Calorie needs calculated!");
  };

  const handleAddCustomMeal = () => {
    toast.info("Add custom meal feature coming soon!");
  };

  const handleEditMeal = (meal: any) => {
    toast.info(`Edit ${meal.name} coming soon!`);
  };

  const handleMealDetails = (meal: any) => {
    toast.info(`Details for ${meal.name} coming soon!`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-3">
            <span className="text-white">FUEL THE </span>
            <span className="text-glow-green">MACHINE</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Optimize your nutrition with customized meal plans based on your goals
            and preferences. Track your intake and fuel your performance.
          </p>
        </div>

        {/* Meal Plan Section */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-orbitron mb-4 sm:mb-0">
              <Utensils className="inline-block mr-2 text-glow-green" size={24} />
              Meal Plans
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('weight-loss')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === 'weight-loss' 
                    ? 'bg-glow-green/20 text-glow-green border border-glow-green/50' 
                    : 'bg-secondary/50 text-gray-300 hover:bg-secondary/70'
                }`}
              >
                Weight Loss
              </button>
              <button 
                onClick={() => setActiveTab('muscle-gain')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === 'muscle-gain' 
                    ? 'bg-glow-green/20 text-glow-green border border-glow-green/50' 
                    : 'bg-secondary/50 text-gray-300 hover:bg-secondary/70'
                }`}
              >
                Muscle Gain
              </button>
              <button 
                onClick={() => setActiveTab('athletic-performance')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTab === 'athletic-performance' 
                    ? 'bg-glow-green/20 text-glow-green border border-glow-green/50' 
                    : 'bg-secondary/50 text-gray-300 hover:bg-secondary/70'
                }`}
              >
                Athletic
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-400">Loading meal plans...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mealPlans.length > 0 && mealPlans[0].meals.map((meal, index) => (
                <div 
                  key={index} 
                  className="glow-card p-6 group hover:border-glow-green transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2">{meal.name}</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-black/30 p-2 rounded-md">
                      <p className="text-xs text-gray-400">Calories</p>
                      <p className="text-lg font-bold">{meal.calories}</p>
                    </div>
                    <div className="bg-black/30 p-2 rounded-md">
                      <p className="text-xs text-gray-400">Protein</p>
                      <p className="text-lg font-bold">{meal.protein}g</p>
                    </div>
                    <div className="bg-black/30 p-2 rounded-md">
                      <p className="text-xs text-gray-400">Carbs</p>
                      <p className="text-lg font-bold">{meal.carbs}g</p>
                    </div>
                    <div className="bg-black/30 p-2 rounded-md">
                      <p className="text-xs text-gray-400">Fats</p>
                      <p className="text-lg font-bold">{meal.fats}g</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button 
                      className="text-sm text-gray-300 hover:text-white"
                      onClick={() => handleEditMeal(meal)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-sm text-gray-300 hover:text-white"
                      onClick={() => handleMealDetails(meal)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
              <div 
                className="glow-card flex items-center justify-center p-6 cursor-pointer hover:border-glow-green"
                onClick={handleAddCustomMeal}
              >
                <div className="text-center">
                  <PlusCircle size={40} className="mx-auto mb-2 text-glow-green opacity-70" />
                  <p className="text-gray-400">Add Custom Meal</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Calorie Calculator Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-orbitron mb-6">
            <Calculator className="inline-block mr-2 text-glow-green" size={24} />
            Calorie Calculator
          </h2>
          
          <div className="glass-card p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-400">Age</label>
                  <input 
                    type="number" 
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2" 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-400">Gender</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-400">Height (cm)</label>
                  <input 
                    type="number" 
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2" 
                  />
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-400">Weight (kg)</label>
                  <input 
                    type="number" 
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2" 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-400">Activity Level</label>
                  <select 
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2"
                  >
                    <option>Sedentary</option>
                    <option>Lightly Active</option>
                    <option>Moderately Active</option>
                    <option>Very Active</option>
                    <option>Extremely Active</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-gray-400">Goal</label>
                  <select 
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2"
                  >
                    <option>Lose Weight</option>
                    <option>Maintain Weight</option>
                    <option>Gain Weight</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button className="btn-glow px-8 py-3" onClick={handleCalculate}>Calculate</button>
            </div>
            <div className="mt-6 p-4 bg-glow-green/5 border border-glow-green/30 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Daily Calories Needed:</p>
                  <p className="text-3xl font-bold text-white">{calorieResult.calories.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Protein Target:</p>
                  <p className="text-xl font-bold text-white">{calorieResult.protein}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Carbs Target:</p>
                  <p className="text-xl font-bold text-white">{calorieResult.carbs}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Fats Target:</p>
                  <p className="text-xl font-bold text-white">{calorieResult.fats}g</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-orbitron">
              <Activity className="inline-block mr-2 text-glow-green" size={24} />
              Food Tracker
            </h2>
            <div>
              <button 
                className="btn-red mr-3"
                onClick={() => toast.info("Track intake feature coming soon!")}
              >
                <PlusCircle size={16} className="mr-1 inline-block" /> Track Intake
              </button>
              <button 
                className="btn-glow"
                onClick={() => toast.info("Add meal feature coming soon!")}
              >
                <PlusCircle size={16} className="mr-1 inline-block" /> Add Meal
              </button>
            </div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <p className="text-gray-400 mb-4">Track your daily food intake and monitor your nutrition goals</p>
            <button 
              className="btn-glow"
              onClick={() => toast.info("Food tracking feature coming soon!")}
            >
              Start Tracking Today
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Nutrition;
