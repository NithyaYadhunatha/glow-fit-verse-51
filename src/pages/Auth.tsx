
import { useState } from 'react';
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { AuthForm } from "../components/auth/AuthForm";
import { AiAssistant } from "../components/ui/AiAssistant";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto py-12 px-4 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <AuthForm activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Auth;
