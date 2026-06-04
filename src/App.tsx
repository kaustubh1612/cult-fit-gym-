/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { TrainingView } from './components/TrainingView';
import { CoachingView } from './components/CoachingView';
import { RecoveryView } from './components/RecoveryView';
import { MembershipView } from './components/MembershipView';
import { ContactView } from './components/ContactView';
import { FAQView } from './components/FAQView';
import { AppView } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentView, setView] = useState<AppView>('home');

  const onNavigateWithScroll = (view: AppView) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJoinTrigger = () => {
    setView('membership');
    setTimeout(() => {
      const element = document.getElementById('checkout-simulator-element');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-charcoal-bg text-gray-100 flex flex-col justify-between selection:bg-brand-orange selection:text-charcoal-black">
      
      {/* Dynamic Top Announcement Ticker */}
      <div className="bg-[#1e1410] border-b border-brand-orange/20 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] font-mono tracking-wider">
          <div className="flex items-center space-x-1.5 text-brand-orange">
            <Sparkles className="h-3.5 w-3.5 animate-spin" />
            <span className="font-bold uppercase">KHARADI PUNE METRIC UPDATE:</span>
          </div>
          <span className="text-gray-300">
            Kharadi Campus active 24/7. New Extreme -110°C Cryo Pod and Eleiko Plates fully calibrated.
          </span>
          <button 
            onClick={handleJoinTrigger}
            className="text-brand-primary underline hover:text-white font-bold ml-1 uppercase transition-colors"
          >
            Claim Induction Pass &gt;
          </button>
        </div>
      </div>

      {/* Main App Layout Header */}
      <Header 
        currentView={currentView} 
        setView={onNavigateWithScroll} 
        onJoinClick={handleJoinTrigger} 
      />

      {/* Dynamic Transition Canvas Area */}
      <main className="flex-1 bg-charcoal-bg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentView === 'home' && (
              <HomeView onJoinClick={handleJoinTrigger} setView={onNavigateWithScroll} />
            )}
            
            {currentView === 'training' && (
              <TrainingView />
            )}
            
            {currentView === 'coaching' && (
              <CoachingView />
            )}
            
            {currentView === 'recovery' && (
              <RecoveryView />
            )}
            
            {currentView === 'membership' && (
              <MembershipView />
            )}
            
            {currentView === 'contact' && (
              <ContactView />
            )}
            
            {currentView === 'faq' && (
              <FAQView setView={onNavigateWithScroll} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Layout Footer */}
      <Footer 
        setView={onNavigateWithScroll} 
        onJoinClick={handleJoinTrigger} 
      />
    </div>
  );
}
