
import { useState } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { PageBackground } from "../components/ui/PageBackground";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventRegistrationModal, EventItem } from "../components/events/EventRegistrationModal";
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

const Events = () => {
  const navigate = useNavigate();
  const [showRegModal, setShowRegModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [subscribed, setSubscribed] = useState<string[]>([]);
  
  const events: EventItem[] = [
    {
      id: "1",
      title: "Morning Yoga Masterclass",
      date: "May 15, 2025",
      time: "8:00 AM",
      location: "Central Park, New York",
      description: "Start your day with an energizing yoga session led by expert instructors.",
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Yoga+Event",
      category: "Yoga",
      attendees: 24,
      isFull: false
    },
    {
      id: "2",
      title: "HIIT & Run Challenge",
      date: "May 18, 2025",
      time: "6:30 PM",
      location: "Riverside Track",
      description: "Challenge yourself with high-intensity interval training followed by a group run.",
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=HIIT+Event",
      category: "HIIT",
      attendees: 32,
      isFull: false
    },
    {
      id: "3",
      title: "Virtual Nutrition Workshop",
      date: "May 20, 2025",
      time: "12:00 PM",
      location: "Online Zoom Session",
      description: "Learn about proper nutrition for fitness and athletic performance from expert nutritionists.",
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Nutrition+Workshop",
      category: "Nutrition",
      attendees: 56,
      isFull: false
    },
    {
      id: "4",
      title: "Strength Training Basics",
      date: "May 25, 2025",
      time: "4:00 PM",
      location: "Fitness Center Downtown",
      description: "Master the fundamentals of strength training with certified trainers.",
      image: "https://placehold.co/600x400/0a0a0a/39FF14?text=Strength+Training",
      category: "Strength",
      attendees: 18,
      isFull: false
    }
  ];
  
  const handleRegister = (event: EventItem) => {
    setSelectedEvent(event);
    setShowRegModal(true);
  };
  
  const handleSubscribe = (eventId: string) => {
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

  // Function to determine if an event is virtual based on location
  const isVirtual = (event: EventItem) => {
    return event.location.toLowerCase().includes('online') || 
           event.location.toLowerCase().includes('zoom');
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
                    {isVirtual(event) && (
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
                      {event.date} • {event.time}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mb-3">
                      {isVirtual(event) ? (
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
                      {event.attendees} registered participants
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-400">{event.category}</span>
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
              {events.filter(e => isVirtual(e)).map(event => (
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
                      {event.date} • {event.time}
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
            <div className="text-center text-gray-400 py-8">
              <p>No recordings available at this time.</p>
              <p className="mt-2">Check back later for recorded sessions of past events.</p>
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
