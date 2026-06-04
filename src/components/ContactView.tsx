/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Compass, HelpCircle, Send, CheckCircle2, 
  Car, Clock, Landmark, AlertCircle 
} from 'lucide-react';

export const ContactView: React.FC = () => {
  // Pune Route ETA State
  const [selectedOrigin, setSelectedOrigin] = useState<string>('viman_nagar');
  
  // Inquiry submission state
  const [visitorName, setVisitorName] = useState<string>('');
  const [visitorMail, setVisitorMail] = useState('');
  const [inquiryText, setInquiryText] = useState('');
  const [interestType, setInterestType] = useState('Strength & Biomechanics');
  const [submissionPass, setSubmissionPass] = useState<boolean>(false);

  // Origins lookup telemetry (Pune)
  const originsMap: Record<string, { label: string; km: number; etaMins: number; route: string }> = {
    viman_nagar: {
      label: 'Viman Nagar (Pune)',
      km: 4.2,
      etaMins: 12,
      route: 'via Kharadi Road & Fountain Road'
    },
    koregaon_park: {
      label: 'Koregaon Park (Pune)',
      km: 7.5,
      etaMins: 18,
      route: 'via Mundhwa Road & Ghorpadi Corridor'
    },
    hadapsar: {
      label: 'Hadapsar / Magarpatta (Pune)',
      km: 5.8,
      etaMins: 15,
      route: 'via Kharadi-Hadapsar Bypass Link'
    },
    baner: {
      label: 'Baner / Hinjawadi (Pune)',
      km: 21.0,
      etaMins: 45,
      route: 'via Pune-Mumbai Expressway & Kharadi Bypass'
    }
  };

  const selectedRouteInfo = originsMap[selectedOrigin] || originsMap.viman_nagar;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorMail.trim()) {
      alert('Please fill out Name and Email to dispatch inquiry telemetry.');
      return;
    }
    setSubmissionPass(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Upper overview labels */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-mono rgb-glow px-3 py-1 bg-brand-orange/10 rounded-full text-brand-primary uppercase tracking-widest leading-none block w-fit mx-auto">
          GEOPOSITIONING & CONTACT
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-black text-white uppercase tracking-tight">
          Kharadi <span className="text-brand-orange">Campus</span>
        </h1>
        <p className="text-gray-400 font-sans text-xs sm:text-sm">
          Located prominently inside City Vista, Kharadi, Pune. Check physical driving routes, estimate real-time commute durations from Pune nodes, and contact our on-duty agents instantly.
        </p>
      </div>

      {/* Grid: Coordinates Details and Interactive Map Sim */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Physical Coordinates (Left column) */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-brand-primary font-mono text-xs uppercase">
              <span>// PHYSICAL COUPLINGS & COORDINATES</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-ping" />
            </div>

            {/* Address rows card */}
            <div className="p-6 rounded-lg bg-surface-dim border border-slate-gray/30 space-y-6 font-sans text-sm">
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-brand-orange/10 text-brand-orange rounded">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-1 font-bold">CAMPUS DIRECTORY</h4>
                  <p className="text-gray-400">
                    Floor 1, 2, and 3, City Vista Complex,<br />
                    Fountain Road, Ashoka Nagar, Kharadi,<br />
                    Pune, Maharashtra, India - 411014
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-brand-orange/10 text-brand-orange rounded">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-1 font-bold">CAMPUS CELL DIRECT</h4>
                  <p className="text-gray-400 font-mono">+91 91152 44778</p>
                  <p className="text-[11px] text-gray-500 font-sans mt-0.5">Duty Agent Desk active 06:00 AM - 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-[#00F5D4]/10 text-success-teal rounded">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-1 font-bold">DIGITAL CHANNELS</h4>
                  <p className="text-gray-400 font-mono">support@cultfit.com</p>
                  <p className="text-[11px] text-gray-500 font-sans mt-0.5">Expected telemetry response index: &lt; 90 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Landmarks / Safety guidelines list */}
          <div className="p-6 bg-charcoal-black rounded-lg border border-slate-gray/35 space-y-3 font-mono text-xs">
            <span className="text-brand-primary uppercase text-[10px] tracking-wider block font-bold">
              <Landmark className="h-4 w-4 inline mr-1" />
              City Vista Landmarks & Logistics:
            </span>
            <ul className="space-y-2 font-sans text-gray-500 text-[11px] list-none pl-1">
              <li>&bull; Situated cleanly opposite the massive Fountain Market and Gera Commerce Zone.</li>
              <li>&bull; Free secure member motorcycle parking spaces available on Ground level gates.</li>
              <li>&bull; Standard keycard registration operates instantly on Floor 1 reception.</li>
            </ul>
          </div>
        </div>

        {/* Interactive Map SIM & ETA Calculator (Right column) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-xl bg-[#181a1a] border-2 border-slate-gray/40 space-y-6 flex flex-col justify-between h-full">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-brand-primary font-mono">
                <Compass className="h-5 w-5 animate-pulse" />
                <span className="text-xs uppercase tracking-widest">Interactive Route Telemetry</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white uppercase">Pune Driving Grid Selector</h3>
              <p className="text-gray-400 text-xs font-sans">
                Select your origin locality from Pune coordinates below. Our system instantly computes typical transit distances, estimated minutes via Kharadi Bypass, and ideal routing.
              </p>
            </div>

            {/* Selector list of locations */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
              {Object.entries(originsMap).map(([key, details]) => (
                <button
                  key={key}
                  onClick={() => setSelectedOrigin(key)}
                  className={`p-2 rounded text-center text-[10px] font-mono uppercase font-bold transition-all border ${
                    selectedOrigin === key
                      ? 'bg-brand-orange text-charcoal-black border-brand-orange'
                      : 'bg-charcoal-black text-gray-500 border-slate-gray/30 hover:text-white'
                  }`}
                >
                  {key.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Calculated Grid Results Box */}
            <div className="p-6 bg-charcoal-black rounded-lg border border-slate-gray/25 font-mono space-y-4">
              <div className="flex items-center space-x-2 text-[10px] text-gray-500 uppercase pb-2 border-b border-slate-gray/20">
                <Car className="h-4 w-4 text-[#00F5D4]" />
                <span>Calculated Driving Estimates to City Vista:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="text-[9px] text-gray-500 block uppercase">ORIGIN BASE:</span>
                  <span className="text-white text-xs font-bold leading-normal block uppercase truncate">{selectedRouteInfo.label.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 block">TOTAL COMMUTE DISTANCE:</span>
                  <span className="text-brand-primary text-xl font-black block mt-0.5">{selectedRouteInfo.km} KM</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 block">ESTIMATED TRAFFIC DRIVE-TIME:</span>
                  <span className="text-success-teal text-xl font-black block mt-0.5">&gt; {selectedRouteInfo.etaMins} MINS</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-gray-400 font-sans border-t border-slate-gray/20">
                <span className="text-[10px] text-gray-500 font-mono uppercase block mb-0.5">RECOMMENDED GRID ROUTING:</span>
                {selectedRouteInfo.route}
              </div>
            </div>

            {/* Static visual stylized roadmap replica to fit aesthetic requested */}
            <div className="h-40 bg-charcoal-black rounded-lg border border-dashed border-slate-gray/45 relative flex items-center justify-center overflow-hidden">
              {/* Radial decor lines */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent top-1/2"></div>
              <div className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-transparent via-success-teal/30 to-transparent left-1/2"></div>
              
              {/* Map pins simulated */}
              <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-gray/80"></span>
                <span className="text-[8px] font-mono text-gray-600 uppercase mt-1">MUNDHWA ROAD</span>
              </div>

              <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-gray/80"></span>
                <span className="text-[8px] font-mono text-gray-600 uppercase mt-1">KOREGAON PARK</span>
              </div>

              {/* FitForge anchor */}
              <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col items-center bg-charcoal-black px-3 py-1.5 rounded-md border border-brand-orange animate-pulse z-10">
                <MapPin className="h-4 w-4 text-brand-orange" />
                <span className="text-[8px] font-mono text-white tracking-widest uppercase font-bold mt-1 animate-pulse">CULT FIT.</span>
                <span className="text-[6px] font-mono text-success-teal">KHARADI</span>
              </div>

              <div className="absolute bottom-2 left-2 text-[8px] font-mono text-gray-600 uppercase">
                LAT/LONG SIMULATOR GRID ACTIVE
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* INQUIRY LOG MESSAGE DISPATCH TERMINAL */}
      <section className="bg-charcoal-black/7 w-full border border-slate-gray/30 p-8 rounded-xl relative overflow-hidden" id="inquiry-terminal-dispatch">
        
        <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-gray-600 bg-charcoal-black/80 rounded-bl border-l border-b border-slate-gray/30 font-bold">
          TERMINAL_SENDER: KHARADI_RECEPTION_LINE
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left instructions block */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center space-x-2 text-brand-primary bg-brand-orange/10 px-2.5 py-1 rounded text-xs font-mono uppercase">
              <Send className="h-3. w-3.5 mr-1" />
              <span>Digital Reception Stream</span>
            </div>
            
            <h3 className="text-2xl font-serif font-black text-white uppercase">Direct Agent Dispatch</h3>
            <p className="text-gray-400 font-sans text-xs sm:text-sm">
              Send an automated secure query directly to our Kharadi campus staff line. Your digital inquiry log is captured instantly in our offline simulation.
            </p>

            <div className="p-4 bg-surface-dim/70 rounded border border-slate-gray/25 text-[11px] font-mono text-gray-500 space-y-1">
              <p>&bull; Direct telephone: +91 91152 44778</p>
              <p>&bull; Sales desks staffed daily until 10:00 PM IST.</p>
            </div>
          </div>

          {/* Right actual messaging system fields */}
          <div className="lg:col-span-7 bg-[#181a1a] p-6 rounded-lg border border-slate-gray/30">
            
            {submissionPass ? (
              /* Submission visual card */
              <div className="p-6 bg-charcoal-black rounded text-center space-y-4 border border-success-teal/40">
                <CheckCircle2 className="h-10 w-10 text-success-teal mx-auto animate-bounce" />
                <div className="space-y-1">
                  <h4 className="text-md font-serif font-black text-white uppercase">Inquiry Telemetry Logged</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    A text transmission packet has been simulated. Our on-duty on-site coordinators in Kharadi Pune will track your parameters under log system standard queues.
                  </p>
                </div>
                <div className="font-mono text-[10px] text-success-teal bg-surface-dim p-2.5 rounded border border-slate-gray/20">
                  RECEPTION_LOG_REFERENCE: KHARADI-TRANS-{Math.floor(1000 + Math.random() * 9000)}-OK
                </div>
                <button
                  onClick={() => {
                    setSubmissionPass(false);
                    setVisitorName('');
                    setVisitorMail('');
                    setInquiryText('');
                  }}
                  className="text-xs text-brand-primary uppercase font-mono hover:text-white"
                >
                  &lt; DISPATCH ANOTHER LINE
                </button>
              </div>
            ) : (
              /* Actual form */
              <form onSubmit={handleInquirySubmit} className="space-y-4 font-mono text-xs text-gray-400">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-[10px] text-gray-500 uppercase">Your Name:</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="w-full bg-charcoal-black rounded border border-slate-gray/30 p-2.5 text-white focus:border-brand-primary outline-none"
                      placeholder="e.g. Shriniwar"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-[10px] text-gray-500 uppercase">Your Email:</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="w-full bg-charcoal-black rounded border border-slate-gray/30 p-2.5 text-white focus:border-brand-primary outline-none"
                      placeholder="e.g. athlete@fitforge.com"
                      value={visitorMail}
                      onChange={(e) => setVisitorMail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-interest" className="text-[10px] text-gray-500 uppercase">Area of Major Interest:</label>
                  <select
                    id="contact-interest"
                    value={interestType}
                    onChange={(e) => setInterestType(e.target.value)}
                    className="w-full bg-charcoal-black rounded border border-slate-gray/30 p-2.5 text-white focus:border-brand-primary outline-none uppercase font-mono text-xs"
                  >
                    <option value="Strength & Biomechanics">Strength & Biomechanics</option>
                    <option value="Metabolic HIIT Circuits">Metabolic HIIT Circuits</option>
                    <option value="Contrast recovery suites">Contrast recovery suites</option>
                    <option value="General Memberships">General Memberships</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-[10px] text-gray-500 uppercase">Describe Your Biomechanical Goals:</label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    className="w-full bg-charcoal-black rounded border border-slate-gray/30 p-2.5 text-white focus:border-brand-primary outline-none font-sans"
                    placeholder="Enter details..."
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    id="contact-dispatch-btn"
                    type="submit"
                    className="w-full py-3 text-xs uppercase font-bold text-charcoal-black bg-[#00F5D4] rounded hover:opacity-90 font-mono"
                  >
                    Send Telemetry Transmission Packet
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
