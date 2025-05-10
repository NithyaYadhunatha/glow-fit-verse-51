
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export const MoodTracker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMood, setSelectedMood] = useState<number | null>(4);
  const [note, setNote] = useState<string>('');
  
  const moods = [
    { value: 1, emoji: '😔', label: 'Sad' },
    { value: 2, emoji: '😐', label: 'Meh' },
    { value: 3, emoji: '🙂', label: 'Okay' },
    { value: 4, emoji: '😊', label: 'Good' },
    { value: 5, emoji: '😁', label: 'Great' },
  ];
  
  const handleAddNote = () => {
    // In a real app, this would save the mood and note
    setNote('');
  };

  return (
    <div className="glass-card rounded-xl border border-glow-green/20 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Mood Tracker</h2>
        <p className="text-gray-400">Track how you feel and identify patterns</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Select Date & Mood</h3>
          <div className="mb-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-gray-700 p-3"
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">How are you feeling today?</h4>
            <div className="flex justify-between">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all ${
                    selectedMood === mood.value
                      ? 'bg-glow-green/20 border border-glow-green/50 scale-110'
                      : 'bg-black/30 border border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="text-xs mt-1">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Add Note</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-32 bg-black/30 border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:border-glow-green/50 transition-colors"
            placeholder="How are you feeling today? What factors might be affecting your mood?"
          ></textarea>
          
          <button onClick={handleAddNote} className="btn-glow w-full">
            Save Today's Entry
          </button>
          
          <div className="mt-6 p-4 bg-black/20 rounded-lg">
            <h4 className="text-sm font-medium mb-2">AI Mood Insights</h4>
            <p className="text-xs text-gray-400">
              Your mood has been consistently positive for the past week! Continue your morning meditation and regular exercise routine as they seem to be working well for you. Consider taking short chai breaks when work stress increases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
