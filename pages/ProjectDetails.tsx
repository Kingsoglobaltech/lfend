
import React, { useState, useEffect, useMemo } from 'react';
import { Project } from '../types';
import RiskAnalyzer from '../components/RiskAnalyzer';
import { InvestModal } from '../components/WalletModals';
import { 
  ArrowLeftIcon, 
  ShareIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  ArrowTrendingUpIcon, 
  DocumentTextIcon, 
  BanknotesIcon,
  CheckBadgeIcon,
  MapPinIcon,
  UserCircleIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  LinkIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  project: Project;
  onBack: () => void;
  userBalance: number;
  onConfirmInvest: (amount: number) => void;
}

// -- Share Modal --
const ShareModal = ({ isOpen, onClose, project }: { isOpen: boolean, onClose: () => void, project: Project }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  // Use current window location or fallback
  const projectUrl = typeof window !== 'undefined' ? window.location.href : `https://loopital.com/projects/${project.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(projectUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    { 
      name: 'WhatsApp', 
      icon: (props: any) => <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
      url: `https://wa.me/?text=${encodeURIComponent(`Check out ${project.title} on Loopital! ${projectUrl}`)}`,
      color: 'bg-[#25D366] text-white'
    },
    { 
      name: 'Twitter', 
      icon: (props: any) => <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${project.title} on Loopital!`)}&url=${encodeURIComponent(projectUrl)}`,
      color: 'bg-black text-white'
    },
    { 
      name: 'LinkedIn', 
      icon: (props: any) => <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`,
      color: 'bg-[#0077b5] text-white'
    },
    { 
      name: 'Email', 
      icon: EnvelopeIcon,
      url: `mailto:?subject=${encodeURIComponent(`Investment Opportunity: ${project.title}`)}&body=${encodeURIComponent(`I found this interesting project on Loopital: ${project.description}\n\nCheck it out here: ${projectUrl}`)}`,
      color: 'bg-slate-600 text-white'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
       <div className="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
       <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
             <h3 className="text-lg font-bold text-[#0A192F]">Share Project</h3>
             <button onClick={onClose} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                <XMarkIcon className="w-5 h-5" />
             </button>
          </div>
          
          <div className="p-6">
             <p className="text-sm text-slate-500 mb-6 text-center">Share this opportunity with your network.</p>
             <div className="flex gap-4 justify-center mb-8">
                {shareLinks.map((link) => (
                   <a 
                     key={link.name}
                     href={link.url}
                     target="_blank" 
                     rel="noopener noreferrer"
                     className={`w-14 h-14 rounded-2xl flex items-center justify-center ${link.color} hover:scale-110 transition-transform shadow-lg group`}
                     title={`Share on ${link.name}`}
                   >
                      <link.icon className="w-6 h-6 group-hover:animate-pulse" />
                   </a>
                ))}
             </div>

             <div className="relative">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Link</label>
                <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-1">
                   <div className="flex items-center pl-3 text-slate-400">
                      <LinkIcon className="w-4 h-4" />
                   </div>
                   <input 
                     readOnly 
                     value={projectUrl} 
                     className="flex-1 bg-transparent px-3 text-sm text-slate-600 outline-none truncate"
                   />
                   <button 
                     onClick={handleCopy}
                     className={`px-4 py-2 border rounded-lg text-xs font-bold transition-all shadow-sm ${
                        copied 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                        : 'bg-white border-slate-200 text-[#0A192F] hover:bg-[#0A192F] hover:text-white'
                     }`}
                   >
                     {copied ? 'Copied!' : 'Copy'}
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// -- Owner Profile Modal --
const OwnerProfileModal = ({ isOpen, onClose, ownerName, sector }: { isOpen: boolean, onClose: () => void, ownerName: string, sector: string }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
       <div className="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
       <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
          <div className="h-24 bg-[#0A192F] relative">
             <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                <XMarkIcon className="w-5 h-5" />
             </button>
          </div>
          <div className="px-8 pb-8 -mt-12">
             <div className="flex justify-between items-end mb-4">
                <div className="w-24 h-24 bg-white p-1 rounded-2xl shadow-lg">
                   <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                      <BuildingOfficeIcon className="w-10 h-10 text-slate-300" />
                   </div>
                </div>
                <div className="flex gap-2 mb-2">
                   <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                      <CheckBadgeIcon className="w-3.5 h-3.5" /> Verified
                   </span>
                </div>
             </div>
             
             <h3 className="text-2xl font-bold text-[#0A192F] mb-1">{ownerName}</h3>
             <p className="text-sm text-slate-500 font-medium mb-6">Premium {sector} Developer</p>
             
             <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                   <p className="text-lg font-bold text-[#0A192F]">12</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">Projects</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                   <p className="text-lg font-bold text-[#00DC82]">98%</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">Success</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                   <p className="text-lg font-bold text-[#0A192F]">4yr</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">On Platform</p>
                </div>
             </div>
             
             <h4 className="text-xs font-bold text-[#0A192F] uppercase tracking-wider mb-2">About</h4>
             <p className="text-sm text-slate-600 leading-relaxed mb-8">
                {ownerName} is a leading developer in the {sector} sector, committed to sustainable growth and high-yield asset management. They have raised over ₦4.5B on Loopital with a perfect repayment track record.
             </p>
             
             <button className="w-full py-3 border-2 border-[#0A192F] text-[#0A192F] font-bold rounded-xl hover:bg-[#0A192F] hover:text-white transition-all text-sm">
                Contact Business
             </button>
          </div>
       </div>
    </div>
  );
};

const ProjectDetails: React.FC<Props> = ({ project, onBack, userBalance, onConfirmInvest }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'documents'>('overview');
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  const percentRaised = Math.min(100, (project.raisedAmount / project.targetAmount) * 100);

  // Simulated historical data based on current progress
  const fundingHistory = useMemo(() => {
    return [
       { name: 'Start', amount: 0 },
       { name: 'Wk 2', amount: project.raisedAmount * 0.15 },
       { name: 'Wk 4', amount: project.raisedAmount * 0.35 },
       { name: 'Wk 6', amount: project.raisedAmount * 0.60 },
       { name: 'Wk 8', amount: project.raisedAmount * 0.85 },
       { name: 'Today', amount: project.raisedAmount },
    ];
  }, [project.raisedAmount]);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => {
      setAnimatedProgress(percentRaised);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentRaised]);

  const handleInvestSuccess = (amount: number) => {
    onConfirmInvest(amount);
    setIsInvestModalOpen(false);
  };

  return (
    <div className="animate-fade-in font-inter pb-20">
      <InvestModal 
         isOpen={isInvestModalOpen} 
         onClose={() => setIsInvestModalOpen(false)}
         onConfirm={handleInvestSuccess}
         project={project}
         userBalance={userBalance}
      />
      
      <OwnerProfileModal 
         isOpen={isOwnerModalOpen}
         onClose={() => setIsOwnerModalOpen(false)}
         ownerName={project.owner}
         sector={project.sector}
      />

      <ShareModal 
         isOpen={isShareModalOpen}
         onClose={() => setIsShareModalOpen(false)}
         project={project}
      />

      {/* Hero Header */}
      <div className="relative h-[400px] w-full bg-[#0A192F]">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent"></div>
        
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold transition-all border border-white/10"
          >
            <ArrowLeftIcon className="w-4 h-4" /> Back to Market
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 lg:p-12 z-10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#00DC82] text-[#0A192F] rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-green-500/20">
                    {project.sector}
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur border border-white/10 flex items-center gap-1.5">
                    <MapPinIcon className="w-3.5 h-3.5" /> Lagos, NG
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur border border-white/10 flex items-center gap-1.5">
                    <CheckBadgeIcon className="w-3.5 h-3.5 text-[#00DC82]" /> Verified Owner
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">{project.title}</h1>
                <p className="text-slate-300 font-medium text-lg flex items-center gap-2">
                   Powered by <span className="text-white font-bold">{project.owner}</span>
                </p>
              </div>
              <div className="flex gap-4">
                 <button 
                    onClick={() => setIsShareModalOpen(true)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white border border-white/10 backdrop-blur transition-colors"
                 >
                    <ShareIcon className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Nav Tabs */}
            <div className="bg-white rounded-2xl p-1.5 border border-slate-100 shadow-sm inline-flex flex-wrap gap-1">
               {['overview', 'financials', 'documents'].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab as any)}
                   className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                     activeTab === tab 
                     ? 'bg-[#0A192F] text-white shadow-md' 
                     : 'text-slate-500 hover:text-[#0A192F] hover:text-[#0A192F] hover:bg-slate-50'
                   }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[400px]">
               {activeTab === 'overview' && (
                 <div className="space-y-8 animate-fade-in">
                   <div>
                     <h3 className="text-xl font-bold text-[#0A192F] mb-4">Investment Thesis</h3>
                     <p className="text-slate-600 leading-relaxed text-base">
                       {project.fullDetails}
                     </p>
                   </div>
                   
                   <RiskAnalyzer project={project} />

                   <div className="border-t border-slate-100 pt-8">
                      <h3 className="text-lg font-bold text-[#0A192F] mb-6">Project Highlights</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          "Secure asset-backed collateral",
                          "Monthly progress reports verified by admin",
                          "Guaranteed buy-back clause included",
                          "Insurance coverage by AXA Mansard"
                        ].map((item, i) => (
                           <div key={i} className="flex items-start gap-3">
                              <CheckBadgeIcon className="w-5 h-5 text-[#00DC82] flex-shrink-0 mt-0.5" />
                              <span className="text-slate-600 text-sm">{item}</span>
                           </div>
                        ))}
                      </div>
                   </div>
                 </div>
               )}

               {activeTab === 'financials' && (
                  <div className="space-y-6 animate-fade-in">
                     {/* Funding History Chart */}
                     <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="text-lg font-bold text-[#0A192F]">Funding Velocity</h3>
                           <div className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-bold">Live Tracking</div>
                        </div>
                        <div className="h-[250px] w-full">
                           <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={fundingHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                 <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                       <stop offset="5%" stopColor="#00DC82" stopOpacity={0.1}/>
                                       <stop offset="95%" stopColor="#00DC82" stopOpacity={0}/>
                                    </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                                 <YAxis 
                                     axisLine={false} 
                                     tickLine={false} 
                                     tick={{fontSize: 12, fill: '#94a3b8'}} 
                                     tickFormatter={(value) => `₦${(value/1000000).toFixed(0)}M`}
                                 />
                                 <Tooltip 
                                     contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                                     formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Raised']}
                                     labelStyle={{color: '#64748b', marginBottom: '4px'}}
                                 />
                                 <Area 
                                     type="monotone" 
                                     dataKey="amount" 
                                     stroke="#00DC82" 
                                     strokeWidth={3} 
                                     fillOpacity={1} 
                                     fill="url(#colorAmount)" 
                                 />
                              </AreaChart>
                           </ResponsiveContainer>
                        </div>
                     </div>

                     <h3 className="text-xl font-bold text-[#0A192F]">Financial Projections</h3>
                     <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                           <div>
                              <p className="text-xs text-slate-500 uppercase font-bold">Annual ROI</p>
                              <p className="text-2xl font-bold text-[#0A192F]">{project.roi}%</p>
                           </div>
                           <div>
                              <p className="text-xs text-slate-500 uppercase font-bold">Duration</p>
                              <p className="text-2xl font-bold text-[#0A192F]">{project.durationMonths} Mo</p>
                           </div>
                           <div>
                              <p className="text-xs text-slate-500 uppercase font-bold">Payout</p>
                              <p className="text-base font-bold text-[#0A192F]">Quarterly</p>
                           </div>
                           <div>
                              <p className="text-xs text-slate-500 uppercase font-bold">Type</p>
                              <p className="text-base font-bold text-[#0A192F]">Equity + Debt</p>
                           </div>
                        </div>
                     </div>
                     <p className="text-slate-500 text-sm">
                        Detailed cash flow analysis and projected balance sheets are available in the documents section.
                     </p>
                  </div>
               )}

               {activeTab === 'documents' && (
                  <div className="space-y-4 animate-fade-in">
                     <h3 className="text-xl font-bold text-[#0A192F] mb-4">Due Diligence Documents</h3>
                     {[
                        "Project Prospectus (PDF)",
                        "Financial Model (Excel)",
                        "Legal Agreement (PDF)",
                        "Insurance Certificate (PDF)"
                     ].map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                                 <DocumentTextIcon className="w-6 h-6 text-slate-500" />
                              </div>
                              <span className="font-bold text-[#0A192F] text-sm">{doc}</span>
                           </div>
                           <button className="text-xs font-bold text-[#00DC82] border border-[#00DC82] px-3 py-1.5 rounded-lg hover:bg-[#00DC82] hover:text-white transition-all">Download</button>
                        </div>
                     ))}
                  </div>
               )}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-24">
                <div className="mb-6">
                   <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Funding Progress</span>
                      <span className="text-xl font-bold text-[#0A192F]">{percentRaised.toFixed(0)}%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-3 mb-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-[#00DC82] h-full rounded-full shadow-[0_0_10px_rgba(0,220,130,0.4)] transition-all duration-1000 ease-out" 
                        style={{ width: `${animatedProgress}%` }}
                      ></div>
                   </div>
                   <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>Raised: <strong className="text-[#0A192F]">₦{(project.raisedAmount/1000000).toFixed(1)}M</strong></span>
                      <span>Target: <strong className="text-[#0A192F]">₦{(project.targetAmount/1000000).toFixed(1)}M</strong></span>
                   </div>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center py-3 border-b border-slate-50">
                      <span className="text-sm text-slate-500 flex items-center gap-2">
                         <BanknotesIcon className="w-4 h-4" /> Min. Investment
                      </span>
                      <span className="font-bold text-[#0A192F]">₦{project.minInvestment.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center py-3 border-b border-slate-50">
                      <span className="text-sm text-slate-500 flex items-center gap-2">
                         <ArrowTrendingUpIcon className="w-4 h-4" /> Exp. Returns
                      </span>
                      <span className="font-bold text-[#00DC82]">{project.roi}% / yr</span>
                   </div>
                   <div className="flex justify-between items-center py-3 border-b border-slate-50">
                      <span className="text-sm text-slate-500 flex items-center gap-2">
                         <ClockIcon className="w-4 h-4" /> Maturity
                      </span>
                      <span className="font-bold text-[#0A192F]">{project.durationMonths} Months</span>
                   </div>
                </div>

                <button 
                  onClick={() => setIsInvestModalOpen(true)}
                  className="w-full py-4 bg-[#0A192F] hover:bg-slate-800 text-white font-bold text-lg rounded-xl shadow-xl shadow-slate-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                   Invest Now
                </button>
                
                <p className="text-xs text-slate-400 text-center mt-4 flex items-center justify-center gap-1.5">
                   <ShieldCheckIcon className="w-3.5 h-3.5" /> 
                   Funds held in secure Escrow
                </p>
             </div>
             
             {/* Owner Mini Profile Link */}
             <div 
                onClick={() => setIsOwnerModalOpen(true)}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mt-6 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors group"
             >
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                   <UserCircleIcon className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                   <p className="text-xs text-slate-400 uppercase font-bold">Project Owner</p>
                   <p className="font-bold text-[#0A192F]">{project.owner}</p>
                </div>
                <button className="ml-auto text-xs font-bold text-teal-600 group-hover:text-teal-800 transition-colors">View Profile</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
