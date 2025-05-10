
import { useState, useRef, useEffect } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { ChatHeader } from "../components/chat/ChatHeader";
import { ChatMessages } from "../components/chat/ChatMessages";
import { ChatInput } from "../components/chat/ChatInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Utensils, Heart } from 'lucide-react';

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'fitness' | 'nutrition' | 'wellness';
};

const Chat = () => {
  const [activeBot, setActiveBot] = useState<'fitness' | 'nutrition' | 'wellness'>('fitness');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Welcome messages for each bot
  const welcomeMessages = {
    fitness: "Hi! I'm your AI Fitness Trainer. I can help you with workout plans, form corrections, and training advice. How can I help you today?",
    nutrition: "Namaste! I'm your AI Nutrition Coach. I can suggest Indian recipes, meal plans, and answer questions about your diet. What would you like to know?",
    wellness: "Hello! I'm your Wellness Assistant. I can help with meditation, sleep tracking, and stress management techniques. How are you feeling today?"
  };
  
  // Initialize chat with welcome message when bot changes
  useEffect(() => {
    setMessages([
      {
        id: `welcome-${activeBot}`,
        content: welcomeMessages[activeBot],
        sender: 'bot',
        timestamp: new Date(),
        type: activeBot
      }
    ]);
  }, [activeBot]);
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let response: string;
      
      if (activeBot === 'fitness') {
        response = getAIFitnessResponse(content);
      } else if (activeBot === 'nutrition') {
        response = getAINutritionResponse(content);
      } else {
        response = getAIWellnessResponse(content);
      }
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: response,
        sender: 'bot',
        timestamp: new Date(),
        type: activeBot
      };
      
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 1000);
  };
  
  // Mock AI responses
  const getAIFitnessResponse = (query: string): string => {
    if (query.toLowerCase().includes('workout')) {
      return "I recommend a mix of strength training and cardio. For strength, try incorporating Surya Namaskar (Sun Salutation) as a warm-up, followed by 3 sets of 12-15 reps for each exercise. Let me know if you want a specific workout plan!";
    } else if (query.toLowerCase().includes('weight') || query.toLowerCase().includes('lose')) {
      return "Weight management is about consistency! Aim for a combination of regular exercise (30+ minutes daily), proper nutrition with lots of vegetables and protein, and good recovery. Indian foods like dal, roti, and vegetable curries are great in a weight management plan when portioned correctly.";
    } else {
      return "That's a great fitness question! Remember to stay hydrated during workouts and listen to your body. Would you like me to provide more specific guidance about your fitness journey?";
    }
  };
  
  const getAINutritionResponse = (query: string): string => {
    if (query.toLowerCase().includes('protein')) {
      return "Great Indian sources of protein include paneer (cottage cheese), dal (lentils), chana (chickpeas), rajma (kidney beans), and tofu. For non-vegetarians, chicken tikka, egg bhurji, and fish curry are excellent options too!";
    } else if (query.toLowerCase().includes('recipe') || query.toLowerCase().includes('meal')) {
      return "Here's a quick high-protein meal idea: Paneer Bhurji with Brown Rice and Cucumber Raita. It's balanced with protein, complex carbs, and probiotics from the raita. Would you like the full recipe?";
    } else {
      return "Food is such an important part of fitness! Traditional Indian diets are actually quite balanced when we focus on home-cooked meals with plenty of vegetables, lentils, and whole grains. Is there a specific nutrition goal you're working on?";
    }
  };
  
  const getAIWellnessResponse = (query: string): string => {
    if (query.toLowerCase().includes('meditation') || query.toLowerCase().includes('stress')) {
      return "Meditation can be a wonderful way to reduce stress. Try this simple technique: sit comfortably, close your eyes, and focus on your breath for just 5 minutes. In India, we call this 'Anapanasati' - mindfulness of breathing. Would you like me to guide you through a brief meditation?";
    } else if (query.toLowerCase().includes('sleep')) {
      return "For better sleep, try following a consistent schedule. An hour before bed, enjoy a cup of warm haldi doodh (turmeric milk) with a pinch of nutmeg - it's a traditional Indian remedy for sound sleep!";
    } else {
      return "Wellness encompasses mind, body and spirit. In India, we believe in the concept of 'Swasthya' - a holistic approach to health. How are you feeling today, and is there a specific aspect of wellness you'd like to improve?";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
          <ChatHeader activeBot={activeBot} />
          
          <div className="flex-1 flex flex-col">
            <Tabs 
              defaultValue="fitness" 
              onValueChange={(value) => setActiveBot(value as 'fitness' | 'nutrition' | 'wellness')}
              className="mb-4"
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="fitness" className="flex items-center gap-2">
                  <Dumbbell size={16} />
                  <span>Fitness</span>
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="flex items-center gap-2">
                  <Utensils size={16} />
                  <span>Nutrition</span>
                </TabsTrigger>
                <TabsTrigger value="wellness" className="flex items-center gap-2">
                  <Heart size={16} />
                  <span>Wellness</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 flex flex-col glass-card rounded-xl border border-glow-green/20 mt-4">
                <TabsContent value="fitness" className="flex-1 flex flex-col h-[calc(100vh-280px)]">
                  <ChatMessages messages={messages.filter(m => !m.type || m.type === 'fitness')} loading={loading} />
                </TabsContent>
                
                <TabsContent value="nutrition" className="flex-1 flex flex-col h-[calc(100vh-280px)]">
                  <ChatMessages messages={messages.filter(m => !m.type || m.type === 'nutrition')} loading={loading} />
                </TabsContent>
                
                <TabsContent value="wellness" className="flex-1 flex flex-col h-[calc(100vh-280px)]">
                  <ChatMessages messages={messages.filter(m => !m.type || m.type === 'wellness')} loading={loading} />
                </TabsContent>
                
                <div className="p-4 border-t border-glow-green/20">
                  <ChatInput onSendMessage={handleSendMessage} loading={loading} />
                </div>
              </div>
            </Tabs>
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Chat;
