
import { Project, Sector, User, Investment, Notification } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Kingsley David',
  role: 'Investor',
  walletBalance: 15400000.50, // 15.4 Million Naira
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'GreenHorizon Vertical Farm',
    description: 'Sustainable hydroponic farming facility in urban Lagos.',
    fullDetails: 'GreenHorizon aims to reduce food miles by establishing a 5000 sq ft vertical farm in the city center. We utilize advanced hydroponics to grow leafy greens with 90% less water. We have secured 40% of capital (₦200M) and have a purchase agreement with 3 major supermarket chains. Risks include potential energy cost spikes, though we plan to install solar panels.',
    owner: 'GreenHorizon Ltd',
    sector: Sector.Agriculture,
    targetAmount: 500000000, // 500 Million
    raisedAmount: 320000000, // 320 Million
    minInvestment: 50000, // 50k
    roi: 18,
    durationMonths: 12,
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=1600',
    riskLevel: 'Medium',
    status: 'active',
  },
  {
    id: 'p2',
    title: 'NeoLogistics Fleet Expansion',
    description: 'Expanding EV delivery fleet for last-mile logistics.',
    fullDetails: 'NeoLogistics is raising funds to purchase 50 electric delivery vans to serve the booming e-commerce sector. We are currently profitable and operating in 3 cities. The funds will be used strictly for asset acquisition. The EVs will lower our operating costs by 30%. Key risks involve potential delays in vehicle manufacturing and delivery.',
    owner: 'NeoLogistics Inc.',
    sector: Sector.Logistics,
    targetAmount: 1200000000, // 1.2 Billion
    raisedAmount: 1150000000,
    minInvestment: 100000,
    roi: 12,
    durationMonths: 24,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1600',
    riskLevel: 'Low',
    status: 'active',
  },
  {
    id: 'p3',
    title: 'SolarGrid Micro-Utility',
    description: 'Off-grid solar solution for remote industrial zones.',
    fullDetails: 'SolarGrid plans to deploy a 2MW solar array to power a remote mining cluster. This is a high-yield project with guaranteed offtake agreements. However, the location is remote, posing security and maintenance challenges. We have allocated 15% of the budget to security infrastructure.',
    owner: 'SunPower Devs',
    sector: Sector.Energy,
    targetAmount: 2500000000, // 2.5 Billion
    raisedAmount: 400000000,
    minInvestment: 250000,
    roi: 24,
    durationMonths: 36,
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1600',
    riskLevel: 'High',
    status: 'active',
  },
  {
    id: 'p4',
    title: 'PropTech AI Analytics',
    description: 'AI platform for predicting real estate trends.',
    fullDetails: 'Developing a SaaS platform for real estate investors. We have a prototype and 100 beta users. We need funds for scaling server infrastructure and marketing. Tech projects are inherently volatile, but our burn rate is low.',
    owner: 'DataEstates',
    sector: Sector.Tech,
    targetAmount: 150000000, // 150 Million
    raisedAmount: 20000000,
    minInvestment: 20000,
    roi: 35,
    durationMonths: 18,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    riskLevel: 'High',
    status: 'active',
  },
];

export const MOCK_INVESTMENTS: Investment[] = [
  {
    id: 'inv1',
    projectId: 'p2',
    amount: 5000000, // 5 Million
    date: '2023-11-15',
    currentValue: 5400000,
  },
  {
    id: 'inv2',
    projectId: 'p1',
    amount: 1000000, // 1 Million
    date: '2024-01-20',
    currentValue: 1050000,
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'payment',
    title: 'Dividend Received',
    message: 'You received ₦145,000 from GreenHorizon Farm Q1 Payout.',
    timestamp: '2 hours ago',
    isRead: false,
  },
  {
    id: 'n2',
    type: 'project_update',
    title: 'NeoLogistics: New Fleet Arrived',
    message: 'The first batch of 10 EV vans has been delivered and deployed. Operations scaling up by 15% this week.',
    timestamp: '1 day ago',
    isRead: false,
    link: '/projects/p2',
  },
  {
    id: 'n3',
    type: 'system',
    title: 'Platform Maintenance',
    message: 'Scheduled maintenance for Saturday 2:00 AM - 4:00 AM.',
    timestamp: '2 days ago',
    isRead: true,
  },
  {
    id: 'n4',
    type: 'security',
    title: 'New Login Detected',
    message: 'A new login detected from Lagos, NG via Chrome on Windows.',
    timestamp: '3 days ago',
    isRead: true,
  }
];
