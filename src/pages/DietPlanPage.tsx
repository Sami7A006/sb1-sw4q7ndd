import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Utensils, ShoppingCart, RefreshCw, Calendar } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockDietPlans } from '../utils/mockData';

const DietPlanPage: React.FC = () => {
  const [selectedPlanType, setSelectedPlanType] = useState<string>('balanced');
  const [budgetLevel, setBudgetLevel] = useState<string>('affordable');
  const [calorieTarget, setCalorieTarget] = useState<number>(2000);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [dietPlan, setDietPlan] = useState<any>(null);
  
  const mealPlans = [
    { id: 'balanced', name: 'Balanced', description: 'Well-rounded nutrition with a mix of all food groups' },
    { id: 'low-carb', name: 'Low Carb', description: 'Reduced carbohydrates with focus on proteins and healthy fats' },
    { id: 'high-protein', name: 'High Protein', description: 'Extra protein for muscle maintenance and satiety' },
    { id: 'vegetarian', name: 'Vegetarian', description: 'Plant-based nutrition without meat products' },
  ];
  
  const budgetOptions = [
    { id: 'economical', name: 'Economical', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'affordable', name: 'Affordable', icon: <><DollarSign className="h-4 w-4" /><DollarSign className="h-4 w-4" /></> },
    { id: 'premium', name: 'Premium', icon: <><DollarSign className="h-4 w-4" /><DollarSign className="h-4 w-4" /><DollarSign className="h-4 w-4" /></> },
  ];
  
  const handleGeneratePlan = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Get the mock diet plan based on selected type
      const mockPlan = mockDietPlans[selectedPlanType as keyof typeof mockDietPlans] || mockDietPlans.balanced;
      
      // Adjust the plan for the budget level
      const budgetAdjustedPlan = {
        ...mockPlan,
        budgetLevel,
        // In a real app, you would adjust meals based on budget
      };
      
      setDietPlan(budgetAdjustedPlan);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-center text-3xl font-bold">Personalized Diet Plans</h1>
        <p className="mb-8 text-center text-lg text-gray-600">
          Generate AI-powered diet plans based on your weight goals and budget preferences.
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Diet Plan Generator Form */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="mb-6 text-xl font-semibold">Create Your Diet Plan</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Daily Calorie Target</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="range"
                    min="1200"
                    max="3000"
                    step="50"
                    value={calorieTarget}
                    onChange={(e) => setCalorieTarget(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="mt-1 flex justify-between text-sm text-gray-500">
                  <span>1200</span>
                  <span className="font-medium text-primary">{calorieTarget} kcal</span>
                  <span>3000</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Diet Type</label>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {mealPlans.map((plan) => (
                    <button
                      key={plan.id}
                      className={`flex flex-col items-start rounded-lg border p-3 text-left transition-colors ${
                        selectedPlanType === plan.id
                          ? 'border-primary bg-primary-light/10 text-primary'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedPlanType(plan.id)}
                    >
                      <span className="font-medium">{plan.name}</span>
                      <span className="mt-1 text-xs text-gray-500">{plan.description}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700">Budget Level</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {budgetOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`flex items-center rounded-full px-4 py-2 transition-colors ${
                        budgetLevel === option.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setBudgetLevel(option.id)}
                    >
                      <span className="mr-2 flex">{option.icon}</span>
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button
                variant="primary"
                className="w-full"
                icon={<Utensils className="h-5 w-5" />}
                isLoading={isGenerating}
                onClick={handleGeneratePlan}
              >
                {isGenerating ? 'Generating Plan...' : 'Generate Diet Plan'}
              </Button>
            </Card>
          </div>

          {/* Diet Plan Details */}
          <div className="lg:col-span-2">
            {dietPlan ? (
              <div className="space-y-6">
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{dietPlan.name} Diet Plan</h2>
                      <p className="text-gray-600">{calorieTarget} calories per day</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">Budget:</span>
                      <span className="ml-2 inline-flex items-center">
                        {budgetOptions.find(o => o.id === budgetLevel)?.icon}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {dietPlan.tags.map((tag: string, index: number) => (
                      <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-green-50 p-4">
                      <h3 className="text-sm font-medium uppercase text-green-800">Benefits</h3>
                      <ul className="mt-2 list-inside list-disc text-sm text-green-700">
                        {dietPlan.benefits.map((benefit: string, index: number) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="rounded-lg bg-amber-50 p-4">
                      <h3 className="text-sm font-medium uppercase text-amber-800">Macro Distribution</h3>
                      <div className="mt-2 space-y-2">
                        {Object.entries(dietPlan.macros).map(([macro, value]: [string, any]) => (
                          <div key={macro} className="flex items-center justify-between">
                            <span className="text-sm capitalize text-amber-700">{macro}</span>
                            <span className="font-semibold text-amber-800">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Meal Plan</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<RefreshCw className="h-4 w-4" />}
                      >
                        Regenerate
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<ShoppingCart className="h-4 w-4" />}
                      >
                        Shopping List
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6 divide-y">
                    {dietPlan.meals.map((meal: any, index: number) => (
                      <div key={index} className="py-4">
                        <h4 className="flex items-center font-medium text-gray-900">
                          <span className={`mr-2 h-3 w-3 rounded-full ${
                            meal.time === 'Breakfast' ? 'bg-amber-400' :
                            meal.time === 'Lunch' ? 'bg-orange-500' :
                            meal.time === 'Dinner' ? 'bg-indigo-500' : 'bg-green-400'
                          }`}></span>
                          {meal.time} ({meal.calories} kcal)
                        </h4>
                        
                        <div className="mt-2 rounded-lg border border-gray-200 bg-white">
                          <div className="p-4">
                            <h5 className="font-medium text-gray-900">{meal.title}</h5>
                            <p className="mt-1 text-sm text-gray-600">{meal.description}</p>
                            
                            {meal.ingredients && (
                              <div className="mt-3">
                                <h6 className="text-xs font-medium uppercase text-gray-500">Ingredients:</h6>
                                <ul className="mt-1 grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
                                  {meal.ingredients.map((ingredient: string, i: number) => (
                                    <li key={i} className="flex items-start">
                                      <span className="mr-2 text-green-500">•</span>
                                      {ingredient}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                <div>
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No Diet Plan Generated</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Adjust your preferences and generate a personalized diet plan based on your needs.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DietPlanPage;