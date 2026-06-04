/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, Key, Dumbbell, 
  Flame, ShieldAlert, BadgeInfo, Compass, HelpCircle as HelpIcon, Send, CheckCircle2
} from 'lucide-react';
import { AppView } from '../types';

interface FAQItem {
  id: string;
  category: 'membership' | 'training' | 'recovery';
  question: string;
  answer: string;
  badge?: string;
  tag?: string;
}

interface FAQViewProps {
  setView?: (view: AppView) => void;
}

export const FAQView: React.FC<FAQViewProps> = ({ setView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'membership' | 'training' | 'recovery'>('all');
  const [expandedFAQId, setExpandedFAQId] = useState<string | null>(null);
  
  // Custom contact form inside FAQ
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [faqFeedback, setFaqFeedback] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const faqData: FAQItem[] = [
    // MEMBERSHIP FAQs
    {
      id: 'memb-1',
      category: 'membership',
      question: 'How does the 24/7 keycard entry and RFID wristband system work at Kharadi?',
      answer: 'Upon subscribing to any Kharadi Elite plan, you are issued a secure dual-frequency RFID wristband. This wristband unlocks our secure physical gate turnstiles at Ashoka Nagar Fountain Road entrance at any hour of the night, even if our sales desk has closed. It also keeps track of your personal lockers and live telemetry metrics during exercises.',
      badge: '24/7 ACCESS',
      tag: 'RFID Security'
    },
    {
      id: 'memb-2',
      category: 'membership',
      question: 'Can I pause or transfer my Cult Fit membership to another athlete?',
      answer: 'Yes. Kharadi Unlimited Gold and Black members can freeze their membership up to 45 days per year at zero charge via their account dashboard. Transfers to another registered Pune athlete are permitted once per contract cycle for a nominal onboarding and RFID recalibration fee of ₹500.',
      tag: 'Pauses & Transfers'
    },
    {
      id: 'memb-3',
      category: 'membership',
      question: 'Is there a corporate discount format for Gera Commerce and EON IT Park teams?',
      answer: 'Absolutely. We offer customized high-performance corporate tiers for physical strength training. If you work inside Gera Commerce Zone, EON IT Park, or World Trade Center Pune, present your corporate ID card at the Floor 1 Reception Desk to automatically unlock 15% discount telemetry on black tier packages.',
      badge: '15% CORP TIER',
      tag: 'EON & GERA'
    },
    {
      id: 'memb-4',
      category: 'membership',
      question: 'What is your refund policy if my biomechanical parameters change?',
      answer: 'All memberships come with a full 48-hour satisfaction guarantee. If you decide that high-intensity raw steel lifting is not suitable for your athletic goals within 48 hours of your initial assessment, we will issue a complete refund back to your original source account with no cancellation penalties.',
      tag: 'Refunds'
    },

    // TRAINING FAQs
    {
      id: 'train-1',
      category: 'training',
      question: 'Do I need to pre-book spots on the Olympic strength lifting platforms?',
      answer: 'While our 6 Olympic lifting platforms are equipped with premium Eleiko weights and high-grade Rogue competition bars, we do not require reservations for general off-peak times. However, during predicted peak traffic hours (identified in our interactive live occupancy metric tracker), we highly recommend logging in to schedule a platform block to guarantee zero queue times.',
      badge: 'ELEIKO ZONE',
      tag: 'Olympic Lifting'
    },
    {
      id: 'train-2',
      category: 'training',
      question: 'What credentials and safety criteria do the on-site elite coaches hold?',
      answer: 'Every on-duty tactical coach at Cult Fit Kharadi holds dual accreditations from globally recognized federations (such as NSCA-CSCS, NASM, ASCA Level-2, or national-weightlifting diplomas). They are specially certified to construct high-velocity powerlifting plans, metabolic HIIT protocols, and supervise dynamic drop loads safely.',
      tag: 'Elite Coaches'
    },
    {
      id: 'train-3',
      category: 'training',
      question: 'What are the rules regarding dropping deadlift bars or rubber iron plates?',
      answer: 'Our ground level "Steel Pit" has specialized, multi-layered high-density vibration reduction platforms that allow calibrated dropping of bumper plates up to 350kg. Dropping outside the platform lanes (or on levels 2 and 3) is strictly forbidden for safety reasons. Always use standard rubber plates on the platforms.',
      tag: 'Steel Pit Rules'
    },

    // RECOVERY FAQs
    {
      id: 'rec-1',
      category: 'recovery',
      question: 'What are the safety regulations for using the Penthouse Contrast Therapy Plunge?',
      answer: 'To protect cardiovascular health, contrast therapy sessions are limited to a maximum sequence of three alternations between our 3°C cold plunge tanks and 92°C dry sauna rooms. First-time athletes must perform a quick blood pressure baseline check at the Floor 1 lobby or receive a brief walkthrough from our recovery suite stewards before entering.',
      badge: '3°C CRYO PLUNGE',
      tag: 'Contrast Therapy'
    },
    {
      id: 'rec-2',
      category: 'recovery',
      question: 'How cold does the Extreme -110°C Cryo Pod get, and how long does it last?',
      answer: 'Our state-of-the-art Nitrogen-free electric dry Cryotherapy system targets a deep cabin temperature of -110°C to trigger cellular vasoconstriction. A standard recovery session is capped strictly at 3 minutes and is completely supervised by an advanced recovery operator. It requires dry workout apparel (such as shorts and socks) and protective mittens provided by us.',
      badge: 'ADVANCED CRYO',
      tag: 'Cryo Science'
    },
    {
      id: 'rec-3',
      category: 'recovery',
      question: 'How often are the dry saunas and cold plunges sanitized?',
      answer: 'Hygiene is calibrated at elite medical standards. The 3°C cold plunge pools utilize constant 24/7 active titanium UV-sterilization filtration and ozone generators that recycle the entire water volume every 12 minutes. Saunas are baked at high degrees and pressure-cleaned daily with certified antimicrobial solutions.',
      tag: 'Sanitization Rules'
    }
  ];

  // Dynamically filter active FAQs
  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.tag && faq.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleToggleAccordion = (id: string) => {
    setExpandedFAQId(expandedFAQId === id ? null : id);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorEmail.trim() || !faqFeedback.trim()) {
      return;
    }
    setFeedbackSuccess(true);
  };

  const categoriesList = [
    { id: 'all', label: 'All Telemetries', count: faqData.length },
    { id: 'membership', label: 'Memberships', count: faqData.filter(f => f.category === 'membership').length },
    { id: 'training', label: 'Training Sessions', count: faqData.filter(f => f.category === 'training').length },
    { id: 'recovery', label: 'Recovery Suite', count: faqData.filter(f => f.category === 'recovery').length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title & Introduction block */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono rgb-glow px-3.5 py-1 bg-[#00F5D4]/10 rounded-full text-[#00F5D4] uppercase tracking-widest leading-none block w-fit mx-auto font-black">
          // KHARADI TECHNICAL SUPPORT ENGINE
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-black text-white uppercase tracking-tight leading-tight">
          Help Desk <span className="text-brand-orange underline decoration-[#00F5D4] decoration-2">&amp; Metrics</span>
        </h1>
        <p className="text-gray-400 font-sans text-xs sm:text-sm max-w-xl mx-auto">
          Need information regarding active access keys, training plate calibrations, or kontrast sauna safety thresholds? Search the official Cult Fit database.
        </p>
      </div>

      {/* Grid containing Search bar, Filter buttons, and Accordion Questions list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Side Controls (Search query and Categories tab selectors) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Interactive Search input */}
          <div className="p-6 rounded-2xl glass-panel bg-surface-dim/40 border border-white/10 shadow-[0_8px_32px_0_rgba(255,95,0,0.05)]">
            <h3 className="text-xs font-mono text-[#00F5D4] uppercase tracking-widest font-bold mb-4 flex items-center gap-1.5 leading-none">
              <Search className="h-4 w-4 text-brand-orange" />
              Search Database
            </h3>
            <div className="relative">
              <input
                id="faq-search-input"
                type="text"
                placeholder="Query (e.g. RFID, Cold plunge...)"
                className="w-full bg-charcoal-black/90 font-mono text-xs rounded-xl border border-slate-gray/30 p-3.5 pl-10 text-white focus:border-[#00F5D4] outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-500" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-[10px] bg-white/10 hover:bg-white/20 px-1.5 py-0.5 rounded font-mono text-gray-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Categorical selector buttons links block */}
          <div className="p-6 rounded-2xl glass-panel bg-surface-dim/40 border border-white/10 space-y-3.5">
            <h3 className="text-xs font-mono text-[#00F5D4] uppercase tracking-widest font-bold flex items-center gap-1.5 leading-none mb-2">
              <Compass className="h-4 w-4 text-brand-orange" />
              Locality Sectors
            </h3>
            
            <div className="flex flex-col space-y-2">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`w-full text-left p-3.5 rounded-xl font-mono text-xs flex items-center justify-between border cursor-pointer transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-brand-orange/20 border-brand-orange text-white font-extrabold shadow-[0_0_12px_rgba(255,95,0,0.25)]'
                      : 'bg-charcoal-black/50 border-white/5 text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="uppercase">{cat.label}</span>
                  <span className={`text-[10px] tracking-tight px-2 py-0.5 rounded font-mono ${
                    selectedCategory === cat.id ? 'bg-brand-orange text-charcoal-black font-extrabold' : 'bg-[#181a1a] text-gray-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact help block info */}
          <div className="p-6 bg-charcoal-black/90 rounded-2xl border border-slate-gray/35 space-y-3">
            <h4 className="text-[11px] font-mono text-white tracking-widest uppercase font-bold flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-brand-orange" />
              Campus Dispatch Emergency
            </h4>
            <p className="text-gray-400 font-sans text-xs leading-relaxed">
              Facing hardware errors at the security turnstiles or locking limits? Call our active hotline at <span className="text-white font-mono font-semibold">+91 91152 44778</span> instantly, or alert any instructor present on the Gym floor.
            </p>
          </div>

        </div>

        {/* Right Side: Accordion Lists of FAQs matching criteria */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-3">
            <span className="text-gray-500 uppercase font-black uppercase">
              QUERY STREAM RESULTS ({filteredFAQs.length})
            </span>
            <span className="text-[10px] text-gray-500 bg-[#121414] px-2 py-0.5 rounded border border-white/5 uppercase">
              System: Stable
            </span>
          </div>

          {filteredFAQs.length === 0 ? (
            /* Empty state message */
            <div className="p-12 text-center bg-surface-dim/40 rounded-2xl border border-dashed border-slate-gray/30 space-y-3">
              <HelpIcon className="h-10 w-10 text-brand-orange mx-auto opacity-60" />
              <p className="text-white font-serif font-black uppercase text-lg">No Telemetries Match Query</p>
              <p className="text-gray-400 font-sans text-xs max-w-sm mx-auto">
                No articles matched "{searchQuery}" under the selected filter. Try searching for basic concepts like "RFID", "Cold plunge", "sauna" or "refund".
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} 
                className="mt-2 text-xs font-mono uppercase font-bold text-brand-primary bg-brand-orange/10 px-4 py-2 rounded-lg border border-brand-orange"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            /* Items list rendered beautifully with Accordion expand mechanisms */
            <div className="space-y-4">
              {filteredFAQs.map((item) => {
                const isExpanded = expandedFAQId === item.id;
                return (
                  <div
                    key={item.id}
                    id={`faq-item-${item.id}`}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded 
                        ? 'bg-[#181a1a]/95 border-[#00F5D4] shadow-[0_4px_20px_rgba(0,245,212,0.1)]' 
                        : 'bg-surface-dim/40 border-slate-gray/30 hover:border-white/25 hover:bg-surface-dim/70'
                    }`}
                  >
                    {/* Header trigger line button */}
                    <button
                      onClick={() => handleToggleAccordion(item.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="space-y-2 text-left">
                        
                        {/* Tags line */}
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-[9px] font-mono font-bold text-brand-orange uppercase bg-[#2a1710] px-2 py-0.5 rounded-md border border-brand-orange/20">
                            {item.category}
                          </span>
                          {item.badge && (
                            <span className="text-[9px] font-mono font-black text-white uppercase bg-brand-primary px-2 py-0.5 rounded-md">
                              {item.badge}
                            </span>
                          )}
                          {item.tag && (
                            <span className="text-[9px] font-mono text-gray-400 bg-charcoal-black/70 px-2 py-0.5 rounded-md border border-white/5">
                              #{item.tag}
                            </span>
                          )}
                        </div>

                        {/* Actual question text */}
                        <h4 className="text-sm sm:text-base font-serif font-black text-white leading-tight uppercase tracking-tight">
                          {item.question}
                        </h4>
                      </div>

                      {/* Icon */}
                      <div className={`p-2 rounded-xl transition-all ${
                        isExpanded ? 'bg-[#00F5D4] text-charcoal-black' : 'bg-charcoal-black/80 text-gray-400'
                      }`}>
                        {isExpanded ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                      </div>
                    </button>

                    {/* Animated accordion panel */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-1 border-t border-white/5-none text-xs sm:text-sm text-gray-400 font-sans leading-relaxed space-y-4 bg-charcoal-black/40">
                            <p className="border-l-2 border-brand-orange pl-4 bg-charcoal-black/30 p-3 rounded-r-xl">
                              {item.answer}
                            </p>
                            
                            {setView && (
                              <div className="pt-2 flex items-center justify-between text-[11px] font-mono border-t border-white/5 mt-4">
                                <span className="text-gray-500">Telemetry unit: calibrated</span>
                                <button 
                                  onClick={() => {
                                    if (item.category === 'membership') setView('membership');
                                    if (item.category === 'training') setView('training');
                                    if (item.category === 'recovery') setView('recovery');
                                  }}
                                  className="text-[#00F5D4] hover:underline uppercase font-bold"
                                >
                                  Go To {item.category} Section &gt;
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* FEEDBACK & CUSTOM SECURE MESSAGE TRANS-LOG PANEL */}
      <section className="bg-charcoal-black/70 w-full border border-slate-gray/30 p-8 rounded-2xl relative overflow-hidden">
        
        <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#00F5D4] bg-charcoal-black/80 rounded-bl border-l border-b border-white/5 font-black uppercase tracking-wider">
          SECURE_PORT: FAQ_TRANSMITTER_LOG
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center space-x-2 text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded text-xs font-mono uppercase">
              <BadgeInfo className="h-4.5 w-4.5 text-brand-orange" />
              <span>Query Dispatch Log</span>
            </div>
            
            <h3 className="text-2xl font-serif font-black text-white uppercase">Didn't find your answer?</h3>
            <p className="text-gray-400 font-sans text-xs sm:text-sm">
              Our automated server routes your question directly to on-site coordinators in Pune. Leave your metrics and we'll reply to your account email address within 90 mins.
            </p>
          </div>

          <div className="md:col-span-7 bg-[#151717] p-6 rounded-2xl border border-white/5">
            {feedbackSuccess ? (
              <div className="p-6 text-center space-y-4 border border-[#00F5D4]/40 rounded-xl bg-charcoal-black/50">
                <CheckCircle2 className="h-10 w-10 text-[#00F5D4] mx-auto animate-bounce" />
                <div>
                  <h4 className="text-md font-serif font-black text-white uppercase">Inquiry Telemetry Logged</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
                    Your question packet has been securely logged on our server. One of our elite instructors will review your training parameters.
                  </p>
                </div>
                <div className="font-mono text-[10px] text-[#00F5D4] bg-charcoal-black/90 p-2.5 rounded border border-white/5">
                  RESOLVED_ID: QA-TRANS-{Math.floor(20000 + Math.random() * 79999)}-OK
                </div>
                <button
                  onClick={() => {
                    setFeedbackSuccess(false);
                    setVisitorName('');
                    setVisitorEmail('');
                    setFaqFeedback('');
                  }}
                  className="text-xs text-brand-primary uppercase font-mono hover:text-white"
                >
                  &lt; DISPATCH ANOTHER LINE
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 font-mono text-xs text-gray-400">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-black">Your Name</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-charcoal-black rounded-xl border border-slate-gray/30 p-2.5 text-white focus:border-[#00F5D4] outline-none"
                      placeholder="e.g. Shriniwar"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-500 uppercase font-black">Your Email</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-charcoal-black rounded-xl border border-slate-gray/30 p-2.5 text-white focus:border-[#00F5D4] outline-none"
                      placeholder="e.g. support@cultfit.com"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-500 uppercase font-black">State Your Custom Question</label>
                  <textarea
                    required
                    rows={2}
                    className="w-full bg-charcoal-black rounded-xl border border-slate-gray/30 p-2.5 text-white focus:border-[#00F5D4] outline-none font-sans"
                    placeholder="Describe your inquiry..."
                    value={faqFeedback}
                    onChange={(e) => setFaqFeedback(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs uppercase font-bold text-charcoal-black bg-[#00F5D4] hover:opacity-95 rounded-xl flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <Send className="h-3.5 w-3.5" />
                  Transmit Question Packet
                </button>
              </form>
            )}
          </div>

        </div>

      </section>

    </div>
  );
};
