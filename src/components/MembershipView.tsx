/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Check, ShieldCheck, CreditCard, Sparkles, AlertCircle, 
  Trash2, QrCode, ClipboardList, Info, HelpCircle 
} from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data';
import { MembershipPlan } from '../types';

export const MembershipView: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('annual');
  const [athleteName, setAthleteName] = useState<string>('');
  const [athleteEmail, setAthleteEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'forge_token'>('upi');
  
  // Checkout simulation response
  const [checkoutPass, setCheckoutPass] = useState<{
    success: boolean;
    passCode: string;
    athleteName: string;
    athleteEmail: string;
    planName: string;
    totalPaid: number;
    accessKey: string;
  } | null>(null);

  const activePlan = MEMBERSHIP_PLANS.find(p => p.id === selectedPlanId) || MEMBERSHIP_PLANS[2];

  const handleInitializeCheckout = (planId: string) => {
    setSelectedPlanId(planId);
    setCheckoutPass(null); // clear old passes
    // Scroll cleanly down to form area
    const formElement = document.getElementById('checkout-simulator-element');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteName.trim() || !athleteEmail.trim()) {
      alert('Please state your Name and Email to register credentials on our Kharadi mainframe.');
      return;
    }

    const matchedPlan = MEMBERSHIP_PLANS.find(p => p.id === selectedPlanId) || MEMBERSHIP_PLANS[2];
    
    // Generate complex check-in pass parameters
    const hexCode = Math.floor(100000 + Math.random() * 900000).toString();
    const mockRef = `CULT-RFID-${hexCode}-KHARADI`;
    const randAccess = `GRID-KEY-${Math.random().toString(36).substring(3, 8).toUpperCase()}`;

    setCheckoutPass({
      success: true,
      passCode: mockRef,
      athleteName,
      athleteEmail,
      planName: matchedPlan.name,
      totalPaid: matchedPlan.price,
      accessKey: randAccess
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Upper text headings */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-mono rgb-glow px-3 py-1 bg-brand-orange/10 rounded-full text-brand-primary uppercase tracking-widest leading-none block w-fit mx-auto">
          COMMITTED STEEL MEMBERSHIPS
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-black text-white uppercase tracking-tight">
          Select Your <span className="text-brand-orange">Tier</span>
        </h1>
        <p className="text-gray-400 font-sans text-xs sm:text-sm">
          No hidden administrative charges. Choose the appropriate membership level to access high-tier calibrated irons, biotelemetry calculators, and contrast therapy pods.
        </p>
      </div>

      {/* Grid columns of plan sheets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {MEMBERSHIP_PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div 
              key={plan.id}
              className={`rounded-xl p-6 border flex flex-col justify-between transition-all duration-300 relative ${
                isSelected 
                  ? 'border-brand-orange bg-[#181a1a] scale-[1.02] shadow-xl' 
                  : plan.isBestValue 
                    ? 'border-slate-gray bg-[#181a1a]/80 scale-[1.01]' 
                    : 'border-slate-gray/30 bg-surface-dim/60 hover:bg-surface-dim/90'
              }`}
            >
              {/* Highlight ribbon */}
              {plan.isBestValue && (
                <div className="absolute top-0 right-6 translate-y-[-50%] bg-brand-orange text-charcoal-black font-mono text-[9px] font-extrabold uppercase px-3 py-1 rounded tracking-wider">
                  BEST VAL / PRO UNLOCKED
                </div>
              )}

              {/* Header variables */}
              <div className="space-y-4">
                <div className="space-y-1 font-mono">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">LEVEL ACCESS:</span>
                  <h3 className="text-2xl font-serif font-black text-white uppercase">{plan.name}</h3>
                </div>

                {/* Price displays */}
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1.5 font-mono">
                    <span className="text-3xl font-black text-white">₹{plan.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 font-mono lowercase">{plan.period}</span>
                  </div>
                  {plan.saveAmount && (
                    <span className="text-[10px] bg-success-teal/15 text-success-teal font-mono uppercase font-bold px-2 py-0.5 rounded block w-fit">
                      Saves ₹{plan.saveAmount.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Features checklist */}
                <ul className="space-y-3 font-sans text-xs text-gray-300 pt-4 border-t border-slate-gray/20">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start">
                      <Check className="h-4 w-4 text-brand-orange shrink-0 mr-2 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selection triggering btn */}
              <div className="pt-8">
                <button
                  onClick={() => handleInitializeCheckout(plan.id)}
                  className={`w-full py-3 text-xs font-mono uppercase tracking-wider font-extrabold rounded transition-all ${
                    isSelected
                      ? 'bg-brand-orange text-charcoal-black'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-slate-gray/30'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* COMPARATIVE SPECS AND INTERACTIVE SIM COFFEE BLOCK */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="checkout-simulator-element">
        
        {/* Comparative List (Left column) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-brand-orange block uppercase tracking-widest">// NO RECURRING CONTRACT COERCION</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase leading-none">Cult Fit Transparent Policy</h3>
            <p className="text-gray-400 text-xs sm:text-sm font-sans leading-normal">
              We focus on absolute integrity of physical services. No automatic post-term credit card deductions without consent. We follow clean, reliable standards.
            </p>
          </div>

          <div className="p-6 bg-surface-dim/75 border border-slate-gray/30 rounded-lg space-y-4 text-xs font-mono">
            <h4 className="text-white uppercase text-xs border-b border-slate-gray/35 pb-2">Full Campus Entitlements</h4>
            <div className="space-y-3 font-sans text-gray-400">
              <p className="flex items-start &gt; pl-1">
                <strong className="text-white mr-1">&bull; Safe Parking:</strong> Dedicated underground basement level slots verified for members.
              </p>
              <p className="flex items-start &gt; pl-1">
                <strong className="text-white mr-1">&bull; Locker Facilities:</strong> Personal daily coded numeric combinations drawers with biometric fail-safes.
              </p>
              <p className="flex items-start &gt; pl-1">
                <strong className="text-white mr-1">&bull; Clean Filtration:</strong> High-volume water hydration centers featuring trace dynamic electrolytes.
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Simulation input / credentials receipt (Right column) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-lg bg-[#181a1a] border-2 border-slate-gray/40 space-y-6">
            <h4 className="text-xs font-mono text-brand-primary tracking-widest uppercase">
              GRID GATE PASS COMPILER (100% SIMULATED CHECKOUT)
            </h4>

            {checkoutPass ? (
              /* Simulated Gate RFID Pass Display */
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-charcoal-black border-2 border-[#00F5D4] text-center relative overflow-hidden space-y-6">
                  
                  {/* Digital pass layout decoration */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#00F5D4] animate-pulse"></div>
                  
                  <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">
                    <span>MUSEUM OF STRENGTH: KHARADI PUNE</span>
                    <span className="text-success-teal font-black">VALID_DECEIPT</span>
                  </div>

                  {/* QR Core simulation icon */}
                  <div className="p-4 bg-white text-black rounded w-32 h-32 mx-auto flex items-center justify-center">
                    <QrCode className="h-28 animate-pulse w-28" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">CREDENTIAL HOLDER:</span>
                    <h5 className="text-lg font-serif font-black text-white uppercase">{checkoutPass.athleteName}</h5>
                    <p className="text-gray-400 text-xs font-sans">{checkoutPass.athleteEmail}</p>
                  </div>

                  {/* Pricing and Pass properties details table */}
                  <div className="p-4 bg-surface-dim rounded border border-slate-gray/30 text-left font-mono text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-gray-500">MEMBERSHIP TYPE:</span>
                      <span className="text-white font-bold">{checkoutPass.planName.toUpperCase()} PASS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">TRANSACTION INDEX:</span>
                      <span className="text-white font-bold">₹{checkoutPass.totalPaid.toLocaleString()} (PROCESSED SIM)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">RFID RFID CORE CODE:</span>
                      <span className="text-success-teal font-bold">{checkoutPass.passCode}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-gray/25 pt-2 text-[10px]">
                      <span className="text-gray-500">MAIN GATE KEY:</span>
                      <span className="text-brand-primary uppercase font-black">{checkoutPass.accessKey}</span>
                    </div>
                  </div>

                  {/* Print / Action instructions */}
                  <div className="text-[10px] text-gray-500 font-sans text-center">
                    Show this verified digital card structure to our entrance kiosk desk. Your wristband RFID tag will inherit this token immediately.
                  </div>

                </div>

                {/* Reset button inside checkout */}
                <button
                  onClick={() => {
                    setCheckoutPass(null);
                    setAthleteName('');
                    setAthleteEmail('');
                  }}
                  className="w-full text-center py-2.5 text-xs text-brand-orange uppercase font-bold hover:text-white font-mono"
                >
                  &lt; RESET REGISTRATION SCREEN
                </button>
              </div>
            ) : (
              /* Fields Entrance Form */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 font-mono text-xs text-gray-400">
                
                {/* Active Checkout Selection banner */}
                <div className="p-4 bg-charcoal-black rounded border border-brand-orange/30 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">Pending Registration Plan:</span>
                    <span className="text-white text-sm font-serif font-black tracking-wide uppercase">{activePlan.name} Tier</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 uppercase block">Total Simulation Price:</span>
                    <span className="text-brand-primary font-bold">₹{activePlan.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Text credentials entry keys */}
                <div className="space-y-1">
                  <label htmlFor="checkout-name-input" className="uppercase text-gray-500 text-[10px]">Recipient Athlete Name:</label>
                  <input
                    id="checkout-name-input"
                    type="text"
                    placeholder="e.g. Maya Sen"
                    value={athleteName}
                    onChange={(e) => setAthleteName(e.target.value)}
                    className="w-full bg-charcoal-black rounded border border-slate-gray/30 p-2.5 text-white focus:border-brand-primary outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="checkout-email-input" className="uppercase text-gray-500 text-[10px]">Email Coordinates (Pass Receipts):</label>
                  <input
                    id="checkout-email-input"
                    type="email"
                    placeholder="e.g. athlete@cultfit.com"
                    value={athleteEmail}
                    onChange={(e) => setAthleteEmail(e.target.value)}
                    className="w-full bg-charcoal-black rounded border border-slate-gray/30 p-2.5 text-white focus:border-brand-primary outline-none"
                    required
                  />
                </div>

                {/* Secure simulated payments method selection */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-gray-400 uppercase">CHOOSE SIMULATED GATE SETTLEMENT:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`py-2 text-center text-[10px] rounded uppercase font-bold transition-all ${
                        paymentMethod === 'upi'
                          ? 'bg-brand-primary text-charcoal-black'
                          : 'bg-charcoal-black text-gray-500 hover:text-white border border-slate-gray/20'
                      }`}
                    >
                      UPI / QR SIM
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 text-center text-[10px] rounded uppercase font-bold transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-brand-primary text-charcoal-black'
                          : 'bg-charcoal-black text-gray-500 hover:text-white border border-slate-gray/20'
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('forge_token')}
                      className={`py-2 text-center text-[10px] rounded uppercase font-bold transition-all ${
                        paymentMethod === 'forge_token'
                          ? 'bg-brand-primary text-charcoal-black'
                          : 'bg-charcoal-black text-gray-500 hover:text-white border border-slate-gray/20'
                      }`}
                    >
                      Forge Core Token
                    </button>
                  </div>
                </div>

                {/* Warn alert info text */}
                <div className="p-3 bg-surface-dim rounded border border-dashed border-slate-gray/30 flex items-start space-x-2 text-[10px] leading-normal font-sans">
                  <AlertCircle className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>
                    No credit card details or transactions are processed. This simulator generates direct simulated RFID campus passes at absolute zero financial cost to the user structure.
                  </span>
                </div>

                <div className="pt-4">
                  <button
                    id="submit-membership-checkout-btn"
                    type="submit"
                    className="w-full py-4 text-xs font-serif uppercase tracking-widest font-black rounded btn-primary"
                  >
                    Generate RFID Pass Credentials
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

      </section>

    </div>
  );
};
