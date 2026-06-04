/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Award, Shield, Calendar, Clock, Sparkles, CheckCircle2, User, 
  ChevronRight, BadgeInfo, PhoneCall, CheckSquare 
} from 'lucide-react';
import { HEAD_COACHES } from '../data';
import { Coach } from '../types';

export const CoachingView: React.FC = () => {
  const [selectedCoachId, setSelectedCoachId] = useState<string>(HEAD_COACHES[0].id);
  const [bookingDate, setBookingDate] = useState<string>('2026-06-04');
  const [bookingTime, setBookingTime] = useState<string>('11:00 AM');
  const [athleteName, setAthleteName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [bookingResponse, setBookingResponse] = useState<{
    success: boolean;
    ticketCode?: string;
    coachName?: string;
    date?: string;
    time?: string;
  } | null>(null);

  // Simulated timeslots available
  const timeslots = ['08:00 AM', '11:00 AM', '03:00 PM', '06:00 PM', '08:00 PM'];

  // Tomorrow & subsequent days
  const sessionDays = [
    { value: '2026-06-04', label: 'Thu, Jun 4' },
    { value: '2026-06-05', label: 'Fri, Jun 5' },
    { value: '2026-06-06', label: 'Sat, Jun 6' },
    { value: '2026-06-07', label: 'Sun, Jun 7' },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteName.trim() || !phone.trim()) {
      alert('Please provide your name and phone number to calibrate staff reservations.');
      return;
    }

    const matchedCoach = HEAD_COACHES.find(c => c.id === selectedCoachId);
    
    // Generate a unique tactical hex code for ticket verification
    const hex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    const verificationCode = `CULT-COACH-${hex}`;

    setBookingResponse({
      success: true,
      ticketCode: verificationCode,
      coachName: matchedCoach?.name || 'Lead Trainer',
      date: bookingDate,
      time: bookingTime
    });
  };

  const selectedCoach = HEAD_COACHES.find(c => c.id === selectedCoachId) || HEAD_COACHES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Overview Head */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono rgb-glow px-3 py-1 bg-brand-orange/10 rounded-full text-brand-primary uppercase tracking-widest leading-none block w-fit mx-auto">
          PERFORMANCE ADVISORS BOARD
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-black text-white uppercase tracking-tight">
          Engineered Excellence. <span className="text-brand-orange text-serif">Guided by Masters.</span>
        </h1>
        <p className="text-gray-400 font-sans text-xs sm:text-sm">
          Our specialists hold elite certifications (CSCS, USAW, Sports Science Masters) to ensure that every lift, overload cycle, and active contrast suite run is backed by robust clinical biomechanics. No guessing. Just raw science.
        </p>
      </div>

      {/* Roster Showcase */}
      <section className="space-y-8">
        <div className="flex items-center space-x-2 text-brand-primary font-mono text-xs uppercase pl-2">
          <span>// CURRENT EXECUTIVE STAFF LIST</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {HEAD_COACHES.map((coach) => (
            <div 
              key={coach.id}
              className={`rounded-lg overflow-hidden border transition-all flex flex-col justify-between ${
                selectedCoachId === coach.id 
                  ? 'border-brand-orange bg-surface-dim/95 shadow-orange-950/20 shadow-2xl' 
                  : 'border-slate-gray/30 bg-surface-dim/50'
              }`}
            >
              {/* Coach Banner Photo / Placeholder info */}
              <div className="relative h-64 bg-charcoal-black overflow-hidden">
                <img 
                  src={coach.imageUrl} 
                  alt={coach.name}
                  onError={(e) => {
                    // Fallback fallback if hotlinks encounter caching blocks
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600';
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-85 group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black via-transparent to-transparent"></div>
                
                {/* Experience counter overlay */}
                <div className="absolute top-4 right-4 bg-charcoal-black/80 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono border border-slate-gray/30 text-white">
                  {coach.experienceYears} YRS EXP
                </div>

                {/* Available Today Badge */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 bg-charcoal-black/85 backdrop-blur px-2.5 py-1 rounded text-[9px] font-mono border border-slate-gray/20">
                  <span className={`w-1.5 h-1.5 rounded-full ${coach.isAvailableToday ? 'bg-success-teal' : 'bg-red-500'}`}></span>
                  <span className={coach.isAvailableToday ? 'text-success-teal' : 'text-gray-500'}>
                    {coach.isAvailableToday ? 'ROSTER ACTIVE TODAY' : 'OFF DESK'}
                  </span>
                </div>
              </div>

              {/* Coach Info Content */}
              <div className="p-6 space-y-4 flex-1">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-brand-primary block uppercase tracking-widest">{coach.role}</span>
                  <h3 className="text-xl font-serif font-black text-white uppercase">{coach.name}</h3>
                </div>

                <p className="text-gray-400 text-xs sm:text-[13px] font-sans leading-relaxed">
                  {coach.bio}
                </p>

                {/* Specialty Pill */}
                <div className="pt-2 font-mono text-xs">
                  <span className="text-gray-500 block uppercase text-[9px] tracking-wider mb-1">PRO FOCUS:</span>
                  <span className="text-white bg-charcoal-black px-3 py-1 rounded border border-slate-gray/20 font-bold">
                    {coach.specialty}
                  </span>
                </div>

                {/* Certifications Checklist */}
                <div className="mt-4 pt-4 border-t border-slate-gray/20 space-y-2">
                  <span className="text-[9px] text-gray-500 font-mono tracking-wider block uppercase">BOARD CREDENTIALS:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {coach.certifications.map((cert) => (
                      <span key={cert} className="px-2 py-0.5 text-[9px] bg-brand-orange/10 font-bold border border-brand-orange/20 rounded text-brand-primary font-mono uppercase">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selection Controller */}
              <div className="p-4 bg-charcoal-black/40 border-t border-slate-gray/20">
                <button
                  onClick={() => setSelectedCoachId(coach.id)}
                  className={`w-full py-2.5 rounded text-xs font-mono uppercase tracking-widest transition-all ${
                    selectedCoachId === coach.id
                      ? 'bg-brand-orange text-charcoal-black font-extrabold'
                      : 'bg-white/5 text-gray-400 hover:bg-white/15'
                  }`}
                >
                  {selectedCoachId === coach.id ? 'SELECTED TO SCHEDULE' : 'SELECT COACH'}
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Booking Form Interface */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="calibrator-booking-section">
        
        {/* Reservation details (Left side) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#00F5D4] uppercase block tracking-wider">// CALIBRATOR RESERVATIONS</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase leading-none">Schedule Evaluation</h3>
            <p className="text-gray-400 text-xs sm:text-sm font-sans leading-normal">
              Book a personalized 30-minute biomechanics and movement diagnostics setup with your chosen specialist below. Your assessment is free with high-tier memberships.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-surface-dim/80 border border-slate-gray/30 space-y-4 text-xs font-mono">
            <h4 className="text-white text-xs uppercase border-b border-slate-gray/30 pb-2">Diagnostic Protocol:</h4>
            <ul className="space-y-3 font-sans list-none text-gray-400">
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 text-brand-orange shrink-0 mr-2 mt-0.5" />
                <span>Segmental skeletal stability assessment (scapula/hip checks).</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 text-brand-orange shrink-0 mr-2 mt-0.5" />
                <span>Baseline force curve and vector execution tracking.</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 text-brand-orange shrink-0 mr-2 mt-0.5" />
                <span>InBody analysis diagnostic reports printout catalog.</span>
              </li>
            </ul>
            <div className="bg-[#121414] p-3 rounded font-mono text-[10px] text-gray-500 leading-wider border border-dashed border-slate-gray/30">
              * ASSIGNMENT CALIBRATION: The assigned biometric session will be hosted on Floor 3 Diagnostic Suite, City Vista, Kharadi campus.
            </div>
          </div>
        </div>

        {/* Input Booking Fields (Right side) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-lg bg-[#181a1a] border-2 border-slate-gray/40 space-y-6">
            <h4 className="text-xs font-mono text-brand-primary tracking-widest uppercase">
              RESERVATION COMPILER MODULE
            </h4>

            {bookingResponse ? (
              /* Booking verification screen */
              <div className="space-y-6 p-6 bg-charcoal-black rounded-lg border border-success-teal/40 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 font-mono text-[8px] bg-success-teal text-charcoal-black uppercase font-bold px-2 rounded-bl">
                  APPROVED
                </div>
                
                <CheckCircle2 className="h-12 w-12 text-success-teal mx-auto animate-pulse" />
                
                <div className="space-y-2">
                  <h5 className="text-lg font-serif uppercase tracking-wide text-white">Diagnostics Slot Cleared</h5>
                  <p className="text-gray-400 text-xs font-sans max-w-sm mx-auto">
                    Bring this ticket code on your smartphone. Head directly to Floor 3 Bio-Diagnostic Suite.
                  </p>
                </div>

                <div className="p-4 bg-surface-dim rounded border border-slate-gray/25 text-left font-mono space-y-2 text-xs">
                  <p><span className="text-gray-500">ASSIGNED COACH:</span> <span className="text-white font-bold">{bookingResponse.coachName}</span></p>
                  <p><span className="text-gray-500">DATE:</span> <span className="text-brand-primary">{bookingResponse.date}</span></p>
                  <p><span className="text-gray-500">TIME INTERVAL:</span> <span className="text-brand-primary">{bookingResponse.time}</span></p>
                  <p className="border-t border-slate-gray/20 pt-2 text-[10px]"><span className="text-gray-500">DIGITAL QR PASS:</span> <span className="text-success-teal font-black">{bookingResponse.ticketCode}</span></p>
                </div>

                <button
                  onClick={() => {
                    setBookingResponse(null);
                    setAthleteName('');
                    setPhone('');
                  }}
                  className="w-full py-2.5 text-xs text-brand-orange uppercase font-sans font-bold hover:text-white transition-all text-center"
                >
                  Book Another Session &gt;
                </button>
              </div>
            ) : (
              /* Fields Form */
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs font-mono text-gray-400">
                
                {/* Active Choice Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-charcoal-black rounded">
                    <span className="text-[9px] text-gray-500 uppercase block">Selected Analyst:</span>
                    <span className="text-white font-bold block truncate">{selectedCoach.name}</span>
                  </div>
                  <div className="p-3 bg-charcoal-black rounded">
                    <span className="text-[9px] text-gray-500 uppercase block">Diagnostics Suite:</span>
                    <span className="text-brand-primary font-bold block truncate">Floor 3 Bio-Lab</span>
                  </div>
                </div>

                {/* Date Select */}
                <div className="space-y-1.5">
                  <label className="text-gray-400 uppercase">CHOOSE SESSION TIMELINE:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {sessionDays.map((d) => (
                      <button
                        type="button"
                        key={d.value}
                        onClick={() => setBookingDate(d.value)}
                        className={`py-2 text-[11px] rounded font-bold transition-all ${
                          bookingDate === d.value
                            ? 'bg-brand-primary text-charcoal-black'
                            : 'bg-charcoal-black text-gray-500 hover:text-white border border-slate-gray/20'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time select */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-gray-400 uppercase">CHOOSE CLOCK INTERVAL:</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeslots.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setBookingTime(t)}
                        className={`py-2 text-[11px] rounded font-bold transition-all ${
                          bookingTime === t
                            ? 'bg-brand-orange text-charcoal-black'
                            : 'bg-charcoal-black text-gray-500 hover:text-white border border-slate-gray/20'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text entries */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label htmlFor="athlete-name-input" className="uppercase text-gray-500 text-[10px]">Your Name:</label>
                    <input
                      id="athlete-name-input"
                      type="text"
                      placeholder="e.g. Shriniwar"
                      value={athleteName}
                      onChange={(e) => setAthleteName(e.target.value)}
                      className="w-full bg-charcoal-black rounded border border-slate-gray/30 p-2.5 text-white focus:border-brand-primary outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="athlete-phone-input" className="uppercase text-gray-500 text-[10px]">WhatsApp / Phone:</label>
                    <input
                      id="athlete-phone-input"
                      type="tel"
                      placeholder="e.g. +91 91152 4xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-charcoal-black rounded border border-slate-gray/30 p-2.5 text-white focus:border-brand-primary outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    id="submit-calendar-booking-btn"
                    type="submit"
                    className="w-full py-4 uppercase text-xs tracking-widest font-bold rounded btn-primary"
                  >
                    Lock Assessing Calibration Pass
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-[10px] text-gray-600 justify-center">
                  <BadgeInfo className="h-4 w-4 text-brand-orange" />
                  <span>No automated charges or fees apply. True absolute zero cost simulation.</span>
                </div>

              </form>
            )}
          </div>
        </div>

      </section>

    </div>
  );
};
