
import { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const MeditationLibrary = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  
  const meditations = [
    {
      id: 1,
      title: 'Morning Mindfulness',
      duration: '10:00',
      instructor: 'Anjali Mehta',
      category: 'Mindfulness',
      level: 'Beginner',
      description: 'Start your day with clarity and purpose',
      cover: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaXRhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      title: 'Chakra Balancing',
      duration: '15:30',
      instructor: 'Rahul Sharma',
      category: 'Energy',
      level: 'Intermediate',
      description: 'Align your seven chakras through guided meditation',
      cover: 'https://images.unsplash.com/photo-1526721940322-10fb6e3ae94a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaXRhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      title: 'Sleep Deep',
      duration: '20:00',
      instructor: 'Priya Patel',
      category: 'Sleep',
      level: 'All Levels',
      description: 'Drift into restorative sleep with this calming practice',
      cover: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaXRhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      title: 'Stress Relief',
      duration: '12:45',
      instructor: 'Vikram Malhotra',
      category: 'Anxiety',
      level: 'All Levels',
      description: 'Release tension and find your center with breathing techniques',
      cover: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fG1lZGl0YXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 5,
      title: 'Body Scan Relaxation',
      duration: '18:20',
      instructor: 'Meera Kapoor',
      category: 'Relaxation',
      level: 'Beginner',
      description: 'Progressive relaxation technique for physical tension',
      cover: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1lZGl0YXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    }
  ];
  
  const handlePlay = (id: number) => {
    setCurrentTrack(id);
    setIsPlaying(true);
    // In a real app, this would start the audio playback
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would toggle audio playback
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseInt(e.target.value));
    // In a real app, this would seek the audio to the specified position
  };
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="glass-card rounded-xl border border-glow-green/20 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Meditation Library</h2>
        <p className="text-gray-400">Guided sessions for mindfulness and relaxation</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-3">Featured Meditations</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button className="text-center py-1.5 px-3 rounded-full bg-glow-green/20 text-glow-green border border-glow-green/50 text-xs">All</button>
              <button className="text-center py-1.5 px-3 rounded-full bg-black/30 border border-gray-700 text-gray-300 text-xs hover:border-gray-500 transition-colors">Sleep</button>
              <button className="text-center py-1.5 px-3 rounded-full bg-black/30 border border-gray-700 text-gray-300 text-xs hover:border-gray-500 transition-colors">Stress</button>
              <button className="text-center py-1.5 px-3 rounded-full bg-black/30 border border-gray-700 text-gray-300 text-xs hover:border-gray-500 transition-colors">Focus</button>
              <button className="text-center py-1.5 px-3 rounded-full bg-black/30 border border-gray-700 text-gray-300 text-xs hover:border-gray-500 transition-colors">Energy</button>
              <button className="text-center py-1.5 px-3 rounded-full bg-black/30 border border-gray-700 text-gray-300 text-xs hover:border-gray-500 transition-colors">Beginners</button>
            </div>
          </div>
          
          <ScrollArea className="h-[400px] pr-4 -mr-4">
            <div className="space-y-3">
              {meditations.map((meditation) => (
                <div 
                  key={meditation.id} 
                  className={`group flex items-center p-2 rounded-lg transition-colors ${
                    currentTrack === meditation.id 
                      ? 'bg-glow-green/10 border border-glow-green/30' 
                      : 'bg-black/20 border border-transparent hover:border-gray-700'
                  }`}
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={meditation.cover} 
                      alt={meditation.title} 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => handlePlay(meditation.id)}
                      className={`absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity ${
                        currentTrack === meditation.id ? 'opacity-100' : ''
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Play size={16} className="text-white" fill="white" />
                      </div>
                    </button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{meditation.title}</h4>
                    <div className="flex items-center text-xs text-gray-400">
                      <span>{meditation.instructor}</span>
                      <span className="mx-1">•</span>
                      <span>{meditation.duration}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-black/30 text-gray-300 px-2 py-0.5 rounded">
                        {meditation.category}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {meditation.level}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div>
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            <img 
              src={currentTrack ? meditations.find(m => m.id === currentTrack)?.cover : meditations[0].cover} 
              alt="Meditation visual" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <div className="w-full">
                <h3 className="text-lg font-medium">
                  {currentTrack ? meditations.find(m => m.id === currentTrack)?.title : 'Select a meditation'}
                </h3>
                <p className="text-sm text-gray-300">
                  {currentTrack ? meditations.find(m => m.id === currentTrack)?.instructor : 'Choose from the library'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">{formatTime(progress)}</span>
              <span className="text-sm text-gray-400">
                {currentTrack ? meditations.find(m => m.id === currentTrack)?.duration : '00:00'}
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-glow-green"
            />
            
            <div className="flex justify-between items-center mt-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Volume2 size={20} />
              </button>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <SkipBack size={20} />
                </button>
                
                <button 
                  onClick={togglePlayPause} 
                  className="w-12 h-12 rounded-full bg-glow-green/20 border border-glow-green/50 flex items-center justify-center hover:bg-glow-green/30 transition-colors"
                  disabled={currentTrack === null}
                >
                  {isPlaying ? <Pause size={24} className="text-glow-green" /> : <Play size={24} className="text-glow-green" fill="rgba(57, 255, 20, 0.8)" />}
                </button>
                
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <SkipForward size={20} />
                </button>
              </div>
              
              <div className="w-8"></div> {/* Empty div for flex spacing */}
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-black/20 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Today's Recommendation</h4>
            <p className="text-xs text-gray-400">
              Based on your stress levels and sleep patterns, we recommend the "Chakra Balancing" meditation today. This practice can help restore your energy balance after your busy workday.
            </p>
            <div className="mt-3 text-xs">
              <span className="text-glow-green">Tip:</span> Try following with a cup of ginger tea for enhanced relaxation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
