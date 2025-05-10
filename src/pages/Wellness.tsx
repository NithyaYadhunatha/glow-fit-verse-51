
import { useState } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { WellnessHero } from "../components/wellness/WellnessHero";
import { SleepTracker } from "../components/wellness/SleepTracker";
import { StressInsights } from "../components/wellness/StressInsights";
import { MeditationLibrary } from "../components/wellness/MeditationLibrary";
import { MoodTracker } from "../components/wellness/MoodTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Activity, HeartPulse } from "lucide-react";

const Wellness = () => {
  const [activeTab, setActiveTab] = useState('sleep');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <WellnessHero />
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="sleep" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="sleep" className="flex items-center gap-2">
                <Moon size={16} />
                <span>Sleep Tracking</span>
              </TabsTrigger>
              <TabsTrigger value="stress" className="flex items-center gap-2">
                <HeartPulse size={16} />
                <span>Stress & Recovery</span>
              </TabsTrigger>
              <TabsTrigger value="meditation" className="flex items-center gap-2">
                <Activity size={16} />
                <span>Meditation</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sleep" className="space-y-6">
              <SleepTracker />
              <MoodTracker />
            </TabsContent>
            
            <TabsContent value="stress" className="space-y-6">
              <StressInsights />
            </TabsContent>
            
            <TabsContent value="meditation" className="space-y-6">
              <MeditationLibrary />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Wellness;
