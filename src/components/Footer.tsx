/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Mail, Phone, Clock, ArrowUpCircle } from 'lucide-react';
import { AppView } from '../types';
import { CultFitLogo } from './CultFitLogo';

interface FooterProps {
  setView: (view: AppView) => void;
  onJoinClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setView, onJoinClick }) => {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0c0c] border-t border-slate-gray/30 text-gray-400 font-mono text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
              <CultFitLogo />
            </div>
            <p className="text-gray-500 font-sans leading-relaxed text-xs">
              Elite 3-floor strength & conditioning campus in Kharadi, Pune. High-intensity power zones, custom telemetry analytics, and contrast therapy suites.
            </p>
          </div>

          {/* Location details */}
          <div className="space-y-4">
            <h4 className="text-white font-serif uppercase tracking-wider text-sm">Kharadi Pune Campus</h4>
            <ul className="space-y-2.5 font-sans text-xs">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                <span>City Vista, Suite A, Fountain Road, Kharadi, Pune, Maharashtra 411014</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand-orange shrink-0" />
                <span>+91 91152 44778</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand-orange shrink-0" />
                <span>kharadi@cultfit.fit (Join Our Staff)</span>
              </li>
            </ul>
          </div>

          {/* Access Hours */}
          <div className="space-y-4">
            <h4 className="text-white font-serif uppercase tracking-wider text-sm">Operating Hours</h4>
            <div className="space-y-3 font-sans text-xs text-gray-400">
              <div className="flex items-start space-x-2.5">
                <Clock className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-mono uppercase text-[10px] tracking-wider text-brand-primary">Gym Access</p>
                  <p className="font-mono text-gray-500">24 Hours / Day (Keycard Enabled)</p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-mono uppercase text-[10px] tracking-wider text-brand-orange">Staffed Desk & Sales</p>
                  <p className="font-mono text-gray-500">Daily: 06:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links & CTA */}
          <div className="space-y-4">
            <h4 className="text-white font-serif uppercase tracking-wider text-sm">Get Active</h4>
            <div className="space-y-2.5 font-mono">
              <button 
                onClick={() => setView('membership')}
                className="block text-left text-brand-primary hover:text-white transition-colors"
              >
                &gt; VIEW PRICING & PLANS
              </button>
              <button 
                onClick={() => setView('faq')}
                className="block text-left text-[#00F5D4] hover:text-white transition-colors"
              >
                &gt; FREQUENTLY ASKED QUESTIONS (FAQ)
              </button>
              <button 
                onClick={() => setView('training')}
                className="block text-left hover:text-white transition-colors animate-pulse"
              >
                &gt; ADAPTIVE CORE TELEMETRY™
              </button>
              <button 
                onClick={onJoinClick}
                className="block text-left text-brand-orange font-bold hover:text-white transition-colors"
              >
                &gt; START YOUR EVALUATION
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-slate-gray/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-gray-500">
          <div>
            <p>© {currentYear} Cult Fit Kharadi Private Ltd. All metabolic rights reserved.</p>
            <p className="text-[10px] text-gray-600 mt-1 font-mono uppercase">Designed for highest athletic threshold. Built with precise calibration.</p>
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => setView('contact')} className="hover:text-white transition-colors">Safety Protocols</button>
            <button onClick={() => setView('membership')} className="hover:text-white transition-colors">Refund Policies</button>
            <button 
              onClick={handleScrollTop} 
              className="flex items-center space-x-1.5 text-gray-400 hover:text-brand-orange transition-colors font-mono uppercase"
            >
              <span>Back To Top</span>
              <ArrowUpCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
