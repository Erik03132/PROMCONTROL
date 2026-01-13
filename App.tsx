
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DiagramSection from './components/DiagramSection';
import Metrics from './components/Metrics';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import StarField from './components/StarField';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openAssistant = () => setIsChatOpen(true);

  return (
    <div className="relative">
      {/* Background Effects */}
      <StarField />
      <div className="aura-background top-0 w-full h-screen -z-10 hue-rotate-15 brightness-75 absolute">
        <div className="absolute w-full h-full left-0 top-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-[#050505] to-[#050505]"></div>
      </div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#facf39] opacity-[0.03] blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed inset-0 pointer-events-none z-0 grid-lines"></div>

      {/* Main Content */}
      <Header onContactClick={openAssistant} />
      <main>
        <Hero />
        <DiagramSection />
        <Metrics />
        <Services />
        <FAQ />
        <Contact />
        <TechStack />
      </main>
      <Footer />
      
      {/* AI Chat Bot */}
      <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default App;
