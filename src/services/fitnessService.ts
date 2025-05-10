
import { authService } from './authService';

// Types for fitness data
export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  caloriesBurn: number;
  equipment: string[];
  exercises: Exercise[];
  tags: string[];
  thumbnail?: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  rest: number; // in seconds
  videoUrl?: string;
  imageUrl?: string;
}

export interface FitnessStats {
  steps: number;
  caloriesBurned: number;
  activeMinutes: number;
  workoutsCompleted: number;
  streakDays: number;
  weeklyProgress: number[];
}

// Mock data
const workoutPlans: WorkoutPlan[] = [
  {
    id: "1",
    name: "HIIT Cardio Blast",
    description: "High intensity interval training to maximize calorie burn",
    level: "intermediate",
    duration: 30,
    caloriesBurn: 350,
    equipment: ["none"],
    tags: ["cardio", "fat-loss", "trending"],
    thumbnail: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80",
    exercises: [
      {
        id: "e1",
        name: "Jumping Jacks",
        description: "Full body exercise to get your heart rate up",
        sets: 3,
        reps: 20,
        rest: 15,
        imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3"
      },
      {
        id: "e2",
        name: "Burpees",
        description: "Full body exercise combining a squat, push-up, and jump",
        sets: 3,
        reps: 10,
        rest: 30,
        imageUrl: "https://images.unsplash.com/photo-1613845205719-8c47720a7457?ixlib=rb-4.0.3"
      }
    ]
  },
  {
    id: "2",
    name: "Surya Namaskar Flow",
    description: "Traditional Indian yoga flow for total body wellness",
    level: "beginner",
    duration: 20,
    caloriesBurn: 180,
    equipment: ["yoga mat"],
    tags: ["yoga", "flexibility", "indian"],
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80",
    exercises: [
      {
        id: "e3",
        name: "Pranamasana (Prayer Pose)",
        description: "Stand at the edge of your mat, keep your feet together and balance your weight equally on both feet",
        sets: 1,
        reps: 1,
        rest: 5,
        imageUrl: "https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?ixlib=rb-4.0.3"
      },
      {
        id: "e4",
        name: "Hasta Uttanasana (Raised Arms Pose)",
        description: "Breathing in, lift the arms up and back, keeping the biceps close to the ears",
        sets: 1,
        reps: 1,
        rest: 5,
        imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3"
      }
    ]
  }
];

// User fitness stats
const userFitnessStats: FitnessStats = {
  steps: 8743,
  caloriesBurned: 1256,
  activeMinutes: 105,
  workoutsCompleted: 12,
  streakDays: 7,
  weeklyProgress: [65, 70, 63, 82, 74, 68, 85]
};

export const fitnessService = {
  // Get all workout plans
  getWorkoutPlans: async (): Promise<WorkoutPlan[]> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 600));
    return workoutPlans;
  },

  // Get workout plan by id
  getWorkoutPlan: async (id: string): Promise<WorkoutPlan | null> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 300));
    const plan = workoutPlans.find(p => p.id === id);
    return plan || null;
  },

  // Get user fitness stats
  getUserStats: async (): Promise<FitnessStats> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user is logged in
    if (!authService.isAuthenticated()) {
      throw new Error("User not authenticated");
    }
    
    return userFitnessStats;
  },

  // Log completed workout
  logWorkout: async (workoutId: string, duration: number, caloriesBurned: number): Promise<boolean> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Check if user is logged in
    if (!authService.isAuthenticated()) {
      throw new Error("User not authenticated");
    }
    
    // Update stats (in a real app, this would be server-side)
    userFitnessStats.workoutsCompleted += 1;
    userFitnessStats.caloriesBurned += caloriesBurned;
    userFitnessStats.activeMinutes += Math.floor(duration);
    
    return true;
  },

  // Update daily step count
  updateSteps: async (steps: number): Promise<number> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if user is logged in
    if (!authService.isAuthenticated()) {
      throw new Error("User not authenticated");
    }
    
    // Update steps (in a real app, this would be server-side)
    userFitnessStats.steps = steps;
    
    return steps;
  }
};
