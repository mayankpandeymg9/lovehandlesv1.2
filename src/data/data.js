import { image } from "@tensorflow/tfjs-core";

export const features = [
  {
    id: 1,
    title: "Personalized Health Guidance",
    description:
      "Get tailored recommendations and real-time feedback to help you exercise safely and effectively, reducing the risk of injury and maximizing your results.",
    icon: "star_rate_icon",
  },
  {
    id: 2,
    title: "Truly Customized Plans",
    description:
      "Your workouts and nutrition are adapted to your unique goals, fitness level, and progress—no generic routines, just what works for you.",
    icon: "beenhere_icon",
  },
  {
    id: 3,
    title: "Effortless Experience",
    description:
      "Our intuitive app makes it easy to start, track, and stay motivated—whether you're a beginner or a pro, everything you need is just a tap away.",
    icon: "auto_mode_icon",
  },
];

export const testimonial = [
  {
    id: 1,
    name: "Mayank Pandey",
    description:
      "Great application.. you can do your workout at home with correct form and counting.. so there is less chance to get injury.. I suggest everyone to use this app.. Thank you",
    role: "Leader",
  },
  {
    id: 2,
    name: "Tanay Budhlakoti",
    description:
      "This app is amazing it's very beneficial for those who is not hiring trainer for workout at gym infact it's good and nice app",
    role: "Co-Leader",
    image: '',
  },
  {
    id: 3,
    name: "Sagar Bisht",
    description:
      "As an active gym person, sometime it gets very difficult to count our reps on a particular heavy set that too keeping a good form, this project will help to counter the issue. Also the body tracking feature makes it even more accurate to work on our form.",
    role: "Member",
    image: '',
  },
  {
    id: 4,
    name: "Rohit Singh Bhagat",
    description:
      "Professionals need more of a handy application to get rid of financial problems when they see a word 'Gym',this application helps them",
    role: "Member",
    image: '',
  },
];

export const homePageDiet = [
  {
    id: 1,
    title: "Diet Meal Plan to Lose Weight",
    route: "/weightloss",
    description:
      "This easy 1,500-calorie weight-loss meal plan is specially tailored to help you feel energized .",
    image:
      "https://images.pexels.com/photos/4929677/pexels-photo-4929677.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Diet Meal Plan to Gain Weight",
    route: "/weightgain",
    description:
      "Gain weight the healthy way with this nutrient-packed meal plan.",
    image:
      "https://images.pexels.com/photos/4929692/pexels-photo-4929692.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Healthy Eating Plate",
    route: "/healthy",
    description:
      "Use the Healthy Eating Plate as a guide for creating healthy, balanced meals—whether served at the table or packed in a lunch box.",
    image:
      "https://images.pexels.com/photos/793765/pexels-photo-793765.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const HomePageActivity = [
  {
    id: 1,
    title: "Yoga",
    route: "/yoga",
    description:
      "Yoga is a group of physical, mental, and spiritual practices or disciplines.",
    image:
      "https://images.pexels.com/photos/9271215/pexels-photo-9271215.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Strength Training",
    route: "/workout",
    description:
      "Strength training is a type of physical exercise specializing in the use of resistance to induce muscular contraction.",
    image:
      "https://images.pexels.com/photos/10360933/pexels-photo-10360933.jpeg?auto=compress&cs=tinysrgb&w=500",
  },
];

export const YogaVariation = [
  {
    id: 1,
    title: "Virabhadrasana",
    route: "/virabhadrasana",
    description:
      "Warrior Pose (Virabhadrasana) strengthens your legs, opens your hips and chest, and develops focus, balance and groundedness. This powerful standing pose improves circulation and respiration, and energizes the entire body. Perfect for building strength and stability while cultivating mental focus.",
    image:
      "https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Trikonasana",
    route: "/trikonasana",
    description:
      "Triangle Pose (Trikonasana) stretches and strengthens the thighs, knees, and ankles while opening the hips, groins, and hamstrings. It also stretches the shoulders, chest, and spine, and stimulates the abdominal organs. This pose helps relieve stress and anxiety while improving digestion and balance.",
    image:
      "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "AdhoMukhaSvanasana",
    route: "/adhomukhasvanasana",
    description:
      "Downward-Facing Dog (Adho Mukha Svanasana) is a rejuvenating pose that strengthens the entire body while calming the mind. It stretches the shoulders, hamstrings, calves, and hands while building strength in the arms and legs. This pose improves circulation, relieves back pain, and helps reduce stress and anxiety.",
    image: "https://images.pexels.com/photos/3822623/pexels-photo-3822623.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const WorkoutVariation = [
  {
    id: 1,
    title: "Push Up",
    route: "/pushups",
    description:
      "Push-ups are a fundamental bodyweight exercise that targets your chest, shoulders, triceps, and core. They improve upper body strength, stability, and posture while building functional fitness. Perfect for developing overall upper body strength and core stability. Start with proper form and gradually increase repetitions for maximum benefits.",
    image:
      "https://images.pexels.com/photos/2780762/pexels-photo-2780762.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Squat",
    route: "/squats",
    description:
      "Squats are a compound exercise that targets multiple muscle groups including quadriceps, hamstrings, glutes, and core. They improve lower body strength, mobility, and balance while promoting better posture and joint health. Essential for building leg strength and improving overall functional fitness. Focus on proper form to maximize benefits and prevent injury.",
    image:
      "https://images.pexels.com/photos/6998874/pexels-photo-6998874.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Crunches",
    route: "/crunches",
    description:
      "Crunches are an effective abdominal exercise that specifically targets the rectus abdominis (six-pack muscles). They help strengthen your core, improve posture, and enhance overall stability. When performed correctly, crunches can help develop a strong, defined midsection while supporting better spinal health and reducing lower back pain.",
    image:
      "https://images.pexels.com/photos/5262853/pexels-photo-5262853.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Bicep Curls",
    route: "/bicepcurls",
    description:
      "Bicep curls are an isolation exercise that specifically targets the biceps brachii muscles. They help build arm strength, improve muscle definition, and enhance overall upper body aesthetics. This exercise is excellent for developing arm strength and can be performed with various equipment like dumbbells, barbells, or resistance bands.",
    image:
      "https://images.pexels.com/photos/7188078/pexels-photo-7188078.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const recipes = {
  "low-fat": [
    {
      label: "Grilled Chicken Salad",
      image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
      calories: 350,
      healthLabels: ["Low-Fat", "High-Protein", "Low-Carb"],
      url: "#",
      description: "A healthy mix of grilled chicken breast, fresh vegetables, and light dressing."
    },
    {
      label: "Vegetable Stir Fry",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      calories: 280,
      healthLabels: ["Low-Fat", "Vegetarian", "High-Fiber"],
      url: "#",
      description: "Colorful vegetables stir-fried with minimal oil and light soy sauce."
    },
    {
      label: "Quinoa Bowl",
      image: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg",
      calories: 320,
      healthLabels: ["Low-Fat", "Gluten-Free", "High-Fiber"],
      url: "#",
      description: "Nutritious quinoa topped with roasted vegetables and a light vinaigrette."
    },
    {
      label: "Mediterranean Fish",
      image: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg",
      calories: 290,
      healthLabels: ["Low-Fat", "High-Protein", "Omega-3"],
      url: "#",
      description: "Baked white fish with herbs, lemon, and Mediterranean vegetables."
    },
    {
      label: "Lentil Soup",
      image: "https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg",
      calories: 250,
      healthLabels: ["Low-Fat", "High-Fiber", "Plant-Based"],
      url: "#",
      description: "Hearty lentil soup with vegetables and aromatic spices."
    },
    {
      label: "Tofu Buddha Bowl",
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
      calories: 310,
      healthLabels: ["Low-Fat", "Vegan", "High-Protein"],
      url: "#",
      description: "Marinated tofu with brown rice, vegetables, and tahini dressing."
    },
    {
      label: "Chickpea Salad",
      image: "https://images.pexels.com/photos/1640778/pexels-photo-1640778.jpeg",
      calories: 260,
      healthLabels: ["Low-Fat", "Vegetarian", "High-Fiber"],
      url: "#",
      description: "Fresh chickpeas tossed with cucumber, tomatoes, and a light lemon dressing."
    },
    {
      label: "Steamed Cod with Veggies",
      image: "https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg",
      calories: 300,
      healthLabels: ["Low-Fat", "High-Protein", "Omega-3"],
      url: "#",
      description: "Steamed cod fillet served with a medley of seasonal vegetables."
    }
  ],
  "high-protein": [
    {
      label: "Protein-Packed Omelette",
      image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
      calories: 450,
      healthLabels: ["High-Protein", "Low-Carb", "Keto"],
      url: "#",
      description: "Eggs with cheese, spinach, and mushrooms for a protein-rich breakfast."
    },
    {
      label: "Greek Yogurt Parfait",
      image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
      calories: 380,
      healthLabels: ["High-Protein", "Low-Fat", "Calcium-Rich"],
      url: "#",
      description: "Greek yogurt layered with fresh fruits and granola."
    },
    {
      label: "Tuna Steak",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      calories: 420,
      healthLabels: ["High-Protein", "Low-Carb", "Omega-3"],
      url: "#",
      description: "Grilled tuna steak with steamed vegetables and lemon."
    },
    {
      label: "Chicken Stir Fry",
      image: "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg",
      calories: 480,
      healthLabels: ["High-Protein", "Low-Carb", "Asian"],
      url: "#",
      description: "Stir-fried chicken with vegetables in a savory sauce."
    },
    {
      label: "Protein Pancakes",
      image: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg",
      calories: 400,
      healthLabels: ["High-Protein", "Breakfast", "Low-Sugar"],
      url: "#",
      description: "Fluffy protein pancakes topped with berries and Greek yogurt."
    },
    {
      label: "Tempeh Stir Fry",
      image: "https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg",
      calories: 420,
      healthLabels: ["High-Protein", "Plant-Based", "Iron-Rich"],
      url: "#",
      description: "Marinated tempeh stir-fried with broccoli and vegetables in a savory sauce."
    },
    {
      label: "Egg White Scramble",
      image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg",
      calories: 320,
      healthLabels: ["High-Protein", "Low-Fat", "Vegetarian"],
      url: "#",
      description: "Egg whites scrambled with spinach, tomatoes, and onions for a protein boost."
    },
    {
      label: "Grilled Salmon Plate",
      image: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
      calories: 430,
      healthLabels: ["High-Protein", "Omega-3", "Gluten-Free"],
      url: "#",
      description: "Grilled salmon fillet with a side of quinoa and steamed broccoli."
    }
  ],
  "balanced": [
    {
      label: "Mediterranean Bowl",
      image: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg",
      calories: 400,
      healthLabels: ["Balanced", "Heart-Healthy", "Mediterranean"],
      url: "#",
      description: "A balanced mix of whole grains, lean protein, and vegetables."
    },
    {
      label: "Salmon with Sweet Potato",
      image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
      calories: 450,
      healthLabels: ["Balanced", "High-Protein", "Omega-3"],
      url: "#",
      description: "Baked salmon with roasted sweet potato and steamed greens."
    },
    {
      label: "Chicken and Rice Bowl",
      image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
      calories: 420,
      healthLabels: ["Balanced", "High-Protein", "Gluten-Free"],
      url: "#",
      description: "Grilled chicken with brown rice and mixed vegetables."
    },
    {
      label: "Vegetable Curry",
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
      calories: 380,
      healthLabels: ["Balanced", "Vegetarian", "Spicy"],
      url: "#",
      description: "Mixed vegetables in a flavorful curry sauce with brown rice."
    },
    {
      label: "Turkey Wrap",
      image: "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg",
      calories: 350,
      healthLabels: ["Balanced", "High-Protein", "Quick-Meal"],
      url: "#",
      description: "Whole grain wrap with turkey, vegetables, and hummus."
    },
    {
      label: "Quinoa Buddha Bowl",
      image: "https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg",
      calories: 420,
      healthLabels: ["Balanced", "Plant-Based", "High-Fiber"],
      url: "#",
      description: "Quinoa bowl with roasted vegetables, avocado, and tahini dressing."
    },
    {
      label: "Stuffed Bell Peppers",
      image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg",
      calories: 370,
      healthLabels: ["Balanced", "Vegetarian", "High-Fiber"],
      url: "#",
      description: "Bell peppers stuffed with brown rice, black beans, and vegetables."
    },
    {
      label: "Lemon Herb Tilapia",
      image: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg",
      calories: 390,
      healthLabels: ["Balanced", "High-Protein", "Omega-3"],
      url: "#",
      description: "Baked tilapia with lemon, herbs, and a side of roasted vegetables."
    }
  ]
};

export default features;
