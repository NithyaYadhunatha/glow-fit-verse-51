
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'image' | 'workout' | 'meal' | 'meditation';
  metadata?: any;
}

export type ChatBotType = 'fitness' | 'nutrition' | 'wellness';

// Mock responses for different bot types
const botResponses: Record<ChatBotType, string[]> = {
  fitness: [
    "Based on your goals, I recommend focusing on compound exercises like squats and deadlifts.",
    "Your form looks good! Try to maintain a neutral spine throughout the movement.",
    "For your height and weight, I'd recommend starting with a weight of around 15-20 kg for this exercise.",
    "Great progress! Your consistency is showing in your strength gains.",
    "To avoid hitting a plateau, let's mix up your routine with some HIIT this week.",
    "Remember to focus on mind-muscle connection during your reps.",
    "Let's incorporate some Surya Namaskar into your warm-up routine tomorrow.",
    "I've analyzed your movement patterns and your squat depth has improved by 15% this month!"
  ],
  nutrition: [
    "Based on your activity level, I recommend around 2,300 calories daily with 130g of protein.",
    "Try adding some paneer or tofu to your lunch for additional protein.",
    "Your breakfast looks balanced! Good mix of carbs and protein to start the day.",
    "I notice you've been skipping afternoon snacks. Try adding some chana or sprouts for sustained energy.",
    "For your post-workout meal, consider a protein-rich dish like masoor dal with roti.",
    "Your water intake is below target today. Try adding some nimbu paani for flavor and electrolytes.",
    "The roti and sabzi combination provides good fiber content and helps with digestion.",
    "Based on your photo, this meal is approximately 450 calories with 22g of protein."
  ],
  wellness: [
    "Your sleep quality has improved this week! Keep maintaining your bedtime routine.",
    "I notice increased stress levels. Try this 5-minute breathing meditation.",
    "Your recovery metrics show you're ready for an intense workout today.",
    "Based on your HRV readings, today would be a good day for active recovery rather than high intensity.",
    "Your mood patterns show higher energy in the mornings - ideal for challenging workouts.",
    "Try ending your day with Yoga Nidra to improve sleep quality.",
    "Your meditation consistency is impressive - you're in the top 5% of users!",
    "Taking short chai breaks between work periods can help maintain your focus and reduce eye strain."
  ]
};

// Chat history for each bot type
const chatHistory: Record<ChatBotType, Message[]> = {
  fitness: [],
  nutrition: [],
  wellness: []
};

export const chatService = {
  // Get chat history for a specific bot type
  getChatHistory: async (botType: ChatBotType): Promise<Message[]> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    return chatHistory[botType];
  },

  // Send a message and get a response
  sendMessage: async (botType: ChatBotType, content: string): Promise<Message> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    // Add to chat history
    chatHistory[botType].push(userMessage);
    
    // Generate bot response
    const randomIndex = Math.floor(Math.random() * botResponses[botType].length);
    const responseContent = botResponses[botType][randomIndex];
    
    // Create bot message
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: responseContent,
      sender: 'bot',
      timestamp: new Date(Date.now() + 1000), // 1 second later
      type: 'text'
    };
    
    // Add to chat history
    chatHistory[botType].push(botMessage);
    
    return botMessage;
  },

  // Clear chat history
  clearChatHistory: async (botType: ChatBotType): Promise<boolean> => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Clear chat history
    chatHistory[botType] = [];
    
    return true;
  }
};
