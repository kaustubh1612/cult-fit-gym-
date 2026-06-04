/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppView = 'home' | 'training' | 'coaching' | 'recovery' | 'membership' | 'contact' | 'faq';

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  periodLabel: string;
  saveAmount?: number;
  isBestValue?: boolean;
  features: string[];
  ctaText: string;
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  certifications: string[];
  bio: string;
  specialty: string;
  experienceYears: number;
  imageUrl: string;
  isAvailableToday: boolean;
}

export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  pill?: string;
  iconName: string;
  metrics?: {
    label: string;
    value: string;
    color: string;
  };
}

export interface RecoveryZone {
  id: string;
  name: string;
  description: string;
  temp: string;
  status: 'Ready' | 'In Use' | 'Maintenance';
  duration: string;
  benefit: string;
  iconName: string;
}

export interface BookingSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
}
