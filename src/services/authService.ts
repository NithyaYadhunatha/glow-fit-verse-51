
import { toast } from "sonner";

// Types for authentication
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  joinDate: Date;
  xpPoints: number;
  level: number;
}

interface AuthResponse {
  user: User | null;
  token?: string;
  success: boolean;
  message?: string;
}

// Simulated users database
const users: User[] = [
  {
    id: "1",
    name: "Amit Sharma",
    email: "amit@example.com",
    profilePicture: "https://i.pravatar.cc/150?img=11",
    joinDate: new Date(2023, 5, 15),
    xpPoints: 2350,
    level: 8,
  },
  {
    id: "2", 
    name: "Priya Patel",
    email: "priya@example.com",
    profilePicture: "https://i.pravatar.cc/150?img=5",
    joinDate: new Date(2023, 8, 10),
    xpPoints: 1640,
    level: 5,
  }
];

// Store the current user session
let currentUser: User | null = null;

export const authService = {
  // Login function
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = users.find(u => u.email === email);
    
    if (user && password.length >= 6) { // Simple validation for demo
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
      return { user, token: "fake-token-" + Math.random(), success: true };
    }
    
    return { user: null, success: false, message: "Invalid email or password" };
  },

  // Register function
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { user: null, success: false, message: "Email already registered" };
    }
    
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
      joinDate: new Date(),
      xpPoints: 0,
      level: 1
    };
    
    users.push(newUser);
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    toast.success("Account created successfully!");
    return { user: newUser, token: "fake-token-" + Math.random(), success: true };
  },

  // Logout function
  logout: () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    toast.info("You've been logged out");
    return { success: true };
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (currentUser) return true;
    
    // Check localStorage for persisted user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
      return true;
    }
    
    return false;
  },

  // Get current user
  getCurrentUser: (): User | null => {
    if (currentUser) return currentUser;
    
    // Check localStorage for persisted user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
      return currentUser;
    }
    
    return null;
  }
};
