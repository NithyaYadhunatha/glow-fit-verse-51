
import { useState, useEffect } from 'react';
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
import { wellnessService } from "@/services/wellnessService";
import { toast } from "sonner";

const Wellness = () => {
  const [activeTab, setActiveTab] = useState('sleep');
  const [sleepData, setSleepData] = useState([]);
  const [stressData, setStressData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState({
    sleep: true,
    stress: true,
    mood: true
  });

  useEffect(() => {
    const fetchWellnessData = async () => {
      try {
        // Fetch sleep data
        const sleep = await wellnessService.getSleepData();
        setSleepData(sleep);
        setLoading(prev => ({ ...prev, sleep: false }));
        
        // Fetch stress data
        const stress = await wellnessService.getStressData();
        setStressData(stress);
        setLoading(prev => ({ ...prev, stress: false }));
        
        // Fetch mood data
        const mood = await wellnessService.getMoodData();
        setMoodData(mood);
        setLoading(prev => ({ ...prev, mood: false }));
      } catch (error) {
        console.error('Failed to fetch wellness data:', error);
        toast.error('Failed to load wellness data');
      }
    };
    
    fetchWellnessData();
  }, []);

  // When user switches tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // If this is the first time loading this tab, we could refresh the data
    if (value === 'sleep' && !loading.sleep) {
      // For demo purposes, we'll just show a toast
      toast.info("Sleep data refreshed");
    } else if (value === 'stress' && !loading.stress) {
      toast.info("Stress data refreshed");
    } else if (value === 'meditation') {
      toast.info("Meditation library loaded");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <WellnessHero />
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="sleep" className="w-full" onValueChange={handleTabChange}>
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
              <SleepTracker 
                data={sleepData} 
                loading={loading.sleep} 
                onLogSleep={(duration, quality) => {
                  wellnessService.logSleep(duration, quality)
                    .then(success => {
                      if (success) {
                        toast.success("Sleep data logged successfully");
                        // Refetch data to update the UI
                        wellnessService.getSleepData().then(data => {
                          setSleepData(data);
                        });
                      }
                    })
                    .catch(err => {
                      console.error(err);
                      toast.error("Failed to log sleep data");
                    });
                }}
              />
              <MoodTracker 
                data={moodData} 
                loading={loading.mood} 
                onLogMood={(mood, energy, notes) => {
                  wellnessService.logMood(mood, energy, notes)
                    .then(success => {
                      if (success) {
                        toast.success("Mood data logged successfully");
                        // Refetch data to update the UI
                        wellnessService.getMoodData().then(data => {
                          setMoodData(data);
                        });
                      }
                    })
                    .catch(err => {
                      console.error(err);
                      toast.error("Failed to log mood data");
                    });
                }}
              />
            </TabsContent>
            
            <TabsContent value="stress" className="space-y-6">
              <StressInsights 
                data={stressData} 
                loading={loading.stress} 
              />
            </TabsContent>
            
            <TabsContent value="meditation" className="space-y-6">
              <MeditationLibrary 
                onMeditationSelect={(id) => {
                  toast.info(`Starting meditation session`, {
                    description: "Meditation playback functionality coming soon"
                  });
                }}
              />
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
