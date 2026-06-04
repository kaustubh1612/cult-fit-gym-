/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Waves, Thermometer, Flame, Zap, ShieldCheck, 
  Timer, Activity, HelpCircle, Snowflake 
} from 'lucide-react';
import { RECOVERY_ZONES } from '../data';

export const RecoveryView: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('cryo');

  // Interactive temperature custom controller states
  const [cryoTemp, setCryoTemp] = useState<number>(-110); // in °C (-140 to -100)
  const [saunaTemp, setSaunaTemp] = useState<number>(85); // in °C (60 to 100)
  const [plungeTemp, setPlungeTemp] = useState<number>(4); // in °C (1 to 10)

  const activeZone = RECOVERY_ZONES.find(z => z.id === selectedZoneId) || RECOVERY_ZONES[0];

  // Calculate simulated real-time response variables based on input temps
  const getBiometricsForOutput = () => {
    if (selectedZoneId === 'cryo') {
      const vasoconstrictionIndex = Math.round(90 + (Math.abs(cryoTemp) - 110) * 0.8);
      const standardClearanceTime = (3.5 - (Math.abs(cryoTemp) - 110) * 0.05).toFixed(1);
      const neuralMitigation = cryoTemp < -120 ? 'Intense Shock' : 'Highly Therapeutic';
      return { label1: 'Vasoconstriction Ratio', val1: `${vasoconstrictionIndex}%`, label2: 'Lactic Flush Interval', val2: `${standardClearanceTime} Hours`, label3: 'Peripheral Nerve State', val3: neuralMitigation };
    } else if (selectedZoneId === 'sauna') {
      const poreDilation = Math.round(85 + (saunaTemp - 85) * 0.5);
      const cardiacEfficiency = Math.round(110 + (saunaTemp - 85) * 1.5);
      const perspirationRate = (1.2 + (saunaTemp - 85) * 0.04).toFixed(2);
      return { label1: 'Capillary Flow Dilation', val1: `${poreDilation}%`, label2: 'Heart Pace Indicator', val2: `${cardiacEfficiency} BPM`, label3: 'Perspiration Volume Rate', val3: `${perspirationRate} L/hr` };
    } else {
      // Ice Plunge
      const sympatheticSpike = Math.round(95 - (plungeTemp - 4) * 4);
      const vagalToneDowntime = Math.round(12 - (plungeTemp - 4) * 0.6);
      const coreSafeTimeline = Math.round(5 - (plungeTemp - 4) * 0.3);
      return { label1: 'Sympathetic Shock Rate', val1: `${sympatheticSpike}%`, label2: 'Vagal Regulation Timestamps', val2: `${vagalToneDowntime} Mins`, label3: 'Hypothermic Safe Cap', val3: `${coreSafeTimeline} Mins` };
    }
  };

  const { label1, val1, label2, val2, label3, val3 } = getBiometricsForOutput();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Overview Block */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-mono rgb-glow px-3 py-1 bg-brand-orange/10 rounded-full text-brand-primary uppercase tracking-widest leading-none block w-fit mx-auto">
          AUTONOMIC THERAPY LOUNGE
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-black text-white uppercase tracking-tight">
          Elite Recovery <span className="text-brand-orange">Suites</span>
        </h1>
        <p className="text-gray-400 font-sans text-xs sm:text-sm">
          Optimize your cellular rebuild rates. Experience contrast heat-and-cold physical protocols. Use our digital simulator below to view neurological vasoconstriction levels and heart-rate fluctuations.
        </p>
      </div>

      {/* Grid: Left: static details of the rooms, Right: active thermodynamic dial */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Suites and descriptions */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">// RECOVERY CHAMBERS BLUEPRINTS</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RECOVERY_ZONES.map((zone) => {
              const isSelected = selectedZoneId === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => {
                    // Normalize compression selection to cryo or sauna temper for calculation convenience
                    if (zone.id === 'compression') {
                      setSelectedZoneId('sauna'); 
                    } else {
                      setSelectedZoneId(zone.id);
                    }
                  }}
                  className={`p-6 rounded-lg text-left border transition-all flex flex-col justify-between space-y-4 ${
                    selectedZoneId === zone.id
                      ? 'border-brand-orange bg-brand-orange/10 shadow-lg'
                      : 'border-slate-gray/30 bg-surface-dim/70 hover:bg-surface-dim/95'
                  }`}
                >
                  <div className="space-y-1.5 w-full">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-[10px] text-gray-500 uppercase">ZONE ID: {zone.id.toUpperCase()}</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold ${
                        zone.status === 'Ready' ? 'bg-[#00F5D4]/10 text-success-teal' : 'bg-brand-primary/10 text-brand-primary'
                      }`}>
                        Live Status: {zone.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-black text-white uppercase tracking-wide">
                      {zone.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-sans leading-relaxed">
                      {zone.description}
                    </p>
                  </div>

                  {/* Temp indicators footer */}
                  <div className="border-t border-slate-gray/20 pt-3 flex justify-between items-center text-[10px] font-mono text-gray-500 mt-2">
                    <span>Base Temp: <strong className="text-white">{zone.name === 'Normatec Compression Sleeves' ? 'Room Temp' : zone.temp}</strong></span>
                    <span className="text-brand-orange uppercase tracking-wider font-semibold">&gt; Modulate Therm</span>
                  </div>

                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: THERMODEPENDENT BIOLOGICAL SIMULATOR */}
        <div className="lg:col-span-5">
          <div className="p-8 rounded-xl bg-charcoal-black border-2 border-slate-gray/40 font-mono space-y-6">
            
            <div className="flex items-center space-x-2 text-brand-primary">
              <Thermometer className="h-5 w-5 animate-bounce" />
              <span className="text-xs font-mono uppercase tracking-widest">Thermodynamic Calibrator</span>
            </div>

            <div className="space-y-2 border-b border-slate-gray/25 pb-4">
              <span className="text-xs text-gray-500 uppercase block">Active Chamber Under Calibration:</span>
              <span className="text-xl font-serif font-black text-white uppercase">{activeZone.name}</span>
            </div>

            {/* Slider depends on selection */}
            {selectedZoneId === 'cryo' && (
              <div className="space-y-3 p-4 bg-surface-dim rounded border border-slate-gray/25">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 uppercase">Modulate Nitrogen Temp:</span>
                  <span className="text-red-400 font-extrabold text-sm">{cryoTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="-140"
                  max="-80"
                  step="2"
                  value={cryoTemp}
                  onChange={(e) => setCryoTemp(Number(e.target.value))}
                  className="w-full h-1.5 bg-charcoal-black rounded appearance-none cursor-pointer accent-red-400"
                />
                <div className="flex justify-between text-[9px] text-gray-600">
                  <span>-140°C Extreme</span>
                  <span>-110°C Nominal</span>
                  <span>-80°C Light Recovery</span>
                </div>
              </div>
            )}

            {selectedZoneId === 'sauna' && (
              <div className="space-y-3 p-4 bg-surface-dim rounded border border-slate-gray/25">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 uppercase">Modulate Sauna Hot Core:</span>
                  <span className="text-brand-orange font-extrabold text-sm">{saunaTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="105"
                  step="1"
                  value={saunaTemp}
                  onChange={(e) => setSaunaTemp(Number(e.target.value))}
                  className="w-full h-1.5 bg-charcoal-black rounded appearance-none cursor-pointer accent-brand-orange"
                />
                <div className="flex justify-between text-[9px] text-gray-600">
                  <span>60°C Mild Sweat</span>
                  <span>85°C Intense Heavy Finnish</span>
                  <span>105°C Ultimate Max</span>
                </div>
              </div>
            )}

            {selectedZoneId === 'cryo' || selectedZoneId === 'sauna' ? null : (
              /* Ice Plunge default slider override */
              <div className="space-y-3 p-4 bg-surface-dim rounded border border-slate-gray/25">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 uppercase">Modulate Active Ice Plunge Core:</span>
                  <span className="text-[#00F5D4] font-extrabold text-sm">{plungeTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={plungeTemp}
                  onChange={(e) => setPlungeTemp(Number(e.target.value))}
                  className="w-full h-1.5 bg-charcoal-black rounded appearance-none cursor-pointer accent-[#00F5D4]"
                />
                <div className="flex justify-between text-[9px] text-gray-600">
                  <span>1°C Near Freezing</span>
                  <span>4°C Optimal Athletic</span>
                  <span>10°C Gentle Cool</span>
                </div>
              </div>
            )}

            {/* Simulated Live Outputs based on sliding temps */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] text-gray-500 uppercase block tracking-wider">// REALSTATE BIOMECHANICAL METRICS TIMELINES</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-3 bg-charcoal-black rounded border border-slate-gray/25">
                  <span className="text-[9px] text-gray-500 uppercase">{label1}</span>
                  <span className="text-lg font-black text-white block mt-0.5">{val1}</span>
                </div>

                <div className="p-3 bg-charcoal-black rounded border border-slate-gray/25">
                  <span className="text-[9px] text-gray-500 uppercase">{label2}</span>
                  <span className="text-lg font-black text-brand-primary block mt-0.5">{val2}</span>
                </div>

                <div className="p-3 bg-charcoal-black rounded border border-slate-gray/25 col-span-1 md:col-span-2">
                  <span className="text-[9px] text-gray-500 uppercase">{label3}</span>
                  <span className="text-md font-bold text-success-teal block mt-0.5">{val3}</span>
                </div>

              </div>
            </div>

            {/* Diagnostic Advice Box */}
            <div className="p-4 rounded bg-[#1c2c29]/50 border border-success-teal/20 text-xs font-sans text-gray-400 leading-normal">
              <span className="text-[#00F5D4] font-mono text-[9px] tracking-wider uppercase font-bold block mb-1">Clinical Recovery Recommendation:</span>
              {selectedZoneId === 'cryo' && 'Ideal directly after high eccentric load sessions (heavy squats) to suppress secondary microtrauma swelling. Limit exposure to a maximum of 3 minutes.'}
              {selectedZoneId === 'sauna' && 'Recommended on recovery days or prior to training to increase joint elasticity and connective tissue blood supply. Retain proper hydration throughout.'}
              {selectedZoneId === 'cryo' || selectedZoneId === 'sauna' ? null : 'Excellent first thing in the morning to trigger standard dopamine releases or Post lift. Execute 10 deep nose breaths to anchor neural sympathetic balance.'}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
