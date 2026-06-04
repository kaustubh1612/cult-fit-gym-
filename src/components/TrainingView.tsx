/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Dumbbell, Flame, Users, Activity, Heart, Sparkles, 
  ChevronRight, BrainCircuit, ShieldAlert, BadgeInfo,
  CheckCircle2, Clock, Trophy, CalendarCheck, UserCheck, QrCode, Award
} from 'lucide-react';
import { DEF_PROGRAMS } from '../data';
import { Program } from '../types';

export const TrainingView: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<string>('strength');

  // ForgeAI Adaptive Intelligence Calculator States
  const [exercise, setExercise] = useState<'squat' | 'bench' | 'deadlift'>('squat');
  const [baselineLoad, setBaselineLoad] = useState<number>(100); // weight in kg
  const [maxReps, setMaxReps] = useState<number>(5); // reps completed at that load

  // Cult Live Classes scheduling states
  const [classFilter, setClassFilter] = useState<string>('all');
  const [bookedClass, setBookedClass] = useState<{
    className: string;
    instructor: string;
    time: string;
    bookingId: string;
    qrRef: string;
  } | null>(null);

  // Daily FIT-O-METER Leaderboard states
  const [workoutDuration, setWorkoutDuration] = useState<number>(45);
  const [intensity, setIntensity] = useState<number>(15); // multiplier
  const [workoutType, setWorkoutType] = useState<string>('HRX Strength & Conditioning');
  const [userScore, setUserScore] = useState<number | null>(null);
  const [joinedLeaderboard, setJoinedLeaderboard] = useState<boolean>(false);

  // Estimate One Rep Max (1RM) using Epley Formula
  // 1RM = w * (1 + r/30)
  const calculateOneRepMax = () => {
    const oneRepMax = Math.round(baselineLoad * (1 + maxReps / 30));
    const rawHypv = Math.round(oneRepMax * 0.75); // Hypertrophy weight index (75%)
    const rawPowv = Math.round(oneRepMax * 0.85); // Power weight index (85%)
    const rawWarm1 = Math.round(oneRepMax * 0.40); // Warmup #1 (40%)
    const rawWarm2 = Math.round(oneRepMax * 0.60); // Warmup #2 (60%)

    return { oneRepMax, rawHypv, rawPowv, rawWarm1, rawWarm2 };
  };

  const { oneRepMax, rawHypv, rawPowv, rawWarm1, rawWarm2 } = calculateOneRepMax();

  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'dumbbell': return <Dumbbell className="h-5 w-5" />;
      case 'flame': return <Flame className="h-5 w-5" />;
      case 'users': return <Users className="h-5 w-5" />;
      case 'activity': return <Activity className="h-5 w-5" />;
      case 'heart': return <Heart className="h-5 w-5" />;
      default: return <Dumbbell className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Title Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-mono rgb-glow px-3 py-1 bg-brand-orange/10 rounded-full text-brand-primary uppercase tracking-widest leading-none block w-fit mx-auto">
          CALIBRATED INTENSITY PROTOCOLS
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-black text-white uppercase tracking-tight">
          Adaptive Core <span className="text-brand-orange">Programs</span>
        </h1>
        <p className="text-gray-400 font-sans text-xs sm:text-sm">
          Select our core athletic disciplines built for continuous overloading. Track your progression and leverage ForgeAI™ calculations to execute your targeted cycles.
        </p>
      </div>

      {/* Main Grid: Left column lists details, Right column shows detailed view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Program Tabs */}
        <div className="lg:col-span-5 space-y-3 font-mono">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest pl-2 mb-2">// DIRECT ACCESS PROTOCOLS</p>
          
          {DEF_PROGRAMS.map((prog) => {
            const isSelected = selectedProgram === prog.id;
            return (
              <button
                key={prog.id}
                onClick={() => setSelectedProgram(prog.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-brand-orange bg-brand-orange/10 shadow-lg text-white'
                    : 'border-slate-gray/30 bg-surface-dim/60 hover:bg-surface-dim/90 text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2 rounded ${isSelected ? 'bg-brand-orange text-charcoal-black' : 'bg-charcoal-black text-gray-500'}`}>
                    {getProgramIcon(prog.iconName)}
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block uppercase leading-none font-sans mb-1">{prog.category}</span>
                    <span className="text-sm font-bold uppercase">{prog.title}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {prog.pill && (
                    <span className="text-[9px] bg-charcoal-black px-2 py-0.5 rounded text-brand-primary border border-slate-gray/30">
                      {prog.pill}
                    </span>
                  )}
                  <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? 'translate-x-1 text-brand-orange' : 'text-gray-600'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Program Details Card */}
        <div className="lg:col-span-7 bg-[#161818] rounded-xl border border-slate-gray/30 p-8 space-y-6">
          {(() => {
            const activeProg = DEF_PROGRAMS.find(p => p.id === selectedProgram) || DEF_PROGRAMS[0];
            return (
              <>
                <div className="flex items-center justify-between font-mono">
                  <span className="px-3 py-1 bg-charcoal-black rounded text-[10px] text-brand-orange tracking-widest uppercase border border-slate-gray/20">
                    {activeProg.category}
                  </span>
                  <span className="text-[10px] text-gray-500">SYSTEM: ACTIVE_CALIBRATION</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-serif font-black text-white uppercase tracking-wide">
                    {activeProg.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm font-sans leading-relaxed">
                    {activeProg.description}
                  </p>
                </div>

                {/* Simulated Program Specific Equipment & Timing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-mono text-xs">
                  <div className="p-4 bg-charcoal-black rounded border border-slate-gray/20">
                    <span className="text-[9px] text-gray-500 block mb-1">RECOMMENDED INTERVALS</span>
                    <span className="text-white font-bold block uppercase">
                      {activeProg.id === 'strength' && '3-5 Mins Rest between sets'}
                      {activeProg.id === 'metcon' && '30s Work / 15s Recovery'}
                      {activeProg.id === 'pt' && '60 Min Personalized Blocks'}
                      {activeProg.id === 'functional' && '45 Sec High Kinetic Circuits'}
                      {activeProg.id === 'yoga' && 'Standard Neural Reset'}
                    </span>
                  </div>

                  <div className="p-4 bg-charcoal-black rounded border border-slate-gray/20">
                    <span className="text-[9px] text-gray-500 block mb-1">EQUIPMENT ALLOCATION</span>
                    <span className="text-white font-bold block uppercase text-brand-primary">
                      {activeProg.id === 'strength' && 'Eleiko Platforms & Rogue Racks'}
                      {activeProg.id === 'metcon' && 'Concept2 Rowers, Assault Ergs'}
                      {activeProg.id === 'pt' && 'Bio-telemetry and InBody scan'}
                      {activeProg.id === 'functional' && 'Kettlebells, Sandbags & Turf'}
                      {activeProg.id === 'yoga' && 'High Density Cork Mats & Straps'}
                    </span>
                  </div>
                </div>

                {/* Additional detailed bullet list per program */}
                <div className="space-y-3.5 font-sans pt-4 border-t border-slate-gray/20">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-white">Target Biomechanical Outlines:</h4>
                  <ul className="text-xs text-gray-400 space-y-2 list-none font-mono">
                    {activeProg.id === 'strength' && (
                      <>
                        <li>&gt; Primary focus on compound movements: Squat, Bench, Deadlift, Overhead Press.</li>
                        <li>&gt; Rigorous attention to skeletal alignment, bracing, and pelvic positioning.</li>
                        <li>&gt; High neurological recruiting indices under precise coach supervision.</li>
                      </>
                    )}
                    {activeProg.id === 'metcon' && (
                      <>
                        <li>&gt; Continuous metabolic elevation designed to burn lipids post-workout for up to 36 hours.</li>
                        <li>&gt; Lactate tolerance stimulation using structural cardiovascular equipment.</li>
                        <li>&gt; Heart rate targeting mapped against dynamic real-time telemetry projections.</li>
                      </>
                    )}
                    {activeProg.id === 'pt' && (
                      <>
                        <li>&gt; Customized physical roadmap generated from comprehensive digital muscle scans.</li>
                        <li>&gt; Direct 1-on-1 kinetic manipulation to break performance plateaus safely.</li>
                        <li>&gt; Weekly nutritional macronutrient adjustments via custom personal application chats.</li>
                      </>
                    )}
                    {activeProg.id === 'functional' && (
                      <>
                        <li>&gt; Agility drills on artificial premium turf, rotational power moves, and core stabilization.</li>
                        <li>&gt; Joint durability enhancement protocols targeting shoulders, hips, and ankles.</li>
                        <li>&gt; Integration of kettlebell flow patterns to synchronize neural pathways.</li>
                      </>
                    )}
                    {activeProg.id === 'yoga' && (
                      <>
                        <li>&gt; Deep myofascial release combined with structured diaphragmatic respiratory triggers.</li>
                        <li>&gt; Acceleration of cellular metabolic waste clearance through passive vascular dilation.</li>
                        <li>&gt; Vagal nerve stimulation to induce immediate parasympathetic nervous recoverability.</li>
                      </>
                    )}
                  </ul>
                </div>
              </>
            );
          })()}
        </div>

      </div>

      {/* SPECIAL INTERACTIVE PANEL: FORGEAI™ ADAPTIVE INTENSITY MODULE */}
      <section className="p-8 rounded-xl bg-charcoal-black/8 w-full border border-success-teal/30 relative overflow-hidden">
        
        {/* Glow badge styling */}
        <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#00F5D4] bg-charcoal-black/90 rounded-bl border-l border-b border-success-teal/20">
          FORGEAI™ TELEMETRY ENGINE V2
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left panel: Info & controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[#00F5D4] px-2.5 py-1 rounded bg-[#00F5D4]/10 text-xs font-mono uppercase tracking-wider">
                <BrainCircuit className="h-4 w-4" />
                <span>INTELLIGENT LOAD COMPILER</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase">
                ForgeAI™ Velocity & 1RM Calculator
              </h3>
              <p className="text-gray-400 font-sans text-xs sm:text-sm">
                Enter your current lifelines (current baseline load and absolute reps) below. The ForgeAI™ compiler will instantly output warm-up protocols and hypertrophy percentages.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="p-5 rounded-lg bg-surface-dim border border-slate-gray/30 space-y-4 font-mono text-xs">
              
              <div className="space-y-1.5">
                <span className="text-gray-400 uppercase">1. CHOOSE BARBELL LIFT:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['squat', 'bench', 'deadlift'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setExercise(l);
                        if (l === 'squat') { setBaselineLoad(100); setMaxReps(5); }
                        else if (l === 'bench') { setBaselineLoad(80); setMaxReps(5); }
                        else if (l === 'deadlift') { setBaselineLoad(120); setMaxReps(4); }
                      }}
                      className={`py-2 text-center text-xs rounded uppercase font-bold transition-all ${
                        exercise === l
                          ? 'bg-[#00F5D4] text-charcoal-black'
                          : 'bg-charcoal-black text-gray-500 border border-slate-gray/20'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for lifted load */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">2. LOAD RECORDED:</span>
                  <span className="text-white font-bold">{baselineLoad} KG</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="2.5"
                  value={baselineLoad}
                  onChange={(e) => setBaselineLoad(Number(e.target.value))}
                  className="w-full h-1.5 bg-charcoal-black rounded-lg appearance-none cursor-pointer accent-[#00F5D4]"
                />
                <div className="flex justify-between text-[9px] text-gray-600">
                  <span>20 KG</span>
                  <span>100 KG</span>
                  <span>200 KG</span>
                  <span>300 KG</span>
                </div>
              </div>

              {/* Slider for Repetitions */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">3. ABSOLUTE REPETITIONS:</span>
                  <span className="text-white font-bold">{maxReps} REPS</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={maxReps}
                  onChange={(e) => setMaxReps(Number(e.target.value))}
                  className="w-full h-1.5 bg-charcoal-black rounded-lg appearance-none cursor-pointer accent-[#00F5D4]"
                />
                <div className="flex justify-between text-[9px] text-gray-600">
                  <span>1 Rep (Absolute Max)</span>
                  <span>6 Reps (Power Range)</span>
                  <span>12 Reps (Endurance)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right panel: Live Generated Target Projections */}
          <div className="lg:col-span-6 bg-charcoal-black p-6 rounded-lg border-2 border-[#00F5D4]/40 font-mono space-y-4">
            <div className="flex items-center space-x-2 text-[#00F5D4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-ping" />
              <span className="text-[10px] tracking-widest uppercase">Live Biomechanical Projections</span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 uppercase block">COMPUTED 1-REP MAX (1RM)</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-black text-white">{oneRepMax}</span>
                <span className="text-sm font-semibold text-[#00F5D4]">KG</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-normal font-sans">
                This indicates the estimated absolute limit your musculature can recruit for 1 repetition on the <span className="text-brand-orange uppercase font-mono">{exercise}</span> platform.
              </p>
            </div>

            {/* Hypertrophy and Warm-ups lists */}
            <div className="space-y-2.5 text-xs pt-4 border-t border-slate-gray/30">
              
              <div className="flex justify-between items-center bg-surface-dim/70 p-2 rounded">
                <span className="text-gray-400">WARM-UP INFLECTION #1 (40%):</span>
                <span className="text-white font-bold">{rawWarm1} KG &bull; 8 Reps</span>
              </div>

              <div className="flex justify-between items-center bg-surface-dim/70 p-2 rounded">
                <span className="text-gray-400">WARM-UP INFLECTION #2 (60%):</span>
                <span className="text-white font-bold">{rawWarm2} KG &bull; 5 Reps</span>
              </div>

              <div className="flex justify-between items-center bg-[#172522] p-2 rounded border border-success-teal/20">
                <span className="text-[#00F5D4]">HYPERTROPHY THRESHOLD (75%):</span>
                <span className="text-white font-bold">{rawHypv} KG &bull; 8-10 Reps</span>
              </div>

              <div className="flex justify-between items-center bg-[#241712] p-2 rounded border border-brand-orange/20">
                <span className="text-brand-primary">ABSOLUTE POWER TARGET (85%):</span>
                <span className="text-white font-bold">{rawPowv} KG &bull; 3-5 Reps</span>
              </div>

            </div>

            <div className="pt-2 flex items-start space-x-2 text-[10px] text-gray-500 font-sans leading-relaxed">
              <BadgeInfo className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
              <span>
                Calculations assume standard bar dynamics (20 kg barbell weight). Keep safety spotter arms locked in place if attempting absolute strength thresholds.
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* NEW INTERACTIVE FEATURE: CULT LIVE CLASSES SCHEDULER */}
      <section className="space-y-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono rgb-glow px-3 py-1 bg-brand-orange/10 rounded-full text-brand-primary uppercase tracking-widest leading-none block w-fit mx-auto">
            LIVE ATHLETIC SCHEDULING UNIT
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white uppercase tracking-tight">
            Cult Group <span className="text-brand-orange">Workouts Hub</span>
          </h2>
          <p className="text-gray-400 font-sans text-xs sm:text-sm">
            Cult's signature trainer-led programs. Find a high-intensity group slot below & simulate booking your access grid credentials instantly.
          </p>
        </div>

        {/* Classes grid and Booking simulation details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Class Booking Panel / Left Side */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Class Category Filter Button row */}
            <div className="flex flex-wrap gap-2 pb-2 font-mono text-[10px]">
              {(['all', 'Strength', 'Cardio', 'Mind'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setClassFilter(filter)}
                  className={`px-3 py-1.5 rounded uppercase font-bold transition-all border ${
                    classFilter === filter
                      ? 'bg-brand-orange text-charcoal-black border-brand-orange'
                      : 'bg-[#181a1a] text-gray-400 border-slate-gray/30 hover:text-white'
                  }`}
                >
                  {filter === 'all' ? 'All Classes' : filter}
                </button>
              ))}
            </div>

            {/* List of athletic group fitness slots */}
            <div className="space-y-4">
              {[
                { id: 'c1', name: 'HRX Strength & Conditioning', category: 'Strength', coach: 'Coach Vikram Dev', duration: '50 Mins', difficulty: 'Intense', capacity: 15, booked: 12, times: ['07:00 AM', '06:15 PM'] },
                { id: 'c2', name: 'Dance Fitness Express', category: 'Cardio', coach: 'Riya Sharma', duration: '45 Mins', difficulty: 'Moderate', capacity: 25, booked: 21, times: ['08:00 AM', '07:30 PM'] },
                { id: 'c3', name: 'Boxing Knockout 101', category: 'Cardio', coach: 'Coach Maya Sen', duration: '50 Mins', difficulty: 'Intense', capacity: 12, booked: 9, times: ['06:00 AM', '08:15 PM'] },
                { id: 'c4', name: 'Restorative Power Vinyasa', category: 'Mind', coach: 'Anjali Deshmukh', duration: '60 Mins', difficulty: 'Light', capacity: 18, booked: 16, times: ['09:15 AM', '05:30 PM'] },
                { id: 'c5', name: 'Heavy Kettlebell Flow', category: 'Strength', coach: 'Coach Vikram Dev', duration: '45 Mins', difficulty: 'Extreme', capacity: 10, booked: 8, times: ['07:45 AM', '06:45 PM'] }
              ]
                .filter(c => classFilter === 'all' || c.category === classFilter)
                .map((classItem) => {
                  return (
                    <div 
                      key={classItem.id}
                      className="p-5 rounded-lg bg-surface-dim/80 border border-slate-gray/30 hover:border-slate-gray/50 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-surface-dim"
                    >
                      {/* Left: Class Specs */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 font-mono">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase text-charcoal-black bg-brand-primary`}>
                            {classItem.category}
                          </span>
                          <span className="text-[10px] text-gray-500">{classItem.duration} &bull; {classItem.difficulty}</span>
                        </div>
                        <h4 className="text-base font-serif font-black text-white uppercase">{classItem.name}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <UserCheck className="h-3.5 w-3.5 text-brand-orange" />
                          <span className="font-mono text-[11px]">Led by <strong className="text-gray-200">{classItem.coach}</strong></span>
                        </div>

                        {/* Capacity meter bar */}
                        <div className="w-56 space-y-1 pt-1">
                          <div className="flex justify-between text-[10px] font-mono text-gray-500">
                            <span>GRID OCCUPANCY:</span>
                            <span className="text-white font-bold">{classItem.booked} / {classItem.capacity} SPOTS</span>
                          </div>
                          <div className="h-1 bg-charcoal-black rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-brand-orange rounded-full" 
                              style={{ width: `${(classItem.booked / classItem.capacity) * 100}%` }}
                            />
                          </div>
                        </div>

                      </div>

                      {/* Right: Slots Booking */}
                      <div className="space-y-2 w-full sm:w-auto">
                        <span className="text-[10px] font-mono text-gray-500 block uppercase">CHOSE SLOT TO BOOK:</span>
                        <div className="flex gap-2">
                          {classItem.times.map((timeSlot) => (
                            <button
                              key={timeSlot}
                              onClick={() => {
                                const randomHex = Math.floor(100000 + Math.random() * 900000).toString();
                                setBookedClass({
                                  className: classItem.name,
                                  instructor: classItem.coach,
                                  time: timeSlot,
                                  bookingId: `CULT-KHARADI-${randomHex}`,
                                  qrRef: `GRID-SCAN-${Math.random().toString(36).substring(3, 7).toUpperCase()}`
                                });
                              }}
                              className="px-3 py-2 bg-charcoal-black text-white hover:text-charcoal-black hover:bg-[#00F5D4] font-mono text-[10px] font-bold rounded uppercase border border-slate-gray/30 transition-all flex items-center gap-1"
                            >
                              <Clock className="w-3 h-3" />
                              {timeSlot}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  );
                })}
            </div>
          </div>

          {/* Right Side: Visual Live QR Group Booking Ticket Output */}
          <div className="lg:col-span-4" id="class-pass-display">
            <div className="p-6 rounded-lg bg-[#181a1a] border border-brand-orange/40 space-y-5">
              <span className="text-[10px] font-mono text-brand-orange block uppercase tracking-wider">// REAL-TIME SIMULATED TICKET</span>
              <h4 className="text-sm font-serif font-black text-white uppercase leading-none">Class Pass Terminal</h4>

              {bookedClass ? (
                /* Simulated checkin pass */
                <div className="p-5 rounded-md bg-charcoal-black border-2 border-brand-primary text-center relative overflow-hidden space-y-4">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary animate-pulse"></div>
                  
                  <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">
                    <span>CULT FIT KHARADI</span>
                    <span className="text-success-teal font-black uppercase">ACTIVE_PASS</span>
                  </div>

                  {/* QR Core simulation icon */}
                  <div className="p-3 bg-white text-black rounded w-28 h-28 mx-auto flex items-center justify-center">
                    <QrCode className="h-24 w-24 animate-pulse text-charcoal-black" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">GROUP WORKOUT SESSION:</span>
                    <h5 className="text-xs font-serif font-black text-white uppercase">{bookedClass.className}</h5>
                    <p className="text-[10px] text-gray-400 font-sans">Led by {bookedClass.instructor}</p>
                  </div>

                  <div className="p-3 bg-surface-dim rounded border border-slate-gray/20 text-left font-mono text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-mono">TIMING:</span>
                      <span className="text-white font-bold">{bookedClass.time} TODAY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-mono">BOOKING ID:</span>
                      <span className="text-brand-primary font-bold">{bookedClass.bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-mono">GRID KEY:</span>
                      <span className="text-success-teal font-bold">{bookedClass.qrRef}</span>
                    </div>
                  </div>

                  <p className="text-[8px] text-gray-600 font-mono leading-normal">
                    Please execute entry scanner verification at City Vista campus gates 10 minutes prior to session lift-off.
                  </p>

                  <button
                    onClick={() => setBookedClass(null)}
                    className="w-full text-center py-1.5 text-[9px] text-brand-orange uppercase font-bold hover:text-white font-mono mt-2"
                  >
                    &lt; PURGE ACTIVE TOKEN
                  </button>
                </div>
              ) : (
                /* Idle ticket screen placeholder */
                <div className="py-12 px-4 rounded-md bg-charcoal-black/65 border border-dashed border-slate-gray/35 text-center space-y-3 font-sans text-xs text-gray-500">
                  <CalendarCheck className="h-8 w-8 text-gray-600 mx-auto" />
                  <p className="max-w-xs mx-auto text-[11px]">
                    No simulated session spot selected. Select an active hourly training slot on the left to compile live entry QR pass.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* NEW INTERACTIVE FEATURE #2: DAILY CULT FIT-O-METER SCORES & PUNE GRID LEADERBOARD */}
      <section className="p-8 rounded-xl bg-charcoal-black/7 w-full border border-slate-gray/30 relative overflow-hidden">
        
        {/* Terminal label aesthetics */}
        <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-gray-600 bg-charcoal-black/90 rounded-bl border-l border-b border-slate-gray/30 font-bold">
          GRID_METRICS: KHARADI_POINTS_LEDGER
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Points Calculator form / Left side */}
          <div className="lg:col-span-12 lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded text-xs font-mono uppercase">
                <Award className="h-4 w-4 animate-bounce" />
                <span>Cult Fit-O-Meter Point Ledger</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white uppercase">
                Factor Daily Workout Score
              </h3>
              <p className="text-gray-400 font-sans text-xs sm:text-sm">
                Calculate your simulated workout performance points factor dynamically based on effort durations, intensity level, and workout category parameters.
              </p>
            </div>

            {/* Input calculator fields */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const baseFactor = workoutDuration * intensity;
              setUserScore(baseFactor);
              setJoinedLeaderboard(true);
            }} className="p-5 rounded-lg bg-surface-dim border border-slate-gray/35 space-y-4 font-mono text-xs text-gray-400">
              
              <div className="space-y-1">
                <label className="uppercase text-gray-500 text-[10px]">Session Active Duration (Mins):</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="5"
                    value={workoutDuration}
                    onChange={(e) => setWorkoutDuration(Number(e.target.value))}
                    className="w-full h-1 bg-charcoal-black rounded cursor-pointer accent-brand-orange"
                  />
                  <span className="text-white font-bold shrink-0 w-12 text-right">{workoutDuration} MINS</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase text-gray-500 text-[10px]">Active Intensity Level Index:</label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full bg-charcoal-black rounded border border-slate-gray/30 p-2 text-white outline-none focus:border-brand-orange"
                >
                  <option value={10}>Standard Effort (10x Multiplier)</option>
                  <option value={15}>Intensive Burn Rate (15x Multiplier)</option>
                  <option value={20}>Extreme Biomechanical Overload (20x Multiplier)</option>
                  <option value={25}>Absolute Failure Threshold (25x Multiplier)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="uppercase text-gray-500 text-[10px]">Performed Discipline Category:</label>
                <input
                  type="text"
                  placeholder="e.g. HRX Burn, Deadlift Heavy, Snatch, Yoga Flow"
                  value={workoutType}
                  onChange={(e) => setWorkoutType(e.target.value)}
                  className="w-full bg-charcoal-black rounded border border-slate-gray/30 p-2 text-white outline-none focus:border-brand-orange"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-orange hover:bg-brand-orange/90 text-charcoal-black text-xs font-serif font-black uppercase tracking-wider rounded transition-all mt-4"
              >
                Log Performance To Kharadi Scoreboard
              </button>
            </form>
          </div>

          {/* Leaderboard display / Right side */}
          <div className="lg:col-span-7 bg-charcoal-black p-6 rounded-lg border border-slate-gray/35 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-gray/25">
                <div className="flex items-center space-x-2 text-brand-primary">
                  <Trophy className="h-4 w-4" />
                  <span className="font-mono text-xs uppercase tracking-wider font-extrabold">Kharadi Campus Member Leaderboards</span>
                </div>
                <span className="font-mono text-[9px] text-[#00F5D4] bg-charcoal-black px-2 py-0.5 rounded border border-slate-gray/20 font-black">
                  LIVE CORRELATION GRID
                </span>
              </div>
              <p className="text-gray-500 font-sans text-xs">
                See where you stack up against the premier athletic practitioners in Pune. Daily logs reset at 12:00 midnight IST.
              </p>
            </div>

            {/* Member Leaderboard spreadsheet table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-gray/25 text-gray-500 text-[9px] uppercase">
                    <th className="py-2.5">RANK</th>
                    <th className="py-2.5">ATHLETE</th>
                    <th className="py-2.5">DISCIPLINE</th>
                    <th className="py-2.5 text-right">FIT SCORE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-gray/10">
                  {(() => {
                    const initialLeaderboard = [
                      { name: 'Coach Vikram Dev', score: 1240, badge: 'Master Coach', avatarColor: 'bg-brand-orange text-charcoal-black', activeItem: 'Heavy Overload' },
                      { name: 'Coach Maya Sen', score: 1100, badge: 'Elite Catalyst', avatarColor: 'bg-[#00F5D4] text-charcoal-black', activeItem: 'USAW Olympic lift' },
                      { name: 'Amit Kelkar', score: 900, badge: 'Steel Veteran', avatarColor: 'bg-slate-700 text-white', activeItem: 'HRX Cardio Pack' },
                      { name: 'Priya Sharma', score: 680, badge: 'Strength Chaser', avatarColor: 'bg-slate-700 text-white', activeItem: 'Heavy Squats' },
                      { name: 'Rohan Malhotra', score: 550, badge: 'Recovery Lead', avatarColor: 'bg-slate-700 text-white', activeItem: 'Recovery Yoga' }
                    ];

                    const sortedList = [...initialLeaderboard];
                    if (userScore !== null) {
                      sortedList.push({
                        name: 'You (Profile Athlete)',
                        score: userScore,
                        badge: userScore >= 1200 ? 'Cult Paragon' : userScore >= 800 ? 'Elite Veteran' : userScore >= 400 ? 'Active Overloader' : 'Steel Rookie',
                        avatarColor: 'bg-brand-primary text-charcoal-black font-extrabold border-2 border-brand-primary animate-pulse',
                        activeItem: workoutType
                      });
                    }
                    sortedList.sort((a, b) => b.score - a.score);

                    return sortedList.map((competitor, idx) => {
                      const isUser = competitor.name.includes('You');
                      return (
                        <tr 
                          key={idx}
                          className={` transition-colors ${isUser ? 'bg-brand-orange/10 font-bold' : 'hover:bg-surface-dim/30'}`}
                        >
                          <td className="py-3">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                              idx === 0 
                                ? 'bg-brand-orange text-charcoal-black' 
                                : idx === 1 
                                  ? 'bg-[#00F5D4] text-charcoal-black' 
                                  : 'bg-charcoal-black text-gray-400 border border-slate-gray/30'
                            }`}>
                              {idx + 1}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] uppercase font-bold shrink-0 ${competitor.avatarColor}`}>
                                {competitor.name.charAt(isUser ? 0 : competitor.name.lastIndexOf(' ') + 1)}
                              </span>
                              <div>
                                <span className={isUser ? 'text-brand-primary' : 'text-white'}>{competitor.name}</span>
                                <span className="text-[8px] text-gray-500 block uppercase font-bold leading-none mt-0.5">{competitor.badge}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-gray-400 capitalize">
                            {competitor.activeItem}
                          </td>
                          <td className="py-3 text-right">
                            <span className={`font-black ${isUser ? 'text-brand-primary text-sm' : 'text-white'}`}>
                              {competitor.score.toLocaleString()}
                            </span>
                            <span className="text-[9px] text-gray-500 ml-1 block font-normal leading-none mt-0.5">PTS</span>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>

            {/* Scoreboard warning tips */}
            <div className="pt-4 border-t border-slate-gray/25 flex items-start space-x-2 text-[10px] text-gray-500 font-sans mt-4">
              <BadgeInfo className="h-4 w-4 text-brand-orange shrink-0" />
              <span>
                Scores logged here are fully simulated and kept transparently in temporary active layout variables for community dashboard evaluation.
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
