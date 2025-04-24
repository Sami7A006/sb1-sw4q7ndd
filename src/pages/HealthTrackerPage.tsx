import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, ArrowRight, Scale, Target, Calculator } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HealthTrackerPage: React.FC = () => {
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [targetWeight, setTargetWeight] = useState<number>(65);
  const [targetDate, setTargetDate] = useState<string>('2025-12-31');
  const [showBmiInfo, setShowBmiInfo] = useState(false);
  const [showCalorieInfo, setShowCalorieInfo] = useState(false);
  const [weightGoalVisible, setWeightGoalVisible] = useState(true);
  
  // Calculate BMI
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  // BMI Categories
  const getBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmiValue < 25) return { category: 'Normal weight', color: 'text-green-500' };
    if (bmiValue < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obesity', color: 'text-red-500' };
  };
  
  const bmiCategory = getBmiCategory(bmi);
  
  // Calculate weight loss/gain rate and daily caloric deficit/surplus needed
  const today = new Date();
  const goalDate = new Date(targetDate);
  const daysRemaining = Math.max(1, Math.ceil((goalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  const weightDifference = targetWeight - weight;
  const weightChangePerWeek = (weightDifference / daysRemaining) * 7;
  
  // Calculate daily caloric deficit (rough estimate)
  // 1 kg of fat is roughly 7700 calories
  const dailyCalories = Math.abs(weightChangePerWeek * 1100) / 7;
  
  // Maintenance calories (using Mifflin-St Jeor equation - simplified)
  let bmr = 0;
  // Assuming user is male for this example
  bmr = 10 * weight + 6.25 * height - 5 * 30 + 5; // 30 is a placeholder for age
  
  const maintainCalories = Math.round(bmr * 1.4); // Assuming light activity
  
  const recommendedCalories = weightDifference < 0 
    ? maintainCalories - dailyCalories
    : maintainCalories + dailyCalories;
    
  // Mock weight chart data
  const chartData = {
    labels: ['Now', '1 Month', '2 Months', '3 Months', 'Goal Date'],
    datasets: [
      {
        label: 'Projected Weight',
        data: [
          weight,
          weight + (weightDifference / 4),
          weight + (weightDifference / 2),
          weight + (weightDifference * 0.75),
          targetWeight
        ],
        borderColor: weightDifference < 0 ? 'rgb(14, 165, 142)' : 'rgb(249, 115, 22)',
        backgroundColor: weightDifference < 0 ? 'rgba(14, 165, 142, 0.1)' : 'rgba(249, 115, 22, 0.1)',
        tension: 0.3,
        fill: true,
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weight Progress Projection',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Weight (kg)',
        }
      }
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-center text-3xl font-bold">Health Tracker</h1>
        <p className="mb-8 text-center text-lg text-gray-600">
          Track your health metrics, set weight goals, and get personalized recommendations.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* BMI Calculator Card */}
          <Card className="md:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">BMI Calculator</h2>
              <button 
                onClick={() => setShowBmiInfo(!showBmiInfo)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
              >
                {showBmiInfo ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            
            {showBmiInfo && (
              <div className="mt-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                <p>Body Mass Index (BMI) is a value derived from a person's weight and height. The higher the BMI, the higher the risk for certain diseases such as heart disease, high blood pressure, type 2 diabetes, gallstones, breathing problems, and certain cancers.</p>
              </div>
            )}
            
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{bmi.toFixed(1)}</span>
                  <span className="ml-1 text-gray-500">kg/m²</span>
                </div>
                <span className={`mt-1 block font-medium ${bmiCategory.color}`}>{bmiCategory.category}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="h-4 w-full rounded-full bg-gray-200">
                <div 
                  className="h-4 rounded-full"
                  style={{
                    width: `${Math.min(100, Math.max(0, bmi / 40 * 100))}%`,
                    background: 'linear-gradient(to right, #3b82f6, #10b981, #f59e0b, #ef4444)',
                  }}
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>
          </Card>

          {/* Weight Goal Card */}
          <Card className="md:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Weight Goal</h2>
              <button 
                onClick={() => setWeightGoalVisible(!weightGoalVisible)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
              >
                {weightGoalVisible ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            
            {weightGoalVisible && (
              <>
                <div className="mt-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Target Weight (kg)</label>
                    <input
                      type="number"
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(Number(e.target.value))}
                      className="mt-1 w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Target Date</label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="mt-4 rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Scale className="h-5 w-5 text-gray-600" />
                      <span className="ml-2 text-sm font-medium text-gray-700">Weight Change:</span>
                    </div>
                    <span className={`font-semibold ${weightDifference < 0 ? 'text-green-600' : weightDifference > 0 ? 'text-orange-600' : 'text-gray-600'}`}>
                      {weightDifference.toFixed(1)} kg
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <span className="ml-2 text-sm font-medium text-gray-700">Time Remaining:</span>
                    </div>
                    <span className="font-semibold text-gray-900">{daysRemaining} days</span>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-gray-600" />
                      <span className="ml-2 text-sm font-medium text-gray-700">Weekly Rate:</span>
                    </div>
                    <span className={`font-semibold ${Math.abs(weightChangePerWeek) > 1 ? 'text-red-600' : 'text-gray-900'}`}>
                      {weightChangePerWeek.toFixed(2)} kg/week
                    </span>
                  </div>
                  
                  {Math.abs(weightChangePerWeek) > 1 && (
                    <div className="mt-2 rounded-md bg-red-50 p-2 text-xs text-red-700">
                      Warning: Rate of weight change exceeds the recommended 1 kg per week for safe progress.
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>

          {/* Caloric Needs Card */}
          <Card className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Daily Caloric Needs</h2>
              <button 
                onClick={() => setShowCalorieInfo(!showCalorieInfo)}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
              >
                {showCalorieInfo ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            
            {showCalorieInfo && (
              <div className="mt-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                <p>These calculations are estimates based on your current metrics. Your actual needs may vary based on factors like age, sex, activity level, and metabolic rate.</p>
              </div>
            )}
            
            <div className="mt-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Maintenance Calories:</span>
                    <span className="font-semibold text-gray-900">{maintainCalories} kcal/day</span>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Recommended for {weightDifference < 0 ? 'weight loss' : 'weight gain'}:
                    </span>
                    <span className="font-bold text-primary">{Math.round(recommendedCalories)} kcal/day</span>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Daily Adjustment:</span>
                    <span className={`font-semibold ${weightDifference < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {weightDifference < 0 ? '-' : '+'}{Math.round(dailyCalories)} kcal
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="secondary" 
                  className="w-full"
                  icon={<Calculator className="h-5 w-5" />}
                >
                  View Detailed Breakdown
                </Button>
                
                <Button 
                  variant="primary" 
                  className="mt-2 w-full"
                  icon={<ArrowRight className="h-5 w-5" />}
                >
                  Generate Diet Plan
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Chart */}
        <div className="mt-8">
          <Card>
            <h2 className="mb-4 text-xl font-semibold">Weight Progress Projection</h2>
            <Line data={chartData} options={chartOptions} />
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthTrackerPage;