export const mockChatResponses = {
  ingredients: "Based on current research, this ingredient has been deemed safe for use in consumer products by regulatory agencies. However, some individuals may experience sensitivity. It's always recommended to patch test new products.",
  diet: "A healthy Indian diet focuses on balanced nutrition while incorporating traditional ingredients and spices. Key principles include:\n\n- Whole grains like brown rice and whole wheat\n- Lentils (dal) for protein\n- Plenty of vegetables\n- Healthy fats from nuts and oils\n- Traditional spices with health benefits\n\nConsult with a healthcare provider before starting any new diet plan.",
  calories: "Daily calorie needs vary based on factors like age, gender, weight, height, and activity level. For general health, average needs are:\n\n- Adult women: 1,600-2,400 calories\n- Adult men: 2,000-3,000 calories\n\nFor specific recommendations, please consult with a healthcare provider.",
  sls: "Sodium Lauryl Sulfate (SLS) is a common surfactant used in personal care products. While it's generally considered safe by regulatory bodies, it can cause irritation in some people, especially those with sensitive skin. If you're concerned, there are many SLS-free alternatives available.",
  titaniumDioxide: "Titanium dioxide is a common ingredient used as a white pigment in foods and personal care products. While it's considered safe by most regulatory agencies, some recent studies have raised concerns about its potential effects. The EU has banned its use in food products as a precautionary measure.",
  default: "I understand your question. To provide the most accurate and helpful response, could you please provide more specific details about your health or ingredient concerns?"
};

export const mockScanIngredients = {
  overallRating: {
    text: "Moderate Health Risk Detected",
    score: 6.5,
    rating: "6.5/10",
    details: "Based on EWG data analysis"
  },
  harmfulCount: 4,
  ingredients: [
    {
      name: "Sodium Lauryl Sulfate",
      description: "Common surfactant and cleansing agent",
      rating: 4,
      ratingOutOf10: 6,
      ewgScore: 3,
      concerns: ["Skin Irritation", "Environmental Impact", "Organ System Toxicity"],
      evidence: "Strong scientific evidence",
      alternatives: ["Sodium Cocoyl Isethionate", "Cocamidopropyl Betaine"]
    },
    {
      name: "Methylparaben",
      description: "Synthetic preservative",
      rating: 7,
      ratingOutOf10: 3,
      ewgScore: 8,
      concerns: ["Endocrine Disruption", "Allergies", "Cancer"],
      evidence: "Limited scientific evidence",
      alternatives: ["Potassium Sorbate", "Sodium Benzoate"]
    },
    {
      name: "Propylene Glycol",
      description: "Moisturizer and penetration enhancer",
      rating: 5,
      ratingOutOf10: 5,
      ewgScore: 3,
      concerns: ["Skin Irritation", "Allergies"],
      evidence: "Fair scientific evidence",
      alternatives: ["Vegetable Glycerin", "Aloe Vera"]
    },
    {
      name: "Fragrance",
      description: "Artificial scent blend",
      rating: 8,
      ratingOutOf10: 2,
      ewgScore: 8,
      concerns: ["Allergies", "Respiratory Issues", "Hormone Disruption"],
      evidence: "Strong scientific evidence",
      alternatives: ["Essential Oils", "Natural Extracts"]
    },
    {
      name: "Titanium Dioxide",
      description: "White pigment and UV filter",
      rating: 6,
      ratingOutOf10: 4,
      ewgScore: 6,
      concerns: ["Potential Carcinogen", "Respiratory Issues", "Organ System Toxicity"],
      evidence: "Limited scientific evidence",
      alternatives: ["Zinc Oxide", "Iron Oxides"]
    },
    {
      name: "Glycerin",
      description: "Natural moisturizing ingredient",
      rating: 1,
      ratingOutOf10: 9,
      ewgScore: 1,
      concerns: [],
      evidence: "Strong scientific evidence of safety",
      alternatives: []
    },
    {
      name: "Tocopherol",
      description: "Vitamin E, antioxidant",
      rating: 1,
      ratingOutOf10: 9,
      ewgScore: 1,
      concerns: [],
      evidence: "Strong scientific evidence of safety",
      alternatives: []
    },
    {
      name: "Phenoxyethanol",
      description: "Preservative",
      rating: 4,
      ratingOutOf10: 6,
      ewgScore: 4,
      concerns: ["Irritation", "Nervous System Effects"],
      evidence: "Limited scientific evidence",
      alternatives: ["Leuconostoc/Radish Root Ferment Filtrate", "Lactobacillus Ferment"]
    },
    {
      name: "Retinyl Palmitate",
      description: "Vitamin A derivative",
      rating: 6,
      ratingOutOf10: 4,
      ewgScore: 9,
      concerns: ["Sun Sensitivity", "Cancer Risk", "Reproductive Toxicity"],
      evidence: "Strong scientific evidence",
      alternatives: ["Bakuchiol", "Rosehip Oil"]
    },
    {
      name: "Aloe Barbadensis Leaf Juice",
      description: "Natural soothing ingredient",
      rating: 1,
      ratingOutOf10: 10,
      ewgScore: 1,
      concerns: [],
      evidence: "Strong scientific evidence of safety",
      alternatives: []
    }
  ]
};

export const mockDietPlans = {
  balanced: {
    name: "Indian Balanced Diet",
    tags: ["Traditional", "Nutrient-Rich", "Balanced-Spices"],
    benefits: [
      "Rich in fiber and protein",
      "Anti-inflammatory spices",
      "Supports gut health",
      "Balanced nutrition"
    ],
    macros: {
      protein: "25%",
      carbs: "55%",
      fats: "20%"
    },
    meals: [
      {
        time: "Breakfast",
        calories: 450,
        title: "Masala Dosa with Sambar",
        description: "Fermented rice and lentil crepe with spiced potato filling and lentil soup",
        ingredients: [
          "Dosa batter",
          "Spiced potato filling",
          "Sambar",
          "Coconut chutney",
          "Mixed sprouts"
        ]
      },
      {
        time: "Lunch",
        calories: 600,
        title: "Dal Tadka with Mixed Vegetables",
        description: "Yellow lentils with cumin tempering, served with whole grain roti",
        ingredients: [
          "Yellow dal",
          "Whole wheat roti",
          "Mixed vegetables",
          "Brown rice",
          "Raita",
          "Salad"
        ]
      },
      {
        time: "Snack",
        calories: 200,
        title: "Chana Chaat",
        description: "Spiced chickpea salad with herbs",
        ingredients: [
          "Boiled chickpeas",
          "Onions and tomatoes",
          "Green chilies",
          "Chaat masala",
          "Fresh coriander"
        ]
      },
      {
        time: "Dinner",
        calories: 550,
        title: "Paneer Bhurji with Multigrain Roti",
        description: "Scrambled cottage cheese with spices and whole grain bread",
        ingredients: [
          "Fresh paneer",
          "Mixed vegetables",
          "Multigrain roti",
          "Dal",
          "Mint chutney"
        ]
      }
    ]
  },
  "low-carb": {
    name: "Low-Carb Indian Diet",
    tags: ["Keto-Friendly", "High-Protein", "Traditional"],
    benefits: [
      "Supports weight management",
      "Blood sugar control",
      "Rich in healthy fats",
      "Anti-inflammatory"
    ],
    macros: {
      protein: "30%",
      carbs: "10%",
      fats: "60%"
    },
    meals: [
      {
        time: "Breakfast",
        calories: 400,
        title: "Paneer Bhurji Masala",
        description: "Spiced scrambled cottage cheese with vegetables",
        ingredients: [
          "Fresh paneer",
          "Bell peppers",
          "Onions and tomatoes",
          "Indian spices",
          "Coconut oil"
        ]
      },
      {
        time: "Lunch",
        calories: 550,
        title: "Tandoori Chicken with Cauliflower Rice",
        description: "Spiced grilled chicken with low-carb sides",
        ingredients: [
          "Chicken thighs",
          "Cauliflower rice",
          "Mint chutney",
          "Raita",
          "Leafy greens"
        ]
      },
      {
        time: "Snack",
        calories: 200,
        title: "Spiced Roasted Nuts",
        description: "Mixed nuts with Indian spices",
        ingredients: [
          "Almonds",
          "Walnuts",
          "Pumpkin seeds",
          "Chaat masala",
          "Curry leaves"
        ]
      },
      {
        time: "Dinner",
        calories: 500,
        title: "Malai Kofta in Coconut Gravy",
        description: "Low-carb vegetable dumplings in rich gravy",
        ingredients: [
          "Cauliflower",
          "Paneer",
          "Coconut cream",
          "Indian spices",
          "Leafy side salad"
        ]
      }
    ]
  },
  "high-protein": {
    name: "High-Protein Indian Diet",
    tags: ["Muscle-Building", "Traditional", "Protein-Rich"],
    benefits: [
      "Supports muscle growth",
      "Enhanced recovery",
      "Traditional ingredients",
      "Rich in micronutrients"
    ],
    macros: {
      protein: "40%",
      carbs: "40%",
      fats: "20%"
    },
    meals: [
      {
        time: "Breakfast",
        calories: 550,
        title: "Moong Dal Chilla",
        description: "High-protein lentil pancakes with paneer stuffing",
        ingredients: [
          "Moong dal",
          "Paneer stuffing",
          "Mixed vegetables",
          "Mint chutney",
          "Greek yogurt"
        ]
      },
      {
        time: "Lunch",
        calories: 650,
        title: "Chicken Tikka with Quinoa Pulao",
        description: "Grilled spiced chicken with protein-rich quinoa",
        ingredients: [
          "Chicken breast",
          "Quinoa",
          "Mixed vegetables",
          "Raita",
          "Mint chutney"
        ]
      },
      {
        time: "Snack",
        calories: 250,
        title: "Masala Egg Whites",
        description: "Spiced egg white scramble with vegetables",
        ingredients: [
          "Egg whites",
          "Mixed vegetables",
          "Indian spices",
          "Whole grain toast"
        ]
      },
      {
        time: "Dinner",
        calories: 600,
        title: "Dal Makhani with Grilled Fish",
        description: "Protein-rich black lentils with spiced fish",
        ingredients: [
          "Black lentils",
          "Fish fillet",
          "Whole grain roti",
          "Mixed vegetables",
          "Raita"
        ]
      }
    ]
  },
  vegetarian: {
    name: "Indian Vegetarian Diet",
    tags: ["Plant-Based", "Traditional", "Sattvic"],
    benefits: [
      "Rich in plant protein",
      "High in fiber",
      "Anti-inflammatory spices",
      "Heart-healthy"
    ],
    macros: {
      protein: "20%",
      carbs: "55%",
      fats: "25%"
    },
    meals: [
      {
        time: "Breakfast",
        calories: 450,
        title: "Upma with Mixed Sprouts",
        description: "Semolina porridge with vegetables and sprouted legumes",
        ingredients: [
          "Semolina (rava)",
          "Mixed sprouts",
          "Mixed vegetables",
          "Curry leaves",
          "Coconut chutney"
        ]
      },
      {
        time: "Lunch",
        calories: 600,
        title: "Rajma Chawal",
        description: "Kidney beans curry with brown rice",
        ingredients: [
          "Rajma (kidney beans)",
          "Brown rice",
          "Mixed vegetables",
          "Raita",
          "Pickle"
        ]
      },
      {
        time: "Snack",
        calories: 200,
        title: "Dhokla",
        description: "Steamed fermented lentil cake",
        ingredients: [
          "Besan (gram flour)",
          "Green chutney",
          "Grated coconut",
          "Curry leaves"
        ]
      },
      {
        time: "Dinner",
        calories: 550,
        title: "Mixed Dal Khichdi",
        description: "One-pot rice and lentil dish with vegetables",
        ingredients: [
          "Mixed dals",
          "Brown rice",
          "Mixed vegetables",
          "Ghee",
          "Papad",
          "Pickle"
        ]
      }
    ]
  }
};