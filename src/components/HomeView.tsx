/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Activity, Zap, Award, Flame, Users, Dumbbell, 
  Layers, Gauge, ArrowRight, ShieldCheck, HelpCircle, HardHat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  onJoinClick: () => void;
  setView: (view: 'home' | 'training' | 'coaching' | 'recovery' | 'membership' | 'contact') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onJoinClick, setView }) => {
  return (
    <div className="space-y-24 pb-20">
      {/* SECTION 1: HERO VIEW */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-12 md:pt-20">
        {/* Abstract metallic graphic element backdrops */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-orange-dark/15 via-charcoal-bg to-charcoal-bg opacity-90"></div>
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-success-teal/5 blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Animated System Badge */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-xs text-[#00E5FF] font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span>Kharadi Pune Campus — Premium Strength & Conditioning</span>
          </div>

          {/* Premium Typography Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.1] text-white">
            AUTOMATIC <span className="text-[#e2e2e2] underline decoration-brand-orange decoration-4">EXCELLENCE</span>.<br className="hidden sm:inline" />
            FORGED IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-primary">KHARADI, PUNE</span>.
          </h1>

          {/* Subtext description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400 font-sans leading-relaxed">
            Kharadi Pune’s flagship 3-floor athletic academy. We combine elite-level biomechanical equipment with dynamic metabolic tracking, performance coaches, and state-of-the-art cold therapy contrast pools.
          </p>

          {/* Metrics Overview Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div className="p-4 rounded bg-surface-dim/70 border border-slate-gray/30 font-mono">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">ACTIVE ATHLETES NOW</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-black text-white">142</span>
                <span className="text-[9px] text-[#00F5D4] font-medium">&bull; 97% CAP</span>
              </div>
            </div>
            <div className="p-4 rounded bg-surface-dim/70 border border-slate-gray/30 font-mono">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">TOTAL ACADEMY SPACE</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-black text-white">22,000+</span>
                <span className="text-xs text-gray-500 uppercase font-sans">Sq Ft</span>
              </div>
            </div>
            <div className="p-4 rounded bg-surface-dim/70 border border-slate-gray/30 font-mono">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">CALIBRATED STEEL</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-black text-white">9,500 KG</span>
                <span className="text-[9px] text-[#00F5D4] font-medium">ROGUE & ELEIKO</span>
              </div>
            </div>
            <div className="p-4 rounded bg-surface-dim/70 border border-slate-gray/30 font-mono">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">COACH RATIO</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-black text-white">1 : 8</span>
                <span className="text-[9px] text-brand-orange font-semibold">ELITE CARE</span>
              </div>
            </div>
          </div>

          {/* Core Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="hero-primary-initiate-btn"
              onClick={onJoinClick}
              className="w-full sm:w-auto px-8 py-4 text-xs font-mono tracking-widest font-bold uppercase rounded btn-primary text-charcoal-black flex items-center justify-center space-x-2 btn-breathing"
            >
              <span>INJECT OVERLOAD METRICS</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              id="hero-secondary-pricing-btn"
              onClick={() => setView('membership')}
              className="w-full sm:w-auto px-8 py-4 text-xs font-mono tracking-widest font-bold uppercase rounded btn-secondary flex items-center justify-center space-x-2"
            >
              <span>Browse Tactical Plans</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: BENTO GRID - THE 3-FLOOR LAYOUT MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center md:text-left space-y-3">
          <p className="text-xs font-mono tracking-widest text-brand-orange uppercase">// PHYSICAL INFRASTRUCTURE LAYOUT</p>
          <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-white uppercase">
            3 Floors of Absolute <span className="text-brand-primary font-serif">Power</span>
          </h2>
          <p className="max-w-xl text-gray-400 font-sans text-xs sm:text-sm">
            Our campus is partitioned into dedicated physical protocols across three comprehensive floor plans to prevent equipment bottlenecking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FLOOR 1 CARD */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="p-6 rounded-2xl glass-panel bg-surface-dim/40 backdrop-blur-2xl border border-white/10 hover:border-brand-orange/60 hover:shadow-[0_12px_30px_rgba(255,95,0,0.18)] transition-shadow duration-300 flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4 font-mono">
                <span className="text-xs text-brand-orange tracking-widest font-semibold">01 / GROUND FLOOR</span>
                <span className="px-2 py-0.5 text-[9px] bg-brand-orange/10 text-brand-primary rounded font-bold uppercase">MAX STRENGTH</span>
              </div>
              <h3 className="text-xl font-serif text-white font-black mb-2 uppercase tracking-wide">The Steel Pit & Platforms</h3>
              <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
                6 Olympic lifting platforms. Custom high-gauge Eleiko steel bumpers, Rogue competition plates, Arsenal heavy hammer strength circuits, and deadlift drop lanes.
              </p>
            </div>
            <div className="border-t border-slate-gray/25 pt-4 flex items-center justify-between font-mono text-[11px] text-gray-400">
              <span>Platforms: <strong className="text-white">6 Active</strong></span>
              <span className="text-[#00F5D4] font-bold">No Vibration Dampening</span>
            </div>
          </motion.div>

          {/* FLOOR 2 CARD */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="p-6 rounded-2xl glass-panel bg-surface-dim/40 backdrop-blur-2xl border border-white/10 hover:border-[#00F5D4]/60 hover:shadow-[0_12px_30px_rgba(0,245,212,0.18)] transition-shadow duration-300 flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4 font-mono">
                <span className="text-xs text-brand-primary tracking-widest font-semibold">02 / SECOND LEVEL</span>
                <span className="px-2 py-0.5 text-[9px] bg-[#00F5D4]/10 text-[#00F5D4] rounded font-bold uppercase">METABOLIC ENGINE</span>
              </div>
              <h3 className="text-xl font-serif text-white font-black mb-2 uppercase tracking-wide">Machine & Cardio Suites</h3>
              <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
                Prime Selectorized pin-select biomechanics stacks, heavy Panatta circular leg presses, Concept2 ergs, Matrix assault bikes, and continuous biometric telemetry feedback hubs.
              </p>
            </div>
            <div className="border-t border-slate-gray/25 pt-4 flex items-center justify-between font-mono text-[11px] text-gray-400">
              <span>Cardio Stations: <strong className="text-white">22</strong></span>
              <span className="text-white font-bold">Active Biomarkers</span>
            </div>
          </motion.div>

          {/* FLOOR 3 CARD */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="p-6 rounded-2xl glass-panel bg-surface-dim/40 backdrop-blur-2xl border border-white/10 hover:border-brand-primary/60 hover:shadow-[0_12px_30px_rgba(255,181,153,0.18)] transition-shadow duration-300 flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4 font-mono">
                <span className="text-xs text-brand-orange tracking-widest font-semibold">03 / PENTHOUSE ZONE</span>
                <span className="px-2 py-0.5 text-[9px] bg-brand-primary/10 text-brand-primary rounded font-bold uppercase">CONTRAST WELLNESS</span>
              </div>
              <h3 className="text-xl font-serif text-white font-black mb-2 uppercase tracking-wide">Contrast Therapy Lounge</h3>
              <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
                Professional-grade 4°C extreme dry cold ice plunges, heavy Finnish thermal dry steam saunas (85°C), pneumatic lymphatic recovery boots, and high-intensity neural reset parameters.
              </p>
            </div>
            <div className="border-t border-slate-gray/25 pt-4 flex items-center justify-between font-mono text-[11px] text-gray-400">
              <span>Plunges: <strong className="text-white">3 Active</strong></span>
              <span className="text-brand-orange font-bold font-semibold">Dry Sauna Calibrated</span>
            </div>
          </motion.div>
        </div>
      </section>



      {/* SECTION 5: ADVANTAGE VALUES / WHY US */}
      <section className="bg-charcoal-black py-20 border-y border-slate-gray/20 relative overflow-hidden">
        {/* Abs background accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 relative z-10">
          <div className="space-y-3">
            <span className="text-xs font-mono text-brand-orange uppercase tracking-widest font-bold">// REVOLUTIONARY METRICS STANDARD</span>
            <h3 className="text-3xl md:text-5xl font-serif font-black text-white uppercase">The Cult Fit Advantage</h3>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-400 font-sans">
              Why elite weightlifters, triathletes, and serious power lifters choose City Vista, Kharadi Pune as their home canvas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="p-8 rounded-2xl backdrop-blur-2xl bg-surface-dim/30 border border-white/5 hover:border-brand-orange/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 space-y-4"
            >
              <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl w-fit">
                <Gauge className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-serif font-black text-white uppercase tracking-tight">InBody & Telemetry Checks</h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                Full dynamic segmental lean muscle analyses, base visceral metabolic indicators, body fat percentages, and daily training load reports on your Cult Fit account.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="p-8 rounded-2xl backdrop-blur-2xl bg-surface-dim/30 border border-white/5 hover:border-success-teal/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 space-y-4"
            >
              <div className="p-3 bg-[#00F5D4]/10 text-success-teal rounded-xl w-fit">
                <Award className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-serif font-black text-white uppercase tracking-tight">Calibrated High Grade Steel</h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                No plastic plates. Rogue barbells and Eleiko rubber steel calibrated competition weights ensure clean kinetic transfer and zero bounce accidents.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="p-8 rounded-2xl backdrop-blur-2xl bg-surface-dim/30 border border-white/5 hover:border-brand-primary/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 space-y-4"
            >
              <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl w-fit">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-serif font-black text-white uppercase tracking-tight">24/7 Global Member Access</h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                Train on your own schedules. Your RFID secure wristband grants you immediate gate locks access even if the staffed desk has closed for the day.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};
