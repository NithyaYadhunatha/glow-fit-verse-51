
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/home/Hero";
import { FitnessCards } from "../components/home/FitnessCards";
import { QuickAccess } from "../components/home/QuickAccess";
import { AiAssistant } from "../components/ui/AiAssistant";
import { Features } from "../components/home/Features";
import { Testimonials } from "../components/home/Testimonials";
import { HomeStats } from "../components/home/HomeStats";
import { CTASection } from "../components/home/CTASection";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  
  // Ensure all CTAs and buttons on subcomponents are functional
  useEffect(() => {
    // Add event listeners for CTA buttons
    const handleCTAClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // If the clicked element is a button with the "Get Started" text
      if (target.tagName === "BUTTON" && target.textContent?.includes("Get Started")) {
        e.preventDefault();
        navigate("/signup");
      }
      
      // If the clicked element is a button with the "Join Now" text
      if (target.tagName === "BUTTON" && target.textContent?.includes("Join Now")) {
        e.preventDefault();
        navigate("/signup");
      }
    };
    
    document.addEventListener('click', handleCTAClick);
    
    return () => {
      document.removeEventListener('click', handleCTAClick);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <HomeStats />
        <Features />
        <FitnessCards />
        <QuickAccess />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Index;
