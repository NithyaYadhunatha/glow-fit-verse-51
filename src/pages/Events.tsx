
import { useState } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { PageBackground } from "../components/ui/PageBackground";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventRegistrationModal } from "../components/events/EventRegistrationModal";
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Bell, 
  Video, 
  CheckCircle2,
  Filter,
  Search
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface EventItem {
  id: number;
  title: string;
  date: string;
  location: string;
  participants: number;
  image: string;
  isVirtual: boolean;
  recording: boolean;
  instructor: string; // Added the missing instructor property
}

const Events = () => {
  const navigate = useNavigate();
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [subscribed, setSubscribed] = useState<number[]>([]);
  
  const events: EventItem[] = [
    {
      id: 1,
      title: "Morning Yoga Masterclass",
      date: "May 15, 2025 • 8:00 AM",
      location: "Central Park, New York",
      participants: 24,
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Yoga+Event",
      isVirtual: false,
      recording: false,
      instructor: "Emma Wilson"
    },
    {
      id: 2,
      title: "HIIT & Run Challenge",
      date: "May 18, 2025 • 6:30 PM",
      location: "Riverside Track",
      participants: 32,
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=HIIT+Event",
      isVirtual: false,
      recording: false,
      instructor: "John Davis"
    },
    {
      id: 3,
      title: "Virtual Nutrition Workshop",
      date: "May 20, 2025 • 12:00 PM",
      location: "Online Zoom Session",
      participants: 56,
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Nutrition+Workshop",
      isVirtual: true,
      recording: true,
      instructor: "Sarah Johnson"
    },
    {
      id: 4,
      title: "Strength Training Basics",
      date: "May 25, 2025 • 4:00 PM",
      location: "Fitness Center Downtown",
      participants: 18,
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Strength+Training",
      isVirtual: false,
      recording: true,
      instructor: "Mike Chen"
    }
  ];
  
  const handleRegister = (event: EventItem) => {
    setSelectedEvent(event);
    setShowRegModal(true);
  };
  
  const handleSubscribe = (eventId: number) => {
    if (subscribed.includes(eventId)) {
      setSubscribed(subscribed.filter(id => id !== eventId));
      toast.info("Unsubscribed from event notifications");
    } else {
      setSubscribed([...subscribed, eventId]);
      toast.success("You'll be notified about this event");
    }
  };
  
  const handleSuccessfulRegistration = () => {
    toast.success("Registration successful!", {
      description: "Your spot has been reserved.",
      action: {
        label: "View My Events",
        onClick: () => navigate("/dashboard"),
      },
    });
    setShowRegModal(false);
  };

  return (
    <PageBackground>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-orbitron mb-6 text-center">
          <span className="text-glow-green">FITNESS </span>
          <span>EVENTS</span>
        </h1>
        
        <div className="glass-card p-6 mb-12">
          <p className="text-center text-gray-300 mb-6">
            Join live events, connect with fitness experts, and workout with our community.
            From yoga sessions in the park to virtual nutrition workshops, there's something for everyone.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                className="w-full bg-black/30 border border-gray-700 rounded-full px-10 py-2 text-sm"
                placeholder="Search events..."
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select className="bg-black/30 border border-gray-700 rounded-full px-4 py-2 text-sm">
                <option value="all">All Locations</option>
                <option value="online">Online Only</option>
                <option value="local">In Person</option>
              </select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="virtual">Virtual</TabsTrigger>
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <div key={event.id} className="glass-card overflow-hidden group hover:shadow-[0_0_15px_#39FF14] hover:border-glow-green/30 transition-all duration-300">
                  <div className="relative h-48">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    {event.isVirtual && (
                      <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Virtual
                      </span>
                    )}
                    <button 
                      onClick={() => handleSubscribe(event.id)}
                      className={`absolute top-2 right-2 p-2 rounded-full ${
                        subscribed.includes(event.id) 
                          ? "bg-glow-green/20 text-glow-green" 
                          : "bg-black/50 text-gray-400 hover:text-white"
                      }`}
                    >
                      {subscribed.includes(event.id) ? <CheckCircle2 size={16} /> : <Bell size={16} />}
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                      <Calendar size={14} />
                      {event.date}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mb-3">
                      {event.isVirtual ? (
                        <>
                          <Video size={14} />
                          {event.location}
                        </>
                      ) : (
                        <>
                          <MapPin size={14} />
                          {event.location}
                        </>
                      )}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mb-3">
                      <Users size={14} />
                      {event.participants} registered participants
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-400">By {event.instructor}</span>
                      <Button 
                        onClick={() => handleRegister(event)}
                        className="bg-glow-green hover:bg-glow-green/90 text-black"
                        size="sm"
                      >
                        Reserve Spot
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline" className="border-white/20 hover:border-glow-green">
                View More <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="virtual" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.filter(e => e.isVirtual).map(event => (
                <div key={event.id} className="glass-card overflow-hidden">
                  <div className="relative h-48">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      Virtual
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      <Calendar size={14} className="inline mr-2" />
                      {event.date}
                    </p>
                    <Button 
                      onClick={() => handleRegister(event)}
                      className="w-full bg-glow-green hover:bg-glow-green/90 text-black"
                      size="sm"
                    >
                      Join Session
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recordings" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.filter(e => e.recording).map(event => (
                <div key={event.id} className="glass-card overflow-hidden">
                  <div className="relative h-48">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Recording
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Originally held on {event.date.split("•")[0]}
                    </p>
                    <Button 
                      className="w-full bg-glow-green hover:bg-glow-green/90 text-black"
                      size="sm"
                    >
                      Watch Recording
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
      
      {selectedEvent && (
        <EventRegistrationModal
          open={showRegModal}
          onClose={() => setShowRegModal(false)}
          event={selectedEvent}
          onRegister={handleSuccessfulRegistration}
        />
      )}
    </PageBackground>
  );
};

export default Events;
