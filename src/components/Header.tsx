/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppView } from '../types';
import { CultFitLogo } from './CultFitLogo';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  onJoinClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, onJoinClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: AppView }[] = [
    { label: 'Advantage', view: 'home' },
    { label: 'Core Programs', view: 'training' },
    { label: 'Elite Coaches', view: 'coaching' },
    { label: 'Recovery Lounge', view: 'recovery' },
    { label: 'Memberships', view: 'membership' },
    { label: 'Location & Contact', view: 'contact' },
    { label: 'FAQ', view: 'faq' },
  ];

  const handleNavClick = (view: AppView) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-gray/30 bg-charcoal-bg/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <CultFitLogo />
          </div>

          {/* Nav Items - Desktop */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`nav-link-${item.view}`}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-4 py-2 rounded-md text-xs font-mono tracking-wider uppercase font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-brand-primary bg-brand-orange/10 border-b-2 border-brand-orange'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-b-2 border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              id="header-join-today-btn"
              onClick={onJoinClick}
              className="px-5 py-2.5 text-xs font-mono tracking-wider font-semibold uppercase rounded btn-primary btn-breathing"
            >
              Forge My Body
            </button>
          </div>

          {/* Hamburger Menu - Mobile */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden glass-panel border-t border-slate-gray/20 bg-charcoal-bg/95">
          <div className="px-2 pt-3 pb-6 space-y-2">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`w-full text-left px-4 py-3 rounded-md text-[13px] font-mono tracking-wider uppercase font-semibold transition-all ${
                    isActive
                      ? 'text-brand-primary bg-brand-orange/10 pl-6 border-l-4 border-brand-orange'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 pl-4'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 px-4">
              <button
                id="mobile-join-today-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onJoinClick();
                }}
                className="w-full py-3.5 text-center text-xs font-mono tracking-wider font-bold uppercase rounded btn-primary"
              >
                Forge My Body
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
