export const sampleMeals = [
  {
    id: 1,
    name: "Grilled Chicken Salad",
    description: "Fresh mixed greens with grilled chicken breast, cherry tomatoes, cucumber, and balsamic vinaigrette. A healthy and satisfying meal perfect for lunch or dinner.",
    price: 12.99,
    category: "Healthy",
    cookTime: 15,
    rating: 4.8,
    image: "/meal1.jpg"
  },
  {
    id: 2,
    name: "Beef Stir Fry",
    description: "Tender beef strips stir-fried with colorful vegetables in a savory sauce. Served with steamed rice for a complete and delicious meal.",
    price: 16.99,
    category: "Asian",
    cookTime: 20,
    rating: 4.6,
    image: "/meal2.jpg"
  },
  {
    id: 3,
    name: "Vegetarian Pasta",
    description: "Al dente pasta tossed with fresh seasonal vegetables, herbs, and a light olive oil sauce. A vegetarian delight that's both nutritious and flavorful.",
    price: 13.99,
    category: "Vegetarian",
    cookTime: 18,
    rating: 4.7,
    image: "/meal3.jpg"
  },
  {
    id: 4,
    name: "Salmon with Quinoa",
    description: "Grilled salmon fillet served with fluffy quinoa and steamed broccoli. Rich in omega-3s and protein, perfect for a healthy dinner option.",
    price: 19.99,
    category: "Seafood",
    cookTime: 25,
    rating: 4.9,
    image: "/meal4.jpg"
  },
  {
    id: 5,
    name: "Chicken Tacos",
    description: "Three soft corn tortillas filled with seasoned chicken, fresh salsa, lettuce, and cheese. Served with a side of guacamole and sour cream.",
    price: 14.99,
    category: "Mexican",
    cookTime: 12,
    rating: 4.5,
    image: "/meal5.jpg"
  },
  {
    id: 6,
    name: "Mediterranean Bowl",
    description: "A colorful bowl featuring falafel, hummus, tabbouleh, and fresh vegetables. Drizzled with tahini sauce for authentic Mediterranean flavors.",
    price: 15.99,
    category: "Mediterranean",
    cookTime: 22,
    rating: 4.7,
    image: "/meal6.jpg"
  }
];

export const mealCategories = [
  "All",
  "Healthy",
  "Asian",
  "Vegetarian",
  "Seafood",
  "Mexican",
  "Mediterranean",
  "Italian",
  "American",
  "Indian"
];

export const priceRanges = [
  { label: "Under $10", min: 0, max: 10 },
  { label: "$10 - $15", min: 10, max: 15 },
  { label: "$15 - $20", min: 15, max: 20 },
  { label: "Over $20", min: 20, max: 100 }
];
