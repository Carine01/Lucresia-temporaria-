
import { Timestamp } from 'firebase/firestore';

export interface UserData {
  uid: string;
  name: string;
  email: string;
  level: 'free' | 'pro' | 'pro_plus' | 'master'; // pro_plus mapeado para o PRO+ do README
  points: number;
  credits: number; // Sistema de créditos mencionado no README
  maxCredits: number;
  whatsapp: string;
  clinic: string;
  service: string;
  tone: string;
  subscriptionStartDate?: string | Timestamp | null;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: 'novo' | 'em_contato' | 'agendado' | 'faturado' | 'perdido';
  createdAt: string;
  source: string;
  diagnosisScore?: number; // Para leads vindos do Radar de Bio
}
