/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MembershipPlan, Coach, Program, RecoveryZone } from './types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 2499,
    period: '/mo',
    periodLabel: 'monthly',
    features: [
      'Full Gym Access',
      'Standard Equipment',
      'Locker Room Access'
    ],
    ctaText: 'Select Plan'
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: 6499,
    period: '/3mo',
    periodLabel: 'every 3 months',
    saveAmount: 998,
    features: [
      'Everything in Monthly',
      '1x InBody Scan',
      'Basic App Access'
    ],
    ctaText: 'Select Plan'
  },
  {
    id: 'annual',
    name: 'Annual',
    price: 19999,
    period: '/yr',
    periodLabel: 'yearly',
    saveAmount: 9989,
    isBestValue: true,
    features: [
      'Everything in Half-Yearly',
      'Pro AI-Coaching App Unlock',
      'Unlimited Recovery Lounge (Cryo/Sauna)',
      '2x PT Sessions / Month'
    ],
    ctaText: 'Commit Now'
  },
  {
    id: 'half_yearly',
    name: 'Half-Yearly',
    price: 11999,
    period: '/6mo',
    periodLabel: 'every 6 months',
    saveAmount: 2995,
    features: [
      'Everything in Quarterly',
      'Monthly InBody Scans',
      'Guest Pass (1/mo)'
    ],
    ctaText: 'Select Plan'
  }
];

export const HEAD_COACHES: Coach[] = [
  {
    id: 'vikram',
    name: 'Coach Vikram Dev',
    role: 'Head of Biomechanics & CSCS',
    certifications: ['CSCS *D', 'ISSA Master Trainer', 'MSc Sports Science'],
    bio: 'Vikram specializes in athletic performance optimization and kinetic precision. He has prepared national level powerlifters and athletes for over 12 years.',
    specialty: 'Powerlifting & Biomechanics',
    experienceYears: 12,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbeAFnHNukQSVSx1TdPg-vlF2GX578KqFJpZcTCNsJzjVV31Sg1qStxHCbbI5ByEXs2rWlA4XY7yzDyrM5YSs07YUhLVWAGUN0w8ub1qMg9fHwpt4JY1LOtCNXERJDThaWrJaTG3at7qdBAHQJCEgshn_yAc3E5PODHvNs-eLiwXtsYa5_AO9ECBiTNlMTKP2vII9dl9mey_k6BHrPEXk8C3w3RW-JJKZI2_NNdi9W5La4HqQNMky22dZb2I9RRAffcTnU8XWuQ8Q',
    isAvailableToday: true
  },
  {
    id: 'maya',
    name: 'Coach Maya Sen',
    role: 'Olympic Weightlifting Catalyst',
    certifications: ['USAW Level 2', 'CSCCa Certified Coach', 'Exos Performance Specialist'],
    bio: 'Maya is a former national competitor in Olympic Weightlifting. She translates explosive power movements into actionable progressive steps for athletes at any scale.',
    specialty: 'Olympic Lifts & Explosive Power',
    experienceYears: 10,
    imageUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600',
    isAvailableToday: true
  },
  {
    id: 'rohan',
    name: 'Coach Rohan Malhotra',
    role: 'Telemetry Coordinator & Recovery Lead',
    certifications: ['FMS Level 2', 'NCSF Personal Trainer', 'NASM-CES Recovery Specialist'],
    bio: 'Rohan handles digital integration, telemetry monitoring and contrast therapy layout tracking. He designs recovery schedules that prevent overtraining.',
    specialty: 'Contrast Therapy & Injury Mitigation',
    experienceYears: 8,
    imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600',
    isAvailableToday: false
  }
];

export const DEF_PROGRAMS: Program[] = [
  {
    id: 'strength',
    title: 'Strength Training',
    category: 'Core Pillar',
    description: 'Progressive overload mechanics integrated with real-time biometric tracking for absolute power development.',
    pill: 'DUMBBELL',
    iconName: 'dumbbell'
  },
  {
    id: 'metcon',
    title: 'Metabolic Conditioning',
    category: 'Cardio Engine',
    description: 'High-intensity protocols engineered to maximize caloric burn and elevate metabolic rate post-workout.',
    pill: 'BURN RATE',
    iconName: 'flame',
    metrics: {
      label: 'Burn Rate',
      value: 'Optimized',
      color: 'text-success-teal'
    }
  },
  {
    id: 'pt',
    title: 'Personal Training',
    category: 'Elite Coaching',
    description: 'Elite coaching paired with precise telemetry to refine form, prevent stagnation, and accelerate results.',
    pill: '1-ON-1',
    iconName: 'users'
  },
  {
    id: 'functional',
    title: 'Functional Fitness',
    category: 'Athletic Foundation',
    description: 'Movement patterns designed for real-world application, enhancing balance, core stability, and agility.',
    pill: 'AGILITY',
    iconName: 'activity'
  },
  {
    id: 'yoga',
    title: 'Recovery Yoga',
    category: 'Neural Reset',
    description: 'Active recovery sessions focused on joint mobility, myofascial flexibility, and autonomic down-regulation.',
    pill: 'MOBILITY',
    iconName: 'heart'
  }
];

export const RECOVERY_ZONES: RecoveryZone[] = [
  {
    id: 'cryo',
    name: 'Cryotherapy Pod',
    description: 'Dry nitrogen exposure to activate rapid vasoconstriction, reducing systemic muscle inflammation within minutes.',
    temp: '-110°C',
    status: 'Ready',
    duration: '3 mins',
    benefit: 'Accelerated pain relief and reduced lactic buildup',
    iconName: 'activity'
  },
  {
    id: 'sauna',
    name: 'Infrared & Heavy Thermal Sauna',
    description: 'Deep penetrating biological heat designed to increase vascular dilation and speed up connective tissue repair.',
    temp: '85°C',
    status: 'Ready',
    duration: '15-20 mins',
    benefit: 'Deep detoxification & enhanced blood circulation',
    iconName: 'thermometer'
  },
  {
    id: 'thermal',
    name: 'Contrast Ice Plunge Pod',
    description: 'Shock temperature drops to restart circulatory flow and trigger a massive sympathetic release.',
    temp: '4°C',
    status: 'In Use',
    duration: '2-5 mins',
    benefit: 'Nerve regulation & high hormone flush',
    iconName: 'snowflake'
  },
  {
    id: 'compression',
    name: 'Normatec Compression Sleeves',
    description: 'Pneumatic pulse sequences to guide fluid drainage away from weary muscles back to core organs.',
    temp: 'Room Temp',
    status: 'Ready',
    duration: '30 mins',
    benefit: 'Lymphatic drainage and reduction of heavy limbs',
    iconName: 'timer'
  }
];
