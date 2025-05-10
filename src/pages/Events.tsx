
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AiAssistant } from "../components/ui/AiAssistant";
import { PageBackground } from "../components/ui/PageBackground";
import { Calendar, Clock, MapPin, Play, Users, Award, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { EventRegistrationModal } from "../components/events/EventRegistrationModal";
import { toast } from "sonner";

interface EventItem {
  id: number;
  title: string;
  date: string;
  time?: string;
  instructor: string;
  participants: number;
  image: string;
  isVirtual: boolean;
  location?: string;
  recording?: boolean;
}

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [subscriptions, setSubscriptions] = useState<number[]>([]);
  
  // Calculate countdown for next event
  useEffect(() => {
    // Example event date - one week from now
    const nextEventDate = new Date();
    nextEventDate.setDate(nextEventDate.getDate() + 7);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = nextEventDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Load saved subscriptions
  useEffect(() => {
    const savedSubscriptions = localStorage.getItem('eventSubscriptions');
    if (savedSubscriptions) {
      setSubscriptions(JSON.parse(savedSubscriptions));
    }
  }, []);

  // Save subscriptions when they change
  useEffect(() => {
    localStorage.setItem('eventSubscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  // Mock event data
  const events: { [key: string]: EventItem[] } = {
    upcoming: [
      {
        id: 1,
        title: "Virtual HIIT Bootcamp",
        date: "May 15, 2025",
        time: "7:00 PM EST",
        instructor: "Alex Rodriguez",
        participants: 238,
        image: "https://placehold.co/600x400/0a0a0a/39FF14?text=HIIT+Bootcamp",
        isVirtual: true
      },
      {
        id: 2,
        title: "Marathon Training Group",
        date: "May 20, 2025",
        time: "6:30 AM EST",
        instructor: "Sofia Chen",
        participants: 124,
        image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Marathon+Training",
        isVirtual: false,
        location: "Central Park, NYC"
      },
      {
        id: 3,
        title: "Nutrition Workshop",
        date: "June 2, 2025",
        time: "1:00 PM EST",
        instructor: "Dr. James Wilson",
        participants: 87,
        image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Nutrition+Workshop",
        isVirtual: true
      }
    ],
    past: [
      {
        id: 4,
        title: "Strength Training Fundamentals",
        date: "April 25, 2025",
        instructor: "Mike Thompson",
        participants: 312,
        image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Strength+Training",
        isVirtual: true,
        recording: true
      },
      {
        id: 5,
        title: "Yoga for Recovery",
        date: "April 18, 2025",
        instructor: "Emma Powell",
        participants: 178,
        image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Yoga+Recovery",
        isVirtual: true,
        recording: true
      },
      {
        id: 6,
        title: "CrossFit Competition",
        date: "April 10, 2025",
        location: "Fitness Warehouse, Chicago",
        participants: 89,
        image: "https://placehold.co/600x400/0a0a0a/39FF14?text=CrossFit+Competition",
        isVirtual: false,
        recording: false
      }
    ]
  };

  const handleReserveSpot = () => {
    setSelectedEvent('Next Live Event');
    setRegistrationOpen(true);
  };

  const handleRegister = (eventId: number) => {
    const event = [...events.upcoming, ...events.past].find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event.title);
      setRegistrationOpen(true);
    }
  };

  const handleToggleSubscription = (eventId: number) => {
    setSubscriptions(prev => {
      if (prev.includes(eventId)) {
        toast.info("Unsubscribed from event notifications");
        return prev.filter(id => id !== eventId);
      } else {
        toast.success("Subscribed to event notifications");
        return [...prev, eventId];
      }
    });
  };

  const handleEventRegistration = (data: any) => {
    toast.success(`Registration successful for ${data.eventName}!`, {
      description: "You will receive a confirmation email shortly."
    });
    setRegistrationOpen(false);
  };

  return (
    <PageBackground>
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-3">
            <span className="text-white">TRAIN TOGETHER, </span>
            <span className="text-glow-green">WIN TOGETHER</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join live and virtual fitness events, connect with the community, and elevate your training with expert-led sessions.
          </p>
        </div>

        {/* Next event countdown */}
        <div className="glass-card p-6 mb-12">
          <h2 className="text-2xl font-orbitron mb-4 text-center">Next Live Event</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-6">
            <div className="bg-black/50 border border-glow-green/30 rounded-md p-3 text-center">
              <p className="text-3xl font-bold text-glow-green">{timeLeft.days}</p>
              <p className="text-xs text-gray-400">DAYS</p>
            </div>
            <div className="bg-black/50 border border-glow-green/30 rounded-md p-3 text-center">
              <p className="text-3xl font-bold text-glow-green">{timeLeft.hours}</p>
              <p className="text-xs text-gray-400">HOURS</p>
            </div>
            <div className="bg-black/50 border border-glow-green/30 rounded-md p-3 text-center">
              <p className="text-3xl font-bold text-glow-green">{timeLeft.minutes}</p>
              <p className="text-xs text-gray-400">MINUTES</p>
            </div>
            <div className="bg-black/50 border border-glow-green/30 rounded-md p-3 text-center">
              <p className="text-3xl font-bold text-glow-green">{timeLeft.seconds}</p>
              <p className="text-xs text-gray-400">SECONDS</p>
            </div>
          </div>
          <div className="flex justify-center">
            <button 
              className="btn-glow px-8 py-3 group hover:bg-glow-green/10 transition-all flex items-center"
              onClick={handleReserveSpot}
            >
              <MapPin size={18} className="mr-2" />
              <span>Reserve Your Spot</span>
            </button>
          </div>
        </div>

        {/* Event Tabs */}
        <div className="mb-8 flex">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'upcoming' 
                ? 'border-b-2 border-glow-green text-glow-green' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Upcoming Events
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'past' 
                ? 'border-b-2 border-glow-green text-glow-green' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events[activeTab].map(event => (
            <div key={event.id} className="glow-card group">
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-md" />
                <div className="absolute top-2 right-2">
                  {event.isVirtual ? (
                    <span className="bg-glow-green/80 text-black text-xs px-2 py-1 rounded-full">Virtual</span>
                  ) : (
                    <span className="bg-glow-red/80 text-white text-xs px-2 py-1 rounded-full">In Person</span>
                  )}
                </div>
                {activeTab === 'past' && event.recording && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-glow-red rounded-full p-3 hover:bg-glow-red/80 transition-colors">
                      <Play size={24} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  
                  {activeTab === 'upcoming' && (
                    <button 
                      onClick={() => handleToggleSubscription(event.id)}
                      className={`p-2 rounded-full transition-colors ${
                        subscriptions.includes(event.id)
                          ? "bg-glow-green/20 text-glow-green" 
                          : "bg-black/30 text-gray-400 hover:text-white"
                      }`}
                      aria-label={subscriptions.includes(event.id) ? "Unsubscribe" : "Subscribe"}
                    >
                      {subscriptions.includes(event.id) ? (
                        <Bell className="h-5 w-5 fill-current animate-bounce" />
                      ) : (
                        <Bell className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span>{event.date}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center text-gray-400">
                      <Clock size={16} className="mr-2" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center text-gray-400">
                      <MapPin size={16} className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-400">
                    <Users size={16} className="mr-2" />
                    <span>{event.participants} participants</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Award size={16} className="mr-2" />
                    <span>By {event.instructor}</span>
                  </div>
                </div>
                
                {activeTab === 'upcoming' ? (
                  <button 
                    onClick={() => handleRegister(event.id)}
                    className="w-full py-2 bg-black border border-glow-green text-white rounded-md 
                    hover:bg-glow-green hover:text-black transition-colors duration-300 flex items-center justify-center"
                  >
                    <MapPin size={16} className="mr-2" />
                    Register Now
                  </button>
                ) : event.recording ? (
                  <button 
                    className="w-full py-2 bg-black border border-glow-red text-white rounded-md 
                    hover:bg-glow-red/20 transition-colors duration-300 flex items-center justify-center"
                  >
                    <Play size={16} className="mr-2" />
                    Watch Recording
                  </button>
                ) : (
                  <button 
                    disabled 
                    className="w-full py-2 bg-black border border-gray-700 text-gray-500 rounded-md cursor-not-allowed flex items-center justify-center"
                  >
                    No Recording Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
      <AiAssistant />
      
      <EventRegistrationModal 
        open={registrationOpen}
        onClose={() => setRegistrationOpen(false)}
        onRegister={handleEventRegistration}
        eventName={selectedEvent}
      />
    </PageBackground>
  );
};

export default Events;
