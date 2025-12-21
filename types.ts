
export enum Sector {
  RealEstate = 'Real Estate',
  Agriculture = 'Agriculture',
  Tech = 'Technology',
  Energy = 'Energy',
  Logistics = 'Logistics',
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDetails: string; // Longer text for AI analysis
  owner: string;
  sector: Sector;
  targetAmount: number;
  raisedAmount: number;
  minInvestment: number;
  roi: number; // Percentage
  durationMonths: number;
  imageUrl: string;
  riskLevel?: 'Low' | 'Medium' | 'High'; // Initial manual classification
  status: 'pending' | 'active' | 'completed' | 'rejected'; // Added status for Admin flow
}

export interface Investment {
  id: string;
  projectId: string;
  amount: number;
  date: string;
  currentValue: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment';
  amount: number;
  date: string;
  description: string;
  status: 'success' | 'pending' | 'failed';
}

export interface User {
  id: string;
  name: string;
  role: 'Investor' | 'ProjectOwner' | 'Admin';
  walletBalance: number;
  companyName?: string; // For Project Owners
}

export interface AIAnalysisResult {
  riskScore: number;
  summary: string;
  pros: string[];
  cons: string[];
}

export interface Notification {
  id: string;
  type: 'payment' | 'project_update' | 'security' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}
