
import React, { useState } from 'react';
import { 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon, 
  PlusIcon, 
  HandThumbUpIcon,
  ArrowRightIcon,
  BanknotesIcon,
  MegaphoneIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Sector } from '../types';

// -- Mock Types --
interface Discussion {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  replies: number;
  timeAgo: string;
}

interface Poll {
  id: string;
  question: string;
  options: { label: string; votes: number; percentage: number }[];
  totalVotes: number;
  daysLeft: number;
}

interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  sector: Sector;
  description: string;
  image: string;
  pooledAmount: number;
  poolingGoal: number;
  activeProjects: number;
}

// -- Mock Data --
const GROUPS: CommunityGroup[] = [
  { 
    id: 'g1', 
    name: 'AgriTech Syndicate', 
    members: 1240, 
    sector: Sector.Agriculture, 
    description: 'A community of investors focused on sustainable farming and food security in West Africa. We pool funds to back high-yield hydroponic and organic farms.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600',
    pooledAmount: 45000000,
    poolingGoal: 100000000,
    activeProjects: 3
  },
  { 
    id: 'g2', 
    name: 'Green Energy Pool', 
    members: 890, 
    sector: Sector.Energy, 
    description: 'Invest in off-grid solar solutions for industrial zones. Join us to co-sponsor large infrastructure projects with stable long-term returns.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600',
    pooledAmount: 120000000,
    poolingGoal: 150000000,
    activeProjects: 2
  },
  { 
    id: 'g3', 
    name: 'Urban Real Estate', 
    members: 2100, 
    sector: Sector.RealEstate, 
    description: 'Crowdfunding commercial property development in Lagos and Abuja. We focus on mixed-use developments with high rental yields.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    pooledAmount: 85000000,
    poolingGoal: 500000000,
    activeProjects: 5
  },
];

const DISCUSSIONS: Discussion[] = [
  { id: 'd1', author: 'Sarah Johnson', avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff', content: "Has anyone reviewed the latest compliance report for GreenHorizon? The yield looks promising but I'm worried about the rainy season impact.", likes: 24, replies: 8, timeAgo: '2h ago' },
  { id: 'd2', author: 'Michael Tan', avatar: 'https://ui-avatars.com/api/?name=Michael+Tan&background=ffb300&color=fff', content: "I'm proposing we pool funds for the new NeoLogistics fleet. If we can raise ₦50M, we can negotiate better equity terms.", likes: 45, replies: 15, timeAgo: '5h ago' },
  { id: 'd3', author: 'David Okonjo', avatar: 'https://ui-avatars.com/api/?name=David+Okonjo&background=00DC82&color=fff', content: "Just received my dividend from the SolarGrid project! 18% ROI annualized. This community really picks winners.", likes: 89, replies: 22, timeAgo: '1d ago' },
];

const POLLS: Poll[] = [
  { 
    id: 'p1', 
    question: 'Should we back the "Lagos Tech Hub" expansion?', 
    options: [
      { label: 'Yes, High Potential', votes: 145, percentage: 72 },
      { label: 'No, Too Risky', votes: 34, percentage: 17 },
      { label: 'Need More Info', votes: 22, percentage: 11 }
    ],
    totalVotes: 201,
    daysLeft: 3
  }
];

const Community: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<CommunityGroup | null>(null);
  const [activeTab, setActiveTab] = useState<'discussions' | 'pooling' | 'voting' | 'portfolio'>('discussions');

  // --- Sub-Components for Detail View ---

  const GroupHeader = ({ group }: { group: CommunityGroup }) => (
    <div className="relative h-64 rounded-3xl overflow-hidden mb-8">
      <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-transparent opacity-90"></div>
      <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span className="px-3 py-1 bg-[#00DC82] text-[#0A192F] text-xs font-bold uppercase rounded-full mb-3 inline-block">
            {group.sector}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{group.name}</h1>
          <p className="text-slate-300 max-w-2xl text-sm md:text-base">{group.description}</p>
        </div>
        <div className="flex gap-4">
           <div className="text-center bg-white/10 backdrop-blur rounded-xl p-3 border border-white/10 min-w-[100px]">
              <p className="text-xs font-bold text-slate-300 uppercase">Members</p>
              <p className="text-xl font-bold text-white">{group.members.toLocaleString()}</p>
           </div>
           <button className="px-6 py-3 bg-white text-[#0A192F] font-bold rounded-xl hover:bg-slate-200 transition-colors">
              Join Group
           </button>
        </div>
      </div>
      <button 
        onClick={() => setSelectedGroup(null)}
        className="absolute top-6 left-6 px-4 py-2 bg-black/30 text-white text-sm font-bold rounded-full backdrop-blur hover:bg-black/50 transition-colors flex items-center gap-2"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Back
      </button>
    </div>
  );

  const PoolingTab = ({ group }: { group: CommunityGroup }) => {
     const percent = Math.min(100, (group.pooledAmount / group.poolingGoal) * 100);
     return (
       <div className="space-y-6 animate-fade-in">
          <div className="bg-[#0A192F] text-white rounded-2xl p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
             <div className="relative z-10 text-center">
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-2">Active Fundraise</p>
                <h2 className="text-4xl font-bold mb-6">Q3 Co-Investment Pool</h2>
                
                <div className="max-w-2xl mx-auto mb-4">
                   <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-[#00DC82]">Raised: ₦{(group.pooledAmount/1000000).toFixed(1)}M</span>
                      <span className="text-slate-400">Goal: ₦{(group.poolingGoal/1000000).toFixed(0)}M</span>
                   </div>
                   <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-[#00DC82]" style={{ width: `${percent}%` }}></div>
                   </div>
                </div>
                
                <p className="text-slate-300 text-sm mb-8">
                   Pooling funds allows our community to negotiate better equity terms and meet minimum ticket sizes for institutional-grade projects.
                </p>
                
                <button className="px-8 py-3 bg-[#00DC82] text-[#0A192F] font-bold rounded-xl hover:bg-[#00c474] transition-colors shadow-lg shadow-green-500/20">
                   Contribute to Pool
                </button>
             </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6">
             <h3 className="font-bold text-[#0A192F] mb-4">Recent Contributors</h3>
             <div className="space-y-4">
                {[1,2,3,4].map((i) => (
                   <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#0A192F]">
                            U{i}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-[#0A192F]">Anonymous Investor #{2400+i}</p>
                            <p className="text-xs text-slate-500">2 hours ago</p>
                         </div>
                      </div>
                      <span className="text-sm font-bold text-[#00DC82]">+₦{(Math.random() * 500000).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                   </div>
                ))}
             </div>
          </div>
       </div>
     )
  };

  const VotingTab = () => (
     <div className="space-y-6 animate-fade-in">
        {POLLS.map(poll => (
           <div key={poll.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-lg font-bold text-[#0A192F]">{poll.question}</h3>
                 <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" /> {poll.daysLeft} days left
                 </span>
              </div>
              
              <div className="space-y-4 mb-6">
                 {poll.options.map((opt, idx) => (
                    <div key={idx} className="relative group cursor-pointer">
                       <div className="flex justify-between text-sm font-bold mb-1 relative z-10">
                          <span className="text-slate-700 group-hover:text-[#0A192F]">{opt.label}</span>
                          <span className="text-slate-500">{opt.percentage}%</span>
                       </div>
                       <div className="h-10 bg-slate-50 rounded-lg overflow-hidden relative border border-slate-100 group-hover:border-[#00DC82]/30 transition-colors">
                          <div className="absolute top-0 left-0 h-full bg-slate-200/50 group-hover:bg-[#00DC82]/10 transition-colors" style={{ width: `${opt.percentage}%` }}></div>
                          <div className="absolute inset-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                             <span className="text-xs font-bold text-[#00DC82]">Click to Vote</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              
              <div className="flex justify-between text-xs text-slate-500 border-t border-slate-50 pt-4">
                 <span>Total Votes: {poll.totalVotes}</span>
                 <span>Created by Community Admin</span>
              </div>
           </div>
        ))}
     </div>
  );

  const DiscussionsTab = () => (
     <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden animate-fade-in">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-3">
           <img src="https://ui-avatars.com/api/?name=Me&background=0A192F&color=fff" className="w-10 h-10 rounded-full" alt="Me" />
           <input 
             type="text" 
             placeholder="Start a discussion..." 
             className="flex-1 bg-white border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]"
           />
           <button className="bg-[#0A192F] text-white px-4 rounded-xl font-bold text-sm">Post</button>
        </div>
        <div className="divide-y divide-slate-50">
           {DISCUSSIONS.map(disc => (
              <div key={disc.id} className="p-6 hover:bg-slate-50 transition-colors">
                 <div className="flex gap-4">
                    <img src={disc.avatar} className="w-10 h-10 rounded-full border border-slate-200" alt={disc.author} />
                    <div className="flex-1">
                       <div className="flex justify-between items-start">
                          <h4 className="font-bold text-[#0A192F] text-sm">{disc.author}</h4>
                          <span className="text-xs text-slate-400">{disc.timeAgo}</span>
                       </div>
                       <p className="text-slate-600 text-sm mt-1 mb-3 leading-relaxed">{disc.content}</p>
                       <div className="flex gap-6">
                          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#00DC82] transition-colors">
                             <HandThumbUpIcon className="w-4 h-4" /> {disc.likes}
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#00DC82] transition-colors">
                             <ChatBubbleLeftRightIcon className="w-4 h-4" /> {disc.replies} Replies
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           ))}
        </div>
     </div>
  );

  const ArrowLeftIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );

  // --- Main Render ---

  if (selectedGroup) {
     return (
        <div className="animate-fade-in max-w-5xl mx-auto pb-12">
           <GroupHeader group={selectedGroup} />
           
           {/* Tab Nav */}
           <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
              {[
                 { id: 'discussions', label: 'Discussions', icon: MegaphoneIcon },
                 { id: 'pooling', label: 'Pooled Funds', icon: BanknotesIcon },
                 { id: 'voting', label: 'Governance', icon: CheckCircleIcon },
                 { id: 'portfolio', label: 'Portfolio', icon: ArrowTrendingUpIcon },
              ].map(tab => (
                 <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                       activeTab === tab.id 
                       ? 'border-[#0A192F] text-[#0A192F]' 
                       : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                 >
                    <tab.icon className="w-4 h-4" /> {tab.label}
                 </button>
              ))}
           </div>

           {/* Tab Content */}
           <div className="min-h-[400px]">
              {activeTab === 'discussions' && <DiscussionsTab />}
              {activeTab === 'pooling' && <PoolingTab group={selectedGroup} />}
              {activeTab === 'voting' && <VotingTab />}
              {activeTab === 'portfolio' && (
                 <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed">
                    <ArrowTrendingUpIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-[#0A192F]">Portfolio Hidden</h3>
                    <p className="text-slate-500 text-sm">Join the group to view active investments.</p>
                 </div>
              )}
           </div>
        </div>
     );
  }

  // --- Browser View ---
  return (
    <div className="animate-fade-in space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0A192F]">Investor Communities</h1>
          <p className="text-slate-500 mt-2 max-w-xl">
            Join forces with like-minded investors. Pool funds, vote on deals, and share due diligence to maximize returns.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0A192F] text-white rounded-xl hover:bg-slate-800 transition-colors shadow-lg font-bold text-sm">
          <PlusIcon className="w-5 h-5" />
          <span>Create New Group</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GROUPS.map(group => (
          <div 
             key={group.id} 
             onClick={() => setSelectedGroup(group)}
             className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-40 relative overflow-hidden">
               <img src={group.image} alt={group.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-[#0A192F] text-[10px] font-bold uppercase rounded-lg">
                     {group.sector}
                  </span>
               </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
               <h3 className="text-xl font-bold text-[#0A192F] mb-2 group-hover:text-teal-600 transition-colors">{group.name}</h3>
               <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-grow">{group.description}</p>
               
               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-xl text-center">
                     <p className="text-lg font-bold text-[#0A192F]">{group.members}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase">Members</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl text-center">
                     <p className="text-lg font-bold text-[#00DC82]">{group.activeProjects}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase">Active Deals</p>
                  </div>
               </div>

               <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex -space-x-2">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                     ))}
                     <div className="w-8 h-8 rounded-full bg-[#0A192F] text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                        +
                     </div>
                  </div>
                  <span className="text-sm font-bold text-[#0A192F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                     Enter <ChevronRightIcon className="w-4 h-4" />
                  </span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Highlight */}
      <div className="bg-[#0A192F] rounded-3xl p-8 md:p-12 relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-12">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00DC82]/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
         
         <div className="relative z-10 flex-1">
            <h2 className="text-3xl font-bold mb-4">Why join a Community?</h2>
            <ul className="space-y-4">
               {[
                  "Pool capital to meet high minimum investment thresholds.",
                  "Vote on investment decisions as a collective DAO.",
                  "Share due diligence and risk analysis with experts.",
                  "Negotiate better terms and lower fees for the group."
               ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                     <CheckCircleIcon className="w-6 h-6 text-[#00DC82] flex-shrink-0" />
                     <span className="text-slate-300 font-medium">{item}</span>
                  </li>
               ))}
            </ul>
         </div>
         
         <div className="relative z-10 w-full md:w-auto bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl max-w-sm">
            <div className="flex items-center gap-3 mb-4">
               <BanknotesIcon className="w-8 h-8 text-[#00DC82]" />
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Total Pooled Volume</p>
                  <p className="text-2xl font-bold text-white">₦2.4 Billion</p>
               </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
               "Joining the Real Estate syndicate allowed me to own a piece of a Lekki High-rise that I couldn't afford alone."
            </p>
            <div className="mt-4 flex items-center gap-2">
               <div className="w-6 h-6 rounded-full bg-slate-500"></div>
               <span className="text-xs font-bold text-white">James O.</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Community;
