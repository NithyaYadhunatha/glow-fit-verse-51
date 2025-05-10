
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

const Index = () => {
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
